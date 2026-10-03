---
name: divinapausa-seo
description: Audita, mejora y mide el SEO técnico, local y de contenidos de Divina Pausa en Astro, incluidas páginas de catering en Santiago, Google Business Profile y visibilidad en experiencias de Google con IA. Úsala cuando se solicite posicionar, diagnosticar o mejorar el sitio para búsquedas orgánicas, locales, pagadas o con IA.
---

# SEO de Divina Pausa

## Flujo de trabajo

1. Lee `docs/seo/diagnostico-seo.md`, `src/data/servicesData.ts`, `src/data/proposalOptions.js`, `src/layouts/BaseLayout.astro`, `public/robots.txt` y `public/sitemap.xml` antes de proponer cambios.
2. Comprueba el estado real del repositorio y del sitio publicado. Distingue claramente lo confirmado en el código, lo observado públicamente y lo que requiere Search Console, Google Ads o Google Business Profile.
3. Para requisitos cambiantes, consulta fuentes oficiales actuales de Google Search Central, Google Business Profile y Google Ads. Prioriza documentación primaria.
4. Corrige primero indexabilidad, rastreo, canonicals, sitemap, títulos, descripciones, enlaces internos, contenido móvil y errores del formulario. Ejecuta `npm run build` y `git diff --check`.
5. Crea páginas por servicio solo si cada una responde una necesidad real con contenido propio útil. Evita páginas masivas por comuna o variaciones mínimas de palabras clave.
6. Registra hallazgos, cambios, datos pendientes y próximos pasos en `docs/seo/diagnostico-seo.md`.

## Hechos confirmados y límites

- Divina Pausa ofrece coffee break, brunch, almuerzo y barra móvil para eventos.
- Atiende las comunas de la Región Metropolitana de Santiago.
- El sitio está construido con Astro y TypeScript; revisa el código antes de asumir versiones o configuración.
- No inventes precios, ingredientes, capacidad máxima, certificaciones, plazos de respuesta, reseñas, clientes, direcciones abiertas al público ni resultados de campañas.
- No publiques una dirección comercial como ubicación visitable ni uses `LocalBusiness` con dirección sin confirmar que allí se atiende público. Para un negocio de área de servicio, revisa las reglas vigentes del Perfil de Empresa de Google.
- No afirmes posiciones exactas de Google basándote en una consulta manual o en `site:`. Las posiciones dependen de ubicación, dispositivo, momento y personalización; usa Search Console para datos del sitio.
- No garantices el primer lugar, una mención en respuestas de IA, una función enriquecida o indexación. Google indica que sus funciones de IA usan los fundamentos de Search y no ofrecen un método de pago para forzar una cita orgánica.
- Meta Pixel está preparado para activarse solo con `PUBLIC_META_PIXEL_ID` y tras aceptación explícita de medición opcional. `Lead` se envía solo después de una respuesta positiva del servidor y nunca con datos del formulario. No lo cargues antes del consentimiento ni dupliques una instalación de GTM/Vercel.
- Antes de agregar otra herramienta de medición, revisa la política y el consentimiento publicado. Verifica cualquier etiqueta agregada fuera del repositorio.
- No gastes presupuesto, crees campañas, publiques, hagas merge ni pushes sin instrucción explícita del usuario.

## Contenido y búsqueda con IA

- Escribe primero para quien organiza un evento corporativo: servicio, formato, cobertura, qué información enviar y cómo solicitar una propuesta.
- Usa español natural de Chile y nombres de servicio reales; evita repetir mecánicamente “catering Santiago” o crear texto solo para algoritmos.
- Prioriza evidencias propias: fotos reales con contexto, casos autorizados, detalles operativos confirmados, preguntas que ventas recibe y testimonios aprobados.
- Usa títulos y encabezados descriptivos, enlaces internos claros, metadatos únicos, HTML semántico, imágenes con texto alternativo útil y datos estructurados correctos cuando aporten contexto.
- No recomiendes `llms.txt`, “chunking”, menciones compradas o marcado especial como requisito para Google AI. Verifica la guía oficial de Google antes de cualquier consejo de “AEO/GEO”.

## SEO local

- Revisa cobertura, categoría, teléfono, web, horario, fotos y reseñas del Perfil de Empresa de Google; solicita datos o acceso, nunca credenciales.
- Para negocios de servicio, confirma si clientes visitan el domicilio antes de mostrar la dirección. Mantén el área de servicio acorde a la cobertura real.
- Recomienda pedir reseñas auténticas a clientes; nunca redactes reseñas falsas ni ofrezcas incentivos prohibidos.
- Analiza directorios y enlaces solo si son pertinentes y legítimos; evita compra de enlaces o listados masivos.

## Medición y anuncios

- Pide exportaciones de Search Console para consultas, páginas, impresiones, clics, CTR y posición promedio antes de cuantificar rendimiento.
- Mide como conversión una solicitud que llega correctamente al servidor y produce confirmación; un clic en el botón no basta.
- Separa resultados pagados de posicionamiento orgánico. Antes de pautar, confirma presupuesto, comunas, costo máximo aceptable por lead y acceso a Google Ads.
- Revisa las políticas actuales de ubicación e inventario de Google Ads. Nunca prometas aparecer dentro de una respuesta de IA por pagar.

## Entrega

Presenta: resumen ejecutivo; evidencias con severidad; cambios realizados; métricas que todavía faltan; tareas concretas para el usuario; plan priorizado de SEO local/orgánico y, si lo pide, una secuencia de campañas pagadas. Enlaza las fuentes oficiales consultadas y aclara qué no se pudo verificar.
