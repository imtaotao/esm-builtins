import path from 'path'
import json from '@rollup/plugin-json'
import cleanup from 'rollup-plugin-cleanup'
import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

const pkg = require(path.resolve(__dirname, 'package.json'));

const outputConfigs = {
  cjs: {
    format: 'cjs',
    file: path.resolve(__dirname, 'dist/builtins.cjs.js')
  },
  'esm-bundler': {
    format: 'es',
    file: path.resolve(__dirname, 'dist/builtins.esm-bundler.js')
  },
  umd: {
    format: 'umd',
    file: path.resolve(__dirname, 'dist/builtins.umd.js')
  }
}

const externals = (() => {
  const pkgs = [];
  const set = deps => {
    if (!deps) return;
    for (const pkgName in deps) {
      pkgs.push(pkgName);
    }
  };
  set(pkg.dependencies);
  set(pkg.peerDependencies);
  set(pkg.optionalDependencies);
  return pkgs;
})();

const packageConfigs = Object.keys(outputConfigs).map((format) =>
  createConfig(format, outputConfigs[format])
)

function createConfig (format, output) {
  const isUmdBuild = /umd/.test(format)
  output.externalLiveBindings = false
  if (isUmdBuild) output.name = 'Builtins'

  return {
    output,
    external: isUmdBuild ? [] : externals,
    input: path.resolve(__dirname, 'index.mjs'),
    plugins: [
      cleanup(),
      json({
        namedExports: false
      }),
      nodeResolve({ browser: isUmdBuild }),
      commonjs({ sourceMap: false }),
      babel({
        presets: [
          '@babel/preset-env',
        ],
      }),
    ]
  }
}

export default packageConfigs
