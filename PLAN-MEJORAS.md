# Plan de Mejoras — Web Divina Pausa

> **Contexto de marca**: catering premium corporativo. Paleta rosa suave `#e5b1ae` sobre fondos oscuros `#212121`, tipografía display italic (PF Marlet Display) + Montserrat. Cada cambio debe sostener la percepción de lujo, calidez y elegancia.

---

## Punto 1 — Calculadora en la página de inicio

**Problema**: la calculadora de servicios (`CalculadoraServicios`) solo existe en `/servicios`. En el inicio, después de los servicios interactivos, el usuario no tiene forma de calcular un presupuesto sin navegar.

**Solución**:
- Importar y montar `CalculadoraServicios` en `src/pages/index.astro`, después de `InteractiveServices` y antes del bloque CTA.
- **Riesgo detectado**: el componente arranca con `.calculadora__anim { opacity: 0 }` y en `/servicios` lo revela un GSAP ScrollTrigger del propio page script. En el index ese script no existe → la calculadora quedaría invisible. Solución: replicar la animación de revelado en el script de `index.astro`.

**Archivos**: `src/pages/index.astro`, `src/pages/servicios.astro` (referencia de animación).
**Verificación**: build + revisión visual en desktop y mobile: calculadora visible, funcional y con las animaciones correctas.

---

## Punto 2 — Servicios calculables en una sola fila (desktop)

**Problema**: en `/servicios`, las 3 cards de servicios calculables (`servicios__standard-card`) están apiladas full-width una debajo de otra, incluso en desktop. La sección pierde impacto visual y ritmo.

**Solución**:
- `.servicios__standard-grid`: cambiar de `flex-direction: column` a grid de **3 columnas** en desktop (`min-width: 992px`).
- Ajustar la card al ancho reducido: `min-height` menor, título con `clamp` más chico, footer (botón Calcular + WhatsApp) que respire en columna angosta.
- **Mobile**: se mantiene apilado 1 columna (estado actual).

**Archivos**: `src/styles/servicios.css`, `src/pages/servicios.astro` (si hace falta ajustar estructura).
**Verificación**: build + revisión visual desktop (3 cards alineadas en fila, misma altura) y mobile (apiladas).

---

## Punto 3 — Quitar "Servicios Calculables" del título de sección

**Problema**: el label del header de la sección estándar dice "Servicios Calculables", que suena técnico y no aporta a la narrativa premium.

**Solución**:
- Eliminar el `<span class="servicios__standard-label">Servicios Calculables</span>` de la sección en `servicios.astro`.
- Evaluar en la revisión visual (Punto 4) el badge "Calculable" de cada card: o se elimina, o se reemplaza por algo coherente con la marca (ej. "Precio base transparente" / "Cotización inmediata").

**Archivos**: `src/pages/servicios.astro`, `src/styles/servicios.css`.
**Verificación**: build + revisión visual del header de sección.

---

## Punto 4 — Revisión de estados y disposición con Chrome DevTools (MCP)

**Problema**: no hay una auditoría visual sistemática de estados interactivos ni de la disposición en distintos viewports tras los cambios recientes.

**Solución** (con Chrome DevTools MCP):
1. Navegar `/servicios` y `/` en desktop, tablet y mobile.
2. Revisar **estados**: hover de cards (standard + premium), focus de botones y enlaces, active state, tooltips, estado del slider y botones de servicio de la calculadora.
3. Revisar **disposición**: alineación de grids, espaciados, overflow, alturas de cards, contraste.
4. Documentar hallazgos en este plan (sección anexa) y corregir uno por uno.

**Archivos**: según hallazgos (probablemente `servicios.css`, `calculadora` styles).
**Verificación**: screenshot por estado/viewport + build limpio.

---

## Orden de ejecución

1. Punto 1 (calculadora en el inicio) — mayor impacto de conversión.
2. Punto 3 (quitar label) — trivial, despeja la vista.
3. Punto 2 (grid en fila) — depende visualmente de tener el header limpio.
4. Punto 4 (auditoría MCP) — cierra el ciclo validando todo.

