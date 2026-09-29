import { useEffect, useRef, type ReactNode } from 'react';

import type { S02Stop } from '../../../lib/s02-content';

type ReadingCopy = {
  paragraphs: readonly string[];
  explore: string;
  takeaway?: string;
};

const readingCopy: Record<S02Stop['id'], ReadingCopy> = {
  references: {
    paragraphs: [
      'La sesión reúne tres clases de fuentes: documentación del catálogo de exoplanetas, estudios que dan contexto físico a las variables planetarias y referencias sobre árboles y ensambles. La bibliografía inicial permite seguir el origen de las definiciones y de los ejemplos.',
      'Las ilustraciones de la sesión son esquemas de enseñanza. Para reproducir la actividad, consulta la documentación del archivo NASA y registra la fecha de descarga, las columnas, las unidades y los filtros utilizados.',
    ],
    explore:
      'Abre una referencia para ubicar qué dato define cada columna y qué método respalda la explicación.',
  },
  'planet-classification': {
    paragraphs: [
      'La clasificación es una tarea supervisada: cada planeta del ejemplo se representa con variables de entrada y una etiqueta conocida. El modelo aprende una regla que relaciona esas medidas con las clases del ejercicio; después aplica la regla a un caso cuya etiqueta se quiere predecir.',
      'Las medidas describen objetos y no determinan por sí solas una etiqueta. La pregunta científica define qué se considera una clase útil, y la representación determina qué diferencias puede reconocer el modelo. Un conjunto pequeño permite seguir cada decisión a mano, aunque no representa por sí solo toda la diversidad de exoplanetas.',
    ],
    explore:
      'Sigue las medidas de cada ejemplo hasta la etiqueta y compara qué variable parece separar mejor los casos.',
    takeaway: 'La predicción depende de las etiquetas y de las variables que elegimos incluir.',
  },
  rules: {
    paragraphs: [
      'Al combinar varias preguntas, el árbol forma regiones del espacio de variables y agrupa allí los ejemplos que siguen la misma ruta. Su estructura se puede leer como una secuencia de reglas, pero un cambio en los datos o en los umbrales puede cambiar la partición resultante.',
    ],
    explore:
      'Intercambia el orden de las variables y mueve el umbral para observar qué casos llegan a cada hoja.',
    takeaway:
      'Cada ruta del árbol corresponde a una combinación de condiciones que define una región de los datos.',
  },
  'information-gain': {
    paragraphs: [
      'Para elegir una pregunta, el algoritmo compara la impureza de las etiquetas antes del corte con la impureza de los grupos que quedan después. Una partición es útil cuando deja grupos más homogéneos, ponderando cada grupo por la cantidad de ejemplos que contiene.',
      'La ganancia de información expresa cuánto disminuye la entropía con el corte; el criterio Gini mide la impureza de otra manera. Ambos criterios guían la elección local del siguiente corte. El mejor corte en un nodo no garantiza que el árbol completo sea el mejor modelo para datos futuros.',
    ],
    explore:
      'Compara el estado de las clases antes y después de cada umbral y mira cómo cambia la impureza ponderada.',
    takeaway:
      'El criterio selecciona cortes según la mezcla de etiquetas observada en los datos de entrenamiento.',
  },
  'tree-code': {
    paragraphs: [
      'En el ejemplo, el ajuste usa `X_train` y `y_train`, mientras que `X_test` se reserva para producir predicciones que se compararán con etiquetas no usadas durante el aprendizaje. Mantener separadas esas etapas evita presentar el ajuste como si ya fuera una evaluación.',
      '`max_depth` limita cuántos niveles de preguntas puede formar el árbol; `min_samples_leaf` exige un mínimo de ejemplos en cada hoja. Restringir esos valores puede evitar reglas muy específicas, aunque la elección debe evaluarse con datos que no participaron en el ajuste. `random_state` fija las decisiones aleatorias para poder reproducir el ejemplo.',
    ],
    explore:
      'Cambia la profundidad y el mínimo por hoja; el código, el mapa del árbol y la predicción se actualizan juntos.',
    takeaway:
      'Los hiperparámetros regulan la complejidad antes de comparar el desempeño fuera del entrenamiento.',
  },
  regression: {
    paragraphs: [
      'A diferencia de una sola fórmula global, el modelo combina valores por regiones y produce una función escalonada. Esa representación facilita leer los intervalos aprendidos, pero un árbol no prolonga de manera suave la tendencia más allá de los datos observados.',
    ],
    explore:
      'Relaciona los puntos observados con la región del árbol y compara cada salida con el promedio de su hoja.',
    takeaway:
      'Las hojas convierten una partición del espacio de entrada en predicciones numéricas por tramos.',
  },
  'regression-error': {
    paragraphs: [
      'Para cada corte candidato, el árbol calcula cuánto se apartan los valores observados del promedio de su hoja. El error cuadrático suma los cuadrados de esas diferencias; el algoritmo elige un corte que reduzca el error en los grupos resultantes.',
      'Al añadir divisiones, el error de entrenamiento puede disminuir porque las hojas contienen grupos más pequeños. Esa mejora describe el ajuste a los datos usados para construir el árbol; por sí sola no indica que las predicciones futuras también mejoren.',
    ],
    explore:
      'Mueve el corte raíz y observa cómo cambian las hojas, sus promedios y el error; luego prueba una división adicional.',
    takeaway:
      'El error de entrenamiento ayuda a construir el árbol; la evaluación aparte mide cómo responde a casos nuevos.',
  },
  overfit: {
    paragraphs: [
      'Un árbol muy profundo puede separar hasta detalles particulares del conjunto de entrenamiento. Si esos detalles no se repiten, las reglas pierden desempeño en ejemplos nuevos: esa brecha entre ajuste y generalización es una señal de sobreajuste. Limitar profundidad o exigir más casos por hoja puede reducir la sensibilidad, pero conviene comprobar el resultado en una evaluación independiente.',
    ],
    explore:
      'Compara las reglas del árbol estable, el árbol profundo y los árboles entrenados con muestras distintas.',
    takeaway:
      'La complejidad conecta el sesgo del modelo con cuánto pueden cambiar sus reglas entre muestras.',
  },
  bootstrap: {
    paragraphs: [
      'Cada árbol recibe su propia remuestra y puede aprender una partición distinta. Los casos que no salieron de una remuestra se conocen como observaciones fuera de bolsa (OOB) para ese árbol. En la actividad, el conjunto de cuatro tarjetas hace visible la repetición y la ausencia sin sugerir que cuatro casos representen el tamaño de un análisis real.',
    ],
    explore:
      'Vuelve a sortear y compara las tarjetas repetidas, las que quedaron fuera y la muestra que ve cada árbol.',
    takeaway:
      'Remuestrear diversifica los datos de ajuste y deja algunos casos fuera de cada árbol.',
  },
  forest: {
    paragraphs: [
      'Random Forest combina dos fuentes de diversidad: ajusta árboles sobre remuestras bootstrap y, en cada división, considera un subconjunto aleatorio de variables candidatas. Así, los árboles no dependen todos de las mismas observaciones ni de la misma secuencia de cortes.',
      'En regresión, el bosque promedia las predicciones de sus árboles; en clasificación, combina sus votos. El promedio o la votación reduce la dependencia de un árbol individual cuando sus errores no coinciden por completo. No convierte cada árbol en una explicación causal ni elimina la necesidad de evaluar el conjunto.',
    ],
    explore:
      'Compara la remuestra de cada árbol, las variables disponibles para los cortes y la predicción agregada.',
    takeaway:
      'El ensamble combina modelos diversos para estabilizar la predicción respecto de un árbol individual.',
  },
  dataset: {
    paragraphs: [
      'Aquí, `pl_rade` es el objetivo continuo y `pl_bmasse` y `pl_insol` son candidatos a predictores. Mantener el objetivo fijo y añadir una columna en la segunda comparación permite aislar la pregunta sobre el aporte predictivo de la irradiación.',
      'Un conjunto de prueba separado permite medir el desempeño en planetas que no participaron en el ajuste. La masa y el radio pueden tener unidades, incertidumbres y métodos de obtención distintos; entender las columnas y la población comparada forma parte del problema científico, antes de escoger el algoritmo.',
    ],
    explore:
      'Elige qué predictores comparar y registra tu expectativa sobre el error antes de consultar las métricas.',
    takeaway: 'La pregunta sobre añadir una variable debe preceder a la lectura de los resultados.',
  },
  'data-quality': {
    paragraphs: [
      'Las columnas identifican cada planeta y su estrella anfitriona, registran propiedades como masa, irradiación y radio, e incluyen banderas y referencias. Estas piezas permiten fijar a quién representa la muestra y rastrear el origen de los valores.',
      'El ejercicio filtra planetas en tránsito cuya confirmación no aparece marcada como cuestionada, y exige valores centrales positivos y completos para las variables elegidas. También excluye radios calculados a partir de la masa para evitar evaluar una predicción con un objetivo que ya contiene información del predictor. La muestra resultante representa ese filtro, no todo el catálogo.',
      'Las mediciones tienen incertidumbres y fuentes distintas. Una comparación de valores centrales es útil para practicar el flujo de trabajo, pero no propaga esas incertidumbres ni vuelve equivalentes las mediciones de diferente procedencia.',
    ],
    explore:
      'Revisa las banderas, los valores, sus referencias y el origen del radio antes de decidir qué filas comparar.',
    takeaway:
      'Auditar filtros y procedencia delimita la población a la que se puede aplicar una conclusión.',
  },
  'colab-activity': {
    paragraphs: [
      'La práctica completa replica la pregunta de la estación anterior en un notebook: estima el radio con masa y después con masa más irradiación. Primero documenta filtros, unidades, incertidumbres y procedencia; luego prepara una referencia de mediana y compara un árbol con bosques de regresión mediante MAE y R².',
      'La partición propuesta reserva al azar el 20 % de los planetas para prueba. Compara los modelos en la misma partición, grafica los radios observados frente a los predichos y consulta la importancia MDI del bosque con ambos predictores. La importancia MDI resume las reducciones de impureza usadas por el modelo durante el ajuste; debe interpretarse junto con las métricas y no como explicación causal.',
      'Planetas de una misma estrella pueden quedar en ambos conjuntos porque la separación se hace por planeta. Anota esa decisión en la interpretación y evita describir la prueba como una evaluación en sistemas estelares que el modelo nunca vio.',
    ],
    explore:
      'Abre el notebook para ejecutar la comparación y contrastar tu predicción inicial con las métricas de la misma partición.',
    takeaway: 'La partición y la línea base definen qué pregunta responde la evaluación.',
  },
  limits: {
    paragraphs: [
      'La salida guardada del análisis del 29 de septiembre de 2026 contiene 1.529 planetas en 1.249 sistemas después de los filtros documentados. En una partición aleatoria por planeta, la prueba incluye 306 planetas. El resultado se refiere a esa muestra, esos predictores, esa partición y la configuración guardada.',
      'En ese corte, el Random Forest con masa obtuvo MAE de 1,673 R⊕ y R² de 0,814; al añadir irradiación, el MAE fue 1,191 R⊕ y R² fue 0,889. La diferencia fue −0,482 R⊕ en MAE y +0,075 en R². R² = 1 corresponde a predicción perfecta; R² = 0 coincide con usar como predicción el promedio del objetivo en el conjunto de prueba.',
      'Como la división se realiza por planeta, una misma estrella puede aportar planetas a entrenamiento y prueba. Estas cifras no estiman por sí solas el desempeño en sistemas estelares no vistos, no demuestran que la irradiación cause el cambio del radio y no incluyen las incertidumbres de las mediciones. Son resultados guardados del corte descrito, no una consulta en vivo al archivo NASA.',
    ],
    explore:
      'Lee juntas la definición de la muestra, la tabla de métricas y la advertencia sobre la unidad de partición.',
    takeaway:
      'La mejora observada corresponde a la evaluación registrada y requiere esos límites al comunicarla.',
  },
  sources: {
    paragraphs: [
      'Las fuentes enlazadas permiten revisar el catálogo, las reglas de cálculo de parámetros compuestos, la consulta TAP y la documentación de los estimadores de scikit-learn. Úsalas para comprobar definiciones, unidades, criterios de ajuste y opciones de partición antes de adaptar la actividad.',
      'La bibliografía reúne además estudios de contexto planetario y textos fundacionales sobre árboles y ensambles. Antes de reutilizar la sesión, verifica la versión de las bibliotecas, conserva la procedencia de cada dato y revisa los derechos de las referencias y materiales que distribuyas.',
    ],
    explore:
      'Usa las referencias para rastrear una definición o una decisión del análisis hasta su fuente.',
    takeaway:
      'Una sesión reproducible deja visibles las fuentes, las decisiones de datos y el alcance del resultado.',
  },
};

