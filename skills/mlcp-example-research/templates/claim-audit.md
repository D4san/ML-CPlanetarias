# Auditoría de una afirmación

Una fila corresponde a una afirmación comprobable. No uses una URL sin ubicación como evidencia.

```yaml
claim_id: claim-id-stable
claim_type: source-fact
claim: "[redacción exacta que se quiere usar]"
source_id: source-id-stable
source_url: "[URL o DOI]"
location: "[página, sección, figura, tabla o párrafo]"
accessed: "AAAA-MM-DD"
status: pendiente
source_supports: "[qué respalda literalmente o mediante paráfrasis]"
source_does_not_support: "[qué queda fuera]"
limit: "[límite interpretativo, de datos o de método]"
```

## Prueba de cierre

- `verificado`: se abrió y leyó la fuente real; `location` y `accessed` permiten volver al pasaje;
  la redacción no excede el soporte y el límite está escrito.
- `parcial`: solo una parte está localizada o el recurso es secundario; reduce la afirmación y
  enumera el campo pendiente.
- `pendiente`: enlace inaccesible, fuente no leída, ubicación ausente o método/derecho sin
  comprobar. Registra una siguiente acción y no lo eleves a fuente validada.

## Ensayo Kepler/TCE

```yaml
claim_id: claim-kepler-pipeline-tce
claim_type: source-fact
claim: "La documentación describe una entrada de flujo PDC y banderas de calidad que se prepara para buscar señales periódicas tipo tránsito; un máximo MES que supera otros vetos se convierte en TCE y pasa a Data Validation."
source_id: kepler-dv-timeseries-2016
source_url: "https://archive.stsci.edu/files/live/sites/mast/files/home/missions-and-data/kepler/_documents/DVTimeSeries-Description.pdf"
location: "PDF pp. 5–6, §1 Introduction"
accessed: "2026-09-08"
status: verificado
source_supports: "flujo de entrada, preparación, búsqueda, TCE y evaluación descrito por el documento"
source_does_not_support: "que el flujo sea un modelo de ML, que un TCE sea un planeta confirmado o que exista una exactitud concreta"
limit: "la documentación de producto explica el pipeline y sus productos; no ofrece el desempeño de una clasificación ML para la unidad didáctica"
```

El derecho de enlazar esta fuente, el derecho de reutilizar una figura y la procedencia de una
figura propia se auditan en la ficha de ejemplo; no se mezclan con el estado de esta afirmación.
