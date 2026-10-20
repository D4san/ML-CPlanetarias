import S03InfoDialog from './S03InfoDialog';
import { withBase } from '../../../lib/urls';
import './s03-paper-figure.css';

const SOURCE = 'https://doi.org/10.3847/1538-3881/aa9e09';
const LICENSE = 'https://creativecommons.org/licenses/by/3.0/';
const ARTICLE_TITLE =
  'Identifying Exoplanets with Deep Learning: A Five-planet Resonant Chain around Kepler-80 and an Eighth Planet around Kepler-90';

function figureAttribution(figureNumber: number) {
  return `Christopher J. Shallue & Andrew Vanderburg (2018), “${ARTICLE_TITLE}”, The Astronomical Journal, 155, 94, Figura ${figureNumber}. DOI: 10.3847/1538-3881/aa9e09.`;
}

const figures = {
  3: {
    image: '/images/s03/paper-fig-03.svg',
    alt: 'Figura 3 del artículo: curva plegada en una vista global y una vista local ampliada alrededor del tránsito.',
    reading:
      'La ventana global conserva el ciclo completo; la vista local permite leer con detalle la forma del tránsito. El contraste entre escalas también muestra información que una ventana corta puede dejar fuera.',
  },
  6: {
    image: '/images/s03/paper-fig-06.svg',
    alt: 'Figura 6 del artículo: curvas precision–recall que comparan modelos lineal, totalmente conectado y convolucional.',
    reading:
      'Cada curva muestra el intercambio entre recuperar más señales PC y mantener precision alta al cambiar el umbral. En el test del estudio, la CNN alcanza recall 0,95 con precision 0,90 en un punto de operación.',
  },
  8: {
    image: '/images/s03/paper-fig-08.png',
    alt: 'Figura 8 del artículo: cuatro curvas de luz con mapas de oclusión y la probabilidad de planeta predicha en cada cadencia.',
    reading:
      'Los autores ocultan partes de la curva y vuelven a calcular el puntaje. Quitar el tránsito planetario suele bajar la puntuación; en una binaria eclipsante, ocultar el eclipse secundario puede subirla. La respuesta depende de dónde se oculte información.',
  },
  10: {
    image: '/images/s03/paper-fig-10.svg',
    alt: 'Figura 10 del artículo: probabilidad de planeta predicha frente a MES para señales planetarias inyectadas y recuperadas.',
    reading:
      'La confianza del clasificador disminuye en señales inyectadas de menor MES. La figura estudia sensibilidad en simulaciones y no estima directamente la tasa de confirmación de planetas observados.',
  },
  11: {
    image: '/images/s03/paper-fig-11.svg',
    alt: 'Figura 11 del artículo: probabilidad de planeta predicha frente a la razón de MES esperado primario a secundario para binarias eclipsantes simuladas.',
    reading:
      'Cuando el eclipse secundario es débil respecto al primario, algunas binarias simuladas reciben puntajes altos de planeta. El artículo muestra que el modelo no detectó con suficiente sensibilidad varios eclipses secundarios débiles.',
  },
} as const;

export default function S03PaperFigure({
  figureNumber,
  variant = 'standard',
  surface = 'default',
}: {
  figureNumber: keyof typeof figures;
  variant?: 'standard' | 'wide' | 'portrait';
  surface?: 'default' | 'white';
}) {
  const figure = figures[figureNumber];
  const attribution = figureAttribution(figureNumber);
  return (
    <figure
      className={`s03-paper-figure s03-paper-figure--${variant} s03-paper-figure--${surface}`}
    >
      <S03InfoDialog
        label={`Ampliar Figura ${figureNumber} del artículo`}
        className="s03-paper-figure__zoom-trigger"
        dialogClassName="s03-paper-figure__dialog"
        trigger={
          <>
            <img src={withBase(figure.image)} alt={figure.alt} loading="lazy" decoding="async" />
            <span className="s03-paper-figure__zoom-hint">Ampliar figura ↗</span>
          </>
        }
      >
        <h2>Figura {figureNumber} · Shallue y Vanderburg</h2>
        <p className="s03-paper-figure__dialog-reading">{figure.reading}</p>
        <img
          className="s03-paper-figure__full-image"
          src={withBase(figure.image)}
          alt={figure.alt}
        />
        <p className="s03-paper-figure__citation">
          <a href={SOURCE} target="_blank" rel="noreferrer">
            {attribution} Abrir artículo ↗
          </a>
          <span>
            Contenido original del artículo con licencia{' '}
            <a href={LICENSE} target="_blank" rel="noreferrer">
              Creative Commons Attribution 3.0 (CC BY 3.0)
            </a>
            .
          </span>
        </p>
      </S03InfoDialog>
      <figcaption>
        <p>{figure.reading}</p>
        <a href={SOURCE} target="_blank" rel="noreferrer">
          {attribution}
        </a>
        <a href={LICENSE} target="_blank" rel="noreferrer">
          Licencia CC BY 3.0 ↗
        </a>
      </figcaption>
    </figure>
  );
}
