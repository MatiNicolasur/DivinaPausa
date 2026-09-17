import { quoteOptions } from '../src/data/quoteOptions.js';
import { quoteSession } from '../src/server/quoteSession.js';

export function validateQuote(data) {
  if (!data || typeof data !== 'object') throw new Error('invalid');
  const { requestId, services, people, hours, name, email, phone = '', website = '' } = data;
  if (typeof requestId !== 'string' || !/^[0-9a-f-]{36}$/i.test(requestId)) throw new Error('invalid');
  if (!Array.isArray(services) || !services.length || services.length > 6 ||
      services.some(id => !quoteOptions.some(option => option.id === id))) throw new Error('invalid');
  if (!Number.isInteger(people) || people < 1 || people > 10000) throw new Error('invalid');
  if (!Number.isInteger(hours) || hours < 1 || hours > 12) throw new Error('invalid');
  if (typeof name !== 'string' || name.trim().length < 1 || name.length > 120) throw new Error('invalid');
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error('invalid');
  if (typeof phone !== 'string' || phone.length > 30 || (phone && !/^[+()\d\s.-]{6,30}$/.test(phone))) throw new Error('invalid');
  if (website) throw new Error('invalid');
  return { requestId, services: [...new Set(services)], people, hours, name: name.trim(), email: email.trim(), phone: phone.trim() };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  const send = (code, body) => { res.statusCode = code; res.end(JSON.stringify(body)); };
  if (process.env.VERCEL_ENV === 'preview') return send(503, { ok: false, code: 'preview_disabled' });
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(405, { ok: false }); }
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return send(415, { ok: false });
  // Browser requests must come from this site, including authorized Vercel previews.
  try {
    if (!req.headers.origin || new URL(req.headers.origin).host !== req.headers.host) return send(403, { ok: false });
  } catch { return send(403, { ok: false }); }
  let quote;
  try {
    let body = req.body;
    if (body === undefined) {
      let raw = '';
      for await (const chunk of req) {
        raw += chunk.toString();
        if (Buffer.byteLength(raw) > 8192) return send(413, { ok: false });
      }
      body = JSON.parse(raw);
    } else if (typeof body === 'string') body = JSON.parse(body);
    if (Buffer.byteLength(JSON.stringify(body)) > 8192) return send(413, { ok: false });
    quote = validateQuote(body);
  } catch { return send(400, { ok: false }); }

  const endpoint = process.env.QUOTES_SCRIPT_URL;
  const token = process.env.QUOTES_SCRIPT_TOKEN;
  if (!endpoint || !token) return send(503, { ok: false, code: 'not_configured' });
  if (!/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(endpoint)) return send(503, { ok: false });
  const sessionId = quoteSession(req, res, token);
  try {
    const upstream = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...quote, sessionId, token }), signal: AbortSignal.timeout(20000),
    });
    const result = await upstream.json();
    if (result.ok !== true) {
      const knownCodes = ['invalid_token', 'missing_spreadsheet_id', 'missing_sheet', 'sheet_write_failed', 'busy', 'rate_limited'];
      console.error('[cotizaciones] Google:', knownCodes.includes(result.code) ? result.code : 'unconfirmed_write');
    }
    if (upstream.ok && result.code === 'rate_limited') {
      const retryAfter = Math.min(900, Math.max(1, Number(result.retryAfter) || 900));
      res.setHeader('Retry-After', String(Math.ceil(retryAfter)));
      return send(429, { ok: false, code: 'rate_limited', retryAfter });
    }
    if (!upstream.ok || result.ok !== true || result.requestId !== quote.requestId) return send(502, { ok: false });
    return send(200, { ok: true, requestId: quote.requestId });
  } catch { return send(502, { ok: false }); }
}
