import { defineConfig } from 'vite';
import analog from '@analogjs/platform';
import angular from '@analogjs/vite-plugin-angular';

export default defineConfig(({ mode }) => ({
  root: __dirname,
  plugins: [
    analog({
      ssr: false,
      static: true,
      prerender: {
        routes: [],
      },
    }),
    angular(),
  ],
  build: {
    target: ['es2022'],
  },
  resolve: {
    mainFields: ['module'],
  },
}));
