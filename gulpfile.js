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
    size        = require('gulp-size')

let bases = {
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

function scss (theme, type) {
  return gulp.src(bases.src + 'scss/theme/' + theme + '/' + type + '.scss')
    .pipe(plumber({errorHandler: onError}))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix(prefixerOptions))
    .pipe(rename(theme + '-' + type + '.css'))
    .pipe(gulp.dest(bases.dist))
    .pipe(gulp.dest(bases.demo + 'css'))
    .pipe(reload({stream:true}))
    .pipe(cleanCSS({debug: true}, function(details) {
      console.log(details.name + ': ' + details.stats.originalSize + ' B')
      console.log(details.name + ': ' + details.stats.minifiedSize + ' B')
    }))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest(bases.dist))
}

function scssTheme(theme) {
  return Promise.all([scss(theme, 'common'), scss(theme, 'markdown')])
}

gulp.task('scss:star', function() {
  return scssTheme('star')
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

gulp.task('html', function(){
  return gulp.src(bases.demo + '*.html')
    .pipe(reload({stream:true}))
})

gulp.task('md', function(){
  return gulp.src(bases.demo + '*.md')
    .pipe(reload({stream:true}))
})

gulp.task('watch', function() {
  gulp.watch(bases.src + 'scss/**/*.scss', gulp.series('scss:star'))
  gulp.watch(bases.demo + '*.html', gulp.series('html'))
  gulp.watch(bases.demo + '*.md', gulp.series('md'))
})

// BUILD TASKS
exports.default = gulp.series(gulp.parallel('browser-sync', 'watch'))
exports.build = gulp.series('clean:dist', 'scss:star')
