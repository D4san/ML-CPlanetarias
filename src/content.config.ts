import { createRequire } from 'node:module';

import { defineCollection, reference } from 'astro:content';
import { z } from 'astro/zod';

// Astro 7.2.2/Vite 8.2.1 inline picomatch as ESM in this config on Windows.
// Loading the same public export through Node preserves its CommonJS boundary.
// Remove this workaround once a static import passes `astro sync` on Windows.
const { glob } = createRequire(import.meta.url)('astro/loaders') as typeof import('astro/loaders');

const rightsSchema = z.object({
  status: z.enum(['original', 'open-license', 'permission']),
  note: z.string().min(1),
  license: z.string().min(1).optional(),
});

const publicContentSchema = z.object({
  title: z.string().min(1),
  summary: z.string().min(1),
  status: z.enum(['reviewed', 'published']),
  origin: z.enum(['obsidian', 'repo']).optional(),
  source_vault: z.string().min(1).optional(),
  source_note: z.string().min(1).optional(),
  source_path: z.string().min(1).optional(),
  source_heading: z.string().min(1),
  source_block: z.string().min(1).optional(),
  source_refs: z.array(z.string().min(1)).default([]),
  visibility: z.literal('public'),
  publish_ready: z.literal(true),
  rights: rightsSchema,
  order: z.number().int().nonnegative().default(0),
});

function withPublicProvenance<T extends z.ZodObject>(schema: T) {
  return schema.superRefine((value, context) => {
    const data = value as Record<string, unknown>;
    const origin = data.origin ?? 'obsidian';
    if (origin === 'repo') {
      if (
        typeof data.source_path !== 'string' ||
        /^[A-Za-z]:[\\/]/.test(data.source_path) ||
        data.source_path.startsWith('/') ||
        data.source_path.startsWith('file:')
      ) {
        context.addIssue({
          code: 'custom',
          path: ['source_path'],
          message: 'origin repo requiere source_path relativo al repositorio.',
        });
      }
      if (data.source_note !== undefined) {
        context.addIssue({
          code: 'custom',
          path: ['source_note'],
          message: 'origin repo no usa source_note de Obsidian.',
        });
      }
      return;
    }
    if (
      typeof data.source_vault !== 'string' ||
      typeof data.source_note !== 'string' ||
      /^[A-Za-z]:[\\/]/.test(data.source_note) ||
      data.source_note.startsWith('/') ||
      data.source_note.startsWith('file:')
    ) {
      context.addIssue({
        code: 'custom',
        path: ['source_note'],
        message: 'origin obsidian requiere source_vault y source_note relativo al vault.',
      });
    }
    if (data.source_path !== undefined) {
      context.addIssue({
        code: 'custom',
        path: ['source_path'],
        message: 'origin obsidian no usa source_path de repositorio.',
      });
    }
  });
}

const sessions = defineCollection({
  loader: glob({ pattern: '**/*.(md|mdx)', base: './docs/content/sessions' }),
  schema: withPublicProvenance(
    publicContentSchema.extend({
      kind: z.literal('session'),
      session: z.string().min(1),
      concepts: z.array(reference('concepts')).default([]),
    }),
  ),
});

const concepts = defineCollection({
  loader: glob({ pattern: '**/*.(md|mdx)', base: './docs/content/concepts' }),
  schema: withPublicProvenance(
    publicContentSchema.extend({
      kind: z.literal('concept'),
      branch: z.enum(['astronomy-problem', 'formal-ml', 'application']),
      aliases: z.array(z.string().min(1)).default([]),
    }),
  ),
});

const exercises = defineCollection({
  loader: glob({ pattern: '**/*.(md|mdx)', base: './docs/content/exercises' }),
  schema: withPublicProvenance(
    publicContentSchema.extend({
      kind: z.literal('exercise'),
      concepts: z.array(reference('concepts')).default([]),
      sessions: z.array(reference('sessions')).default([]),
    }),
  ),
});

export const collections = { sessions, concepts, exercises };
