# Política de privacidad de Divina Pausa — borrador

Fecha de preparación: 17 de septiembre de 2026.
Estado: documento interno. No publicado. Los campos [PENDIENTE] deben completarse antes de utilizarlo en el sitio.

## Responsable

El responsable del tratamiento es Productos DivinaPausa SPA, representado legalmente por Maureen Andrea Fuentes Hou, con domicilio comercial en Av. Blanco Encalada 1991, comuna de Santiago (Santiago Centro), ciudad de Santiago, Región Metropolitana, Chile.

Contacto para consultas y solicitudes sobre datos personales: [PENDIENTE: confirmar contacto@divinapausa.cl y persona que atenderá las solicitudes].

## Cotizaciones

El formulario solicita nombre y correo electrónico, y permite agregar un teléfono opcional. También recoge el servicio elegido, cantidad de personas y horas de servicio. Al enviar una solicitud se registran su fecha, un identificador de solicitud y un identificador de sesión utilizado para limitar envíos repetidos.

Utilizamos esta información para preparar y responder la cotización y prevenir envíos abusivos. El teléfono es opcional y omitirlo no impide solicitar una cotización. El formulario no solicita datos de salud ni información de asistentes individuales.

[PENDIENTE DE IMPLEMENTACIÓN: autorización expresa del tratamiento para esta finalidad, con enlace a esta política y registro verificable de su aceptación. No afirmar que ya se obtiene.]

No se solicitará autorización publicitaria como condición para cotizar. [PENDIENTE: confirmar los usos reales de los contactos fuera de la web.]

## Almacenamiento y proveedores

Las solicitudes se envían al servidor de la web y después a Google Apps Script para almacenarse en Google Sheets. El alojamiento previsto es Vercel.

[PENDIENTE: identificar cuenta y modalidad de Google, personas autorizadas, condiciones de tratamiento de Google y Vercel, ubicaciones y garantías aplicables a transferencias internacionales. No asegurar almacenamiento exclusivo en Chile.]

[PENDIENTE: verificar servicios activos en producción y Cloudflare antes de cerrar esta sección.]

## Conservación

[PROPUESTA POR CONFIRMAR: conservar cotizaciones no contratadas durante 12 meses desde el último contacto y después eliminarlas o anonimizarlas. Este plazo es una propuesta operativa, no un plazo legal.]

Los antecedentes de servicios contratados necesitan un plazo separado según sus finalidades y obligaciones aplicables. [PENDIENTE: definirlo con el responsable.]

La eliminación debe abarcar las copias operativas y contemplar las condiciones de respaldos y recuperación de los proveedores. No existe actualmente una eliminación automática implementada.

## Derechos y contacto

Puedes solicitar información sobre tus datos, su corrección, eliminación o bloqueo cuando corresponda, y revocar tu autorización, a través del contacto indicado arriba. La revocación no tiene efecto retroactivo. Las solicitudes son gratuitas; podremos requerir una verificación de identidad proporcional.

[PENDIENTE: asignar responsable, documentar la atención y adaptar esta sección al régimen aplicable desde el 1 de diciembre de 2026, incluyendo los derechos y canales de reclamación de la reforma.]

## Cookies y recursos externos

El código utiliza `dp_quote_session`, una cookie de sesión propia para limitar solicitudes repetidas. Contiene un identificador aleatorio firmado; no contiene el nombre, correo ni teléfono. Su identificador queda relacionado con las cotizaciones almacenadas, por lo que no debe describirse como anónimo. No tiene fecha de caducidad persistente configurada; el navegador gestiona su duración y puede restaurar sesiones.

En el código revisado no se encontraron herramientas de analítica ni píxeles publicitarios. Se cargan fuentes desde Google Fonts. Esto no equivale a afirmar que la infraestructura de producción no use otras cookies o registros.

[PENDIENTE: inventario efectivo de producción y evaluación de base jurídica de cada tratamiento, incluida la prevención de abuso. Si se incorporan tecnologías que requieran consentimiento, deberán permanecer bloqueadas hasta obtenerlo.]

## Notas de implementación — no publicar como política

- Crear la página y sus enlaces cuando estén completos los datos del responsable y el texto.
- Añadir una casilla sin marcar en el paso de contacto: «Autorizo el uso de mis datos para gestionar y responder esta cotización, según la Política de Privacidad».
- Validar la aceptación en navegador, API y Apps Script; no basta con una casilla visual.
- Añadir columnas después de A:I, conservando las existentes: aceptación, fecha del servidor y versión de la política/texto. Guardar cada versión del texto para poder demostrar qué se aceptó.
- No marcar retrospectivamente como consentidas las cotizaciones existentes.
- Actualizar Apps Script y verificar persistencia antes de activar la nueva versión del formulario. Mantener reintentos sin duplicados y probar rechazo sin consentimiento.
- Confirmar acceso restringido a Sheets, autenticación en dos pasos y procedimiento de atención y eliminación. No afirmar medidas que no estén verificadas.
- La reforma contempla otras bases de licitud, incluidas medidas precontractuales solicitadas por el titular. Revisar la base elegida al entrar en vigor; el consentimiento no es la única alternativa bajo ese régimen.

## Fuentes normativas

- [Ley 19.628 vigente: consentimiento, finalidad, conservación y derechos](https://www.bcn.cl/leychile/navegar?i=141599).
- [Ley 21.719: reforma aplicable desde el 1 de diciembre de 2026; transparencia y transferencias internacionales](https://www.bcn.cl/leychile/navegar?i=1209272).

Este borrador necesita completar los hechos del negocio y validar jurídicamente la versión final; no acredita por sí solo cumplimiento.
