# Formulario de propuestas y Resend

## Estado

Formulario de tres pasos, sin fotos y sin cálculo de precios. Incluye las 52 comunas de la Región Metropolitana confirmadas por el negocio, además de «Otra / por definir». Presupuesto pospuesto. Asistentes: entero entre 1 y 10.000 (límite técnico, no compromiso de capacidad). Sin plazo de respuesta prometido.

## Antes de publicar

1. Copiar el contenido completo de `integrations/google-sheets/Code.gs` al proyecto Apps Script existente. Conservar las propiedades SPREADSHEET_ID y QUOTES_SCRIPT_TOKEN.
2. Apps Script → Implementar → Gestionar implementaciones → editar la aplicación web existente → Nueva versión → Implementar. Mantener la URL actual. Guardar el archivo por sí solo no actualiza la aplicación web.
3. El script actualizado exige autorización de privacidad y rechaza formularios antiguos que no la incluyan. Coordinar su implementación con el despliegue del formulario nuevo. La API nueva requiere confirmación de esquema versión 2 para evitar dar por guardados campos que el script anterior descartaría.
4. No borrar ni reordenar columnas existentes. A–I se conservan; H (horas) queda vacía para solicitudes nuevas. Se agregan J Empresa, K Fecha estimada, L Sin fecha, M Comuna, N Horario, O Detalles, P Versión. Los encabezados se crean al guardar. Los reintentos con el mismo ID no duplican filas.
5. Completar las confirmaciones operativas de privacidad antes de publicar. La autorización se valida en navegador, API y Apps Script y se guarda en Q (aceptación), R (fecha de servidor) y S (versión). La API exige que Apps Script confirme la versión de privacidad; no publicar hasta actualizarlo. El texto está en src/data/privacyConsent.js. La eliminación periódica sigue siendo una tarea operativa pendiente.

## Activar correo interno con Resend

El destinatario y remitente previsto son contacto@divinapausa.cl. La respuesta al correo se dirige al email del solicitante mediante Reply-To. También se envía una confirmación automática al solicitante, con resumen del evento, versión HTML y texto plano. Su Reply-To es contacto@divinapausa.cl. No promete plazo de respuesta ni confirma una reserva. La plantilla está en src/server/proposalEmail.js y la muestra con datos ficticios en previews/confirmacion-propuesta.html.

1. Añadir y verificar divinapausa.cl en Resend → Domains, colocando exactamente los registros DNS que indique Resend. No reemplazar registros MX del correo existente por otros sin revisar su finalidad.
2. Crear una API key con permiso de envío para ese dominio.
3. Configurar estas variables exclusivamente del servidor, en `.env.local` para desarrollo y en Vercel → Project → Settings → Environment Variables para producción:

```dotenv
QUOTES_EMAIL_ENABLED=true
RESEND_API_KEY=clave_privada
QUOTES_EMAIL_FROM="Divina Pausa <contacto@divinapausa.cl>"
QUOTES_EMAIL_TO=contacto@divinapausa.cl
```

No usar el prefijo PUBLIC_, subir claves a Git ni pegarlas en el chat. Reiniciar Astro tras cambios locales y hacer un nuevo deploy para cambios en Vercel. `.env.example` mantiene el envío desactivado por defecto.

4. Hacer una solicitud de prueba autorizada y verificar la fila en Sheets y la entrega en Resend. Las pruebas automatizadas del repositorio simulan los proveedores, no prueban credenciales reales. Las previews de Vercel rechazan envíos salvo que QUOTES_ALLOW_PREVIEW_SEND=true esté configurado en Preview al construir y ejecutar. Para una prueba controlada, activar esta variable y las variables de Google/Resend también en Preview, hacer un nuevo despliegue, usar datos ficticios y un correo propio, y mantener Deployment Protection. Eliminar la excepción al terminar.

## Comportamiento ante errores

Primero se confirma Sheets y después se intenta el aviso por Resend. Un fallo de correo no borra la solicitud ni presenta un error de guardado al cliente. Se registra email_team_delivery_failed, email_confirmation_delivery_failed o email_not_configured sin datos personales. La confirmación de Resend significa aceptación de envío, no entrega al buzón: consultar el panel de Resend para rebotes.

Se usa una clave de idempotencia basada en el ID de solicitud y no se reenvía si Sheets indica duplicado. No hay cola de reintentos de correo: si falla, el equipo debe revisar Sheets y gestionar la propuesta desde allí. La hoja sigue siendo el registro principal.

## Privacidad pendiente

El flujo recoge nombre, empresa, email, teléfono opcional, servicio, fecha o ausencia de fecha, asistentes, comuna, horario y detalles opcionales. Google almacena la solicitud. Al activar Resend, esos datos también pasan por Resend y llegan al buzón comercial. Incluir esos proveedores, finalidades y copias de correo en la revisión de privacidad y conservación; no activar publicidad por este consentimiento.

Documentación oficial: [Enviar correo con Resend](https://resend.com/docs/api-reference/emails/send-email), [idempotencia](https://resend.com/docs/dashboard/emails/idempotency-keys), [comunas de la Región Metropolitana](https://www.gobiernosantiago.cl/nuestra-region/).

## Revisión previa del 2 de octubre

Logo original rasterizado a PNG en public/images/logos/divina-pausa-email.png para clientes de correo; debe desplegarse antes de enviar correos. La confirmación automática no reproduce nombre, empresa ni detalles libres, para reducir exposición ante errores en el email. El resumen básico sigue enviándose al correo indicado, que no se verifica mediante enlace.

No se detectaron coincidencias de secretos locales en los archivos versionados ni en dist en la revisión. Esto no acredita ausencia absoluta de filtraciones ni verifica permisos de proveedores. Las cabeceras de protección se aplican al desplegar vercel.json. Verificar ajustes de tracking en Resend antes de activar, y mantener desactivado el seguimiento de aperturas y clics si no se ha informado y justificado. El limitador de sesión no sustituye una protección antibot: se puede evadir cambiando de sesión.
