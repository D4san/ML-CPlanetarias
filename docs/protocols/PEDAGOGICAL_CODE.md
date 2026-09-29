# Protocolo para código pedagógico

## Propósito y alcance

El código que el estudiante lee, modifica o ejecuta debe ayudarle a explorar una idea del curso. Se prioriza la ruta más clara para hacer visible el concepto y obtener un resultado que pueda interpretar.

Este protocolo aplica a notebooks, fragmentos de código, ejemplos ejecutables y código que acompaña una actividad. No reemplaza los criterios de ingeniería para la infraestructura del sitio, sus validadores o sus servicios.

## Forma por defecto

- Resolver una pregunta de aprendizaje por bloque o celda.
- Escribir el recorrido principal de forma directa, con variables con nombres reconocibles y unidades visibles cuando correspondan.
- Usar Python y las bibliotecas comunes que la actividad necesite. Evitar dependencias o recursos exóticos si una alternativa conocida explica igual de bien la idea.
- Mantener el código corto y lineal. Crear una función cuando reúna un procedimiento con nombre propio, evite repetir lógica o haga más legible el concepto. No introducir clases, capas, genéricos, decoradores ni configuraciones extensas por costumbre.
- Mostrar los pasos relevantes. Evitar helpers que oculten la operación que se quiere enseñar o código accesorio que no ayude a la pregunta.

## Supuestos y validaciones

- Partir de los datos y entradas definidos por la actividad. Declarar su forma, unidades y supuestos en el texto cercano al código.
- No añadir comprobaciones de tipo, validaciones generales, reintentos ni manejo de excepciones para entradas hipotéticas que la actividad no ofrece.
- No exigir anotaciones de tipos en ejemplos; incluirlas cuando el tema las enseñe o cuando aclaren una interfaz que el estudiante debe usar.
- Añadir una comprobación solo cuando prevenga una interpretación equivocada, haga visible una condición necesaria del concepto o responda a una entrada que el estudiante pueda cambiar.
- Si una comprobación forma parte de la enseñanza, explicar qué condición comprueba y qué significa el resultado.
- No ocultar fallos inesperados con capturas amplias de excepciones. Mantener errores útiles y legibles durante la exploración.

## Comentarios y explicaciones

- Escribir comentarios breves para definir un término, aclarar un supuesto, explicar una decisión o indicar qué observar.
- Usar el idioma del material; en una lección en español, redactar los comentarios en español salvo que el ejercicio requiera otra lengua.
- Colocar la definición antes del primer uso del concepto. Para explicaciones más largas, usar una celda Markdown o texto junto a la figura, no un párrafo dentro del código.
- No narrar instrucciones obvias línea por línea ni repetir en un comentario lo que el código ya expresa.
- Mantener la terminología estable entre la pregunta, el código, las ecuaciones, las figuras y la explicación del resultado.

## Recorrido de una actividad

Cuando corresponda, organizar el notebook para que el estudiante pueda:

1. leer la pregunta y anticipar un resultado;
2. inspeccionar los datos y los supuestos necesarios;
3. ejecutar un ejemplo base comprensible;
4. cambiar una o pocas variables con significado claro;
5. comparar el resultado y explicar qué muestra y qué deja abierto.

Cada bloque debe aportar a ese recorrido. No añadir métricas, modelos, abstracciones o gráficos que no ayuden al objetivo de aprendizaje.

## Rigor y reproducibilidad

- Identificar procedencia, licencia, unidades y transformaciones de los datos según [PROVENANCE_AND_RIGHTS.md](PROVENANCE_AND_RIGHTS.md).
- Usar datos sintéticos cuando basten para enseñar la operación; identificarlos como sintéticos y no presentarlos como observaciones.
- Fijar una semilla cuando exista aleatoriedad que afecte una comparación. No añadir semillas a ejercicios deterministas.
- En actividades que entrenan o comparan modelos de ML, conservar la línea base, la métrica pertinente y los límites de interpretación que exige la cadena del curso. En un ejemplo conceptual que no evalúa modelos, declarar un criterio simple de observación en vez de inventar una métrica.
- Probar el recorrido completo desde un entorno limpio y en orden. La salida de una demostración no constituye por sí sola evidencia científica.

## Notebook en GitHub y apertura en Colab

- Mantener el `.ipynb` del curso en `notebooks/` como versión fuente revisable.
- Enlazar desde la página del curso a ese archivo mediante **Abrir en Colab**. Publicar el enlace después de probar el notebook desde un entorno limpio.
- Indicar cómo guardar la copia de trabajo del estudiante; por defecto, puede guardar una copia en su Drive. Esa copia personal no modifica el notebook fuente del curso.
- Dejar en el notebook las instrucciones necesarias para cargar datos e instalar solo las dependencias que realmente use.

## Revisión rápida

Antes de entregar el código, comprobar:

- ¿La persona puede relacionar cada bloque con la pregunta de aprendizaje?
- ¿Los nombres, comentarios y unidades ayudan a leerlo sin conocimiento implícito?
- ¿Cada validación y dependencia tiene una razón educativa o práctica concreta?
- ¿El resultado puede interpretarse sin confundir una demostración con evidencia?
- ¿El notebook funciona de arriba abajo en el entorno indicado?
