import path from 'node:path';
import { defineConfig } from 'vite';
import { VitePluginNode } from 'vite-plugin-node';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
   build: {
      manifest: true,
      outDir: 'dist',
      target: 'es6',
      commonjsOptions: {
         sourceMap: true,
         strictRequires: true,
      },
   },
   appType: 'custom',
   resolve: {
      alias: { find: '@', replacement: path.resolve(__dirname, 'src') },
   },
   server: {
      port: 3000,
   },
   plugins: [
      tsconfigPaths(),
      ...VitePluginNode({
         adapter: 'express',
         appPath: './src/app.ts',
         exportName: 'viteNodeApp',
         // 'swc' compiler is supported to use as well for frameworks
         // like Nestjs (esbuild dont support 'emitDecoratorMetadata' yet)
         // you need to INSTALL `@swc/core` as dev dependency if you want to use swc
         tsCompiler: 'esbuild',
         // Optional, default: {
         // jsc: {
         //   target: 'es2019',
         //   parser: {
         //     syntax: 'typescript',
         //     decorators: true
         //   },
         //  transform: {
         //     legacyDecorator: true,
         //     decoratorMetadata: true
         //   }
         // }
         // }
         // swc configs, see [swc doc](https://swc.rs/docs/configuration/swcrc)
         swcOptions: {},
      }),
   ],
   optimizeDeps: {
      exclude: ['class-validator'],
   },
});
