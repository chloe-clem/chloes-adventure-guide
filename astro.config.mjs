import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://chloe-clem.github.io',
  base: '/chloes-adventure-guide/',
  vite: {
    optimizeDeps: {
      exclude: ['maplibre-gl'],
    },
  },
});
