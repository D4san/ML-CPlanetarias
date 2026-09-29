# Sistema visual — Observatorio editorial v0.1

Esta es la dirección visual inicial del producto. Combina la calma de una publicación científica con instrumentos de observación interactivos. No copia la identidad de Distill ni la de otro sitio.

## Carácter

- fondo de papel cálido para lectura larga y marco oscuro común para proyectar;
- tinta azul muy oscura para estructura y contraste;
- retícula, órbitas y marcas de medición sutiles;
- color reservado para relaciones científicas y estado, no para adornar secciones;
- figuras anchas cuando la comparación lo exige y columna de texto de 65–80 caracteres;
- etiquetas compactas de “instrumento” para metadatos, variables y estados.

Los valores ejecutables viven en `src/styles/tokens.css`. Esta guía define su significado:

- `data`: observables, representación y evidencia;
- `model`: paradigma, tarea, familia y mecanismo;
- `decision`: línea base, métrica y decisiones de diseño;
- `limit`: advertencias, fallas y límites interpretativos;
- `transfer`: preguntas para enseñar o reutilizar.

El color nunca es la única señal: se acompaña con texto, forma, posición o patrón.

## Tipografía y composición

Usar una serif editorial de sistema en títulos, una sans legible en texto y una monoespaciada en variables. No depender de una CDN de fuentes. Las páginas son artículos, no tableros de tarjetas: los contenedores agrupan controles o herramientas, no cada sección narrativa.

La escala espacial usa incrementos deliberados y un ancho máximo por función: lectura, figura amplia y pantalla. En móvil, las notas marginales pasan a flujo, los paneles se apilan y ningún significado depende de pasar el puntero.

El modo `Presentación` se calibra para proyección horizontal. En 1920×1080, el texto esencial se
mantiene alrededor de 18 px o más; controles y texto secundario, alrededor de 15–16 px; metadatos
instrumentales compactos, nunca por debajo de 13 px. Desde 1280 px en orientación horizontal, la
figura y el panel de foco permanecen lado a lado y la superficie ocupa al menos el 95% del viewport,
con un borde de seguridad pequeño. Una parada puede requerir desplazamiento vertical cuando su
interacción lo exige, pero su relación principal debe entenderse dentro del primer cuadro 16:9. El
modo `Lectura` conserva su escala editorial y una medida centrada más estrecha.

El carril de presentación compartido (`SlideRail`) recibe la secuencia plana de cada sesión y, por
defecto, muestra una ventana de cinco tarjetas desarrolladas alrededor de la activa; el resto queda
apilado en los bordes. Esa ventana se puede configurar y no limita la cantidad de paradas ni de
partes. Las entradas pueden declarar partes internas para hacer visible la estructura de una
estación. La sesión conserva el contenido, el estado pedagógico y sus rutas; el carril conserva la
composición, el foco, el teclado y la adaptación móvil. S01 usa este contrato para distribuir
Pregunta e Instancia en subslides explícitas, según
`docs/specs/interactions/s01-pilot-subslides.md`.
Los esquemas conservan su relación de aspecto para alinear flechas y controles; las ilustraciones
del flujo comparten texto aplicado a la ruta.

## Presentación reutilizable

S01 fija la referencia de marco y composición para las sesiones proyectadas. Cada sesión declara
su propia cantidad de paradas y las partes que necesita; la plantilla no fija la secuencia de S01.
S00 y las sesiones futuras reutilizan `session-presentation.css` y los tokens `--presentation-*`
de `src/styles/tokens.css`: marco oscuro,
retícula de 2 rem, borde, sombra, escala del título y altura mínima de los controles. La raíz React
lleva `session-presentation` junto a la clase propia de la sesión. Los estilos de cada sesión
conservan su identidad semántica y describen la composición del contenido; no vuelven a definir el
marco exterior.

### Escala para proyección

| Uso | Mínimo de referencia | Token |
| --- | ---: | --- |
| Idea, conclusión o pregunta esencial | 18 px | `--presentation-essential-size` |
| Texto de apoyo y explicación | 16 px | `--presentation-support-size` |
| Texto de controles y opciones | 15 px | `--presentation-control-size` |
| Metadatos y etiquetas instrumentales | 13 px | `--presentation-metadata-size` |

El título usa `--presentation-title-size`; los controles principales miden al menos
`--presentation-control-min-height`. En las revisiones se buscan y corrigen excepciones pequeñas
en escenas, tarjetas e ilustraciones; un tamaño compacto requiere una función secundaria concreta y
debe seguir siendo legible desde el fondo del aula.

S02 escala localmente el piso tipográfico entre 15 y 19 px según el ancho y la altura de la ventana
(`clamp(15px, max(1vw, 1.7vh), 19px)`). El tamaño alcanza 18 px en una pantalla de 1800 px de ancho;
los controles, pies, etiquetas de diagramas y metadatos siguen esa escala. Las reglas responsivas
reorganizan o desplazan el contenido cuando hace falta espacio.

