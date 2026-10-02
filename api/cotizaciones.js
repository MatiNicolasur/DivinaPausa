import { PRIVACY_VERSION } from '../src/data/privacyConsent.js';
import { proposalServices, communeOptions, scheduleOptions } from '../src/data/proposalOptions.js';
import { sendProposalEmails } from '../src/server/proposalNotification.js';
import { verifyTurnstile } from '../src/server/turnstile.js';

export function validateQuote(data) {
  if (!data || typeof data !== 'object') throw new Error('invalid');
  const { privacyAccepted, privacyVersion, schemaVersion, requestId, service, eventDate, dateUnknown, people, commune, schedule = '', details = '', company, name, email, phone = '', website = '' } = data;
  const invalid = () => { throw new Error('invalid'); };
  if (privacyAccepted !== true || privacyVersion !== PRIVACY_VERSION) invalid();
  if (schemaVersion !== 2 || typeof requestId !== 'string' || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(requestId)) invalid();
  if (!proposalServices.some(option => option.id === service)) invalid();
  if (typeof data.turnstileToken !== 'string' || data.turnstileToken.length < 1 || data.turnstileToken.length > 2048) invalid();
  if (typeof dateUnknown !== 'boolean' || typeof eventDate !== 'string') invalid();
  if (dateUnknown ? eventDate !== '' : (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || !Number.isFinite(Date.parse(eventDate)) || new Date(eventDate).toISOString().slice(0, 10) !== eventDate)) invalid();
  if (!Number.isInteger(people) || people < 1 || people > 10000) invalid();
  if (!communeOptions.includes(commune) || (schedule !== '' && !scheduleOptions.includes(schedule))) invalid();
  if (typeof details !== 'string' || details.length > 2000) invalid();
  for (const value of [name, company]) if (typeof value !== 'string' || !value.trim() || value.length > 120) invalid();
  if (typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) invalid();
  if (typeof phone !== 'string' || phone.length > 30 || (phone && !/^[+()\d\s.-]{6,30}$/.test(phone))) invalid();
  if (website) invalid();
  return { privacyAccepted, privacyVersion, schemaVersion, requestId, service, eventDate, dateUnknown, people, commune, schedule, details: details.trim(), company: company.trim(), name: name.trim(), email: email.trim(), phone: phone.trim(), turnstileToken: data.turnstileToken };
}

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/json');
  const send = (code, body) => { res.statusCode = code; res.end(JSON.stringify(body)); };
  if (process.env.VERCEL_ENV === 'preview' && process.env.QUOTES_ALLOW_PREVIEW_SEND !== 'true') return send(503, { ok: false, code: 'preview_disabled' });
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(405, { ok: false }); }
  if (!String(req.headers['content-type'] || '').startsWith('application/json')) return send(415, { ok: false });
  let origin;
  try {
    if (!req.headers.origin || !req.headers.host) return send(403, { ok: false });
    origin = new URL(req.headers.origin);
    const requestHost = String(req.headers.host).toLowerCase();
    const localDevelopment = ['localhost', '127.0.0.1', '[::1]'].includes(origin.hostname.toLowerCase());
    if (origin.host.toLowerCase() !== requestHost || (!localDevelopment && origin.protocol !== 'https:')) return send(403, { ok: false });
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

  if (process.env.QUOTES_EMAIL_ENABLED !== 'true' || !process.env.RESEND_API_KEY || !process.env.QUOTES_EMAIL_FROM || !process.env.QUOTES_EMAIL_TO) {
    console.error('[cotizaciones] email_not_configured');
    return send(503, { ok: false, code: 'not_configured' });
  }
  if (!process.env.TURNSTILE_SECRET_KEY) {
    console.error('[cotizaciones] turnstile_not_configured');
    return send(503, { ok: false, code: 'turnstile_not_configured' });
  }
  const allowTurnstileTestMode = process.env.VERCEL_ENV === 'preview' || (!process.env.VERCEL_ENV && process.env.NODE_ENV !== 'production');
  const turnstileValid = await verifyTurnstile(quote.turnstileToken, process.env.TURNSTILE_SECRET_KEY, origin.hostname, allowTurnstileTestMode);
  if (turnstileValid.unavailable) return send(503, { ok: false, code: 'turnstile_unavailable' });
  if (!turnstileValid.valid) return send(403, { ok: false, code: 'turnstile_failed' });
  delete quote.turnstileToken;
  const result = await sendProposalEmails(quote);
  if (!result.ok) return send(502, { ok: false, code: 'email_delivery_failed' });
  return send(200, { ok: true, requestId: quote.requestId });
}
