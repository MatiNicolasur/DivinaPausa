# Entorno de trabajo y revisión

## Acuerdo de trabajo

Rama local: `codex/rediseno-captacion-leads`. Se conservó el trabajo previo, incluidos archivos nuevos y eliminaciones que ya estaban preparados en Git. El propietario trabaja solo y aprueba la subida a GitHub y el paso a producción. No se ha ejecutado push ni merge.

## Ejecutar el proyecto

- Instalar dependencias del lockfile: `npm ci`.
- Desarrollo: `npm run dev`.
- Revisar tipos: `npm run astro -- check`.
- Compilar: `npm run build`.
- Revisar compilación: `npm run preview -- --host 127.0.0.1 --port 4325`.

El entorno observado usa Node 25.9.0 y npm 11.12.1. Falta verificar y acordar la versión de Node del proyecto en Vercel antes de fijarla en el repositorio.

## Implementación actual

- Inicio presenta y capta consultas; Nosotros conserva su ruta.
- Calculadora fuera de ambas páginas, componente conservado. Testimonios visibles nuevamente por decisión posterior, pendientes de contenido oficial.
- Carrusel manual del proceso en móvil, galería de eventos y slider automático de logos preparados.
- CTA de servicios y contacto a WhatsApp; correo y teléfonos son enlaces nativos.
- Agenda externa retirada del código y documentación vigente.
- Menú móvil con botón de cotización visible, cierre con Escape y estado expandido.
- Preguntas frecuentes con `details`/`summary`, sin dependencia de JavaScript.
- Enlace Servicios válido desde Nosotros.
- Fila de descuento de calculadora corregida para respetar `hidden`.
- Corrección de tipos en la retirada de eventos del carrusel conservado.
- Títulos y descripción de páginas, organización en JSON-LD, sitemap, robots y redirecciones preparadas para Vercel.

## Límites y pendientes

- La redirección de `vercel.json` debe comprobarse en un despliegue de prueba; Astro preview no ejecuta esa configuración.
- No se enviaron mensajes, correos ni se hicieron llamadas de prueba.
- No hay medición de conversiones configurada; `data-cta` únicamente identifica enlaces para una futura integración.
- Las pruebas de tamaños se hacen en navegador de escritorio: no sustituyen una revisión en teléfonos físicos.
- Quedan pendientes optimización exhaustiva de imágenes, medición de rendimiento y datos de Search Console.
- La historia y testimonios deben basarse en información real que entregue el propietario.

Consultar `PRD-servicios.md` para alcance y arquitectura propuestos.

## Verificación realizada el 15 de septiembre de 2026

- `npm run build`: correcto; genera Inicio y Nosotros.
- `npm run astro -- check`: 0 errores, 0 advertencias y 0 sugerencias.
- `git diff --check`: correcto.
- HTML generado: un H1 y un main por página, IDs únicos y todos los enlaces internos resuelven su página y ancla.
- Navegador: menú móvil abre/cierra y responde a Escape; Servicios desde Nosotros conduce a Inicio; preguntas frecuentes responden a Enter.
- Inicio sin desbordamiento horizontal medido a 320, 390 y 768 px; Nosotros a 1280 px. Revisión visual del hero móvil, servicios en escritorio y contacto móvil.
- No se observaron errores de consola en el recorrido comprobado de Inicio. Sin imágenes rotas observadas en las páginas inspeccionadas.
