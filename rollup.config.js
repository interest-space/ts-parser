import dts from 'rollup-plugin-dts';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json';

const name = pkg.main.replace(/\.js$/, '')

const bundle = config => ({
  ...config,
  input: 'src/index.ts',
  external: id => !/^[./]/.test(id)
});

export default [
  bundle({
    input: 'src/index.ts',
    external: id => !/^[./]/.test(id),
    plugins: [
      typescript()
    ],
    output: [
      {
        file: `${name}.js`,
        format: 'cjs',
        sourcemap: true
      },
      {
        file: `${name}.mjs`,
        format: 'es',
        sourcemap: true
      }
    ]
  }),
  bundle({
    input: 'src/index.ts',
    external: id => !/^[./]/.test(id),
    plugins: [
      dts()
    ],
    output: {
      file: `${name}.d.ts`,
      format: 'es'
    }
  })
];
