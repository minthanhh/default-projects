/// <reference types="vitest" />
import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';

export default mergeConfig(
   viteConfig,
   defineConfig({
      test: {
         reporters: ['default', 'html'],
      },
   })
);
