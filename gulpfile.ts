import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import dartSass from 'sass'
import del from 'del'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import notify from 'gulp-notify'
import plumber from 'gulp-plumber'
import rename from 'gulp-rename'
import size from 'gulp-size'
import concat from 'gulp-concat'

import chalk from 'chalk'
import { Logger } from '@yunyoujun/logger'

import browserSync from 'browser-sync'
const logger = new Logger()

const sass = gulpSass(dartSass)
const reload = browserSync.create().reload

const themes = ['yun', 'planet', 'blood', 'earth']

const bases = {
  src: 'src/',
  scss: 'src/scss/',
  dist: 'dist/',
  demo: 'demo/',
}

const demo = {
  html: '**/*.html',
  md: 'md/*.md',
  scss: 'scss/**/*.scss',
  css: 'css/common.css',
}

const onError = function(err) {
  notify.onError({
    title: 'Gulp',
    subtitle: 'Failure!',
    message: 'Error: <%= error.message %>',
    sound: 'Basso',
  })(err)
  this.emit('end')
}

function scss(theme: string) {
  return gulp
    .src(`${bases.scss}theme/${theme}.scss`)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(concat({ path: `${theme}-markdown` + '.scss' }))
    .pipe(
      sass
        .sync({
          outputStyle: 'expanded',
        })
        .on('error', sass.logError),
    )
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(autoprefixer())
    .pipe(gulp.dest(`${bases.dist + theme}/`))
    .pipe(
      cleanCSS({}, (details) => {
        logger.info(
          `${chalk.cyan(details.name)}: [${chalk.yellow(
            details.stats.originalSize / 1000,
          )} KB] -> [${chalk.green(details.stats.minifiedSize / 1000)} KB]`,
        )
      }),
    )
    .pipe(rename({ suffix: '.min' }))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(`${bases.dist + theme}/`))
    .pipe(reload({ stream: true }))
}

// all scss task
function scssAll() {
  return Promise.all(
    themes.map((theme) => {
      return scss(theme)
    }),
  )
}

/**
 * clean dist
 * @returns
 */
export function clean() {
  return del(['dist'])
}

export function watch() {
  browserSync.init({
    server: {
      baseDir: bases.demo,
    },
    open: false,
    port: 2333,
  })
  gulp.watch(bases.src + demo.scss, scssAll)
  gulp
    .watch([
      bases.demo + demo.html,
      bases.demo + demo.md,
      bases.demo + demo.css,
    ])
    .on('change', reload)
}

/**
 * clean and build scss
 * @returns
 */
export function build() {
  clean()
  return scssAll()
}

exports.default = gulp.series(build, watch)