### Composición y superficies

- El marco, el encabezado, los modos, el carril y la escala de controles forman la plantilla común.
- `SlideRail` es la única composición de tarjetas que representa la secuencia de diapositivas. Cada
  sesión entrega una lista de cualquier longitud y declara cuántas partes requiere cada parada. Las
  cinco tarjetas visibles por defecto son una ventana del carril, no un límite de paradas ni de
  subslides; la sesión adapta sus etiquetas y su numeración mediante `SlideRail.tsx`.
- Las superficies de escena, foco, lectura, bibliografía y actividad usan los tokens de borde,
  radio y fondo de presentación. Los paneles no reciben colores, radios ni sombras distintos por
  conveniencia local.
- La composición puede ser una escena visual central o una escena junto a un panel de foco. Se
  elige según la acción de aprendizaje: un objeto que conviene observar ocupa el centro; una
  explicación paralela cabe junto a la figura si ambas se entienden en el primer cuadro 16:9. En
  ambos casos se preservan la jerarquía, las dimensiones de control y la densidad de proyección.
- Una tarjeta de contenido muestra una idea y su relación visible; una flashcard separa pregunta y
  respuesta con revelado explícito; un minijuego presenta objetivo, una acción principal, feedback y
  una ruta para continuar o volver. Su interacción propia requiere ficha en
  `docs/specs/interactions/` y estilos responsivos, teclado y movimiento reducido.
- Ilustración cualitativa, esquema exacto y gráfico de datos siguen medios y criterios diferentes;
  aplica [`VISUAL_ASSET_GUIDE.md`](../guides/VISUAL_ASSET_GUIDE.md) sin rasterizar etiquetas,
  flechas o cifras exactas.

### Organización del código de una sesión

- `src/lib/sXX-content.ts` guarda contenido declarativo, IDs, referencias y secuencia; no guarda
  markup de presentación.
- `src/components/react/SXXLearningJourney.tsx` administra el estado y ensambla la experiencia.
- `src/components/react/sXX/SXXNavigation.tsx` adapta navegación y controles a `SlideRail`.
- `src/components/react/sXX/` separa escenas, lectura, mapa, tarjetas y actividades en módulos con
  una responsabilidad visible. Las interacciones que puedan crecer —flashcards o minijuegos— se
  aíslan en componentes y estado propios.
- `src/components/react/sXX-learning-journey.css` contiene reglas locales de escena y disposición.
  El marco compartido permanece en `session-presentation.css`; los valores comunes permanecen en
  `src/styles/tokens.css`.

S01 ya sigue este reparto con navegación, escenas, lectura, mapa y actividades separados. S00
todavía concentra navegación, diagramas, flashcards, lectura y actividades en
`S00LearningJourney.tsx` y una hoja de estilos extensa. Su extracción debe hacerse por partes —primero
navegación, después escenas y actividades— conservando el contenido y los cambios existentes. La
diferencia de una o dos columnas es una variante declarada; el marco, los controles y la escala
permanecen compartidos.

### Ilustraciones cualitativas e iconos

Los dibujitos, miniaturas e iconos que representan objetos, escenas o metáforas siguen la familia
`MLCP editorial line-art v1` y se producen mediante `$imagegen`. La familia usa línea limpia, formas
planas reconocibles, detalle mínimo pero legible a tamaño pequeño, composición centrada y objetos
consistentes entre variantes. Los roles de color se refuerzan con forma, posición, patrón o texto
externo.

Cuando un asset solicite transparencia, el archivo es RGBA con canal alfa real. El exterior del
dibujo queda transparente y se comprueba sobre una superficie clara y otra oscura. No se dibuja un
tablero cuadriculado para representar transparencia ni se hornean rectángulos, retículas, bordes,
halos o sombras que funcionen como fondo. Texto exacto, ecuaciones, cifras, ejes, leyendas y flechas
críticas permanecen en HTML/SVG accesible; la ilustración aporta la relación cualitativa.

## Movimiento

Toda transición explica continuidad, cambio de estado o relación espacial. Preferir `transform` y `opacity`; evitar animar layout. Mantener duraciones breves y reversibles. Bajo `prefers-reduced-motion: reduce`, eliminar desplazamientos y conservar de inmediato el estado final y toda la información.

## Revisión visual

Comprobar al menos 1920×1080 para proyección, 1800×700 para pantallas amplias de poca altura,
1440×900, 390×844 y una anchura intermedia. Revisar contraste, foco, texto largo en español,
ecuaciones, controles, estados vacíos y figuras sin JavaScript. Un cambio de dirección estética
requiere actualizar este documento, los tokens y los snapshots en la misma revisión.
