const fs = require('fs')
const typescript = require('@rollup/plugin-typescript')
const { defineConfig } = require('rollup')

module.exports = defineConfig({
  input: 'src/main.ts',
  output: {
    file: 'bin/main.js',
    format: 'cjs',
  },
  plugins: [
    {
      // 清理输出目录
      name: 'clear',
      buildStart() {
        const binExists = fs.existsSync('bin')
        if (!binExists) return
        fs.rmdirSync('bin', { recursive: true })
      },
    },
    typescript({
      compilerOptions: {
        declaration: false,
        declarationMap: false,
        declarationDir: 'bin',
      },
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
