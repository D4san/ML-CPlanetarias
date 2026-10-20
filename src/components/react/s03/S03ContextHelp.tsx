import S03InfoDialog from './S03InfoDialog';
import './s03-context-help.css';

type Term = { title: string; explanation: string; example?: string; implication?: string };

const terms = {
  transit: {
    title: 'Tránsito',
    explanation:
      'Ocurre cuando, desde nuestra línea de visión, un planeta pasa delante de su estrella y bloquea una fracción pequeña de su luz. El telescopio registra una disminución del flujo estelar.',
    example:
      'En un modelo simple de discos y una estrella uniforme, una razón de radios k = Rp/R* = 0,10 produce una caída central aproximada k² = 1 %.',
    implication:
      'La caída por sí sola no identifica al objeto que la causó. La geometría, la repetición y los diagnósticos permiten evaluar la hipótesis planetaria.',
  },
  repetition: {
    title: 'Repetición y período',
    explanation:
      'Si eventos semejantes regresan con intervalos regulares, la separación entre sus centros permite estimar el período orbital P.',
    example:
      'Si cuatro centros consecutivos aparecen en t₀, t₀+P, t₀+2P y t₀+3P, sus separaciones son P.',
    implication:
      'Una caída única no determina el período. También se comprueba si los eventos mantienen forma y duración compatibles.',
  },
  'impact-parameter': {
    title: 'Parámetro de impacto',
    explanation:
      'b mide la separación proyectada entre los centros de estrella y planeta en el instante de conjunción, expresada en radios estelares. Para una órbita circular, b = (a/R*) cos(i).',
    example:
      'Con a/R* = 8 e i = 90°, b = 0: el planeta cruza el centro. Al aumentar b, el trayecto se acerca al borde; para b ≥ 1+k ya no hay tránsito.',
    implication:
      'b determina la cuerda que recorre el planeta y ayuda a distinguir un tránsito central, uno no central y uno rasante.',
  },
  'limb-darkening': {
    title: 'Oscurecimiento al limbo',
    explanation:
      'El disco de una estrella se ve más brillante en el centro que cerca del borde. En la ley lineal, I(μ)=1−u(1−μ), donde μ=1 en el centro y μ=0 en el borde.',
    example: 'Con u=0,6, el perfil normalizado vale 1 en el centro y 0,4 en el limbo.',
    implication:
      'El mismo planeta bloquea intensidades distintas a lo largo de la cuerda. Por eso la curva de luz cambia de forma respecto a la estrella uniforme.',
  },
  'transit-depth': {
    title: 'Profundidad y duración',
    explanation:
      'La profundidad ΔF es la fracción de flujo que se pierde durante el tránsito. T₁₄ mide de primer a cuarto contacto; T₂₃, de segundo a tercer contacto.',
    example:
      'Para una estrella uniforme, sin dilución y un tránsito completo, ΔF ≈ k². Una cuerda rasante puede tener una forma y profundidad distintas.',
    implication:
      'Estas cantidades restringen la geometría y el tamaño relativo bajo supuestos explícitos; no bastan para validar un planeta.',
  },
  cadence: {
    title: 'Cadencia y flujo',
    explanation:
      'La cadencia es el intervalo de muestreo entre mediciones. El flujo fotométrico resume la luz registrada en la apertura de píxeles elegida.',
    example:
      'Puntos próximos en el tiempo describen el ingreso, el mínimo y la salida de un tránsito.',
    implication:
      'Un tránsito corto puede quedar poco muestreado; las barras de incertidumbre y banderas ayudan a interpretar cada punto.',
  },
  tce: {
    title: 'TCE',
    explanation:
      'Un Threshold Crossing Event es una señal periódica detectada por el pipeline que supera un umbral estadístico y resulta compatible con un tránsito.',
    example:
      'El artículo usa TCE como instancia de clasificación; cada señal recibe una etiqueta de referencia PC, AFP o NTP.',
    implication: 'Un TCE es una señal detectada, no un planeta confirmado.',
  },
  'stellar-variability': {
    title: 'Variabilidad estelar',
    explanation:
      'La actividad de una estrella puede cambiar su brillo a lo largo del tiempo por manchas, rotación u otros procesos estelares.',
    example:
      'Una variación amplia o casi periódica puede alterar la curva aunque no haya un planeta transitando.',
    implication: 'La periodicidad o una forma de curva aislada requieren diagnóstico físico.',
  },
  'eclipsing-binary': {
    title: 'Binaria eclipsante',
    explanation:
      'Es un sistema de dos estrellas cuya órbita las alinea con nuestra línea de visión. Una estrella puede ocultar parcialmente a la otra y producir eclipses.',
    example:
      'El eclipse secundario, a media órbita en un sistema circular, puede revelar luz bloqueada cuando la estrella menos brillante queda detrás.',
    implication:
      'Eclipses primarios y secundarios pueden confundirse con señales planetarias si se recorta demasiado contexto.',
  },
  artifact: {
    title: 'Artefacto instrumental',
    explanation:
      'Una variación en detector, apuntado, apertura o procesamiento puede dejar una estructura en la serie de flujo que no corresponde a un tránsito.',
    example:
      'Un salto cercano al borde de un trimestre puede deberse a una discontinuidad del instrumento o del procesamiento.',
    implication:
      'Las banderas de calidad, los píxeles y el centroide aportan evidencia que una curva plegada puede ocultar.',
  },
  classification: {
    title: 'Clasificación binaria',
    explanation:
      'La tarea asigna cada instancia a una de dos clases del problema. En la simplificación didáctica, la clase positiva es PC y la negativa agrupa AFP/NTP.',
    example:
      'Una curva preparada entra al modelo; su puntaje se compara con un umbral para producir PC o AFP/NTP.',
    implication:
      'La decisión depende de etiquetas de referencia y de una regla explícita; no demuestra la naturaleza física de la señal.',
  },
  label: {
    title: 'Etiqueta de referencia',
    explanation:
      'Es la clase asignada a una instancia para entrenar o evaluar el modelo. Sirve como referencia observable del cálculo, aunque puede contener incertidumbre o errores.',
    example: 'La matriz compara la etiqueta PC/AFP/NTP con la predicción del clasificador.',
    implication:
      'Las métricas cuantifican coincidencia con esa referencia, no una verdad física infalible.',
  },
  score: {
    title: 'Puntaje del modelo',
    explanation:
      'Es el valor continuo que el clasificador asigna a una instancia antes de convertirlo en clase.',
    example: 'Un puntaje s=0,82 se predice PC si el umbral τ≤0,82.',
    implication:
      'Un puntaje no es una probabilidad calibrada automáticamente y requiere un umbral para tomar una decisión binaria.',
  },
  phase: {
    title: 'Plegado por fase',
    explanation:
      'El plegado convierte tiempos en fase usando un período y una época de referencia; puntos de ciclos distintos quedan alineados.',
    example: 'φ = frac((t−t₀)/P) coloca el tránsito esperado cerca de fase cero.',
    implication:
      'Ayuda a comparar eventos repetidos, pero puede ocultar evolución temporal, eventos secundarios y discontinuidades.',
  },
  'two-views': {
    title: 'Vistas global y local',
    explanation:
      'El artículo alimenta la CNN con una vista global del ciclo plegado y otra vista local centrada en el tránsito.',
    example: 'La global conserva contexto del ciclo; la local resuelve mejor la forma del evento.',
    implication:
      'Leer solo la ventana local puede esconder un eclipse secundario o variación fuera del tránsito.',
  },
  cnn: {
    title: 'CNN',
    explanation:
      'Una red convolucional aprende patrones locales y combina características para producir un puntaje.',
    example: 'En el artículo se procesan por separado las vistas global y local de la curva.',
    implication:
      'La red ordena señales según patrones aprendidos; la inspección astronómica y la validación siguen siendo necesarias.',
  },
  split: {
    title: 'Partición de evaluación',
    explanation:
      'Entrenamiento ajusta el modelo, validación orienta decisiones durante el desarrollo y test estima desempeño en datos reservados.',
    example: 'El artículo informa resultados sobre un test de 1 523 TCEs.',
    implication:
      'Las métricas se interpretan para la población y partición evaluadas; no se trasladan automáticamente a toda búsqueda posterior.',
  },
  matrix: {
    title: 'Matriz de confusión',
    explanation:
      'Cruza la clase de referencia con la predicción. En esta sesión, Tránsito representa PC y es la clase positiva; NTránsito agrupa AFP/NTP.',
    example:
      'TP: referencia Tránsito y predicción Tránsito. FN: referencia Tránsito y predicción NTránsito. FP: referencia NTránsito y predicción Tránsito. TN: referencia NTránsito y predicción NTránsito.',
    implication: 'Antes de interpretar una métrica hay que ubicar su celda y su denominador.',
  },
  tp: {
    title: 'Verdadero positivo (TP)',
    explanation: 'La referencia es Tránsito (PC) y la predicción también es Tránsito.',
    example: 'Cuenta una señal con referencia PC recuperada como Tránsito por el clasificador.',
    implication: 'TP contribuye al numerador de accuracy, precision, recall y F1.',
  },
  fp: {
    title: 'Falso positivo (FP)',
    explanation: 'La referencia es NTránsito (AFP/NTP), pero la predicción es Tránsito (PC).',
    example:
      'Una señal con referencia NTránsito aparece en la lista de predicciones Tránsito, aunque su etiqueta sea negativa.',
    implication: 'FP puede aumentar el costo de inspección y reduce precision y especificidad.',
  },
  fn: {
    title: 'Falso negativo (FN)',
    explanation: 'La referencia es Tránsito (PC), pero la predicción es NTránsito (AFP/NTP).',
    example: 'Una señal con referencia Tránsito queda fuera de la lista priorizada como NTránsito.',
    implication:
      'FN reduce recall y representa una señal positiva que el clasificador no recupera.',
  },
  tn: {
    title: 'Verdadero negativo (TN)',
    explanation: 'La referencia es NTránsito (AFP/NTP) y la predicción también es NTránsito.',
    example:
      'Una señal con referencia NTránsito permanece fuera de la lista de predicciones Tránsito.',
    implication:
      'TN contribuye a accuracy y especificidad, aunque queda fuera del numerador de precision y recall.',
  },
  accuracy: {
    title: 'Accuracy',
    explanation:
      'Fracción de todas las instancias cuya predicción coincide con la referencia: (TP+TN)/N.',
    example: 'En 20 casos con 6 TP, 8 TN, 2 FP y 4 FN, accuracy=(6+8)/20=0,70.',
    implication:
      'Puede parecer alta si una clase domina, aunque el clasificador pierda la clase minoritaria.',
  },
  error: {
    title: 'Tasa de error',
    explanation:
      'Fracción de instancias mal clasificadas: (FP+FN)/N = 1−accuracy, si se evalúa el mismo conjunto.',
    example: 'Con FP=2, FN=4 y N=20, error=6/20=0,30.',
    implication: 'Resume errores totales; otras métricas muestran qué clase concentra los errores.',
  },
  precision: {
    title: 'Precision',
    explanation:
      'Entre las predicciones positivas, fracción que coincide con una referencia positiva: TP/(TP+FP).',
    example: 'Con TP=6 y FP=2, precision=6/8=0,75.',
    implication:
      'Una precision mayor significa menos falsas alarmas dentro de la lista predicha PC.',
  },
  recall: {
    title: 'Recall',
    explanation:
      'Entre las referencias positivas, fracción que el clasificador recupera: TP/(TP+FN).',
    example: 'Con TP=6 y FN=4, recall=6/10=0,60.',
    implication: 'Un recall bajo deja más PC de referencia sin recuperar.',
  },
  specificity: {
    title: 'Especificidad',
    explanation:
      'Entre las referencias negativas, fracción correctamente clasificada como negativa: TN/(TN+FP).',
    example: 'Con TN=8 y FP=2, especificidad=8/10=0,80.',
    implication: 'Resume el control de predicciones positivas falsas dentro de la clase negativa.',
  },
  fpr: {
    title: 'FPR o tasa de falsos positivos',
    explanation:
      'Fracción de referencias negativas que se predicen positivas: FP/(FP+TN)=1−especificidad.',
    example: 'Con FP=2 y TN=8, FPR=2/10=0,20.',
    implication:
      'Es el eje horizontal de ROC; cuantifica falsas alarmas entre los negativos de referencia.',
  },
  f1: {
    title: 'F1',
    explanation:
      'Media armónica de precision y recall: 2·precision·recall/(precision+recall), equivalente a 2TP/(2TP+FP+FN).',
    example: 'Con precision=6/8 y recall=6/10, F1=12/18≈0,67.',
    implication: 'No incorpora TN y no sustituye la decisión sobre qué error importa en la tarea.',
  },
  threshold: {
    title: 'Umbral',
    explanation: 'Regla que convierte el puntaje continuo en una etiqueta: predice PC si s≥τ.',
    example: 'Al elevar τ por encima de s=0,82, esa señal deja de clasificarse como PC.',
    implication:
      'Mover el umbral cambia predicciones, matriz y métricas; no cambia los puntajes ni las etiquetas de referencia.',
  },
  pr: {
    title: 'Curva precision–recall',
    explanation:
      'Cada umbral aporta un par (recall, precision). La curva muestra cuánto se recupera mientras se controla la composición de la lista positiva.',
    example:
      'En la Figura 6, la CNN alcanza recall 0,95 con precision 0,90 a un umbral de operación del artículo.',
    implication:
      'Se centra en la clase positiva; su lectura depende de prevalencia y población de evaluación.',
  },
  roc: {
    title: 'Curva ROC',
    explanation: 'Representa TPR o recall frente a FPR para los distintos umbrales.',
    example: 'Cada punto describe un corte del puntaje en el conjunto evaluado.',
    implication:
      'Una curva cercana a la esquina superior izquierda combina recall alto y falsas alarmas bajas; no identifica un umbral único.',
  },
  auc: {
    title: 'AUC',
    explanation:
      'Área bajo la curva ROC; resume el ordenamiento de puntajes al comparar positivos y negativos.',
    example:
      'AUC=0,89 significa que una señal positiva recibe mayor puntaje que una negativa en aproximadamente 89 % de pares, bajo la interpretación probabilística habitual.',
    implication: 'AUC no es accuracy, no fija umbral, no mide calibración y no valida planetas.',
  },
  mes: {
    title: 'MES',
    explanation:
      'El Multiple Event Statistic resume la fuerza estadística de una secuencia periódica de eventos en el pipeline de Kepler.',
    example:
      'En la Figura 10, la probabilidad predicha mediana cae para señales inyectadas de menor MES.',
    implication:
      'El resultado de señales simuladas informa sensibilidad del modelo; no es una tasa de confirmación observacional.',
  },
  validation: {
    title: 'Seguimiento y validación',
    explanation:
      'Un clasificador puede ordenar señales para inspección. La validación combina evidencia astronómica y estadística para descartar explicaciones alternativas.',
    example:
      'El artículo informa una búsqueda posterior, inspecciones y cálculos de probabilidad de falso positivo antes de validar Kepler-80 g y Kepler-90 i.',
    implication:
      'El puntaje prioriza; la validación requiere diagnósticos adicionales y un modelo de falsas alarmas.',
  },
} satisfies Record<string, Term>;

