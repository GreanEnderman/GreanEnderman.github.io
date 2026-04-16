import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://GreanEnderman.github.io',
  output: 'static',
  build: {
    format: 'directory'
  }
});
