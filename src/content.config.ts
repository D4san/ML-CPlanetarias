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
  source_vault: z.string().min(1),
  source_note: z.string().min(1),
  source_heading: z.string().min(1),
  source_block: z.string().min(1).optional(),
  source_refs: z.array(z.string().min(1)).default([]),
  visibility: z.literal('public'),
  publish_ready: z.literal(true),
  rights: rightsSchema,
  order: z.number().int().nonnegative().default(0),
});

const sessions = defineCollection({
  loader: glob({ pattern: '**/*.(md|mdx)', base: './docs/content/sessions' }),
  schema: publicContentSchema.extend({
    kind: z.literal('session'),
    session: z.string().min(1),
    concepts: z.array(reference('concepts')).default([]),
  }),
});

const concepts = defineCollection({
  loader: glob({ pattern: '**/*.(md|mdx)', base: './docs/content/concepts' }),
  schema: publicContentSchema.extend({
    kind: z.literal('concept'),
    branch: z.enum(['astronomy-problem', 'formal-ml', 'application']),
  }),
});

const exercises = defineCollection({
  loader: glob({ pattern: '**/*.(md|mdx)', base: './docs/content/exercises' }),
  schema: publicContentSchema.extend({
    kind: z.literal('exercise'),
    concepts: z.array(reference('concepts')).default([]),
    sessions: z.array(reference('sessions')).default([]),
  }),
});

export const collections = { sessions, concepts, exercises };
