// @ts-check
import { defineConfig } from 'astro/config';

// Build as a static site for Netlify (frontend-only). This disables the Node
// server adapter so the output directory contains static HTML/CSS/JS that
// Netlify can serve. Note: API routes under `src/pages/api` won't be
// available in a static build — use serverless functions or a backend
// deployment if you need server-side endpoints.
export default defineConfig({
  output: 'static',
});
