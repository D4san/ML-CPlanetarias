# Procedimiento para aceptar una tarea

## Lectura

1. Leer la ficha y las dependencias aceptadas.
2. Leer el informe de entrega y comparar archivos reales con los permitidos.
3. Identificar el criterio de logro antes de revisar detalles.

## Lista de revisión

- [ ] El resultado responde a la tarea completa y conserva los cambios previos.
- [ ] Todos los AC tienen evidencia; las pruebas citadas existen y corresponden a esta revisión.
- [ ] Los comandos terminaron y sus códigos de salida coinciden con la conclusión.
- [ ] El perfil/build evaluado coincide con el que afirma el informe.
- [ ] Las fuentes y derechos respaldan afirmaciones y recursos nuevos cuando aplica.
- [ ] La inspección visual usa el tamaño final y la accesibilidad incluye teclado/foco, además de axe.
- [ ] No hay cambios fuera de alcance ni contratos paralelos.
- [ ] Los estados editoriales y la autorización de publicación siguen siendo verdaderos.
- [ ] Las dependencias consumidoras conocen los IDs/exportaciones finales.
- [ ] Los bloqueos reales quedan explícitos y no se presentan como criterios satisfechos.

## Decidir

**Aceptada:** todos los AC y gates requeridos están comprobados y se cumple el logro.
Actualizar BOARD.md con enlace al informe y liberar reservas.

**Devuelta:** identificar criterio exacto, esperado, observado y reproducción mínima.
Asignar reparación al responsable; conservar los criterios ya comprobados que no afecte el cambio.

**Bloqueada:** nombrar recurso, decisión o entorno ausente y condición concreta para continuar.
La falta de Docker no invalida una unidad de tipos ya comprobada, pero mantiene pendiente
el gate visual exigido de una interacción.

No aceptar “se ve bien”, “debería funcionar” o “las pruebas anteriores pasaron” como
evidencia suficiente. Tampoco pedir pruebas ajenas al alcance sin justificar el riesgo.

## Revisión independiente

Preferir un revisor distinto del implementador. Si se usa un único agente, realizar una
pasada explícita de revisión con esta plantilla y señalar que fue autorrevisión.
La aprobación editorial y la autorización de publicación siguen sus reglas propias.
