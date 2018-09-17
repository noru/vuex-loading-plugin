

import typescript from 'rollup-plugin-typescript2'
import uglify from 'rollup-plugin-uglify'
import commonjs from 'rollup-plugin-commonjs'

const commonPlugins = [
  typescript(),
]

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/vuex-loading-plugin.min.js',
        format: 'cjs',
      },
    ],
    plugins: [...commonPlugins, uglify.uglify()]
  },
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/vuex-loading-plugin.js',
        format: 'cjs',
        banner: '/* vuex-loading-plugin */',
        footer: '/* https://github.com/noru */',
      }
    ],
    plugins: commonPlugins
  },
]