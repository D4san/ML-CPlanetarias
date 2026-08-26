# Contrato Obsidian ↔ repositorio

## Roles

Obsidian/DASAN es la fuente privada de planeación, conceptos, guiones, relaciones semánticas, fuentes y transferencia docente. Este repositorio es el espacio de aterrizaje reproducible y de publicación eventual.

No existe una sincronización automática de carpetas. La unidad de comunicación es un **paquete** con procedencia y estado.

## Requisitos que el repo debe conservar

El producto final es una web educativa del curso, potencialmente publicada con GitHub Pages. El agente debe tratar como requisitos de contenido, aunque la tecnología web siga pendiente:

- sesiones quincenales con guion, preguntas, misconcepciones, red conceptual y fuentes;
- glosario bidireccional entre conceptos, sesiones, ejercicios y aplicaciones;
- integración explícita de las tres líneas: problemas astronómicos, teoría formal ML y aplicaciones;
- ecuaciones, gráficos originales y procedencia bibliográfica;
- notebooks ejecutables y enlaces a Colab solo después de probarlos;
- material reutilizable por tutores y adaptable a futuras electivas.

La estructura del repo debe permitir que `inbox/` conserve el diseño detallado y que `docs/` sea una salida revisada para la web. No se debe elegir todavía Jupyter Book, MkDocs u otra herramienta sin una decisión posterior.

## Referencias

Cada paquete debe incluir:

```yaml
source_vault: DASAN
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
source_heading: Guion
source_block: "opcional: ^block-id"
```

`source_note` es portable y relativo al vault. Para resolverlo localmente:

1. leer `config/obsidian.local.yaml`;
2. tomar `vault.root`;
3. unirlo con `source_note`;
4. si el archivo no existe, informar el problema y no sustituir la ruta por una inferida.

Los documentos que puedan publicarse deben conservar `source_note`, pero nunca una ruta personal como `E:/...`.

## Paquetes

Un paquete puede ser una sesión, concepto, ejercicio, notebook o figura. El archivo de entrada debe incluir al menos:

```yaml
id: S01-ML-IA-metodos-estadisticos
kind: session
status: intake
source_vault: DASAN
source_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
concepts:
  - Paradigma, tarea y familia de modelo
  - Generalización y sesgo inductivo
source_refs:
  - Géron, cap. 1
  - Kelleher, caps. 1–2 y 8
visibility: internal
publish_ready: false
```

Los estados permitidos son `intake`, `drafting`, `reviewed`, `published` y `returned`.

## Privacidad

- Los libros completos y sus extracciones permanecen en el vault privado.
- `inbox/` puede contener teoría propia, ecuaciones, gráficos originales y decisiones de diseño, pero no material cuya redistribución no esté autorizada.
- Lo que no esté listo o permitido se guarda en `inbox-private/`, que no se versiona.
- La presencia de un paquete en `inbox/` no significa autorización de publicación.

## Devolución al vault

Las observaciones del desarrollo se escriben en `outbox/` con:

```yaml
packet: S01-ML-IA-metodos-estadisticos
artifact: docs/...
vault_note: 01 Temas/Academia/Maestría/ML Ciencias Planetarias/01 Sesiones/S01 - ML, IA y métodos estadísticos.md
vault_heading: Producción digital temporal
kind: observation | proposal | reproducible-error | decision
status: open
```

El vault decide si esa salida se convierte en modificación, concepto, tarea o decisión. El repo no sobrescribe notas de Obsidian.