export interface S02ReadingViewProps {
  stops: readonly S02Stop[];
  activeStopId: S02Stop['id'];
  renderInteractive: (stop: S02Stop) => ReactNode;
  getHeading: (stop: S02Stop) => string;
  onActiveStopChange: (stopId: S02Stop['id']) => void;
  onReturnToPresentation: () => void;
}

export function S02ReadingView({
  stops,
  activeStopId,
  renderInteractive,
  getHeading,
  onActiveStopChange,
  onReturnToPresentation,
}: S02ReadingViewProps) {
  const articleRef = useRef<HTMLElement>(null);
  const initialStopId = useRef(activeStopId);

  useEffect(() => {
    const article = articleRef.current;
    if (!article) return;

    const scheduleActiveSection = () => {
      const line = window.innerHeight * 0.35;
      const sections = Array.from(article.querySelectorAll<HTMLElement>('[data-reading-stop]'));
      let visibleSection = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= line) visibleSection = section;
        else break;
      }

      const stopId = visibleSection?.dataset.readingStop as S02Stop['id'] | undefined;
      if (stopId) onActiveStopChange(stopId);
    };

    let frame = 0;
    const onScroll = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(scheduleActiveSection);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    frame = requestAnimationFrame(() => {
      if (initialStopId.current !== stops[0]?.id) {
        article
          .querySelector<HTMLElement>(`#s02-reading-${initialStopId.current}`)
          ?.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
      scheduleActiveSection();
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [onActiveStopChange, stops]);

  function jumpTo(stopId: S02Stop['id']) {
    onActiveStopChange(stopId);
    const section = articleRef.current?.querySelector<HTMLElement>(`#s02-reading-${stopId}`);
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    section?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'start' });
  }

  return (
    <article className="s02-reading" ref={articleRef} aria-labelledby="s02-reading-title">
      <header className="s02-reading__intro">
        <p className="s02-reading__eyebrow">
          Lectura lineal · árboles, ensambles y datos planetarios
        </p>
        <h2 id="s02-reading-title">De una regla aprendida a una predicción con límites</h2>
        <p>
          La sesión avanza desde las preguntas binarias de un árbol hasta la variación entre
          remuestras, la combinación de modelos y una comparación con exoplanetas. Cada apartado
          amplía la explicación de la diapositiva y conserva su figura o actividad para explorar.
        </p>
      </header>

      <nav className="s02-reading__toc" aria-label="Contenido de la lectura S02">
        <h2>En esta lectura</h2>
        <ol>
          {stops.map((stop, index) => (
            <li key={stop.id}>
              <button
                type="button"
                aria-current={activeStopId === stop.id ? 'location' : undefined}
                onClick={() => jumpTo(stop.id)}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <span>{stop.partLabel}</span>
              </button>
            </li>
          ))}
        </ol>
      </nav>

      <div className="s02-reading__body">
        {stops.map((stop, index) => {
          const copy = readingCopy[stop.id];
          return (
            <section
              className="s02-reading__section"
              id={`s02-reading-${stop.id}`}
              data-reading-stop={stop.id}
              data-tone={stop.tone}
              data-active={activeStopId === stop.id}
              aria-labelledby={`s02-reading-${stop.id}-title`}
              key={stop.id}
            >
              <div className="s02-reading__narrative">
                <p className="s02-reading__section-label">
                  {String(index + 1).padStart(2, '0')} / {String(stops.length).padStart(2, '0')} ·{' '}
                  {stop.groupLabel} · {stop.partLabel}
                </p>
                <h2 id={`s02-reading-${stop.id}-title`}>{getHeading(stop)}</h2>
                <p className="s02-reading__lead">{stop.intro}</p>
                {copy.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {copy.takeaway && (
                  <aside className="s02-reading__takeaway">
                    <strong>Idea clave</strong>
                    <p>{copy.takeaway}</p>
                  </aside>
                )}
              </div>

              <section
                className="s02-reading__explore"
                aria-label={`Visualización: ${stop.partLabel}`}
              >
                <div className="s02-reading__explore-heading">
                  <div>
                    <p>Observa y explora</p>
                    <h3>{copy.explore}</h3>
                  </div>
                </div>
                <div className="s02-reading__interaction">{renderInteractive(stop)}</div>
              </section>
            </section>
          );
        })}
      </div>

      <footer className="s02-reading__footer">
        <a href="#s02-journey-title">↑ Volver al inicio</a>
        <button type="button" onClick={onReturnToPresentation}>
          Volver a Presentación
        </button>
      </footer>
    </article>
  );
}
