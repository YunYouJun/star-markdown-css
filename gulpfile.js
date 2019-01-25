let gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    colors      = require('colors'),
    vinylPaths  = require('vinyl-paths'),
    del         = require('del'),
    prefix      = require('gulp-autoprefixer'),
    cleanCSS    = require('gulp-clean-css'),
    notify      = require('gulp-notify'),
    plumber     = require('gulp-plumber'),
    rename      = require('gulp-rename'),
    sourcemaps  = require('gulp-sourcemaps'),
    size        = require('gulp-size'),
    concat      = require('gulp-concat')

let bases = {
  src:  'src/',
  scss: 'src/scss/',
  dist: 'dist/',
  demo: 'demo/',
}

let demo = {
  html: '**/*.html',
  md: 'md/*.md',
  scss: 'scss/**/*.scss',
  css: 'css/common.css'
}

let sassOptions = {
  outputStyle: 'expanded'
}

colors.setTheme({
  silly:   'rainbow',
  input:   'grey',
  verbose: 'cyan',
  prompt:  'grey',
  info:    'green',
  data:    'grey',
  help:    'cyan',
  warn:    'yellow',
  debug:   'blue',
  error:   'red'
})

let displayError = function(error) {
  // Initial building up of the error
  let errorString = '[' + error.plugin.error.bold + ']'
  errorString += ' ' + error.message.replace("\n",'') // Removes new line at the end

  // If the error contains the filename or line number add it to the string
  if(error.fileName)
      errorString += ' in ' + error.fileName
  if(error.lineNumber)
      errorString += ' on line ' + error.lineNumber.bold

  // This will output an error like the following:
  // [gulp-sass] error message in file_name on line 1
  console.error(errorString)
}

let onError = function(err) {
  notify.onError({
    title:    "Gulp",
    subtitle: "Failure!",
    message:  "Error: <%= error.message %>",
    sound:    "Basso"
  })(err)
  this.emit('end')
}

let prefixerOptions = {
  browsers: ['last 2 versions']
}

function fileArray(theme, type) {
  return [
    bases.scss + 'theme/_' + theme + '.scss', 
    bases.scss + 'base/_' + type + '.scss'
  ]
}

function scss (theme, type) {
  return gulp.src(fileArray(theme, type))
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(concat({ path: theme + '-' + type + '.scss' }))
    .pipe(sass(sassOptions).on('error', sass.logError))
    // .pipe(rename(theme + '-' + type + '.css'))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix(prefixerOptions))
    .pipe(gulp.dest(bases.dist))
    .pipe(reload({stream:true}))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize + ' B')
      console.log(details.name + ': ' + details.stats.minifiedSize + ' B')
    }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(bases.dist))
    .pipe(gulp.dest(bases.demo + 'css'))
}

function scssTheme(theme) {
  return Promise.all([scss(theme, 'common'), scss(theme, 'markdown')])
  // return scss(theme, 'common')
}

gulp.task('scss:star', function() {
  return scssTheme('star')
})

gulp.task('scss:blood', function() {
  return scssTheme('blood')
})

gulp.task('browser-sync', function() {
  browserSync.init({
    server: {
      baseDir: bases.demo
    },
    open: false,
    port: 2333
  })
})

gulp.task('clean:dist', function() {
  return gulp.src(bases.dist, {
      allowEmpty: true
    })
    .pipe(vinylPaths(del))
})

gulp.task('watch', function() {
  gulp.watch(bases.src + demo.scss, gulp.parallel('scss:star', 'scss:blood'))
  gulp.watch(bases.demo + demo.html).on("change", reload)
  gulp.watch(bases.demo + demo.md).on("change", reload)
  gulp.watch(bases.demo + demo.css).on("change", reload)
})

// BUILD TASKS
exports.default = gulp.series(gulp.parallel('browser-sync', 'watch'))
exports.build = gulp.series('clean:dist', gulp.parallel('scss:star', 'scss:blood'))
