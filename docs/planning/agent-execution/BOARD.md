# Tablero de ejecución

**Fuente única de estado de tareas.** Los estados iniciales escritos en las fichas describen su creación; actualizar este tablero durante la ejecución, no mantener varios tableros contradictorios.

A01 es la primera tarea asignable. Las demás se asignan cuando todas sus dependencias estén **aceptadas**, aunque un agente haya comunicado que terminó.
H03 es opcional y requiere autorización expresa. La creación de este plan no constituye ejecución de sus tareas.

## Tareas

| ID                  | Entrega                                                         | Dependencias                      | Estado                   | Responsable/revisor | Evidencia |
| ------------------- | --------------------------------------------------------------- | --------------------------------- | ------------------------ | ------------------- | --------- |
| [A01](tasks/A01.md) | Levantar la línea base y reservar archivos                      | —                                 | aceptada                | Codex integrador    | [evidence/A01.md](evidence/A01.md) |
| [A02](tasks/A02.md) | Fijar contratos de curso, sesión, estación y unidad             | A01                               | aceptada                | Codex integrador    | [evidence/A02.md](evidence/A02.md) |
| [A03](tasks/A03.md) | Resolver procedencia y disponibilidad editorial antes de migrar | A02                               | aceptada                | Codex integrador    | [evidence/A03.md](evidence/A03.md) |
| [B01](tasks/B01.md) | Implementar el modelo de contenido y sus validadores            | A02, A03                          | aceptada                | Codex integrador    | [evidence/B01.md](evidence/B01.md) |
| [B02](tasks/B02.md) | Extraer navegación, escenas y componentes de S01                | A02                               | aceptada                | Codex integrador    | [evidence/B02.md](evidence/B02.md) |
| [B03](tasks/B03.md) | Generalizar y resolver la configuración del fork                | B01                               | aceptada                | Codex integrador    | [evidence/B03.md](evidence/B03.md) |
| [B04](tasks/B04.md) | Aplicar disponibilidad a páginas, enlaces e identidad           | B03, A03                          | aceptada                | Codex integrador    | [evidence/B04.md](evidence/B04.md) |
| [C01](tasks/C01.md) | Crear el registro de ejemplos y sus fichas                      | B01, A03                          | aceptada                | Codex integrador    | [evidence/C01.md](evidence/C01.md) |
| [C02](tasks/C02.md) | Implementar glosario contextual y relaciones inversas           | B01, B02, B04                     | aceptada                | Codex integrador    | [evidence/C02.md](evidence/C02.md) |
| [C03](tasks/C03.md) | Implementar la acción Ver ejemplo                               | C01, B02                          | aceptada                | Codex integrador    | [evidence/C03.md](evidence/C03.md) |
| [C04](tasks/C04.md) | Generalizar bibliografía, precauciones y ayudas docentes        | B01, B02, B03                     | aceptada                | Codex integrador    | [evidence/C04.md](evidence/C04.md) |
| [D01](tasks/D01.md) | Crear la skill de preparación de sesiones                       | A02, A03                          | aceptada                | Mendel              | [evidence/D01.md](evidence/D01.md) |
| [D02](tasks/D02.md) | Crear la skill de investigación de ejemplos                     | A02, A03                          | aceptada                | Pasteur             | [evidence/D02.md](evidence/D02.md) |
| [D03](tasks/D03.md) | Crear la skill de producción visual                             | A02, A03                          | aceptada                | Archimedes          | [evidence/D03.md](evidence/D03.md) |
| [D04](tasks/D04.md) | Crear la skill de revisión e integrar las skills del proyecto   | D01, D02, D03                     | bloqueada              | Codex integrador    | [evidence/D04.md](evidence/D04.md) |
| [E01](tasks/E01.md) | Inventariar y ordenar todas las unidades de S01                 | A02, A03, D01                     | aceptada                | Codex integrador    | [evidence/E01.md](evidence/E01.md) |
| [E02](tasks/E02.md) | Migrar Señal y paradigma a subslides                            | E01, B02, B03                     | aceptada                | Codex integrador    | [evidence/E02.md](evidence/E02.md) |
| [E03](tasks/E03.md) | Migrar Tarea y salida a subslides                               | E01, B02, B03                     | aceptada                | Codex integrador    | [evidence/E03.md](evidence/E03.md) |
| [E04](tasks/E04.md) | Migrar Familia y aprendizaje a subslides                        | E01, B02, B03                     | aceptada                | Codex integrador    | [evidence/E04.md](evidence/E04.md) |
| [E05](tasks/E05.md) | Migrar Datos y dominio a subslides                              | E01, B02, B03                     | aceptada                | Codex integrador    | [evidence/E05.md](evidence/E05.md) |
| [E06](tasks/E06.md) | Migrar Evidencia y límites a subslides                          | E01, B02, B03                     | aceptada                | Codex integrador    | [evidence/E06.md](evidence/E06.md) |
| [E07](tasks/E07.md) | Integrar las siete estaciones en el motor común                 | E02, E03, E04, E05, E06, C04      | aceptada                | Codex integrador    | [evidence/E07.md](evidence/E07.md) |
| [F01](tasks/F01.md) | Investigar ejemplos y definiciones para cada unidad de S01      | E01, C01, D02                     | aceptada               | Linnaeus            | [evidence/F01.md](evidence/F01.md) |
| [F02](tasks/F02.md) | Fijar la guía visual y las plantillas de encargos               | A02, D03                          | aceptada                | Codex integrador    | [evidence/F02.md](evidence/F02.md) |
| [F03](tasks/F03.md) | Producir y revisar los recursos visuales necesarios             | F01, F02                          | bloqueada              | Harvey              | [evidence/F03.md](evidence/F03.md) |
| [F04](tasks/F04.md) | Integrar y auditar ejemplos, términos y precauciones en S01     | F01, F03, C02, C03, C04, E07, D04 | pendiente                | Sin asignar         | —         |
| [G01](tasks/G01.md) | Preparar el contenido de la sesión introductoria S00            | B03, B04, D01, A03                | aceptada                | Codex integrador    | [evidence/G01.md](evidence/G01.md) |
| [G02](tasks/G02.md) | Implementar S00 con el contrato común                           | G01, B04, E07, C02, C03, C04      | aceptada               | Erdos               | [evidence/G02.md](evidence/G02.md) |
| [G03](tasks/G03.md) | Ensayar un fork limpio y cerrar su guía                         | G02, F04                          | pendiente                | Sin asignar         | —         |
| [H01](tasks/H01.md) | Ejecutar la matriz integrada de calidad                         | F04, G03, D04                     | pendiente                | Sin asignar         | —         |
| [H02](tasks/H02.md) | Revisar la entrega y cerrar la matriz de requisitos             | H01                               | pendiente                | Sin asignar         | —         |
| [H03](tasks/H03.md) | Publicar solo tras instrucción expresa y verificar el sitio     | H02                               | no autorizada (opcional) | Sin asignar         | —         |

