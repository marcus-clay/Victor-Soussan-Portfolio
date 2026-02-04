#!/usr/bin/env node
/**
 * Post-build prerendering script using Puppeteer.
 * Generates static HTML files for each route so crawlers
 * (Google, LinkedIn, Twitter) see real content instead of
 * an empty <div id="root"></div>.
 *
 * Usage: node prerender.mjs
 * Runs automatically after `vite build` via the build script.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = resolve(__dirname, 'dist');
const PORT = 4173;

// All routes to pre-render
const ROUTES = [
  '/',
  '/work',
  '/about',
  '/testimonials',
  '/contact',
  '/resume',
  '/quote',
  '/presentation',
  // Toolkit
  '/project/toolkit/summary',
  '/project/toolkit/full',
  // Dailymotion
  '/project/dailymotion/summary',
  '/project/dailymotion/full',
  // Connect
  '/project/connect/summary',
  '/project/connect/full',
  // SQOOL Suite
  '/project/sqool/summary',
  '/project/sqool/full',
  // France VAE
  '/project/france-vae/summary',
  '/project/france-vae/full',
  // PagesJaunes
  '/project/pagesjaunes/summary',
  '/project/pagesjaunes/full',
  // Android Wear
  '/project/androidwear/summary',
  '/project/androidwear/full',
];

async function prerender() {
  // Dynamically import puppeteer (devDependency)
  const puppeteer = await import('puppeteer');

  // Start a local static server from dist/
  const { createServer } = await import('http');
  const { readFile } = await import('fs/promises');
  const { extname, join } = await import('path');

  const MIME_TYPES = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.woff2': 'font/woff2',
    '.woff': 'font/woff',
    '.ico': 'image/x-icon',
  };

  const server = createServer(async (req, res) => {
    let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);
    const ext = extname(filePath);

    // SPA fallback: if no extension, serve index.html
    if (!ext) {
      filePath = join(DIST, 'index.html');
    }

    try {
      const data = await readFile(filePath);
      res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'text/html' });
      res.end(data);
    } catch {
      // Fallback to index.html for SPA routes
      const fallback = await readFile(join(DIST, 'index.html'));
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(fallback);
    }
  });

  await new Promise((resolve) => server.listen(PORT, resolve));
  console.log(`[prerender] Static server running on http://localhost:${PORT}`);

  const browser = await puppeteer.default.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let successCount = 0;
  let errorCount = 0;

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`[prerender] Rendering ${route}...`);

    try {
      const page = await browser.newPage();

      // Block heavy resources that prevent networkidle (videos, large images)
      await page.setRequestInterception(true);
      page.on('request', (req) => {
        const type = req.resourceType();
        if (['media', 'font'].includes(type)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      // Use networkidle2 (allows 2 in-flight requests) for pages with lazy-loaded assets
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
      await page.waitForFunction(
        () => document.querySelector('#root')?.children.length > 0,
        { timeout: 10000 }
      );

      // Small extra wait for dynamic content
      await new Promise((r) => setTimeout(r, 500));

      const html = await page.content();
      await page.close();

      // Write the pre-rendered HTML to dist
      const outputDir = route === '/'
        ? DIST
        : resolve(DIST, route.replace(/^\//, ''));

      if (!existsSync(outputDir)) {
        mkdirSync(outputDir, { recursive: true });
      }

      const outputFile = resolve(outputDir, 'index.html');
      writeFileSync(outputFile, html, 'utf-8');
      console.log(`[prerender] ✓ ${route} → ${outputFile}`);
      successCount++;
    } catch (err) {
      console.error(`[prerender] ✗ ${route} — ${err.message}`);
      errorCount++;
    }
  }

  await browser.close();
  server.close();

  console.log(`\n[prerender] Done: ${successCount} succeeded, ${errorCount} failed out of ${ROUTES.length} routes.`);

  if (errorCount > 0) {
    process.exit(1);
  }
}

prerender().catch((err) => {
  console.error('[prerender] Fatal error:', err);
  process.exit(1);
});
