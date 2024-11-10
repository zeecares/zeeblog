import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://zeecares.github.io',
  base: '/zeeblog',
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  },
  integrations: [
    tailwind({
      config: { path: './tailwind.config.js' }
    })
  ]
});