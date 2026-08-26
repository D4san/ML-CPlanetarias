# Protocolo de ciclo de contenido

## Autoridad

`AGENTS.md` conserva invariantes y prohibiciones. `docs/architecture/OBSIDIAN_BRIDGE.md` es el contrato de frontera con el vault. Este documento define cómo un paquete cambia de estado dentro del repositorio.

## Un artefacto, un manifiesto

Cada `id` tiene un único archivo canónico con `kind`, `status`, procedencia y visibilidad. Un README auxiliar usa `packet_id` y no repite el estado. `inbox/INDEX.md` es una vista, no una fuente de verdad.

Estados permitidos:

```text
intake → drafting → reviewed → published
   └──────────────→ returned
```

- `intake`: llegó material, pero el alcance y la visibilidad no están confirmados.
- `drafting`: una persona confirmó el alcance; se puede aterrizar sin publicar.
- `reviewed`: pasaron procedencia, derechos, rigor, accesibilidad y revisión pedagógica.
- `published`: existe una publicación verificada. Requiere una instrucción explícita.
- `returned`: el paquete vuelve al vault con una observación, decisión o bloqueo.

`publish_ready` es un seguro adicional, no otro estado. Solo puede ser `true` en contenido `reviewed` o `published`, con `visibility: public`. Ningún script debe inferirlo desde la carpeta o el estado.

## Promoción a contenido web

1. Leer el manifiesto y resolver `source_note` desde `config/obsidian.local.yaml` si se necesita el vault.
2. Confirmar alcance, visibilidad, procedencia, derechos y límites científicos.
3. Crear una versión propia y revisada en la colección adecuada de `docs/content/`.
4. Conservar `source_note` y `source_heading`; nunca copiar una ruta absoluta local.
5. Declarar los conceptos por ID. Las páginas inversas del glosario se calculan durante el build.
6. Ejecutar validación de esquema, pruebas y build bajo `/preview`.
7. Cambiar el estado canónico solo con evidencia y autoridad suficientes.

La promoción nunca consiste en mover o copiar automáticamente un archivo de `inbox/`. Una página pública es una nueva representación revisada.

## Colecciones públicas

- `docs/content/sessions/`: sesiones aprobadas.
- `docs/content/concepts/`: conceptos atómicos publicables.
- `docs/content/exercises/`: ejercicios y desafíos acotados.

Las colecciones exigen `status: reviewed | published`, `visibility: public`, `publish_ready: true`, procedencia portable y una declaración de derechos. Si no hay entradas, el sitio muestra estados vacíos honestos.

## Devoluciones

Un hallazgo que deba modificar una nota, decisión o paquete del vault se registra en `outbox/` según su esquema. El repositorio no edita el vault silenciosamente.
