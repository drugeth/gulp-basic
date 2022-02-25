const {src, dest, watch} = require('gulp');
const compileSass = require('gulp-sass')(require('sass'));
const minifyCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const gulpCopy = require('gulp-copy');

const bundleSass = () => {
    return src('./static/scss/**/*.scss')
    .pipe(compileSass().on('error', compileSass.logError))
    .pipe(minifyCss())
    .pipe(concat('bundle.css'))
    .pipe(dest('./dist/css/'))
    .pipe(copyStaticFiles());
}

const copyStaticFiles = () => {
    return src('./static/html/*')
    .pipe(dest('./dist'));
}

const devWatch = () => {
    watch('./static/scss/**/*.scss', bundleSass);
}

exports.bundleSass = bundleSass;
exports.devWatch = devWatch;