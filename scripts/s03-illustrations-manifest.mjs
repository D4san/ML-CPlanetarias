import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const items = [
  {
    file: 's03-variabilidad-conceptual.png',
    unit: '3.1',
    screenId: 's03-lookalikes-1',
    case: 'Actividad estelar con manchas como causa de variabilidad del flujo.',
    purpose:
      'Hacer visible una causa de variación del flujo independiente del tránsito planetario.',
    alt: 'Ilustración conceptual generada de una estrella con manchas oscuras y textura superficial activa; no corresponde a una imagen observada por Kepler.',
    caption:
      'Ilustración conceptual generada. Las manchas representan actividad superficial; no muestran datos ni una estrella identificada.',
    sourceRefs: ['mast-kepler-products', 'shallue-vanderburg-2017'],
    limits: [
      'No identifica una estrella ni representa una observación de Kepler.',
      'Granulación, colores, luminosidad y manchas son cualitativos; no permiten inferir temperatura, distancia ni magnitudes medidas.',
    ],
    reviewFinding:
      'La guía registra inspección intrínseca: no hay texto inventado, la composición es horizontal y las manchas son reconocibles.',
  },
  {
    file: 's03-eclipsante-mezcla-conceptual.png',
    unit: '3.2',
    screenId: 's03-lookalikes-2',
    case: 'Binaria eclipsante conceptual: una estrella menor pasa delante de otra mayor.',
    purpose:
      'Mostrar una explicación alternativa que puede producir una caída de luz parecida a un tránsito.',
    alt: 'Ilustración conceptual generada de una estrella menor pasando delante de otra mayor en una binaria eclipsante; no es un sistema observado ni está a escala.',
    caption:
      'Ilustración conceptual generada de una binaria eclipsante. La mezcla de fuentes se explica en el texto y no está cuantificada en la imagen.',
    sourceRefs: ['shallue-vanderburg-2017'],
    limits: [
      'No representa un sistema observado concreto y sus tamaños no están a escala.',
      'La mezcla de fuentes se explica fuera de la imagen; la ilustración no cuantifica dilución ni profundidad de eclipse.',
    ],
    reviewFinding:
      'La guía registra inspección intrínseca: las siluetas eclipsantes son distinguibles; no se infiere escala.',
  },
  {
    file: 's03-transit-star-conceptual.png',
    unit: '1.1',
    screenId: 's03-transit-1',
    case: 'Disco estelar conceptual en la vista proyectada de un tránsito.',
    purpose:
      'Aportar textura de superficie y resplandor suave sin sustituir la geometría calculada en SVG.',
    alt: 'Disco estelar naranja con granulación y borde difuso en el centro de una órbita circular proyectada.',
    caption:
      'La estrella es una ilustración generada con IA; la órbita y la curva muestran un modelo ideal.',
    sourceRefs: [],
    limits: [
      'La granulación, el color y el resplandor son cualitativos y no corresponden a una observación.',
      'La imagen solo aporta textura; posición orbital, radio y flujo permanecen definidos por el esquema y el modelo.',
    ],
    reviewFinding:
      'Imagen RGBA de 1254×1254 px con alfa cero en las cuatro esquinas; inspección visual integrada registrada en la evidencia de S03.',
    reviewFindings: [
      'Imagen RGBA de 1254×1254 px con alfa cero en las cuatro esquinas; el render integrado se revisó sobre fondo oscuro a 1280×720.',
      'La integración a otros tamaños y sobre fondo claro queda pendiente; la política del navegador bloqueó la vista temporal usada para esa comparación.',
    ],
    toolProcess: 'Imagen generada con ImageGen el 2026-10-20; PNG RGBA copiado sin edición.',
    sourceHeading: 'Ilustración focal de la pantalla 1.1',
    styleFamily:
      'Ilustración estelar astronómica realista de S03, con granulación, borde difuso y resplandor tenue, sin etiquetas ni texto.',
    backgroundMode: 'transparent-alpha',
    alphaStatus: 'pending',
    reviewInspectedAt: '2026-10-20',
    reviewContexts: ['intrinsic-size', 'alpha-channel', 'background-dark', '1280x720'],
  },
  {
    file: 's03-kepler-pixel-source.png',
    unit: '2.2',
    screenId: 's03-mission-2',
    case: 'Fuente puntual estelar difuminada sobre píxeles de detector conceptuales.',
    purpose:
      'Mostrar que la luz de una estrella se distribuye entre celdas antes de seleccionar una apertura y sumar sus flujos por cadencia.',
    alt: 'Fuente estelar puntual con núcleo blanco y halo ámbar suave sobre transparencia; la imagen aporta el brillo que aparece bajo la retícula exacta de la escena.',
    caption:
      'El halo hace visible la luz repartida; las celdas y sus flujos se definen en la escena interactiva.',
    sourceRefs: ['mast-kepler-products', 'nasa-kepler-data-overview', 'jenkins-kepler-pipeline'],
    limits: [
      'La fuente luminosa es cualitativa; la cuadrícula, los flujos, la apertura y la curva se dibujan por separado en HTML/SVG.',
      'No representa una exposición identificada ni una distribución medida del detector Kepler.',
    ],
    reviewFinding:
      'El canal alfa real deja transparente el exterior; el halo aparece detrás de las celdas etiquetadas y la apertura seleccionada se distingue por su borde ámbar.',
    reviewFindings: [
      'PNG RGBA de 1254×1254 px (739 814 bytes); alfa cero en las cuatro esquinas y rango muestreado de 0 a 253.',
      'La vista integrada a 1299×884 muestra el halo tras la retícula y la apertura junto a la ecuación y la curva; el halo se distingue también sobre fondo claro.',
      'A 390×844, el documento mide 390 px y la diapositiva 332 px de ancho, sin desbordamiento horizontal; el contenido requiere desplazamiento vertical.',
    ],
    toolProcess:
      'ImageGen el 2026-10-20 produjo el halo puntual en PNG transparente; la retícula, las etiquetas, la máscara, la fórmula y la curva se implementan con HTML/CSS/SVG.',
    sourcePath: 'docs/guides/s03-pixel-flux-visual.md',
    sourceHeading: 'Ficha de encargo visual',
    styleFamily:
      'Fuente astronómica puntual para S03, con núcleo blanco-dorado y halo suave; sin disco resuelto, texto ni retícula rasterizada.',
    backgroundMode: 'transparent-alpha',
    alphaStatus: 'passed',
    transformation:
      'PNG RGBA generado sin edición; se escala detrás de una retícula HTML de 5 × 5 celdas.',
    reviewInspectedAt: '2026-10-20',
    reviewContexts: [
      'intrinsic-size',
      'alpha-channel',
      'background-dark',
      'background-light',
      '1299x884',
      '390x844',
    ],
  },
  {
    file: 's03-classification-tce-conceptual.png',
    unit: '4.3',
    screenId: 's03-classification-3',
    case: 'Señal detectada con forma de tránsito cuya causa todavía debe clasificarse.',
    purpose:
      'Presentar el evento que el sistema de búsqueda detecta como instancia de clasificación.',
    alt: 'Una estrella brillante vista a través de un telescopio; una pequeña silueta oscura aparece sobre el borde del disco estelar.',
    caption: 'Señal con forma de tránsito detectada; su causa se clasifica después.',
    sourceRefs: ['shallue-vanderburg-2017'],
    limits: [
      'La escena representa una apariencia posible de TCE, no una detección identificada.',
      'La figura no demuestra que el evento sea causado por un planeta.',
    ],
    reviewFinding:
      'Inspección intrínseca: el telescopio, la estrella y una silueta oscura son reconocibles; no hay etiquetas ni escala.',
    reviewFindings: [
      'Inspección intrínseca: el telescopio, la estrella y una silueta oscura son reconocibles; no hay etiquetas ni escala.',
      'Integrada en 1299×884 y 390×844: el telescopio y la señal ocupan el encuadre 16:9; en móvil la tarjeta se apila y el texto se lee con desplazamiento vertical, sin desbordamiento horizontal.',
    ],
    toolProcess:
      'ImageGen integrado el 2026-10-20; PNG horizontal copiado sin edición; la ficha conserva el encargo.',
    sourcePath: 'docs/guides/s03-classification-illustrations.md',
    sourceHeading: 'TCE — señal detectada',
    styleFamily:
      'Ilustración astronómica realista de S03: luz sobria, espacio azul oscuro, pocos objetos y composición horizontal.',
    backgroundMode: 'opaque',
    alphaStatus: 'not-applicable',
    transformation: 'Copia PNG sin retoque; se integra en una ventana 16:9 con object-fit: cover.',
    reviewInspectedAt: '2026-10-20',
    reviewContexts: ['intrinsic-size', '1299x884', '390x844'],
  },
  {
    file: 's03-classification-pc-conceptual.png',
    unit: '4.3',
    screenId: 's03-classification-3',
    case: 'Escena conceptual de una señal compatible con un candidato planetario.',
    purpose: 'Ilustrar la interpretación planetaria que el estudio asigna a la referencia PC.',
    alt: 'Un solo cuerpo oscuro cruza el disco de una estrella brillante.',
    caption: 'Escena conceptual de una señal compatible con un candidato planetario.',
    sourceRefs: ['shallue-vanderburg-2017'],
    limits: ['La imagen no determina el estado de confirmación de una señal del catálogo.'],
    reviewFinding:
      'Inspección intrínseca: una sola silueta y la estrella son distinguibles; no aparecen rótulos, escala ni datos observados.',
    reviewFindings: [
      'Inspección intrínseca: una sola silueta y la estrella son distinguibles; no aparecen rótulos, escala ni datos observados.',
      'Integrada en 1299×884 y 390×844: un solo cuerpo cruza el disco estelar en el encuadre 16:9; en móvil la tarjeta se apila y conserva el ancho del documento.',
    ],
    toolProcess:
      'ImageGen integrado el 2026-10-20; PNG horizontal copiado sin edición; la ficha conserva el encargo.',
    sourcePath: 'docs/guides/s03-classification-illustrations.md',
    sourceHeading: 'PC — clase planetaria',
    styleFamily:
      'Ilustración astronómica realista de S03: luz sobria, espacio azul oscuro, pocos objetos y composición horizontal.',
    backgroundMode: 'opaque',
    alphaStatus: 'not-applicable',
    transformation: 'Copia PNG sin retoque; se integra en una ventana 16:9 con object-fit: cover.',
    reviewInspectedAt: '2026-10-20',
    reviewContexts: ['intrinsic-size', '1299x884', '390x844'],
  },
  {
    file: 's03-classification-afp-conceptual.png',
    unit: '4.3',
    screenId: 's03-classification-3',
    case: 'Binaria eclipsante como explicación astrofísica de una caída parecida a un tránsito.',
    purpose:
      'Distinguir AFP de una señal planetaria mediante una explicación astrofísica alternativa.',
    alt: 'Dos estrellas de distinto brillo se superponen en la línea de visión; la estrella menor eclipsa parcialmente a la mayor.',
    caption: 'Una binaria eclipsante puede producir una caída parecida a un tránsito.',
    sourceRefs: ['shallue-vanderburg-2017'],
    limits: [
      'La escena no representa un sistema concreto ni cuantifica la profundidad del eclipse.',
      'Los tamaños y colores son cualitativos y no están a escala.',
    ],
    reviewFinding:
      'Inspección intrínseca: las dos estrellas y su superposición se distinguen; no hay tercer cuerpo, etiquetas ni escalas.',
    reviewFindings: [
      'Inspección intrínseca: las dos estrellas y su superposición se distinguen; no hay tercer cuerpo, etiquetas ni escalas.',
      'Integrada en 1299×884 y 390×844: la superposición de las dos estrellas se reconoce en el encuadre 16:9; la tarjeta se apila en móvil sin desbordamiento horizontal.',
    ],
    toolProcess:
      'ImageGen integrado el 2026-10-20; PNG horizontal copiado sin edición; la ficha conserva el encargo.',
    sourcePath: 'docs/guides/s03-classification-illustrations.md',
    sourceHeading: 'AFP — falso positivo astrofísico',
    styleFamily:
      'Ilustración astronómica realista de S03: luz sobria, espacio azul oscuro, pocos objetos y composición horizontal.',
    backgroundMode: 'opaque',
    alphaStatus: 'not-applicable',
    transformation: 'Copia PNG sin retoque; se integra en una ventana 16:9 con object-fit: cover.',
    reviewInspectedAt: '2026-10-20',
    reviewContexts: ['intrinsic-size', '1299x884', '390x844'],
  },
  {
    file: 's03-classification-ntp-conceptual.png',
    unit: '4.3',
    screenId: 's03-classification-3',
    case: 'Variabilidad estelar como ejemplo de señal sin tránsito planetario.',
    purpose: 'Mostrar una causa de variación del brillo que no necesita un planeta en tránsito.',
    alt: 'Una estrella con varias manchas oscuras sobre su superficie y sin un cuerpo que cruce delante de ella.',
    caption: 'La actividad estelar puede variar el brillo sin un tránsito planetario.',
    sourceRefs: ['shallue-vanderburg-2017'],
    limits: [
      'La variabilidad estelar es un ejemplo del grupo, no la única causa posible de un NTP.',
      'Las manchas y el brillo son cualitativos; no identifican una estrella observada.',
    ],
    reviewFinding:
      'Inspección intrínseca: las manchas estelares son visibles y no hay planeta, explosión, etiquetas ni magnitudes.',
    reviewFindings: [
      'Inspección intrínseca: las manchas estelares son visibles y no hay planeta, explosión, etiquetas ni magnitudes.',
      'Integrada en 1920×1080, 1440×900, 1024×768, 1299×884 y 390×844: la estrella y sus manchas permanecen visibles; en los formatos amplios imagen y texto van en paralelo, y en móvil se apilan sin desbordamiento horizontal.',
    ],
    toolProcess:
      'ImageGen integrado el 2026-10-20; PNG horizontal copiado sin edición; la ficha conserva el encargo.',
    sourcePath: 'docs/guides/s03-classification-illustrations.md',
    sourceHeading: 'NTP — fenómeno no transitorio',
    styleFamily:
      'Ilustración astronómica realista de S03: luz sobria, espacio azul oscuro, pocos objetos y composición horizontal.',
    backgroundMode: 'opaque',
    alphaStatus: 'not-applicable',
    transformation: 'Copia PNG sin retoque; se integra en una ventana 16:9 con object-fit: cover.',
    reviewInspectedAt: '2026-10-20',
    reviewContexts: ['intrinsic-size', '1920x1080', '1440x900', '1024x768', '1299x884', '390x844'],
  },
  {
    file: 's03-classification-fp-conceptual.png',
    unit: '4.3',
    screenId: 's03-classification-3',
    case: 'Ejemplo de señal no planetaria que recibe una predicción de planeta.',
    purpose:
      'Acompañar el desacuerdo entre la referencia negativa del catálogo y la predicción del clasificador.',
    alt: 'Una estrella con manchas se observa a través de una lente; una sombra aparente cruza la luz, aunque no se ve un planeta.',
    caption: 'Una señal no planetaria puede recibir una predicción de planeta.',
    sourceRefs: ['shallue-vanderburg-2017', 'geron-classification'],
    limits: [
      'El caso es un ejemplo pedagógico de FP, no un error reportado por el artículo.',
      'La imagen no muestra un puntaje ni un umbral; la relación exacta vive en HTML.',
    ],
    reviewFinding:
      'Inspección intrínseca: una estrella con manchas y una sombra aparente son visibles; no hay texto ni etiquetas técnicas.',
    reviewFindings: [
      'Inspección intrínseca: una estrella con manchas y una sombra aparente son visibles; no hay texto ni etiquetas técnicas.',
      'Integrada en 1920×1080, 1024×768, 1299×884 y 390×844: las tres etapas conservan su relación de izquierda a derecha en escritorio y se apilan en móvil; el texto y las fuentes se alcanzan con desplazamiento vertical, sin desbordamiento horizontal.',
    ],
    toolProcess:
      'ImageGen integrado el 2026-10-20; PNG horizontal copiado sin edición; la ficha conserva el encargo.',
    sourcePath: 'docs/guides/s03-classification-illustrations.md',
    sourceHeading: 'FP — error del clasificador',
    styleFamily:
      'Ilustración astronómica realista de S03: luz sobria, espacio azul oscuro, pocos objetos y composición horizontal.',
    backgroundMode: 'opaque',
    alphaStatus: 'not-applicable',
    transformation: 'Copia PNG sin retoque; se integra en una ventana 16:9 con object-fit: cover.',
    reviewInspectedAt: '2026-10-20',
    reviewContexts: ['intrinsic-size', '1920x1080', '1024x768', '1299x884', '390x844'],
  },
];
const assets = [];
for (const item of items) {
  const {
    file,
    unit,
    purpose,
    case: assetCase,
    alt,
    caption,
    sourceRefs,
    limits,
    reviewFinding,
    reviewFindings,
    toolProcess,
    sourceHeading,
    sourcePath,
    transformation,
    styleFamily,
    backgroundMode,
    alphaStatus,
    reviewInspectedAt,
    reviewContexts,
  } = item;
  const bytes = await readFile(new URL(`../public/images/s03/${file}`, import.meta.url));
  assets.push({
    id: file.replace('.png', ''),
    file: `public/images/s03/${file}`,
    type: 'conceptual',
    unit: `S03 / ${unit}`,
    case: assetCase,
    purpose,
    tool_process:
      toolProcess ??
      'ImageGen integrado según el brief común de S03; la guía no registra versión ni parámetros del modelo.',
    style_family:
      styleFamily ??
      'Ilustración astronómica realista de S03: iluminación sobria, pocos objetos y márgenes para rótulos HTML externos.',
    width: bytes.readUInt32BE(16),
    height: bytes.readUInt32BE(20),
    weight_bytes: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex'),
    alt,
    caption,
    generation_method: 'imagegen',
    background_mode: backgroundMode ?? 'opaque',
    alpha_status: alphaStatus ?? 'not-applicable',
    rights: {
      status: 'original',
      note: 'Ilustración generada para el curso; no observación ni simulación calibrada.',
    },
    provenance: {
      origin: 'repo',
      source_path: sourcePath ?? 'docs/guides/s03-illustrations.md',
      source_heading: sourceHeading ?? 'Brief común',
      source_refs: [`src/lib/s03-content.ts#${item.screenId}`, ...sourceRefs],
      transformation: transformation ?? 'Copia de la salida PNG elegida; sin edición posterior.',
      units: null,
      seed: null,
    },
    limits,
    review: {
      status: 'pending',
      inspected_at: reviewInspectedAt ?? '2026-10-19',
      contexts: reviewContexts ?? [
        'intrinsic-size',
        '1920x1080',
        '1440x900',
        '1024x768',
        '390x844',
      ],
      findings: reviewFindings ?? [
        reviewFinding,
        'Inspección integrada completada en 1920×1080, 1440×900, 1024×768 y 390×844; imágenes completas sin desbordamiento horizontal. Las ventanas bajas permiten desplazamiento vertical para leer pies y fuentes; la aceptación editorial y los goldens Linux siguen pendientes.',
      ],
    },
  });
}
await writeFile(
  new URL('../public/images/s03/s03-illustrations.manifest.json', import.meta.url),
  `${JSON.stringify({ id: 's03-illustrations', date: '2026-10-20', assets }, null, 2)}\n`,
);
console.log(`Manifiesto actualizado: ${assets.length} ilustraciones.`);
