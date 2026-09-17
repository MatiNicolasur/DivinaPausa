import { createHmac, randomUUID, timingSafeEqual } from 'node:crypto';

export function quoteSession(req, res, secret) {
  const sign = id => createHmac('sha256', secret).update(`quote-session:${id}`).digest('hex');
  const cookie = String(req.headers.cookie || '').split(';').map(value => value.trim()).find(value => value.startsWith('dp_quote_session='))?.slice(17);
  if (cookie) {
    const [id, signature] = cookie.split('.');
    if (/^[a-f0-9-]{36}$/.test(id) && /^[a-f0-9]{64}$/.test(signature || '') && timingSafeEqual(Buffer.from(signature), Buffer.from(sign(id)))) return id;
  }
  const id = randomUUID();
  const secure = req.headers.origin?.startsWith('https://') ? '; Secure' : '';
  res.setHeader('Set-Cookie', `dp_quote_session=${id}.${sign(id)}; Path=/; HttpOnly; SameSite=Strict${secure}`);
  return id;
}
