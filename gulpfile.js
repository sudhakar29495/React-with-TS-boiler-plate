const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass');
const wait = require('gulp-wait');
const concat = require('gulp-concat');
const typedoc = require("gulp-typedoc");

// RUN: gulp css --option
gulp.task('css', () => {
  let sassStream;
  const theme = process.argv[4];
  sassStream = gulp.src(['./src/**/*.scss', '!./src/_theme*.scss', '!./src/themeConstants.scss'], {
    base: "./"
  })
  return sassStream
    .pipe(wait(3000))
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(concat('app.min.css'))
    .pipe(gulp.dest(`build/static/css/${theme}/`))
});

gulp.task('typedoc', function() {
  return gulp
      .src(["./src/**/*.ts"])
      .pipe(typedoc({
          module: "commonjs",
          ignoreCompilerErrors: true,
          jsx: "preserve",
          target: "es6",
          out: "./frontend-doc",
          name: "Idea Paas"
      }))
  ;
});