export type S03TermId = keyof typeof terms;

const sceneTerms: Record<string, S03TermId[]> = {
  'transit-animation': ['transit', 'repetition'],
  'mission-history': ['cadence'],
  'pixels-aperture-flux': ['cadence'],
  'kepler10-observation': ['cadence', 'transit-depth'],
  variability: ['stellar-variability', 'tce'],
  'eclipsing-blend': ['eclipsing-binary', 'tce'],
  'artifact-aperture': ['artifact', 'cadence'],
  'classification-task': ['classification', 'tce'],
  'binary-input-output': ['score', 'label'],
  'classification-vocabulary': ['label', 'score'],
  preparation: ['phase', 'two-views'],
  'folded-views': [],
  'cnn-score': ['cnn', 'score'],
  'evaluation-split': ['split', 'label'],
  'confusion-matrix': ['matrix'],
  'confusion-cases': ['fp', 'fn'],
  'metric-accuracy': ['accuracy', 'matrix'],
  'metric-error': ['error', 'matrix'],
  'metric-precision': ['precision', 'fp'],
  'metric-recall': ['recall', 'fn'],
  'metric-specificity': ['specificity', 'tn'],
  'metric-fpr': ['fpr', 'fp'],
  'metric-f1': ['f1', 'precision'],
  threshold: ['threshold', 'score'],
  pr: ['pr', 'recall'],
  roc: ['roc', 'fpr'],
  auc: ['auc', 'score'],
  'paper-results': ['accuracy', 'auc'],
  'paper-limits': ['mes', 'validation'],
};

