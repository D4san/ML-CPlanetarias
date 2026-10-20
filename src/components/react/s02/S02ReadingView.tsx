import type { ReactNode } from 'react';
import type { S02Stop } from '../../../lib/s02-content';
import { s02Book, s02ReadingUnits } from '../../../lib/s02-reading';
import { BookInstrument, BookReading } from '../BookReading';

const instruments: Record<string, { prompt: string; interpretation: string }> = {
  'planet-classification': {
    prompt: 'Identifica las variables y las clases del ejemplo antes de proponer una regla.',
    interpretation:
      'Las clases dependen de la definición del ejercicio; una partición de juguete no acredita una clasificación física de todos los planetas.',
  },
  rules: {
    prompt:
      'Cambia el umbral y sigue qué casos cruzan de rama. Después compara el orden de las preguntas.',
    interpretation:
      'Cada ruta reúne condiciones. Observa la región que define cada hoja y qué casos cambian de predicción.',
  },
  'information-gain': {
    prompt:
      'Recorre los conteos y los pesos del ejemplo guiado; después compara otros cortes y la entropía.',
    interpretation:
      'El explorador tiene sus propios datos. Repite la operación del ejemplo escrito con esos conteos y observa la impureza ponderada.',
  },
  'tree-code': {
    prompt:
      'Modifica profundidad y mínimo por hoja. Relaciona los parámetros con las regiones y el código que se actualizaron.',
    interpretation:
      'Los cambios muestran la capacidad del árbol sobre este ejemplo didáctico. La evaluación científica requiere casos reservados.',
  },
  regression: {
    prompt:
      'Sigue un caso hasta su hoja y compara el valor predicho con los objetivos de entrenamiento que la forman.',
    interpretation:
      'Con error cuadrático, el valor constante es el promedio de la hoja; el árbol produce una función por tramos.',
  },
  'regression-error': {
    prompt:
      'Mueve el corte, identifica los promedios de las hojas y reconstruye la suma de residuos cuadrados.',
    interpretation:
      'Distingue SSE de MSE y observa sus unidades. El error mostrado pertenece al conjunto que construye el ejemplo.',
  },
  overfit: {
    prompt:
      'Compara árboles de distinta complejidad y cambios de muestra; localiza qué reglas permanecen y cuáles cambian.',
    interpretation:
      'Un ajuste repetible con semilla fija y un comportamiento estable entre muestras son propiedades que se comprueban por separado.',
  },
  bootstrap: {
    prompt: 'Sortea una ronda y cuenta repeticiones y ausencias para cada árbol.',
    interpretation:
      'El número de extracciones se conserva; la cantidad de casos distintos puede cambiar. OOB se define por árbol.',
  },
  forest: {
    prompt:
      'Sigue la selección de variables por nodo y compara la agregación en clasificación y regresión.',
    interpretation:
      'La diversidad entra en el ajuste; la regla de agregación depende de la tarea. El promedio de probabilidades puede diferir del voto de etiquetas.',
  },
  dataset: {
    prompt: 'Formula tu expectativa sobre añadir irradiación antes de ver las métricas.',
    interpretation:
      'Conserva el objetivo, la muestra y la partición al comparar los conjuntos de predictores.',
  },
  'data-quality': {
    prompt:
      'Inspecciona el origen de las columnas, las banderas y el criterio que excluye radios derivados de masa.',
    interpretation:
      'La auditoría delimita la muestra. Las cifras guardadas y los ejemplos no equivalen a una consulta nueva.',
  },
  'colab-activity': {
    prompt:
      'Antes de ejecutar, escribe la línea base, la unidad de partición y la conclusión que esa prueba permitiría.',
    interpretation:
      'El notebook conserva la partición aleatoria por planeta documentada. Para evaluar sistemas nuevos hay que diseñar y ejecutar otra prueba.',
  },
  limits: {
    prompt:
      'Contrasta la tabla con la diferencia calculada y conserva la fecha y la unidad de partición al comunicarla.',
    interpretation:
      'Estos resultados guardados describen un corte concreto. La mejora no identifica causalidad ni garantiza transferencia a estrellas no vistas.',
  },
};

function chapterForUnit(id: string) {
  return s02Book.chapters.find((chapter) => s02ReadingUnits[chapter.id]?.includes(id))?.id ?? id;
}

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
  return (
    <>
      <BookReading
        book={s02Book}
        activeUnitId={activeStopId}
        chapterForUnit={chapterForUnit}
        anchorForChapter={(id) => (id === 'sources' ? 's02-book-references' : `s02-reading-${id}`)}
        hashForChapter={(id) => `#${id}`}
        onNavigate={(id) => {
          const url = new URL(window.location.href);
          url.searchParams.delete('estacion');
          url.hash = id;
          window.history.pushState(window.history.state, '', url);
          onActiveStopChange(id);
        }}
        onVisibleChapter={onActiveStopChange}
        onReferencesVisible={() => onActiveStopChange('sources')}
        renderInstruments={(chapter) =>
          s02ReadingUnits[chapter.id]!.map((id) => {
            const stop = stops.find((item) => item.id === id)!;
            const copy = instruments[id]!;
            return (
              <BookInstrument
                key={id}
                id={id === chapter.id ? undefined : `s02-reading-${id}`}
                title={getHeading(stop)}
                prompt={copy.prompt}
                interpretation={copy.interpretation}
              >
                <div className="s02-reading__interaction">{renderInteractive(stop)}</div>
              </BookInstrument>
            );
          })
        }
        references={renderInteractive(stops.find((stop) => stop.id === 'sources')!)}
      />
      <footer className="s02-reading__footer">
        <a href="#s02-reading-title">↑ Volver al inicio</a>
        <button type="button" onClick={onReturnToPresentation}>
          Volver a Presentación
        </button>
      </footer>
    </>
  );
}
