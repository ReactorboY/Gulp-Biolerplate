const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');

const newer = require('gulp-newer');
const browserSync = require('browser-sync').create();

const folders = {
    src: 'src/',
    build: 'public/'
};

//  minify any new images
gulp.task('images', () => {
    return gulp.src(folders.src + 'images/**/*')
        .pipe(newer(folders.src + 'images/'))
        .pipe(imagemin({optimizationLevel: 5}))
        .pipe(gulp.dest(folders.build + 'images/'));
})

gulp.task('css', gulp.series('images'),() => {
    let postOpt = [
        autoprefixer({
            browsers: ['last 2 versions', '> 2%']
        })
    ];

    return gulp.src(folders.src + 'sass/main.scss')
        .pipe(sass({
            outputStyle: 'nested',
            precision: 3,
            errLogToConsole: true
        }))
        .pipe(postcss(postOpt))
        .pipe(gulp.dest(folders.build + 'css/'))
        .pipe(browserSync.stream());
})

gulp.task('gulper', () => {
    browserSync.init({
        proxy: 'localhost:3002'
    })
    gulp.watch(folders.src + 'sass/**/*', gulp.series('css'));
    gulp.watch('./views/*.handlebars').on('change', browserSync.reload);
});

gulp.task('default', gulp.series('gulper'));

