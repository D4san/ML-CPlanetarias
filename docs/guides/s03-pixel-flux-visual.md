# S03 — Luz estelar en los píxeles

## Ficha de encargo visual

- `id`: `s03-kepler-pixel-source`
- `session_station_unit`: S03 / estación 2 / diapositiva 2.2
- `case`: fuente estelar puntual repartida entre píxeles del detector.
- `purpose`: hacer visible que la luz de una fuente ocupa varias celdas y que la apertura fotométrica suma los flujos de las celdas elegidas en cada cadencia.
- `learner_action`: identificar un flujo por píxel `Fᵢ(t)`, señalar los píxeles dentro de la apertura `A` y relacionar su suma con la curva `F_SAP(t)`.
- `focal_object`: fuente estelar compacta y difuminada detrás de una retícula de 5 × 5 celdas.
- `visible_relation`: la distribución luminosa alcanza varias celdas; una máscara destaca nueve celdas; cada celda tiene una etiqueta `Fᵢ(t)`; la suma por cadencia se muestra como una curva.
- `claim_limit`: ilustración conceptual y regla de respuesta espacial; las celdas no codifican mediciones ni una exposición de Kepler.

## Ruta y contenido

- `medium`: combinación de ilustración `gpt-illustration` y esquema `exact-svg-html`.
- `reason_for_medium`: ImageGen produce solo la fuente luminosa cualitativa y transparente. HTML/CSS conserva la cuadrícula, etiquetas, selección, ecuación, leyenda y curva exactas.
- `type`: `conceptual`.
- `exact_payload`: `Píxeles`, `Apertura`, `Suma SAP`; `Fᵢ(t)`; `Apertura A`; `F_SAP(t) = Σᵢ∈A Fᵢ(t)`; `flujo por píxel`; `flujo sumado en cada cadencia`.
- `deliberate_omissions`: `Target Pixel File`, `TPF`, pie de cautela sobre no representar un TPF, cifras observacionales inventadas y producto PDCSAP en la explicación principal.

## Tokens, paleta y composición

| Rol semántico | Token vigente | Señal no cromática | Uso en esta figura |
| --- | --- | --- | --- |
| datos / representación | `--data` y `--data-soft` | etiquetas `Fᵢ(t)` y posición en la retícula | luz recibida y flujo de cada celda |
| modelo / mecanismo | `--model` | contorno de apertura `A` | máscara que selecciona celdas |
| decisión / baseline / métrica | `--decision` | fórmula y trayectoria de la curva | suma por cadencia |
| límite / advertencia | `--limit` | no aplica en la escena visible | no se agrega una advertencia decorativa |
| transferencia / pregunta | `--transfer` o `--question` | no aplica en la escena visible | no aplica |

- `composition`: retícula a la izquierda; explicación de flujo por celda, selección y suma a la derecha. El brillo queda detrás de la retícula; las celdas, etiquetas y fórmula se dibujan en HTML.
- `aspect_and_dimensions`: imagen cuadrada de 1254 × 1254 px; se escala detrás de la retícula sin recortar el centro.
- `label_spaces`: los rótulos y valores viven fuera del PNG; cada celda conserva espacio para `Fᵢ`.
- `inspection_contexts`: `1920x1080`; `1440x900`; `1024x768`; `390x844`.
- `review_checked_contexts`: fondo oscuro y fondo claro en la escena a 1299 × 884; viewport móvil 390 × 844. En móvil, documento 390 px de ancho, diapositiva 332 px, sin desbordamiento horizontal y con desplazamiento vertical del contenido.
- `style_reference`: familia astronómica S03, descrita en `docs/guides/s03-illustrations.md`.
- `style_family`: ilustración astronómica sobria de S03; fuente no resuelta, halo suave, sin textura de superficie estelar.
- `generation_method`: `imagegen` para el halo; `exact-code` para cuadrícula y flujo.
- `background_mode`: `transparent-alpha`.
- `alpha_status`: `passed`; PNG RGBA, alfa cero en las cuatro esquinas y valores muestreados entre 0 y 253.
- `must_not`: disco solar resuelto, planetas, fondo opaco, retícula o texto rasterizados, cifras falsas, marcas de agua o elementos decorativos.
- `generation_prompt`: «Ilustración astronómica de una fuente estelar puntual compacta, núcleo blanco dorado y halo difuminado ámbar con un borde cian muy tenue; cuadrada, centrada y sobre fondo transparente real. Sin disco resuelto, textura superficial, planetas, retícula, etiquetas, texto ni otros objetos.»

## Fuente y entrega

- `source_or_dataset`: síntesis didáctica propia; los productos de Kepler se citan por separado en `src/lib/s03-content.ts`.
- `transformation_or_process`: PNG transparente generado con ImageGen; retícula HTML con 25 etiquetas `Fᵢ(t)`, intensidades relativas conceptuales por distancia al centro y máscara central fija de nueve celdas. No se presentan valores observacionales.
- `alt_draft`: fuente estelar difuminada detrás de una retícula de 25 celdas; cada celda se asocia con un flujo y la apertura resalta cuáles se suman.
- `caption_draft`: cada celda registra flujo por cadencia; la apertura reúne los píxeles elegidos para formar la curva SAP.
- `provenance_variant`: `origin: repo` + `source_path`.
- `rights_candidate`: `original`.
- `rights_note`: imagen generada para el curso; representación conceptual, no observación ni simulación calibrada.
- `output_file`: `public/images/s03/s03-kepler-pixel-source.png`.
- `weight_budget_or_measurement`: PNG de 739 814 bytes; cumple el límite de 800 000 bytes para conservar el halo suave con transparencia.
- `review_return_condition`: devolver si la estrella parece un disco resuelto, la trama no permite asociar celdas y etiquetas, el alfa contiene un fondo falso o la composición oculta el paso de cada flujo a la suma.
