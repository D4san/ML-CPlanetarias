# Errores frecuentes y reparación

| Síntoma | Causa habitual | Reparación concreta |
| --- | --- | --- |
| La unidad se llama `slide-3` o usa un índice de array | Se confundió posición con identidad | Asignar un ID legible y estable, por ejemplo `s01-instance-cycle`, y dejar el orden en `unitIds`. |
| `apertura` aparece en dos estaciones y se trata como el mismo contenido | Se perdió el namespace de la estación | Mapear `question/apertura` e `instance/apertura` por separado; crear IDs editoriales únicos. |
| La secuencia empieza con un algoritmo o dataset | Se saltó la pregunta y la representación | Volver a unidad de análisis, entrada, salida, señal, uso, tarea, familia, baseline, métrica y límites. |
| Regresión, clasificación o deep learning aparecen como paradigmas equivalentes | Se mezclaron niveles de descripción | Etiquetar paradigma por señal, tarea por salida y familia por mecanismo; ubicar deep learning en familias de redes. |
| Una referencia con “cap. 1” se convierte en una página, cita textual o DOI | Se rellenó una laguna por plausibilidad | Conservar el capítulo suministrado, marcar ubicación pendiente y abrir la tarea de verificación. |
| Un libro o una extracción privada se copia al paquete | Se confundió trazabilidad con redistribución | Parafrasear, conservar referencia/ubicación y mantener los textos completos en el vault privado. |
| Un ejemplo tiene nombre astronómico, pero carece de representación, evaluación o límite | El dominio sustituyó a la formulación | Completar el registro del ejemplo; si faltan datos, declararlo microproblema conceptual y retener cualquier afirmación científica. |
| Una figura o salida plausible se presenta como evidencia | Se borró el tipo del asset o del ejemplo | Declarar `conceptual`, `simulated` u `observed`, registrar procedencia y escribir qué no puede concluirse. |
| Los backlinks se escriben a mano en varias notas | Se duplicaron relaciones derivadas | Referenciar conceptos por ID y calcular las relaciones inversas desde las unidades aprobadas. |
| Al faltar una fuente se inventa una cita para completar la tabla | Se priorizó la apariencia de cierre | Añadir una laguna con afirmación, evidencia disponible, falta, tarea y condición de cierre. |
| `source_note` recibe una ruta personal o una nota que no existe | Se intentó satisfacer el formato sin resolver origen | Leer `config/obsidian.local.yaml` cuando corresponda, verificar la ruta real y conservarla relativa al vault. |
| Un borrador `internal` se pasa a `docs/content/` porque “ya está listo” | Se confundió preparación técnica con autorización editorial | Mantener estado, visibilidad, derechos y `publish_ready` reales; entregar una propuesta para revisión. |
| El modo docente contiene la única precaución o el único límite | Se hizo depender el significado esencial de una configuración | Llevar la distinción y el límite al contenido principal; dejar en modo docente solo orientación adicional. |
| Se afirma que una métrica alta demuestra física aprendida | Se confundió predicción con explicación o causalidad | Añadir `metric-no-physics`, pedir dominio, evaluación, línea base y límite interpretativo. |
| La skill empieza a editar componentes o duplica el protocolo web | La autoría editorial se mezcló con implementación | Detener la edición técnica, entregar registros y cambiar a `$develop-mlcp-web` solo después de una decisión de alcance. |
