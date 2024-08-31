import gulp from 'gulp';
import concat from 'gulp-concat';
import dartSass from 'sass';  // Import Dart Sass
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import pug from 'gulp-pug';
import livereload from 'gulp-livereload';
import sourcemaps from 'gulp-sourcemaps';
import minify from 'gulp-minify';

// Initialize gulp-sass with Dart Sass
const sass = gulpSass(dartSass);



// HTML task: Compile Pug files into HTML and copy them to the dist folder
export function html() {
  return gulp
    .src("stage/html/*.pug")
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(livereload());
}

// CSS task: Compile SCSS/CSS files, add sourcemaps, and copy to dist folder
export function css() {
  return gulp
    .src(["stage/css/**/*.css", "stage/css/**/*.scss"])
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: "compressed",
      }).on("error", sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(concat("main.css"))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("dist/css"))
    .pipe(livereload());
}

// JS task: Concatenate and minify JS files, then copy to dist folder
export function js() {
  return gulp
    .src("stage/js/*.js")
    .pipe(concat("main.js"))
    .pipe(minify())
    .pipe(gulp.dest("dist/js"))
    .pipe(livereload());
}

// Watch task: Watch files and trigger tasks on change
export function watchFiles() {
  import('./server.js'); // Dynamically import the server.js file
  livereload.listen();
  gulp.watch("stage/html/**/*.pug", html);
  gulp.watch(["stage/css/**/*.css", "stage/css/**/*.scss"], css);
  gulp.watch("stage/js/*.js", js);
}

// Export tasks
export const watch = gulp.series(html, css, js, watchFiles);
