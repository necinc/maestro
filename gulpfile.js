'use strict';

const gulp = require('gulp');
const gutil = require('gulp-util');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const minifyCss = require('gulp-minify-css');
const rename = require('gulp-rename');
const scsslint = require('gulp-scss-lint');
const webpack = require('webpack');
const webpackDevServer = require('webpack-dev-server');

const webpackConfig = require('./webpack.config');
const webpackProductionConfig = require('./webpack.production.config');


const lintScss = [
  './public/styles/scss/site/*.scss',
  './public/styles/scss/mixins/*.scss',
  './public/styles/scss/typography/*.scss',
  './public/styles/scss/variables/*.scss',
  './public/styles/scss/main.scss'
];

gulp.task('lint:scss', () => {
  return gulp.src(lintScss)
    .pipe(scsslint({
      config: './scsslint.yml'
    }));
});

gulp.task('build:css', ['lint:scss'], () => {
  return gulp.src('./public/styles/scss/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./public/styles/css'))
    .pipe(minifyCss())
    .pipe(sourcemaps.write())
    .pipe(rename({ suffix: ".min" }))
    .pipe(gulp.dest('./public/styles/css'))
});

gulp.task('sass:watch', () => {
  gulp.watch('./public/styles/**/*.scss', ['build:css']);
});

gulp.task('webpack', () => {
  webpack(webpackProductionConfig, (err, stats) => {
    if (err) throw new gutil.PluginError('webpack', err);
    gutil.log("[webpack]", stats.toString({
      colors: true
    }));
  })
});

gulp.task('default', ['build:css', 'webpack'])
