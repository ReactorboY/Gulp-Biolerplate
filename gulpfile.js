const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const prefixer = require('autoprefixer');

const folders = {
    src: 'src/',
    build: 'public/'
} 