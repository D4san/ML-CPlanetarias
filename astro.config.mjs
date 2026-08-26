import mdx from '@astrojs/mdx';
import { unified } from '@astrojs/markdown-remark';
import react from '@astrojs/react';
import { defineConfig } from 'astro/config';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

function normalizeBasePath(value) {
  const trimmed = value.trim();
  if (!trimmed || trimmed === '/') return '/';
  return `/${trimmed.replace(/^\/+|\/+$/g, '')}`;
}

const base = normalizeBasePath(process.env.BASE_PATH ?? '/');
const site = process.env.SITE_URL?.trim();

export default defineConfig({
  output: 'static',
  base,
  ...(site ? { site } : {}),
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  devToolbar: {
    enabled: false,
  },
  integrations: [react(), mdx()],
  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [[rehypeKatex, { throwOnError: true, strict: 'warn' }]],
    }),
    shikiConfig: {
      theme: 'github-dark-default',
    },
  },
});
