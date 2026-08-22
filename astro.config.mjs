import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://GreanEnderman.github.io',
  output: 'static',
  markdown: {
    shikiConfig: {
      themes: {
        light: 'github-light',
        dark: 'github-dark'
      },
      defaultColor: false
    }
  },
  build: {
    format: 'directory'
  }
});
