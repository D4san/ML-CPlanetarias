import { describe, expect, it } from 'vitest';

import { withBase } from './urls';

describe('withBase', () => {
  it('builds root links without duplicate slashes', () => {
    expect(withBase('/sesiones/', '/')).toBe('/sesiones/');
  });

  it('keeps a GitHub Pages-style subpath', () => {
    expect(withBase('/glosario/', '/preview/')).toBe('/preview/glosario/');
  });
});
