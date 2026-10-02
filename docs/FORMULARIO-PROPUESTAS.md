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
PUBLIC_TURNSTILE_SITE_KEY=clave_publica_del_widget
TURNSTILE_SECRET_KEY=clave_privada_del_widget
```

Verifica `divinapausa.cl` en Resend y configura estos valores en Production y, cuando corresponda, Preview. Nunca uses el prefijo `PUBLIC_` para secretos ni subas claves al repositorio. `PUBLIC_TURNSTILE_SITE_KEY` es pública y se incluye en la página; `TURNSTILE_SECRET_KEY` debe permanecer privada en Vercel. En Cloudflare, registra los hostnames permitidos para el widget (`divinapausa.cl`, `www.divinapausa.cl` y los hostnames de prueba que realmente uses). Las previews no reciben solicitudes salvo que `QUOTES_ALLOW_PREVIEW_SEND=true` esté habilitada expresamente. Después de cambiar variables de entorno, vuelve a desplegar.

## Protección y límites

El endpoint exige el mismo host en `Origin` y `Host`, valida campos y tamaño, comprueba la casilla de autorización, rechaza el campo honeypot rellenado y verifica en servidor el token de Turnstile, su acción (`quote_submit`) y el hostname. Si falta la clave o Cloudflare no confirma el token, el envío falla cerrado y no se llama a Resend. Las validaciones de origen ayudan contra solicitudes web cruzadas; el honeypot filtra bots básicos. Turnstile añade una verificación anti-bot, pero no reemplaza un límite de frecuencia. Configura además una regla de Cloudflare Rate Limiting para `POST /api/cotizaciones` y ajústala con pruebas reales. No hay hoy un límite persistente por sesión.

Para desarrollo local y Preview puedes usar las claves de prueba oficiales de Turnstile. En estos entornos se acepta su respuesta simulada (`action: test`, `hostname: localhost`); en Production solo se acepta `action: quote_submit` con el hostname real de la petición. Prueba envío aceptado, rechazo del token, servicio de verificación inaccesible y ausencia de variables. Comprueba que solo el envío validado produce correos en Resend. No uses datos personales reales en Preview.

## Privacidad operativa pendiente

Confirmar quiénes acceden al buzón, definir cuánto tiempo se mantienen las solicitudes y atender borrado/rectificación también en correo y Resend. No incluir publicidad sin un propósito y autorización independientes. Mantener seguimiento de apertura/clic desactivado si no se informó a las personas. El borrador de política describe el flujo pero sigue pendiente de las confirmaciones operativas.
