> Actualización de octubre de 2026: el formulario de tres pasos usa el esquema v2. Seguir primero [FORMULARIO-PROPUESTAS.md](./FORMULARIO-PROPUESTAS.md) para actualizar Apps Script y configurar Resend.

# Activar las cotizaciones

Hoja creada: [cotizaciones divinapausa](https://docs.google.com/spreadsheets/d/1D78jwI4qbREWRIwJ1g2GEM-mIr2BXEmMs_4HOuaXIj4/edit).
La pestaña `Cotizaciones` está vacía y lista para recibir solicitudes. Mantener las columnas A:H: ID solicitud, Fecha (UTC), Nombre, Correo electrónico, Teléfono, Servicios, Personas y Horas de servicio. Usar la versión actual de `Code.gs`, que también guarda la duración.

## Autorización en Google (propietario de la cuenta)

1. Abre la hoja y entra en **Extensiones → Apps Script**.
2. Copia el contenido de `integrations/google-sheets/Code.gs` en el editor y guarda.
3. En **Configuración del proyecto → Propiedades del script**, añade:
   - `SPREADSHEET_ID`: `1D78jwI4qbREWRIwJ1g2GEM-mIr2BXEmMs_4HOuaXIj4`.
   - `QUOTES_SCRIPT_TOKEN`: un secreto aleatorio largo generado con tu gestor de contraseñas. No lo compartas en el chat ni lo subas a Git.
4. **Implementar → Nueva implementación → Aplicación web**. Ejecutar como tu cuenta; acceso: **Cualquier persona**. Autoriza el acceso a la hoja. El receptor verifica el secreto antes de guardar; la hoja no necesita hacerse pública.
5. Copia la URL de la implementación que termina en `/exec`.

Google exige que el propietario autorice los permisos del receptor: [documentación de aplicaciones web](https://developers.google.com/apps-script/guides/web).

## Entorno local

Copia `.env.example` a `.env.local` y completa `QUOTES_SCRIPT_URL` con la URL anterior y `QUOTES_SCRIPT_TOKEN` con el mismo secreto. Para probar el formulario usa `npm run dev -- --host 127.0.0.1 --port 4326` y abre http://127.0.0.1:4326/#calculadora. Reinicia ese servidor después de configurar las variables. `astro preview` solo sirve los archivos estáticos en esta versión de Astro y no carga nuestra API; devuelve 404 al enviar el formulario. Son variables exclusivas del servidor; no uses el prefijo `PUBLIC_`.

## Vercel (cuando se apruebe publicar)

Configura esas dos variables en el entorno correspondiente del proyecto de Vercel y despliega la rama aprobada. La función `api/cotizaciones.js` envía las solicitudes a Google; el navegador nunca recibe el secreto.

## Comprobación final pendiente

### Límite por sesión

Se permiten 3 cotizaciones nuevas por sesión en una ventana móvil de 15 minutos. El servidor asigna una cookie de sesión firmada, HttpOnly y SameSite=Strict (Secure en HTTPS). Google comprueba el límite bajo un bloqueo usando la columna I, `Sesión`, que el script crea automáticamente. Los reintentos de una cotización guardada no consumen cupo. El formulario conserva los datos y muestra el tiempo de espera si recibe HTTP 429.

Para activar esta versión, reemplaza el código en Apps Script con el `Code.gs` actualizado y ve a Implementar → Gestionar implementaciones → Editar → Nueva versión → Implementar, conservando la URL. Este límite no sustituye Turnstile: borrar las cookies o abrir otra sesión permite empezar de nuevo. La verificación de Turnstile todavía no está integrada.

Envía una solicitud de prueba identificada como tal y verifica que aparece una sola fila con servicios, personas y contacto. La confirmación y el confeti deben aparecer únicamente tras confirmar Google el guardado. Un reintento del mismo envío conserva su identificador para evitar duplicados. No se ha realizado una prueba real de guardado: falta configurar y autorizar la aplicación web.
