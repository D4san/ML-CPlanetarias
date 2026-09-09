---
packet_id: S00-MLCP-de-los-mundos-a-los-datos
kind: session-packet
status: drafting
origin: obsidian
source_vault: DASAN
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S00 - De los mundos a los datos - Introducción al ML para exoplanetas.md
source_heading: "S00 — De los mundos a los datos: introducción al ML para exoplanetas"
visibility: internal
publish_ready: false
rights: pending
---

# S00 — De los mundos a los datos

Este paquete lleva al repositorio la versión actual de la sesión introductoria del curso. La
nota fuente de Obsidian conserva el guion completo, las decisiones pedagógicas, la galería de
observatorios, la jerarquía de datos, la galería de impacto cuantificado, las actividades, la
transferencia docente y la bibliografía de trabajo.

La copia literal recibida se conserva en [S00 - De los mundos a los datos - Introducción al ML
para exoplanetas.md](./S00%20-%20De%20los%20mundos%20a%20los%20datos%20-%20Introducci%C3%B3n%20al%20ML%20para%20exoplanetas.md).
La fuente original permanece en Obsidian; la copia del inbox facilita la revisión del repositorio
y no reemplaza la procedencia declarada en `source_note`.

## Relación con el paquete técnico anterior

El repositorio conserva `inbox/sessions/S00-MLCP-introduction/`, un paquete con `origin: repo`
dedicado a la guía técnica del fork. Este paquete tiene `origin: obsidian` y representa la
arquitectura pedagógica de la clase. Ambos pueden colaborar: la Unidad 0 y la Unidad 9 de esta
entrega dialogan con la orientación técnica del fork, mientras las Unidades 1–8 desarrollan el
recorrido científico y de ML.

## Estado editorial

- `status: drafting`: el material está preparado para revisión e integración posterior.
- `visibility: internal`: el diseño detallado permanece en el circuito de trabajo.
- `publish_ready: false`: la presencia del paquete en `inbox/` no habilita publicación.
- `rights: pending`: las imágenes de misiones, observatorios y páginas externas requieren una
  revisión de derechos y una decisión de uso antes de pasar a `docs/content/`.
- La nota fuente continúa siendo la referencia completa; este archivo y `SESSION_PACKET.md` son
  un handoff portable para el repositorio.

## Alcance recibido

La sesión está diseñada para aproximadamente 90 minutos y presenta una pregunta conductora:

> ¿Cómo pasamos de una pregunta sobre mundos lejanos a datos, tareas de ML, evidencia y límites
> interpretables?

El recorrido conecta:

```text
pregunta científica → unidad de análisis → datos/representación → señal de aprendizaje
→ tarea → familia de modelo → evaluación → interpretación y límites → transferencia docente
```

El paquete lleva el desarrollo completo de la sesión y deja explícitas las tareas de integración:
crear la página S00, convertir las tarjetas y galerías en componentes revisables, atomizar los
conceptos, comprobar los enlaces y decidir qué assets tienen autorización para uso web.

## Próxima revisión

1. Revisar la procedencia de cada cifra, enlace e imagen.
2. Resolver audiencia, duración final, licencia y estado de publicación.
3. Convertir la arquitectura en una ficha de interacción antes de implementar una interacción
   principal.
4. Promover únicamente los fragmentos revisados a `docs/content/`, `glossary/`, `exercises/` o
   `public/` según corresponda.

El paquete queda en `intake` operativo del repositorio, con metadatos editoriales conservadores y
sin cambios automáticos en el contenido público.
