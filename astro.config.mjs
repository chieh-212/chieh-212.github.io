import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://chieh-212.github.io',
  base: '/',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // 這樣它就不會產生那個內聯的 background-color 了
      theme: 'github-dark',
      langs: [],
      wrap: true,
    },
  },
});