---
id: contextual-glossary
status: draft
page: glosario y unidades explicativas
packet_id: C02
---

# Glosario contextual

## Pregunta del lector

¿Qué significa este término aquí y cómo puedo volver a la explicación completa sin perder mi
lugar?

## Objetivo de aprendizaje

El lector distingue una definición breve de su desarrollo completo y relaciona el concepto con las
sesiones y ejercicios públicos que lo declaran.

## Estado inicial y fallback

Cada aparición recibe el mismo `ConceptTermData` desde la entrada pública del glosario: ID, término,
resumen breve, aliases y enlace a la entrada completa. El componente usa un `<details>` nativo; el
resumen está cerrado inicialmente y el contenido queda en el HTML estático.

Si el concepto no existe o no tiene un enlace completo, no se dibuja un control vacío. La unidad
conserva el texto que ya tenga y la validación editorial impide publicar una referencia incompleta.

## Variables

| Variable | Símbolo | Rango | Inicial | Unidad | Control |
| --- | --- | --- | --- | --- | --- |
| Estado de la aclaración | `open` | `false` / `true` | `false` | booleano | `<summary>` nativo |
| Entrada completa | `fullHref` | URL interna no vacía | declarada por la entrada | ruta | enlace HTML |
| Aparición | `instanceId` | ID generado por React | estable durante el render | ID DOM | no visible |

## Codificación visual

- marcas y geometría: el término conserva el flujo del texto; la definición aparece debajo en un
  panel delimitado;
- significado del color: el tono de datos señala el enlace y el tono neutro identifica la acción
  de aclarar; el significado permanece en el texto y la semántica HTML;
- etiquetas: el resumen anuncia `Aclarar <término>` y el enlace anuncia la entrada completa;
- animación: ninguna transición es necesaria para comprender el estado; movimiento reducido deja
  la apertura nativa sin animación.

## Comportamiento

- al cambiar: clic, toque o `Enter`/espacio sobre el `<summary>` alternan la definición; el enlace
  lleva a `/glosario/<id>/` o a la ruta equivalente con base configurada;
- al reiniciar: la navegación o cambio de subslide desmonta la aparición y no conserva foco en un
  panel desmontado;
- con teclado: `Tab` llega al resumen y después al enlace; `Enter`/espacio abren o cierran; `Escape`
  cierra y devuelve el foco al mismo resumen;
- en móvil: el panel fluye debajo del término y usa como máximo el ancho disponible, sin depender
  de hover ni de un tooltip;
- con movimiento reducido: no se usa una animación imprescindible;
- ante error o datos vacíos: el registro ausente no genera un control; las relaciones inversas se
  calculan por IDs y filtran sesiones y ejercicios no disponibles.

## Texto alrededor de la figura

- pie: no aplica; el componente acompaña texto editorial;
- qué observar: término original, definición breve, aliases y vínculo a la entrada completa;
- resumen de estado: el resumen nativo anuncia si la aclaración está cerrada o abierta;
- misconcepción prevenida: un alias o una aparición contextual no crea una definición distinta;
- qué no demuestra: una definición enlazada no sustituye la evidencia, fuentes o límites del
  concepto completo.

## Matriz de pruebas

- [x] término repetido con IDs de resumen/panel únicos;
- [x] clic, `Enter`/espacio, `Escape` y retorno de foco;
- [x] enlace completo en HTML sin JavaScript mediante `<details>` y `<a>`;
- [x] cambio de concepto/ruta con la aclaración abierta;
- [x] concepto inexistente sin control vacío;
- [ ] prueba E2E con una colección pública aprobada cuando exista la primera entrada en
  `docs/content/concepts/`;
- [x] relación inversa de sesiones y ejercicios con disponibilidad aplicada.

