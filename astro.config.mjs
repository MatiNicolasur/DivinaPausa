// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import quoteHandler from './api/cotizaciones.js';

/** @param {import('vite').ViteDevServer} server */
const attachQuoteApi = (server) => {
  const env = loadEnv(server.config.mode, process.cwd(), ['QUOTES_', 'RESEND_', 'TURNSTILE_']);
  for (const key of ['QUOTES_EMAIL_ENABLED', 'QUOTES_EMAIL_FROM', 'QUOTES_EMAIL_TO', 'RESEND_API_KEY', 'TURNSTILE_SECRET_KEY']) {
    if (env[key]) process.env[key] = env[key];
  }
  server.middlewares.use('/api/cotizaciones', (req, res) => {
    quoteHandler(req, res).catch(() => {
      res.statusCode = 500;
      res.end(JSON.stringify({ ok: false }));
    });
  });
};

// https://astro.build/config
export default defineConfig({
  site: 'https://divinapausa.cl',
  vite: {
    plugins: [{
      name: 'local-quote-api',
      configureServer: attachQuoteApi,
    }],
    optimizeDeps: {
      include: [
        'gsap',
        'gsap/ScrollTrigger'
      ]
    }
  }
});
