# PRD — Divina Pausa: presentación y captación de consultas

Versión 3 · 15 de septiembre de 2026 · Base de trabajo para revisión local.

## Decisiones del propietario

- Continuar sobre el rediseño local conservando los cambios existentes.
- Mantener Astro, TypeScript y GSAP.
- El propietario es el único desarrollador y aprueba las subidas a GitHub y la publicación.
- Trabajar en `codex/rediseno-captacion-leads`. `main` es producción.
- Prioridad: corregir errores visuales y de UX/UI.
- Oferta principal: coffee break, brunch y almuerzos. Conservar los demás servicios como oferta complementaria.
- La calculadora está en evaluación: conservar su componente y datos, sin renderizarla ni mostrar precios o enlaces de cálculo en las páginas públicas.
- Contacto por WhatsApp y correo. Retirar la integración de agenda externa.
- Los testimonios actuales no son oficiales: conservar el componente fuera de la vista pública hasta recibir opiniones verificadas. No inventar experiencias ni atribuciones.
- Decisión posterior: volver a mostrar temporalmente los testimonios existentes. Siguen pendientes de sustitución por testimonios reales aprobados.
- En móvil, mostrar “Cómo trabajamos” como carrusel horizontal manual, con swipe y controles; conservar el grid en escritorio.
- Reservar un slider continuo de logos inmediatamente después del hero y una galería de eventos después del proceso.
- Teléfonos, correo, servicios y cobertura actuales confirmados por el propietario.

## Arquitectura inicial propuesta

### Inicio `/`

Presentación de marca → logos de clientes → proceso → galería de eventos → servicios principales (coffee break, brunch, almuerzo) → oferta complementaria → testimonios → contacto → preguntas frecuentes y pie.

La captación se integra en Inicio: cada servicio dirige a WhatsApp con su nombre en el mensaje; el contacto ofrece WhatsApp, correo y teléfonos. No se necesita una página extra para completar este recorrido.

### Nosotros `/nosotros`

Presentación del equipo y su forma de trabajar, misión y visión, con acceso claro a servicios y cotización. La historia con fechas, fundadores e hitos requiere información del propietario; no se inventará.

### Posible etapa posterior

Evaluar una landing específica para campañas o páginas de cada servicio cuando existan objetivos, contenido propio y datos de búsqueda. No duplicar Inicio para aparentar mayor cobertura SEO.

## Requisitos funcionales y de calidad

1. Todos los enlaces de servicios funcionan desde ambas páginas.
2. El contacto funciona mediante enlaces nativos, incluso sin JavaScript.
3. El menú móvil tiene estado accesible, cierre con Escape y enlaces fuera del foco cuando está cerrado.
4. Las preguntas frecuentes funcionan con teclado y sin JavaScript.
5. GSAP se mantiene para entradas visuales; se respeta movimiento reducido.
6. No se publican precios en evaluación ni agenda externa. Los testimonios visibles en la rama de rediseño deben reemplazarse por testimonios verificados antes de fusionar a producción.
7. El componente de calculadora conserva su lógica; la fila de descuento se oculta cuando no corresponde.
8. `astro check` y `astro build` deben finalizar sin errores.
9. Títulos y descripciones específicos para Inicio y Nosotros; un contenido principal por página.
10. Sitemap, robots y enlaces canónicos coherentes con las rutas públicas.
11. Redirigir `/servicios` a la sección correspondiente de Inicio al desplegar en Vercel.
12. Revisar escritorio, tablet y móvil antes de publicar; documentar límites de la validación.

## Medición pendiente

No hay herramienta de analítica confirmada. Los atributos `data-cta` identifican contactos para una integración posterior, pero no registran eventos por sí mismos.

Métricas propuestas: clics de cotización por servicio, consultas recibidas, consultas calificadas y solicitudes que terminan en contratación. Un clic de WhatsApp no equivale a un mensaje enviado ni a una venta.

## SEO: primera etapa y siguientes pasos

- Implementación local: títulos descriptivos, enlaces rastreables, texto de servicios legible, datos estructurados de organización sin reseñas ni calificaciones inventadas, sitemap y robots.
- Pendiente: verificar Search Console, indexación real, consultas de búsqueda, rendimiento móvil e imágenes. No se promete una posición en Google.
- Referencias: https://developers.google.com/search/docs/fundamentals/seo-starter-guide y https://developers.google.com/search/docs/crawling-indexing/links-crawlable

## Pendientes del propietario

- Enlace del proyecto en Vercel para verificar configuración y despliegue de prueba.
- Historia de Divina Pausa: origen, fundadores e hitos que quieran contar.
- Testimonios reales aprobados para editar su redacción sin cambiar el sentido.
- Revisión del resultado local antes de autorizar subida a GitHub.
