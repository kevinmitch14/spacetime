import commonjs from 'rollup-plugin-commonjs'
import json from 'rollup-plugin-json'
import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import sizeCheck from 'rollup-plugin-filesize-check'
import pkg from './package.json' assert { type: "json" };
let version = pkg.version
console.log('\n 📦  - running rollup..\n')

const banner = '/* spencermountain/spacetime-geo ' + version + ' MIT */'

export default [
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/spacetime-geo.mjs', format: 'esm' }],
    plugins: [resolve(), json(), commonjs(), sizeCheck({ expect: 109, warn: 10 })]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/spacetime-geo.cjs', format: 'umd', sourcemap: false, name: 'spacetimeGeo' }],
    plugins: [resolve(), json(), commonjs(), sizeCheck({ expect: 109, warn: 10 })]
  },
  {
    input: 'src/index.js',
    output: [{ banner: banner, file: 'builds/spacetime-geo.min.js', format: 'umd', name: 'spacetimeGeo' }],
    plugins: [resolve(), json(), commonjs(), terser(), sizeCheck({ expect: 109, warn: 10 })]
  }
]
