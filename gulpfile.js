const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sass = require("gulp-dart-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const csso = require("postcss-csso");
const postcssUrl = require("postcss-url");
const postcssImport = require("postcss-import");
const postScss = require("postcss-scss");
const rename = require("gulp-rename");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const squoosh = require("gulp-libsquoosh");
const webp = require("gulp-webp");
const svgSprite = require("gulp-svg-sprite");
const del = require("del");


// Styles

const styles = () => {
  return gulp.src("source/sass/*.scss", { sourcemaps: true })
    .pipe(plumber())
    .pipe(postcss([
      postcssImport(),
      postcssUrl(),
    ], { syntax: postScss }))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(
      rename({
        extname: ".min.css"
      })
    )
    .pipe(gulp.dest("build/css", { sourcemaps: '.' }))
    .pipe(sync.stream());
}

exports.styles = styles;

// HTML

const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest("build"));
}

exports.html = html;

// Scripts

const scripts = () => {
  return gulp.src("source/js/*.js")
    .pipe(terser())
    .pipe(
      rename({
        extname: ".min.js"
      })
    )
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());
}

exports.scripts = scripts

// Images

const optimizeImages = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(squoosh())
    .pipe(gulp.dest("build/img"))

}

exports.optimizeImages = optimizeImages;

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(gulp.dest("build/img"))
}

exports.images = copyImages;

// Webp

const createWebp = () => {
  return gulp.src("source/img/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/img"))
}

exports.createWebp = createWebp;

//Sprites

const sprite = () => {
  return gulp.src("source/icons/*.svg")
    .pipe(svgSprite({
        mode: {
          stack: {
            sprite: "../sprite.svg"
          }
        },
      }
    ))
    .pipe(gulp.dest("build/icons"));
}

exports.sprite = sprite;

//Copy

const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/img/**/*.svg",
    "source/favicons/*",
    "source/manifest.webmanifest"
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

exports.copy = copy;

//clean

const clean = () => {
  return del("build")
};

exports.clean = clean;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

//Reload

const reload = (done) => {
  sync.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts, reload))
  gulp.watch("source/*.html", gulp.series(html, reload));
  gulp.watch("source/img/**/*.svg", gulp.series(sprite, reload))
}

// Build

const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
);

exports.build = build;

//Default

exports.default = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    sprite,
    createWebp
  ),
  gulp.series(
    server,
    watcher
  )
);
