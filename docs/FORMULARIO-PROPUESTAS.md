# Formulario y correo de propuestas

El formulario recoge nombre, empresa, correo, teléfono opcional, servicio, fecha, personas, comuna y detalles opcionales. Una casilla obligatoria registra la versión de privacidad aceptada dentro del aviso que llega al equipo. No se escribe una copia en Sheets ni en otra base de datos del sitio.

## Flujo con Resend

Al enviar, el servidor valida el formulario y pide a Resend que mande:

- El detalle de la propuesta a `QUOTES_EMAIL_TO`, con Reply-To del solicitante.
- Una confirmación breve al email del solicitante, con el resumen del evento.

El equipo usa el buzón comercial como registro de las solicitudes. Resend también procesa los dos correos y conserva logs según las condiciones de la cuenta. No hay eliminación automática ni plazo de conservación definido. La solicitud no se puede recuperar desde una hoja: si falla el envío a Resend, la web informa que no se confirmó y permite reintentar con la misma clave de idempotencia.

## Variables del servidor en Vercel

```dotenv
QUOTES_EMAIL_ENABLED=true
RESEND_API_KEY=clave_privada
QUOTES_EMAIL_FROM="Divina Pausa <contacto@divinapausa.cl>"
QUOTES_EMAIL_TO=contacto@divinapausa.cl
```

Verifica `divinapausa.cl` en Resend y configura estos valores en Production y, cuando corresponda, Preview. Nunca usar `PUBLIC_` ni subir la API key al repositorio. Las previews no reciben solicitudes salvo que `QUOTES_ALLOW_PREVIEW_SEND=true` esté habilitada expresamente.

## Protección y límites

Se validan el origen de la petición, campos, tamaño, casilla de autorización y un campo honeypot. Al quitar el almacenamiento de Apps Script se quitó el contador persistente por sesión. El honeypot/origen no detienen bots sofisticados; configura reglas de Cloudflare para el endpoint y activa Turnstile con verificación de servidor antes de abrir las solicitudes al público. No se debe afirmar que hoy existe un límite por sesión.

## Privacidad operativa pendiente

Confirmar quiénes acceden al buzón, definir cuánto tiempo se mantienen las solicitudes y atender borrado/rectificación también en correo y Resend. No incluir publicidad sin un propósito y autorización independientes. Mantener seguimiento de apertura/clic desactivado si no se informó a las personas. El borrador de política describe el flujo pero sigue pendiente de las confirmaciones operativas.