---

## Anexo — Hallazgos de la auditoría

> Auditoría con Chrome DevTools MCP + Lighthouse, desktop 1440px y mobile 390px. Server preview: `http://localhost:4323`.

### Corregidos durante el Punto 4

| # | Vista | Elemento | Problema | Fix |
|---|-------|----------|----------|-----|
| 1 | Desktop | Cards standard + premium (`/servicios`) | **BUG crítico**: `transition: transform` en el estado base de la card peleaba tick a tick con los tweens de GSAP → la animación de entrada quedaba congelada en el estado `from()` (`opacity: 0`, transform inicial). La sección "Catering Corporativo" era invisible. | `transition` movida a `:hover` + `clearProps: 'transform'` en ambos `gsap.from()`. Verificado: cards en `opacity: 1, transform: none` tras scroll; hover `scale(1.01)` / `scale(1.05)` funcional. |
| 2 | Desktop | `.servicios__divider-text` ("Servicios Premium") | Contraste 1.96:1 — `#e5b1ae` sobre blanco. Falla WCAG AA (mínimo 4.5:1). | Nuevo token `--color-primary-dark: #a8615d` en `global.css`; ratio medido **4.53:1** ✓ |
| 3 | Desktop | `.calculadora__custom-divider span` ("Servicios Personalizados") | Contraste 3.4:1 — `rgba(255,255,255,0.35)` sobre `#212121`. | Opacidad subida a `0.6`; ratio medido **6.63:1** ✓ |
| 4 | Desktop | `calculadora__custom-card-title` (`h4`) | Heading-order: saltaba de `h2` de sección a `h4` sin `h3` intermedio. | Cambiado a `h3` — ahora la jerarquía es `h2 → h3` ✓ |
| 5 | Desktop | Grid standard (`/servicios`) | Punto 2: grid en 3 columnas desktop. | Verificado: 3 cards `369×403`, mismo top, sin overflow horizontal. Mobile: apiladas `342px` 1 col, sin overflow. |
| 6 | Desktop | Calculadora en `/` (index) | Punto 1: reveal con GSAP ScrollTrigger. | Verificado: `opacity 0 → 1`, `transform: none` al scrollear; recálculo correcto (50→80 pers = $760.000). |

### Preexistentes — pendientes de decisión (fuera del scope de esta iteración)

| # | Vista | Elemento | Problema | Fix propuesto |
|---|-------|----------|----------|---------------|
| 7 | Desktop | `.dark-header-contact-number` / `.dark-header-contact-email` | Contraste insuficiente en la franja oscura del header. | Subir tono del color del texto (mantener sobre `#212121`) |
| 8 | Desktop | `a.nav-link.is-active` (nav) | Contraste insuficiente del link activo. | Usar `--color-light-pink` o `--color-primary` claro |
| 9 | Desktop | `div.testimonial-stars` | `aria-label` prohibido en `div` sin rol. | Agregar `role="img"` + `aria-label`, o usar sr-only text |
| 10 | Desktop | `p.testimonial-author-role` | Contraste insuficiente. | Oscurecer o subir peso/opacidad |
| 11 | Desktop | `footer-bottom p` | Contraste insuficiente. | Oscurecer el gris del texto |
| 12 | Desktop | `h4.testimonial-author-name`, `h4.footer-menu` | Heading-order: `h2` (testimonios/footer) → `h4` sin `h3`. | Evaluar `h3` o replantear jerarquía semántica |
| — | — | `agent-accessibility-tree` (Lighthouse) | Árbol a11y mal formado; colapsa con los ítems 7-12. | Se resuelve al corregir los preexistentes |

> **Resultados Lighthouse** (desktop, `http://localhost:4323/servicios`): Accessibility 90, Best Practices 100, SEO 100, Agentic Browsing 50. Tras los fixes 1-4 ya no reporta fallos de las secciones tocadas (divider, calculadora, cards). El score a11y queda limitado por los ítems preexistentes 7-12.
