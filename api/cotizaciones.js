import { PRIVACY_VERSION } from '../src/data/privacyConsent.js';
import { proposalServices, communeOptions, scheduleOptions } from '../src/data/proposalOptions.js';
import { notifyProposal } from '../src/server/proposalNotification.js';
import { quoteSession } from '../src/server/quoteSession.js';

export function validateQuote(data) {
  if (!data || typeof data !== 'object') throw new Error('invalid');
  const { privacyAccepted, privacyVersion, schemaVersion, requestId, service, eventDate, dateUnknown, people, commune, schedule = '', details = '', company, name, email, phone = '', website = '' } = data;
  const invalid = () => { throw new Error('invalid'); };
  if (privacyAccepted !== true || privacyVersion !== PRIVACY_VERSION) invalid();
  if (schemaVersion !== 2 || typeof requestId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestId)) invalid();
  if (!proposalServices.some(option => option.id === service)) invalid();
  if (typeof dateUnknown !== 'boolean' || typeof eventDate !== 'string') invalid();
  if (dateUnknown ? eventDate !== '' : (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || !Number.isFinite(Date.parse(eventDate)) || new Date(eventDate).toISOString().slice(0, 10) !== eventDate)) invalid();
  if (!Number.isInteger(people) || people < 1 || people > 10000) invalid();
  if (!communeOptions.includes(commune) || (schedule !== '' && !scheduleOptions.includes(schedule))) invalid();
  if (typeof details !== 'string' || details.length > 2000) invalid();
  for (const value of [name, company]) if (typeof value !== 'string' || !value.trim() || value.length > 120) invalid();
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) invalid();
  if (typeof phone !== 'string' || phone.length > 30 || (phone && !/^[+()\d\s.-]{6,30}$/.test(phone))) invalid();
  if (website) invalid();
  return { privacyAccepted, privacyVersion, schemaVersion, requestId, service, eventDate, dateUnknown, people, commune, schedule, details: details.trim(), company: company.trim(), name: name.trim(), email: email.trim(), phone: phone.trim() };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  const send = (code, body) => { res.statusCode = code; res.end(JSON.stringify(body)); };
  if (process.env.VERCEL_ENV === 'preview' && process.env.QUOTES_ALLOW_PREVIEW_SEND !== 'true') return send(503, { ok: false, code: 'preview_disabled' });
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
    if (!upstream.ok || result.ok !== true || result.requestId !== quote.requestId || result.schemaVersion !== 2 || result.privacyVersion !== PRIVACY_VERSION) return send(502, { ok: false });
    if (!result.duplicate) await notifyProposal(quote);
    return send(200, { ok: true, requestId: quote.requestId });
  } catch { return send(502, { ok: false }); }
}
