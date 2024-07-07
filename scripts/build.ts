import path from 'node:path'
import consola from 'consola'
import * as sass from 'sass'
import fs from 'fs-extra'
import chalk from 'chalk'
import CleanCSS from 'clean-css'
import { gzipSize } from 'gzip-size'
import { config } from './config'

export async function scss(theme: string) {
  const themePath = path.resolve(config.scssFolder, 'theme', `${theme}.scss`)
  if (!fs.existsSync(themePath)) {
    consola.error(`Theme ${theme} not found!`)
  }

  // compile
  const result = await sass.compileAsync(themePath, {
    // minify css
    style: 'expanded',
  })

  // write
  const distPath = path.resolve(config.distFolder, 'css', `${theme}-markdown.css`)
  await fs.outputFile(distPath, result.css)

  // clean css
  const clean = new CleanCSS().minify(result.css)
  const cleanDistPath = path.resolve(config.distFolder, 'css', theme, `${theme}-markdown.min.css`)
  await fs.outputFile(cleanDistPath, clean.styles)

  // show size
  const stats = await fs.stat(distPath)
  const cleanStats = await fs.stat(cleanDistPath)
  consola.info(
    `${chalk.cyan(theme)}: `,

    `[${chalk.yellow(
      stats.size / 1000,
    )} KB]`,

    '->',

    `[${chalk.green(
      cleanStats.size / 1000,
    )} KB]`,

    // gzip
    chalk.dim(`(gzip: ${chalk.blue(
      await gzipSize(result.css) / 1000,
    )} KB)`),
  )
}

export async function clean() {
  consola.start(`Cleaning ${chalk.dim(config.distFolder)}`)
  await fs.emptyDir(config.distFolder)
  consola.success('Cleaned!')
}

export async function build() {
  await clean()

  consola.start('Building...')
  const themes = ['yun', 'planet', 'blood', 'earth']
  // all scss task
  await Promise.all(
    themes.map((theme) => {
      return scss(theme)
    }),
  )
}

build()
