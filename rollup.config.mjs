// rollup.config.mjs
// ============================================================
//  ROLLUP BUILD CONFIG
//  Produces:
//  - dist/index.js       (CommonJS  — for require())
//  - dist/index.esm.js   (ES Module — for import)
//  - dist/index.d.ts     (TypeScript declarations)
//
//  KEY FIX: added rollup-plugin-postcss to handle
//  .module.css imports. Without it Rollup can't process
//  CSS and the build fails.
// ============================================================

import resolve           from '@rollup/plugin-node-resolve';
import commonjs          from '@rollup/plugin-commonjs';
import typescript        from '@rollup/plugin-typescript';
import peerDepsExternal  from 'rollup-plugin-peer-deps-external';
import dts               from 'rollup-plugin-dts';
import postcss           from 'rollup-plugin-postcss';

export default [
  // ---- 1. Main JS bundle ----
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/index.js',
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: 'dist/index.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),

      // ✅ CSS Modules support — extracts and injects styles
      postcss({
        modules: true,       // enables .module.css class name hashing
        extract: false,      // inline styles into JS bundle (simplest for a component lib)
        minimize: true,      // minify CSS in production
        sourceMap: true,
      }),

      resolve({ extensions: ['.ts', '.tsx', '.js', '.jsx'] }),
      commonjs(),

      typescript({
        tsconfig: './tsconfig.json',
        // During build, declaration files are emitted separately
        // by the dts plugin below — so we don't emit them here.
        declaration: false,
        declarationDir: undefined,
      }),
    ],
    external: ['react', 'react-dom', 'react/jsx-runtime'],
  },

  // ---- 2. TypeScript declaration bundle (.d.ts) ----
  {
    input: 'src/index.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [
      postcss({ modules: true }),   // needed so dts plugin doesn't choke on CSS imports
      dts(),
    ],
    external: [/\.css$/],           // exclude all CSS from declaration output
  },
];
