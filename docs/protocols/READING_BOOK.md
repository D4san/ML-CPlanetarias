# Modo Lectura: libro interactivo

## Función

Lectura permite aprender sin asistir a la exposición oral. Desarrolla el argumento, las transiciones, los ejemplos y la interpretación que en clase aporta el profesor. La solicitud directa de 2026-10-18 autoriza esta organización local; el estado editorial y los derechos de los prototipos conservan sus restricciones.

Presentación organiza la atención en el aula. Lectura construye una exposición continua para autoestudio. Actividades pide producir o transferir una respuesta. Comparten conceptos, fuentes, unidades y límites; cada modalidad desarrolla su exposición con la granularidad adecuada. Una correspondencia explícita mantiene el orden conceptual sin exigir un apartado por diapositiva.

## Autoría

1. Abrir con una pregunta y explicar por qué importa en el argumento.
2. Introducir objetos, símbolos y supuestos antes de usarlos. Escribir las relaciones que el profesor explicaría: por qué se hace una elección, qué cambia y qué permite interpretar.
3. Desarrollar un caso pequeño. Si hay cálculo: significado, unidades, sustitución, valores intermedios y conclusión. Distinguir casos didácticos, datos observados y salidas ejecutadas.
4. Insertar la figura después de dar herramientas para leerla. Escribir qué cambiar, qué observar y cómo interpretar el cambio. La explicación esencial permanece aunque la figura no se manipule.
5. Pedir una respuesta y ofrecer un razonamiento desplegable que explique el porqué y los límites. Sin calificación ni registro del estudiante.
6. Enlazar con la siguiente pregunta y con las fuentes pertinentes; referencias completas al final.

Son criterios de cobertura, no seis cajas visuales obligatorias. Los capítulos actuales usan una representación compartida inicial; futuros capítulos pueden necesitar subtítulos, ecuaciones y figuras intercaladas de otra manera.

## Del guion al libro

| Material del guion | Tratamiento |
| --- | --- |
| Definición o explicación necesaria | Prosa principal visible |
| Pasos de una cuenta | Ejemplo resuelto antes de explorar |
| Analogía | Integrarla y declarar su límite |
| Pregunta al grupo | Comprobación con respuesta razonada |
| Advertencia esencial | Junto a la afirmación, independiente de `teacherMode` |
| Tiempo, dinámica y coordinación | Apoyo opcional para el tutor |
| Cita sin localización verificada | Mantener pendiente y señalar qué verificar |

## Arquitectura y correspondencia

- `src/lib/reading-book.ts`: contrato de prosa, ejemplo, comprobación, transición y fuentes.
- `src/lib/s00-reading.ts`, `s01-reading.ts`, `s02-reading.ts`: exposición original del repositorio.
- `BookReading.tsx`: índice, capítulos, navegación y respuestas nativas. `BookInstrument`: consigna e interpretación alrededor de los instrumentos existentes.
- `SessionBookFallback.astro`: la misma prosa y respuestas sin JavaScript, evitando otra versión abreviada.
- S00/S01 conservan siete capítulos y sus unidades/rutas. S02 agrupa en orden: clasificación/cortes/impureza; código/regresión/error/generalización; bootstrap/bosque; pregunta de datos/auditoría; evaluación/práctica; interpretación. La portada orienta la presentación y no se repite como capítulo.
- Los enlaces originales siguen funcionando. Al volver a presentación, se selecciona la unidad asociada al capítulo visitado. Los widgets con estado local se reinician al remontarse.

## Revisión

Leer primero sin figuras y con modo docente apagado: debe ser posible reconstruir el mecanismo y las cuentas. Después comprobar la aportación de cada control. Revisar fuentes, IDs, cobertura, navegación, teclado, respuestas, móvil y alternativa sin JavaScript. Aplicar `QUALITY_AND_RELEASE.md` y `session-book-reading.md`.

Las revisiones editorial y científica siguen pendientes de aceptación humana. El desarrollo para los prototipos internos no promueve paquetes de `inbox/` ni sustituye sus manifiestos.
