let gulp = require("gulp"),
  sass = require("gulp-sass"),
  browserSync = require("browser-sync").create(),
  reload = browserSync.reload,
  colors = require("colors"),
  vinylPaths = require("vinyl-paths"),
  del = require("del"),
  prefix = require("gulp-autoprefixer"),
  cleanCSS = require("gulp-clean-css"),
  notify = require("gulp-notify"),
  plumber = require("gulp-plumber"),
  rename = require("gulp-rename"),
  sourcemaps = require("gulp-sourcemaps"),
  size = require("gulp-size"),
  concat = require("gulp-concat");

const themes = ["planet", "blood"];

const bases = {
  src: "src/",
  scss: "src/scss/",
  dist: "dist/",
  demo: "demo/"
};

const demo = {
  html: "**/*.html",
  md: "md/*.md",
  scss: "scss/**/*.scss",
  css: "css/common.css"
};

const sassOptions = {
  outputStyle: "expanded"
};

colors.setTheme({
  silly: "rainbow",
  input: "grey",
  verbose: "cyan",
  prompt: "grey",
  info: "green",
  data: "grey",
  help: "cyan",
  warn: "yellow",
  debug: "blue",
  error: "red"
});

let onError = function(err) {
  notify.onError({
    title: "Gulp",
    subtitle: "Failure!",
    message: "Error: <%= error.message %>",
    sound: "Basso"
  })(err);
  this.emit("end");
};

let prefixerOptions = {
  browsers: ["last 2 versions"]
};

function fileArray(theme) {
  return [
    bases.scss + "theme/_" + theme + ".scss",
    bases.scss + "base/_" + "markdown" + ".scss"
  ];
}

function scss(theme) {
  return gulp
    .src(fileArray(theme))
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sourcemaps.init())
    .pipe(concat({ path: theme + "-markdown" + ".scss" }))
    .pipe(sass(sassOptions).on("error", sass.logError))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(prefix(prefixerOptions))
    .pipe(gulp.dest(bases.dist + theme + "/"))
    .pipe(
      cleanCSS({ debug: true }, function(details) {
        console.log(details.name + ": " + details.stats.originalSize + " B");
        console.log(details.name + ": " + details.stats.minifiedSize + " B");
      })
    )
    .pipe(rename({ suffix: ".min" }))
    .pipe(size({ gzip: true, showFiles: true }))
    .pipe(gulp.dest(bases.dist + theme + "/"))
    .pipe(gulp.dest(bases.demo + "css/"))
    .pipe(reload({ stream: true }));
}

// all scss task
function scssAll() {
  return Promise.all(
    themes.map(theme => {
      return scss(theme);
    })
  );
}

function clean() {
  return del(["dist"]);
}

function watch() {
  browserSync.init({
    server: {
      baseDir: bases.demo
    },
    open: false,
    port: 2333
  });
  gulp.watch(bases.src + demo.scss, scssAll);
  gulp
    .watch([
      bases.demo + demo.html,
      bases.demo + demo.md,
      bases.demo + demo.css
    ])
    .on("change", reload);
}

function build() {
  clean();
  return scssAll();
}

exports.clean = clean;
exports.watch = watch;
exports.build = build;
exports.default = gulp.series(build, watch);
