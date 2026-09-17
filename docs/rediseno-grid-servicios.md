# Plan: Rediseño del Grid de Servicios

## Objetivo
Reemplazar el bento grid actual por una presentación más ordenada, premium y awwwards-style, alineada con la calculadora de servicios estándar.

---

## Checklist

- [ ] **1. Definir estructura de dos grupos**

  Separar los 7 servicios en dos categorías visuales:

  | Grupo | Servicios | Tratamiento visual |
  |-------|-----------|-------------------|
  | **Estándar** (calculables) | Coffee Break Premium, Almuerzo & Brunch, Coffee To Go | Cards grandes, heroicos, conectados a la calculadora |
  | **Premium** (a medida) | After Office, Tablas & Cocktail, Paella, Bar Portátil, Catering a Medida | Cards secundarios, más sutiles, CTA a WhatsApp |

- [ ] **2. Diseñar layout del grid**

  ```
  MOBILE (1 col):
  [Estándar 1]
  [Estándar 2]
  [Estándar 3]
  — divider —
  [Premium 1]
  [Premium 2]
  [Premium 3]
  [Premium 4]
  [Premium 5]

  TABLET / DESKTOP (2-3 col):
  [Estándar 1] [Estándar 2] [Estándar 3]
  ——————— divider ———————
  [Premium 1] [Premium 2]
  [Premium 3] [Premium 4]
  [Premium 5]
  ```

- [ ] **3. Estándar Cards — diseño**

  - Imagen full-bleed como fondo
  - Overlay degradado (oscuro abajo → transparente arriba)
  - Título en `--font-display` cursiva, blanco
  - Badge "Calculable" con el color primario
  - Precio base destacado ("Desde $9.500/pers.")
  - Botón "Calcular" que hace smooth-scroll a la calculadora
  - Hover: escala sutil + glow en el overlay

  *Referencia visual:* estilo "suite" de hotel de lujo — card grande, imagen dominante, info mínima.

- [ ] **4. Premium Cards — diseño**

  - Formato más compacto (tipo galería)
  - Imagen de fondo con overlay oscuro
  - Título pequeño + descripción corta (1 línea)
  - Botón "Consultar →" que abre WhatsApp
  - Hover: reveal de descripción + botón

  *Referencia visual:* estilo grid de arquitectura — cards limpios, info jerárquica.

- [ ] **5. Dividir visualmente los grupos**

  - Línea divisoria con texto: "Servicios Estándar" / "Servicios Premium"
  - O usar secciones separadas con fondos distintos (claro/oscuro)
  - Los estándar podrían ir sobre fondo claro, los premium sobre fondo oscuro para marcar la diferencia

- [ ] **6. Conectar estándar cards con la calculadora**

  - Cada card estándar tiene un botón/ancla: `href="#calculadora"`
  - Al hacer clic, hace scroll suave a la calculadora
  - Opcional: al llegar a la calculadora, se selecciona automáticamente el servicio correspondiente

- [ ] **7. Ajustar la calculadora para recibir selección externa**

  - Exponer función `selectService(id)` en el script de la calculadora
  - Los botones "Calcular" del grid llaman `selectService('coffee-break')` etc
  - La URL puede tener hash: `#calculadora?servicio=coffee-break`

- [ ] **8. Responsive refinements**

  - Mobile: estándar cards full-width, premium cards 1 col
  - Tablet: estándar 3 col, premium 2 col
  - Desktop: estándar con max-width acotado para no estirar las cards, premium 3 col

- [ ] **9. Animaciones GSAP**

  - Entrada escalonada de cards al scrollear
  - Estándar cards: fade + translateY + stagger sutil
  - Premium cards: fade + translateY (lighter)
  - Divider con animación de expansión horizontal

- [ ] **10. Estados vacíos / carga**

  - Las imágenes deben tener lazy loading
  - Placeholder mientras carga la imagen (skeleton o color sólido)

---

## Notas técnicas

- Los datos de servicios están en `src/data/servicesData.ts`
- La calculadora está en `src/components/CalculadoraServicios.astro`
- Los estilos del grid actual están en `src/styles/servicios.css` (`.servicios__bento*`)
- Los estilos nuevos pueden ir en el mismo CSS o en un archivo separado si crece mucho
- Las cards actuales usan BEM: `.servicios__bento-card`, se reemplazarán con nueva nomenclatura

## Referencias de estilo awwwards

- **Figma-style gradients + glassmorphism** para los overlays
- **Typografía jerárquica**: título grande en display font, detalles en sans-serif
- **Hover con clip-path reveal** (como tienen las cards actuales pero refinado)
- **Grid asimétrico controlado** (no caótico, sino intencional con spans)
- **Color primario (#e5b1ae) como acento** en badges, botones, bordes en hover
