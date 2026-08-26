# Protocolo de procedencia, privacidad y derechos

## Procedencia mínima

Toda entrada pública declara:

- `source_vault`;
- `source_note`, relativa a la raíz del vault;
- `source_heading` y, si existe, `source_block`;
- `source_refs` para bibliografía o datasets;
- `rights.status` y `rights.note`.

`source_note` identifica el origen pedagógico, no concede derechos de publicación. Una fuente bibliográfica respalda una afirmación, pero no autoriza copiar texto, figuras o datos.

## Estados de derechos para contenido público

- `original`: texto, código o figura propia del curso.
- `open-license`: material compatible con la licencia indicada y atribuido según sus términos.
- `permission`: existe autorización documentada para ese uso.

Si no se puede elegir uno de esos estados, el material permanece en `inbox/` o `inbox-private/`.

## Separaciones obligatorias

Distinguir en la redacción:

1. afirmación o definición respaldada por una fuente;
2. paráfrasis propia del curso;
3. ejemplo o decisión pedagógica;
4. límite de la evidencia o del modelo.

No versionar libros completos, extracciones privadas, credenciales, rutas personales ni datos sin permiso. `config/obsidian.local.yaml` y `inbox-private/` permanecen ignorados.

## Código ejecutable y MDX

MDX ejecuta imports y expresiones durante el build. Solo se carga desde `docs/content/`, después de revisión. Un paquete recibido, un adjunto o un notebook no se ejecuta por el hecho de estar en `inbox/`.

## Figuras, datasets y notebooks

Registrar fuente, transformación, licencia, unidades, semillas y límites. Una demostración ejecutable no equivale a evidencia científica. Un enlace a Colab solo se publica después de ejecutar el notebook desde un entorno limpio y comprobar sus recursos.