## Reservas de archivos y ejecución

Completar en A01 y actualizar al asignar cada lote.

| Área compartida                   | Propietario de la ronda | Tareas que esperan | Estado       |
| --------------------------------- | ----------------------- | ------------------ | ------------ |
| Contratos/ADR/protocolos          | Sin asignar             | —                  | Liberada tras A03/B01 |
| Configuración/esquemas            | Codex integrador        | —                  | Liberada tras B04 |
| Contenedor/datos S01              | Codex integrador        | F04                | Liberada tras B02/E07; integración pendiente |
| Páginas/índices/backlinks         | Codex integrador        | —                  | S00/S01 integradas como prototipos; promoción pública pendiente |
| Tokens/estilos globales           | Codex integrador        | —                  | Liberada tras B02/F02 |
| Skills/espejos/validador          | Codex integrador        | —                  | Reservada D04 |
| dist, preview y output/playwright | Sin asignar             | Builds y pruebas   | Sin reservar |

Las tareas de escenas reservan además su módulo, CSS y prueba. Un integrador administra cambios compartidos y aplica parches recibidos de otros agentes.

## Trazabilidad de requisitos

Esta tabla identifica responsables de implementación y cierre. Los IDs Rxx remiten a [FEEDBACK-01](../FEEDBACK-01.md).
Todas las filas conservan el estado final **pendiente de H02**; el piloto existente aporta trabajo previo.

