// src/pages/robots.txt.js
export const GET = async ({ site }) => {
  const sitemapUrl = new URL('sitemap-index.xml', site).href;

  const robotsTxt = `
User-agent: *
Allow: /
Disallow: /secret

Sitemap: ${sitemapUrl}
  `.trim();

  return new Response(robotsTxt, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};