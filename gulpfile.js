const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');

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
        .pipe(gulp.dest(folders.build + 'css/'));
})

gulp.task('watch', () => {
    gulp.watch(folders.src + 'sass/**/*', gulp.series('css'));
})

