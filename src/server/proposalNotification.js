import { proposalConfirmation } from './proposalEmail.js';
import { proposalServices, formatEventDate } from '../data/proposalOptions.js';

// Resend is the delivery channel and mailbox the operational record.
export async function sendProposalEmails(quote) {
  const { RESEND_API_KEY, QUOTES_EMAIL_FROM, QUOTES_EMAIL_TO } = process.env;
  if (!RESEND_API_KEY || !QUOTES_EMAIL_FROM || !QUOTES_EMAIL_TO) {
    console.error('[cotizaciones] email_not_configured');
    return { ok: false };
  }
  const service = proposalServices.find(item => item.id === quote.service)?.title;
  const text = [
    `Solicitud: ${quote.requestId}`, `Nombre: ${quote.name}`, `Empresa: ${quote.company}`,
    `Correo: ${quote.email}`, `Teléfono: ${quote.phone || 'No indicado'}`,
    `Servicio: ${service}`, `Fecha: ${formatEventDate(quote.eventDate)}`,
    `Asistentes: ${quote.people}`, `Comuna: ${quote.commune}`,
    `Horario: ${quote.schedule || 'Sin seleccionar'}`, `Detalles: ${quote.details || 'Sin detalles'}`,
    `Autorización de privacidad: aceptada (${quote.privacyVersion})`, `Recibida el: ${new Date().toISOString()}`,
  ].join('\n');
  const deliver = async (kind, body) => {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `proposal-${kind}-${quote.requestId}` },
        body: JSON.stringify({ from: QUOTES_EMAIL_FROM, ...body }),
        signal: AbortSignal.timeout(5000),
      });
      if (!response.ok) throw new Error('email_rejected');
      return { ok: true };
    } catch {
      console.error(`[cotizaciones] email_${kind}_delivery_failed`);
      return { ok: false };
    }
  };
  const results = await Promise.all([
    deliver('team', { to: [QUOTES_EMAIL_TO], reply_to: quote.email, subject: 'Nueva solicitud de propuesta — Divina Pausa', text }),
    deliver('confirmation', { to: [quote.email], reply_to: QUOTES_EMAIL_TO, ...proposalConfirmation(quote) }),
  ]);
  return { ok: results.every(result => result.ok) };
}
