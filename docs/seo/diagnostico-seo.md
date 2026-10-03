# Diagnóstico SEO de Divina Pausa

**Revisión:** 3 de octubre de 2026
**Alcance:** código del sitio Astro, rutas públicas, metadatos, datos estructurados, `robots.txt`, `sitemap.xml` y una revisión puntual de resultados públicos. No se accedió a Google Search Console, Google Business Profile ni Google Ads.

**Actualización posterior:** se añadió la integración de Meta Pixel tras esta auditoría. Solo se carga cuando `PUBLIC_META_PIXEL_ID` está configurada y la persona acepta la medición opcional; `Lead` se dispara después de la confirmación del backend y no incluye datos del formulario. Aún falta configurar la variable del hosting y validar el evento en Meta Events Manager.

## Resumen

La página de inicio ya puede aparecer en Google: `site:divinapausa.cl` mostró el resultado de inicio y un título orientado a catering en Santiago durante la revisión. Eso no demuestra una posición estable para búsquedas como “catering Santiago” ni permite conocer impresiones o conversiones. En la consulta pública de esas frases, los resultados visibles estaban dominados por otros proveedores; las páginas de resultados pueden variar por ubicación, momento y usuario.

La brecha principal era la estructura: los cuatro servicios —coffee break, brunch, almuerzo y barra móvil— se explicaban dentro de la portada, sin páginas indexables dedicadas. El sitemap tenía solo inicio y Nosotros. El código permite rastreo general y comparte metadatos/canonical, pero no se dispone de datos para evaluar posiciones reales, velocidad/Core Web Vitals, perfil local o calidad del tráfico.

Se prepararon cuatro páginas individuales de servicio, se enlazaron desde las tarjetas de inicio, se amplió el sitemap y se reforzó la entidad de la organización y su cobertura regional en JSON-LD. Estos cambios quedan en la rama local actual; todavía requieren build y publicación para que Google pueda rastrearlos.

### Diferencia entre lo publicado y la rama local

La página pública que se pudo revisar todavía muestra el título anterior (“Catering en Santiago: coffee break, brunch y almuerzos”) y solo tres tarjetas de servicio; tampoco menciona barra móvil en su texto de servicios. La rama local ya incluye el nuevo título, cuatro servicios y sus páginas individuales. Esto sugiere que las mejoras de esta revisión aún no están en producción. La búsqueda pública también mostró el inicio de Divina Pausa para `site:divinapausa.cl`, pero no dentro del grupo de resultados visibles para consultas amplias de catering en Santiago. Esa observación sirve como señal, no como un ranking exacto de Google: hace falta Search Console para medir.

## Hallazgos y prioridad

| Prioridad | Hallazgo | Evidencia | Recomendación |
|---|---|---|---|
| Alta | Faltaban páginas específicas para cada servicio. | Antes, Inicio concentraba el catálogo; las rutas nuevas se generan desde `src/data/serviceLandingPages.ts`. | Revisar cada texto con el equipo comercial y añadir detalles propios confirmados, fotos reales y ejemplos antes de publicarlas. |
| Alta | No hay medición de consultas ni de leads atribuibles a Google. | No se encontraron referencias de Google Analytics, Google Tag Manager ni Google Ads tag. Meta Pixel se integró detrás de consentimiento, pero falta configurar su variable pública y verificarlo. | Verificar la propiedad en Search Console; exportar consultas/páginas. Configurar conversiones de Google Ads antes de invertir. La ausencia en el repositorio no descarta scripts añadidos desde Vercel u otro sistema. |
| Alta | Estado del Perfil de Empresa desconocido. | No se revisó una ficha de Google Business Profile ni se contó con acceso o enlace confirmado. | Confirmar que existe, reclamar/verificarla y completar categoría, servicios, teléfono, web, área de servicio, horarios y fotos auténticas. |
| Media | El sitemap anterior solo enumeraba Inicio y Nosotros. | `public/sitemap.xml`; ahora enumera siete URL públicas, incluidos los cuatro servicios y privacidad. Las rutas del sitemap se alinearon con los canonicals con barra final que genera Astro. | Publicar los cambios, enviar `https://divinapausa.cl/sitemap.xml` en Search Console e inspeccionar las cinco rutas nuevas. |
| Media | La marca estaba descrita como Organization, sin cobertura de servicio clara. | JSON-LD común en `src/layouts/BaseLayout.astro`. | Se añadió `areaServed` para Región Metropolitana, entidad legal, contacto y WebSite. La dirección comercial se omitió del marcado porque falta confirmar si recibe público. |
| Media | La propuesta local y la cobertura regional necesitaban más contexto visible. | Inicio mostraba los servicios sin explicar de forma explícita la cobertura total de la Región Metropolitana. | La portada y páginas de servicio declaran cobertura regional; mantener esa afirmación solo mientras refleje la operación real. |
| Pendiente | Rendimiento técnico, Core Web Vitals, estado de indexación de cada URL, enlaces y autoridad local. | No se ejecutó Lighthouse/PageSpeed ni se usaron datos de Search Console, enlaces o ficha local. | Medir con Search Console y PageSpeed Insights tras desplegar; no inferir cifras por inspección del código. |

