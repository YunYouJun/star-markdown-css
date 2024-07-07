import path from 'node:path'

const __dirname = import.meta.dirname

export const config = {
  srcFolder: path.resolve(__dirname, '../src'),
  distFolder: path.resolve(__dirname, '../dist'),
  demoFolder: path.resolve(__dirname, '../demo'),
  scssFolder: path.resolve(__dirname, '../src/scss'),
}
