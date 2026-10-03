import { proposalServices, formatEventDate } from '../data/proposalOptions.js';

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);

export function proposalConfirmation(quote) {
  const service = proposalServices.find(item => item.id === quote.service)?.title || 'Por definir';
  const rows = [
    ['Servicio', service], ['Fecha estimada', formatEventDate(quote.eventDate)],
    ['Personas estimadas', String(quote.people)], ['Comuna', quote.commune],
    ['Horario', quote.schedule || 'Por definir'],
  ];
  const subject = 'Recibimos tu solicitud — Divina Pausa';
  const text = `Hola:\n\nGracias por pensar en Divina Pausa. Ya recibimos tu solicitud. Revisaremos los detalles y te responderemos a ${quote.email} para confirmar disponibilidad y preparar una propuesta.\n\n${rows.map(([label, value]) => `${label}: ${value}`).join('\n')}\n\nEsta confirmación no constituye una reserva ni una cotización definitiva.\n\n¿Quieres agregar o cambiar algo? Responde a este correo y lo tendremos en cuenta.\n\nUn abrazo,\nEl equipo de Divina Pausa\ncontacto@divinapausa.cl\nhttps://divinapausa.cl\n\nReferencia: ${quote.requestId}`;
  const html = `<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="light"><title>${subject}</title>
<style>@media only screen and (max-width:620px){.outer{padding:16px 8px!important}.email-card{width:100%!important;max-width:100%!important;border-radius:18px!important}.pad{padding-left:20px!important;padding-right:20px!important}.brand-logo{width:144px!important}.title{font-size:34px!important}.summary-label{width:42%!important}}</style></head>
<body style="margin:0;padding:0;background:#f4f0ed;color:#292725;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;mso-hide:all">Tu próxima pausa comienza aquí. Estos son los detalles que recibimos.</div>
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f4f0ed"><tr><td class="outer" align="center" style="padding:40px 16px">
<!--[if mso]><table role="presentation" align="center" width="560" cellspacing="0" cellpadding="0" border="0"><tr><td><![endif]-->
<table class="email-card" role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;max-width:560px;margin:0 auto;background:#fffdfb;border:1px solid #e5ddd7;border-radius:24px;overflow:hidden">
<tr><td class="pad" style="padding:30px 40px;background:#242323;color:#f8f3ed;border-bottom:4px solid #e5b1ae">
<a href="https://divinapausa.cl" style="display:inline-block;text-decoration:none"><img class="brand-logo" src="https://divinapausa.cl/images/logos/divina-pausa-email-white.svg" width="160" height="78" alt="Divina Pausa" style="display:block;width:160px;max-width:100%;height:auto;border:0;background:transparent"></a>
<p style="margin:10px 0 0;font-size:10px;line-height:1.5;letter-spacing:2px;color:#e5b1ae">CATERING · ENCUENTROS · BUENOS MOMENTOS</p></td></tr>
<tr><td class="pad" style="padding:38px 40px 24px">
<p style="margin:0 0 16px;font-size:11px;font-weight:bold;letter-spacing:1.5px;color:#83534f">SOLICITUD RECIBIDA</p>
<h1 class="title" style="margin:0 0 24px;font-family:Georgia,'Times New Roman',serif;font-size:42px;line-height:1.12;font-weight:normal;letter-spacing:-1px">Una buena pausa<br>empieza por aquí.</h1>
<p style="margin:0 0 12px;font-size:16px;line-height:1.7">Hola:</p>
<p style="margin:0;font-size:16px;line-height:1.7;color:#57504c">Gracias por pensar en Divina Pausa. Ya recibimos tu solicitud y nos alegra acompañarte en la preparación de tu próximo encuentro.</p></td></tr>
<tr><td class="pad" style="padding:0 40px 28px">
<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#f5eeea;border-radius:16px"><tr><td style="padding:24px">
<h2 style="margin:0 0 16px;font-family:Georgia,'Times New Roman',serif;font-size:23px;font-weight:normal">Tu evento, en pocas palabras</h2>
<table width="100%" cellspacing="0" cellpadding="0" border="0" style="border-collapse:collapse">
${rows.map(([label, value]) => `<tr><th class="summary-label" scope="row" align="left" valign="top" style="width:44%;padding:11px 12px 11px 0;border-bottom:1px solid #e2d7cf;font-size:13px;line-height:1.5;font-weight:normal;color:#675c55">${escapeHtml(label)}</th><td valign="top" style="padding:11px 0;border-bottom:1px solid #e2d7cf;font-size:14px;line-height:1.5;color:#292725;overflow-wrap:anywhere">${escapeHtml(value)}</td></tr>`).join('')}
</table>
</td></tr></table></td></tr>
<tr><td class="pad" style="padding:0 40px 36px">
<h2 style="margin:0 0 12px;font-family:Georgia,'Times New Roman',serif;font-size:25px;font-weight:normal">¿Qué viene ahora?</h2>
<p style="margin:0 0 20px;font-size:15px;line-height:1.7;color:#57504c">Revisaremos los detalles y te responderemos a <strong style="color:#292725;overflow-wrap:anywhere">${escapeHtml(quote.email)}</strong> para confirmar disponibilidad y preparar una propuesta.</p>
<p style="margin:0 0 24px;font-size:13px;line-height:1.6;color:#675c55">Esta confirmación no constituye una reserva ni una cotización definitiva.</p>
<table role="presentation" cellspacing="0" cellpadding="0" border="0"><tr><td bgcolor="#e5b1ae" style="border-radius:30px;text-align:center"><a href="mailto:contacto@divinapausa.cl" style="display:inline-block;padding:16px 24px;border:1px solid #e5b1ae;border-radius:30px;color:#242323;font-size:14px;font-weight:bold;text-decoration:none;mso-padding-alt:0"><!--[if mso]><i style="mso-font-width:150%;mso-text-raise:24pt" hidden>&emsp;</i><![endif]-->Agregar un detalle<!--[if mso]><i style="mso-font-width:150%" hidden>&emsp;&#8203;</i><![endif]--></a></td></tr></table>
<p style="margin:16px 0 28px;font-size:13px;line-height:1.6;color:#675c55">También puedes responder directamente a este correo.</p>
<p style="margin:0;font-size:15px;line-height:1.7">Un abrazo,<br><strong>El equipo de Divina Pausa</strong></p></td></tr>
<tr><td class="pad" style="padding:24px 40px;background:#242323;color:#d6cdc7;font-size:12px;line-height:1.8">
<p style="margin:0 0 8px;font-family:Georgia,'Times New Roman',serif;font-size:20px;color:#e5b1ae">Lo pequeño también hace la diferencia.</p>
<a href="https://divinapausa.cl" style="color:#f8f3ed;text-decoration:underline">divinapausa.cl</a> &nbsp;·&nbsp; Santiago, Chile
<p style="margin:14px 0 0;font-size:11px;color:#d6cdc7">Recibes este correo porque se envió una solicitud con esta dirección. Si no fuiste tú, responde para avisarnos.<br>Referencia: ${escapeHtml(quote.requestId)}</p></td></tr>
</table><!--[if mso]></td></tr></table><![endif]-->
</td></tr></table></body></html>`;
  return { subject, html, text };
}
