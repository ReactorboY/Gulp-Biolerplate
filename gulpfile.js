const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

const folders = {
    src: 'src/',
    build: 'public/'
};

gulp.task('css', () => {
    let postOpt = [
        autoprefixer({
            browsers: ['last 2 versions', '> 2%']
        })
    ];

    return gulp.src(folders.src+ 'sass/main.scss')
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

