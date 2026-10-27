import { describe, expect, it } from 'vitest';
import { S03_BIBLIOGRAPHY, S03_SCREENS, S03_STATIONS } from './s03-content';
import { s03Book } from './s03-reading';
import { defineCourseConfig } from './course-config';
import { isSessionAvailable } from './course-availability';

describe('S03: contrato editorial y disponibilidad', () => {
  it('conserva 33 pantallas, nueve estaciones y fuentes resolubles', () => {
    expect(S03_SCREENS).toHaveLength(33);
    expect(new Set(S03_SCREENS.map((screen) => screen.id)).size).toBe(33);
    expect(S03_STATIONS).toHaveLength(9);
    expect(
      S03_STATIONS.map(
        (station) => S03_SCREENS.filter((screen) => screen.stationId === station.id).length,
      ),
    ).toEqual([3, 3, 3, 3, 3, 3, 7, 4, 2]);
    expect(S03_SCREENS[0]!.role).toBe('opening');
    expect(S03_SCREENS.at(-1)!.role).toBe('references');
    const sources = new Set(S03_BIBLIOGRAPHY.map((item) => item.id));
    for (const screen of S03_SCREENS) {
      for (const id of screen.sourceIds) expect(sources.has(id)).toBe(true);
      expect(screen.summary.length).toBeGreaterThan(40);
    }
  });
  it('presenta el entrenamiento, la evaluación y el límite del catálogo', () => {
    const screen = S03_SCREENS.find((item) => item.id === 's03-classification-2');
    expect(screen).toBeDefined();
    expect(screen!.title).toBe('Entrenamiento y evaluación');
    expect(screen!.intro).toContain('Christopher Shallue y Andrew Vanderburg');
    expect(screen!.summary).toContain('15 737 TCE');
    expect(screen!.summary).toContain('Autovetter');
    expect(screen!.summary).toContain('se evalúa con señales reservadas');
    expect(screen!.summary).toContain('no confirmación planetaria');
    expect(screen!.summary).not.toContain('Planet Candidate, candidata a planeta');
  });
  it('mantiene nueve capítulos autónomos con ejemplos, respuestas y fuentes', () => {
    expect(s03Book.chapters).toHaveLength(9);
    for (const chapter of s03Book.chapters) {
      expect(chapter.paragraphs.length).toBeGreaterThanOrEqual(3);
      expect(chapter.example.steps).toHaveLength(3);
      expect(chapter.answer.length).toBeGreaterThan(50);
      expect(chapter.sources.length).toBeGreaterThan(0);
    }
  });
  it('cita la versión publicada del artículo y registra el DOI', () => {
    const paper = S03_BIBLIOGRAPHY.find((item) => item.id === 'shallue-vanderburg-2017');
    expect(paper?.label).toContain('(2018)');
    expect(paper?.href).toBe('https://doi.org/10.3847/1538-3881/aa9e09');
    expect(paper?.location).toContain('CC BY 3.0');
  });
  it('incluye y excluye S03 explícitamente, sin habilitar otras sesiones', () => {
    const defaults = {
      interactionMode: 'interactive',
      teacherMode: false,
      defaultView: 'presentation',
    } as const;
    const enabled = defineCourseConfig({
      identity: { id: 'test', title: 'test' },
      defaults,
      enabledSessionIds: ['S03'],
      sessions: { S03: { enabled: true } },
    });
    expect(isSessionAvailable(enabled, 'S03')).toBe(true);
    expect(isSessionAvailable(enabled, 'S01')).toBe(false);
    const excluded = defineCourseConfig({
      identity: { id: 'test', title: 'test' },
      defaults,
      enabledSessionIds: [],
      sessions: {},
    });
    expect(isSessionAvailable(excluded, 'S03')).toBe(false);
    expect(() =>
      defineCourseConfig({
        identity: { id: 'test', title: 'test' },
        defaults,
        enabledSessionIds: ['S03'],
        sessions: { S03: { enabledRouteIds: ['invented'] } },
      }),
    ).toThrow(/no declara rutas/);
  });
});