| Requisito                          | Tareas responsables          | Comprobación de cierre                                                       |
| ---------------------------------- | ---------------------------- | ---------------------------------------------------------------------------- |
| R01 · Bibliografía 0               | B01, C04, E01, E07, G01, G02 | Material propio de cada sesión, inicio y acceso posterior; QA01.             |
| R02 · S00 y requisitos             | A03, B04, G01–G03            | S00 funcional y ensayo de adaptación; QA12.                                  |
| R03 · Directo/interactivo          | B03, C03, E02–E07, G02       | Misma explicación sin giro en directo; QA06.                                 |
| R04 · Flechas hacia afuera         | B02, E07                     | Preservación del piloto y revisión de cinco puntas visibles; QA09.           |
| R05 · Estadística → ML → IA        | B02, E07                     | Orden visual, DOM y teclado; revisión conceptual sin inferir inclusión.      |
| R06 · Ejemplo por explicación      | B01, C01, C03, E01, F01, F04 | Inventario completo con destino y fuente pertinente; QA07/QA11.              |
| R07 · Subslides                    | A02, B02, E01–E07, G02       | Una parte principal, navegación de todas las unidades; QA02/QA03.            |
| R08 · Apertura desde panel derecho | A02, E01–E07                 | Orden declarado y excepciones justificadas; QA02.                            |
| R09 · Rutas configurables          | B03, B04, E07, F04, G03      | Selector, contenido, URL y reset respetan selección; QA04.                   |
| R10 · Instancia visual             | C01, E01, E07, F01–F04       | Cada nodo ejemplifica el mismo caso por ruta; QA09/QA11.                     |
| R11 · Línea visual GPT             | D03, F02, F03                | Guía, prompts, assets inspeccionados y procedencia.                          |
| R12 · Preguntas docentes           | B03, C04, E01, E07, F04, G02 | Pregunta contextual y configuración true/false; QA08.                        |
| R13 · Sesiones progresivas         | A03, B03, B04, G02, G03      | Exclusión real de páginas/alias/backlinks; QA05.                             |
| R14 · Glosario contextual          | B01, C02, F01, F04, G02      | Definición canónica, acceso contextual y relaciones inversas; QA07.          |
| R15 · Precauciones                 | C04, E01, F04, G02           | Distinción delicada junto a contenido, independiente del modo docente; QA08. |
| R16 · Exoplanetas/estrellas        | C01, D02, E01, F01, F03, F04 | Auditoría de casos, fuentes, texto/alt/actividades; QA11.                    |
| Organización y agentes             | A01–A03, B02, D01–D04        | Contratos, propiedad de archivos, skills y entregas comprobadas.             |

H01 prueba el conjunto; H02 revisa la evidencia y cierra las filas. Las sesiones futuras necesitan pasar el mismo contrato: aceptar S00/S01 no acredita contenido que aún no existe.

## Defectos devueltos

| Defecto                                   | Tarea/AC | Reproducción y evidencia           | Responsable | Estado |
| ----------------------------------------- | -------- | ---------------------------------- | ----------- | ------ |
| Espejos protegidos ausentes | D04-AC3 | `npm run validate:skills:strict` termina con código 1 y reporta 8 espejos ausentes; las rutas `.codex/skills` y `.agents/skills` requieren permisos del entorno | Integrador/entorno | abierto |

## Decisiones pendientes reales

- D04 requiere sincronizar las skills canónicas con los espejos protegidos y repetir el modo estricto.
- C02 queda aceptada para la mecánica contextual; su E2E con una colección pública espera contenido aprobado.
- C03 deja la infraestructura de ejemplos lista con integración pendiente; F04 debe ensamblar ejemplos y precauciones revisadas en las unidades.
- F01 queda aceptada para preparación interna: la bibliografía de Géron/Kelleher y los casos primarios de RL/ExoGAN quedaron localizados; permanecen límites de transferencia, derechos, assets y revisión editorial.
- E07 y G02 quedan aceptadas para los motores comunes de S01 y S00; F01 queda aceptada para preparación interna. F03 dejó una entrega parcial revisable, bloqueada por la ausencia de `OPENAI_API_KEY`, la procedencia histórica y los derechos; F04, G03 y H01–H02 siguen pendientes por dependencias de contenido, integración o revisión.
- H03 espera instrucción expresa de publicación; no bloquea el cierre de implementación H02.

La disponibilidad de Docker se vuelve a comprobar cuando corresponda. El fallo histórico del piloto no demuestra que el entorno futuro seguirá bloqueado.
