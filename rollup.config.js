import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import builtins from 'rollup-plugin-node-builtins';
import babel from 'rollup-plugin-babel';

module.exports = {
  input: 'src/Tabula.js',
  output: {
    file: 'lib/bundle.js',
    format: 'umd',
    name: 'Tabula',
  },
  plugins: [
    resolve({
      preferBuiltins: false,
    }),
    commonjs(),
    builtins(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
  ],
  external: [
    builtins,
  ],
};
