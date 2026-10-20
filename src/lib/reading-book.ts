/** Texto original del repositorio para autoestudio; ejemplos marcados como didácticos.
 * Las unidades mantienen su identidad; cada modo decide cómo desarrollar su exposición.
 */
export interface ReadingChapter {
  id: string;
  title: string;
  lead: string;
  paragraphs: readonly string[];
  example: {
    title: string;
    introduction: string;
    steps: readonly string[];
    conclusion: string;
  };
  question: string;
  answer: string;
  bridge: string;
  sources: readonly { label: string; href: string }[];
}

export interface ReadingBook {
  session: string;
  title: string;
  introduction: string;
  prerequisites: string;
  chapters: readonly ReadingChapter[];
}
