const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

export async function verifyTurnstile(token, secret, expectedHostname, allowTestMode = false) {
  if (typeof token !== 'string' || token.length < 1 || token.length > 2048 || !secret) {
    return { valid: false, unavailable: false };
  }
  try {
    const body = new URLSearchParams({ secret, response: token });
    const response = await fetch(SITEVERIFY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
      signal: AbortSignal.timeout(5000),
    });
    if (!response.ok) return { valid: false, unavailable: true };
    const result = await response.json();
    const validProductionToken = result.success === true &&
      result.action === 'quote_submit' &&
      typeof result.hostname === 'string' &&
      result.hostname.toLowerCase() === expectedHostname.toLowerCase();
    const validTestToken = allowTestMode && result.success === true &&
      result.action === 'test' && result.hostname === 'localhost';
    return { valid: validProductionToken || validTestToken, unavailable: false };
  } catch {
    return { valid: false, unavailable: true };
  }
}
