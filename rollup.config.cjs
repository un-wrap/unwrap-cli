const fs = require('fs')
const json = require('@rollup/plugin-json')
const typescript = require('@rollup/plugin-typescript')
const { defineConfig } = require('rollup')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')

const config = defineConfig({
  input: 'src/main.tsx',
  output: {
    file: 'bin/main.js',
    format: 'esm',
    banner: `import * as React from 'react'\n`,
  },
  plugins: [
    {
      // 清理输出目录
      name: 'clear',
      buildStart() {
        const binExists = fs.existsSync('bin')
        if (!binExists) return
        fs.rmSync('bin', { recursive: true })
      },
    },
    json(),
    typescript({
      compilerOptions: {
        declaration: false,
        declarationMap: false,
      },
    }),
    peerDepsExternal({
      includeDependencies: true,
    }),
    {
      // add shebang
      name: 'shebang',
      renderChunk(code) {
        return `#!/usr/bin/env node\n\n${code}`
      },
    },
  ],
})

module.exports = config
