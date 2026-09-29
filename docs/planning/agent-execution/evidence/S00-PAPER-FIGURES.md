# Figuras de papers en las tarjetas de S00

**Fecha:** 2026-09-27  
**Unidad de uso:** S00, estación 01, diapositiva 01.2  
**Alcance:** sustituir cuatro gráficos rehechos localmente que aparentaban ser observaciones de papers por figuras publicadas con licencia verificable. La referencia histórica de Marois et al. (2008) sigue describiendo el descubrimiento de HR 8799; la figura de esa tarjeta procede de un artículo abierto posterior.

## Fichas de encargo

### S00-FIG-HR8799-MIRI-FIG1

- **Caso y propósito:** imágenes coronagráficas del sistema HR 8799; comparar filtros MIRI y la reducción con estrella de referencia.
- **Acción del estudiante:** reconocer qué cambia entre filtros y comparar la fila original con la fila sustraída.
- **Figura y medio:** Figura 1 de Boccaletti et al. (2024), rasterizada del PDF a 300 dpi y recortada alrededor de los ocho paneles.
- **Contenido exacto:** rótulos F1065C, F1140C, F1550C y F2100W; ejes, barra de escala, orientación, detecciones y objeto de fondo conservados.
- **Omisiones:** no se agregan órbitas, etiquetas, escalas ni detecciones nuevas.
- **Derechos:** CC BY 4.0 según el registro de ePubs STFC; atribución visible con artículo, DOI y licencia.
- **Salida:** `public/images/s00/papers/hr8799-miri-fig1.png`.

### S00-FIG-KEPLER90I-TRANSIT-FIG12

- **Caso y propósito:** ajuste de tránsito de Kepler-90 i; relacionar el evento temporal con una medida y un modelo.
- **Acción del estudiante:** distinguir mediciones agrupadas de la curva de mejor ajuste.
- **Figura y medio:** panel inferior de la Figura 12 de Shallue y Vanderburg (2018), rasterizado del PDF a 300 dpi y recortado al panel Kepler-90 i.
- **Contenido exacto:** brillo relativo, horas desde el tránsito medio, puntos agrupados, modelo, período y radio rotulados en la figura.
- **Omisiones:** se excluye el panel comparativo de Kepler-80 g; no se cambian datos, escala, etiquetas ni modelo.
- **Derechos:** CC BY 3.0 indicado en el artículo; atribución visible con artículo, DOI y licencia.
- **Salida:** `public/images/s00/papers/kepler90i-transit-fig12.png`.

### S00-FIG-WASP39B-SPECTRUM-FIG2

- **Caso y propósito:** espectro de transmisión de WASP-39 b; comparar consistencia entre reducciones.
- **Acción del estudiante:** identificar la banda de CO2 cerca de 4,3 μm y advertir que el rasgo próximo a 4,0 μm se presenta como tentativo.
- **Figura y medio:** Figura 2 de JWST Transiting Exoplanet Community ERS Team (2023), archivo PNG completo servido por Nature; sin recorte ni edición.
- **Contenido exacto:** profundidad de tránsito, longitud de onda, cuatro reducciones, medidas de Spitzer y barras de incertidumbre conservadas.
- **Omisiones:** se retiran etiquetas previas de H2O y SO2 que la figura y el artículo no respaldaban.
- **Derechos:** CC BY 4.0 del artículo; la figura no tiene una exclusión de terceros en su crédito.
- **Salida:** `public/images/s00/papers/wasp39b-spectrum-fig2.png`.

### S00-FIG-ASTRONET-INPUT-FIG3

- **Caso y propósito:** entradas global/local de curvas de luz para los modelos de Shallue y Vanderburg (2018).
- **Acción del estudiante:** comparar cuánto contexto conserva cada vista y reconocer los casos en que una de ellas pierde información útil.
- **Figura y medio:** Figura 3 del artículo, rasterizada del PDF a 300 dpi y recortada para excluir el encabezado de página y el caption original.
- **Contenido exacto:** tres ejemplos TCE, etiquetas Global View/Local View, puntos, ejes y brillo normalizado conservados.
- **Omisiones:** no se añaden tamaños de vector a la figura; la página presenta 2001 y 201 bins como dimensiones del modelo final en el texto explicativo.
- **Derechos:** CC BY 3.0 indicado en el artículo; atribución visible con artículo, DOI y licencia.
- **Salida:** `public/images/s00/papers/astronet-input-fig3.png`.

## Revisión

- Las cuatro tarjetas se revisaron en navegador a 1440×900 y las cuatro ampliaciones a 390×844. Cada figura mantiene su relación de aspecto; se distinguen sus rótulos, ejes y paneles.
- El lightbox móvil deja visibles caption, cita, licencia y nota de recorte o ausencia de cambios, sin desbordamiento horizontal.
- La revisión detectó una regla del modo presentación que reducía todas las imágenes de la estación a 180 px. Se acotó a las ilustraciones hero para que las figuras bibliográficas usen su tamaño disponible en la tarjeta y la ampliación.
- `npm run check` pasó después del ajuste de estilos: Prettier, ESLint, Astro (97 archivos; 0 errores, advertencias ni hints), validadores de contenido y ejemplos. Persisten los avisos ya registrados por colecciones públicas vacías y espejos de skills pendientes.
- `npm run build` pasó y generó 8 páginas. El sandbox bloqueó la creación de procesos auxiliares de esbuild (`spawn EPERM`); el build repetido con permiso local ampliado completó correctamente. Astro conserva los avisos conocidos por las colecciones públicas vacías.
- Estado propuesto: listo para revisión editorial de las atribuciones y la lectura científica en la sesión.