## Mejoras preparadas en esta revisión

- Inicio: título más directo, “Catering para empresas en Santiago”, y descripción que cubre Región Metropolitana y los cuatro servicios.
- Cuatro páginas prerenderizadas: `/servicios/coffee-break-empresas`, `/servicios/brunch-empresarial`, `/servicios/almuerzos-corporativos` y `/servicios/barra-movil-eventos`.
- Las tarjetas de servicio enlazan a su página informativa; los CTA llevan al cotizador con el servicio correspondiente preseleccionado.
- Sitemap actualizado con Inicio, Nosotros, privacidad y las cuatro páginas de servicio.
- JSON-LD común con Organization, WebSite, correo/teléfono públicos y área atendida en Región Metropolitana. No se agregó domicilio como local visitable.

Las páginas nuevas usan datos actuales del proyecto y evitan publicar precios, reseñas, plazos o certificaciones no confirmados. Antes de indexarlas, conviene que Maureen o la persona responsable de ventas revise que cada texto describe fielmente el servicio. La estructura sola no garantiza mejor ranking; la calidad diferencial vendrá de información propia, fotos auténticas y evidencia de experiencia.

Nota: la página pública también muestra preguntas frecuentes con afirmaciones sobre equipamiento, personal y restricciones alimentarias. Conviene confirmar que esas condiciones sigan siendo ciertas y estén disponibles en todos los formatos antes de usarlas como promesa comercial; Google y los potenciales clientes necesitan información coherente y confiable.

## Qué falta para cerrar el diagnóstico con datos reales

1. Acceso de propietario a Search Console (no compartir contraseña): confirmar dominio, mandar sitemap y exportar los últimos 3–6 meses de consultas y páginas. Incluir consultas como “catering Santiago”, “catering para empresas Santiago”, “coffee break empresas Santiago”, “brunch corporativo Santiago”, “almuerzos corporativos Santiago” y “barra móvil eventos Santiago”.
2. Enlace o estado de la ficha de Google Business Profile; confirmar categoría primaria y si la empresa recibe clientes en Av. Blanco Encalada 1991. Si no los recibe, tratarla como negocio de área de servicio y no mostrar el domicilio al público.
3. Confirmar fotos propias autorizadas por servicio, permisos para mostrar marcas/clientes y testimonios reales aprobados.
4. Ejecutar Lighthouse/PageSpeed Insights en móvil para portada, Nosotros, cotizador y páginas nuevas; revisar Core Web Vitals de Search Console cuando haya datos de campo.
5. Antes de activar el Pixel, comprobar que la política y el aviso de consentimiento publicado reflejan el uso real; confirmar el alcance de la señal enviada y que no exista otra instalación desde GTM, Vercel u otra integración.

## Plan de optimización orgánica y local

### Primeros 7 días después de publicar

- Verificar en navegador que cada URL nueva responde con 200, muestra un único H1, título/description únicos, canonical propio, imagen y CTA funcional.
- Añadir/actualizar el sitemap en Search Console; solicitar indexación de las cuatro páginas. La solicitud no garantiza inclusión.
- Revisar Rich Results Test o Schema Markup Validator para el JSON-LD. El marcado ayuda a describir la entidad, pero no garantiza ranking o resultado enriquecido.
- Validar el sitio móvil y revisar los datos de rendimiento con PageSpeed Insights y Search Console.

### Primer mes

