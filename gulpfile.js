let gulp        = require('gulp'),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
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
    runSequence = require('run-sequence')

let bases = {
  name: 'star-markdown',
  src:  'src/',
  dist: 'dist/',
  demo: 'demo/',
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

gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: bases.demo
    },
    open: false
  })
})

gulp.task('clean:dist', function() {
  return gulp.src(bases.dist)
    .pipe(vinylPaths(del))
})

gulp.task('scss', function () {
  return gulp.src(bases.src + 'scss/theme/star.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix(prefixerOptions))
    .pipe(rename(bases.name + '.css'))
    .pipe(gulp.dest(bases.dist))
    .pipe(reload({stream:true}))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize)
      console.log(details.name + ': ' + details.stats.minifiedSize)
    }))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(bases.dist))
})

gulp.task('watch', function() {
  gulp.watch(bases.src + 'scss/**/*.scss', ['scss'])
})

gulp.task('copy', function() {
  // copy css to dist directly
  gulp.src(bases.dist + '*')
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(bases.demo + 'css'))
    .pipe(reload({stream:true}));
})

// BUILD TASKS
// ------------

gulp.task('default', function(done) {
  runSequence('clean:dist', 'browser-sync', 'scss', 'copy', 'watch', done)
})

gulp.task('build', function(done) {
  runSequence('clean:dist', 'scss', 'copy', done)
})