function HelpButton({ termId, iconOnly = false }: { termId: S03TermId; iconOnly?: boolean }) {
  const term = terms[termId];
  return (
    <S03InfoDialog
      label={`¿Qué significa ${term.title}?`}
      className={iconOnly ? 's03-info-trigger--icon' : ''}
      trigger={
        <>
          <span className="s03-info-trigger__mark" aria-hidden="true">
            ?
          </span>
          {!iconOnly && <span>{term.title}</span>}
        </>
      }
      dialogClassName="s03-concept-dialog"
    >
      <p className="s03-concept-dialog__eyebrow">Concepto en el contexto de esta sesión</p>
      <h2>{term.title}</h2>
      <p>{term.explanation}</p>
      {term.example && (
        <p>
          <strong>Ejemplo.</strong> {term.example}
        </p>
      )}
      {term.implication && (
        <p>
          <strong>¿Para qué sirve al interpretar?</strong> {term.implication}
        </p>
      )}
    </S03InfoDialog>
  );
}

export function S03ConceptHelp({
  termId,
  iconOnly = false,
}: {
  termId: S03TermId;
  iconOnly?: boolean;
}) {
  return <HelpButton termId={termId} iconOnly={iconOnly} />;
}

export default function S03ContextHelp({ sceneId }: { sceneId: string }) {
  const sceneTermIds = sceneTerms[sceneId] ?? [];
  if (!sceneTermIds.length) return null;
  const labels = sceneTermIds.map((id) => terms[id].title).join(', ');
  return (
    <div className="s03-context-help" role="group" aria-label={`Ayudas de concepto: ${labels}`}>
      <span className="s03-context-help__label">Conceptos</span>
      <div className="s03-context-help__items">
        {sceneTermIds.map((termId) => (
          <HelpButton key={termId} termId={termId} />
        ))}
      </div>
    </div>
  );
}
