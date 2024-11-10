import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://zeecares.github.io',
  base: '/zeeblog',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  integrations: []
});