- Completar Perfil de Empresa: nombre comercial coherente, categoría que represente el servicio principal, web, teléfono, horarios y comunas atendidas. Añadir domicilio público solo si allí se atiende a clientes; de lo contrario, configurar área de servicio y ocultarlo.
- Subir fotos propias recientes y autorizadas: montajes, platos, coffee breaks, brunch, almuerzos y barra móvil. Usar nombres de archivo descriptivos y alt text factual, sin repetir palabras clave artificialmente.
- Solicitar reseñas honestas a clientes reales tras un evento; responder de forma humana y constante. No comprar reseñas ni ofrecer incentivos.
- Mejorar páginas con preguntas que el equipo realmente recibe, ejemplos/casos autorizados, alcance de servicio y proceso de coordinación. Cada adición debe ayudar al comprador, no solo repetir “Santiago”.
- Conseguir menciones/enlaces pertinentes desde clientes con permiso, asociaciones/eventos y directorios empresariales confiables; evitar paquetes de enlaces.

### Cada mes

- En Search Console revisar por página y consulta: impresiones, clics, CTR, posición promedio, páginas excluidas e indexación. Comparar períodos equivalentes y segmentos móviles.
- Revisar qué consultas convierten en solicitudes válidas y mejorar esas páginas; no optimizar solo por volumen.
- Si Search Console ofrece el reporte de rendimiento generativo para la propiedad, usarlo para observar impresiones/clics desde funciones de IA. No hay promesa de inclusión o primer lugar.

## Plan pagado: Google Ads Search

Publicidad compra participación en subastas de anuncios; no compra una cita orgánica en resultados o respuestas de IA. Google indica que no se puede solicitar ni pagar una mejor posición local orgánica.

1. **Preparar medición y privacidad.** Antes de activar etiquetas, revisar la política y el consentimiento aplicable. En Google Ads configurar una conversión que se dispare únicamente cuando la solicitud se haya enviado y el servidor la confirme; probarla de extremo a extremo. Un clic en “Solicitar propuesta” no equivale a un lead recibido.
2. **Definir economía antes del gasto.** Elegir presupuesto mensual aprobado, valor promedio/margen de evento y costo máximo aceptable por lead calificado. Usar Keyword Planner para revisar volúmenes y CPC actuales; no fijar presupuesto sin esos números.
3. **Crear una campaña de Búsqueda con objetivo Leads.** Limitar a la Región Metropolitana y seleccionar la opción de ubicación adecuada. Si solo quieren clientes que se encuentren dentro del área atendida, evaluar segmentación por presencia física, no solo interés.
4. **Separar grupos por intención.** Por ejemplo: catering corporativo; coffee break para empresas; brunch corporativo; almuerzos corporativos; barra móvil para eventos. Comenzar con concordancia exacta y de frase; ampliar términos solo tras revisar calidad.
5. **Enviar cada grupo a su página específica.** Crear anuncios responsivos con servicio, Santiago/Región Metropolitana y un llamado claro a solicitar propuesta. Usar enlaces de sitio a servicios y cotizador; solo incluir afirmaciones que el negocio pueda cumplir.
6. **Añadir negativas y control.** Revisar términos de búsqueda semanalmente al inicio; excluir consultas irrelevantes como empleo, curso, receta o insumos, según lo que aparezca realmente. No bloquear consultas que sí conviertan.
7. **Optimizar por ventas, no clics.** Cada 2–4 semanas revisar costo por solicitud válida, comuna, tipo de servicio y calidad comercial. Pausar grupos que consuman presupuesto sin leads útiles y mover presupuesto a las combinaciones que sí funcionan.

Las campañas de Google Ads pueden ser elegibles para mostrarse encima o debajo de AI Overviews donde esas experiencias estén disponibles. Según la ayuda vigente de Google, los anuncios dentro de AI Overviews están limitados a ciertos países y al inglés; Chile no figura en esa lista actual. No se puede seleccionar únicamente ese espacio ni comprar el primer puesto dentro de una respuesta generada.

## Fuentes oficiales

- [Guía de Google para funciones generativas de búsqueda](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide?version=published)
- [Requisitos técnicos de Google Search](https://developers.google.com/search/docs/essentials/technical?hl=en)
- [Cómo funciona la Búsqueda de Google](https://developers.google.com/search/docs/fundamentals/how-search-works)
- [Consejos para mejorar el ranking local](https://support.google.com/business/answer/7091?hl=en-en)
- [Reglas del Perfil de Empresa para negocios de servicio](https://support.google.com/business/answer/3038177?hl=en)
- [Informe de rendimiento de Search Console](https://support.google.com/webmasters/answer/7576553?hl=en)
- [Crear una campaña de Búsqueda de Google Ads](https://support.google.com/google-ads/answer/9510373?hl=en-EN)
- [Opciones de segmentación geográfica de Google Ads](https://support.google.com/google-ads/answer/1722038?hl=en)
- [Anuncios en AI Overviews](https://support.google.com/google-ads/answer/16297775?hl=en)
