import fs from 'fs';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { reactRouter } from '@react-router/dev/vite';

// Image provenance sidecars (public/images/**/*.webp.json, written by the design tooling) stay in
// the repo but are not deployed.
const dropImageSidecars = (): Plugin => ({
  name: 'drop-image-sidecars',
  apply: 'build',
  closeBundle() {
    const walk = (dir: string) => {
      if (!fs.existsSync(dir)) return;
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, e.name);
        if (e.isDirectory()) walk(p);
        else if (/\.(webp|png|jpe?g)\.json$/.test(e.name)) fs.rmSync(p);
      }
    };
    walk(path.resolve(__dirname, 'build/client/images'));
  },
});

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    cssMinify: true,
    reportCompressedSize: false,
    chunkSizeWarningLimit: 2000,
  },
  plugins: [reactRouter(), dropImageSidecars()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
});
