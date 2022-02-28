const {src, dest, watch} = require('gulp');
const compileSass = require('gulp-sass')(require('sass'));
const minifyCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const merge = require('merge-stream');

const bundle = () => {
    return bundleJs()
    .pipe(bundleSass())
    .pipe(copyStaticFiles());
}

const bundleSass = () => {
    return src('static/scss/main.scss')
    .pipe(compileSass().on('error', compileSass.logError))
    .pipe(minifyCss())
    .pipe(concat('bundle.css'))
    .pipe(dest('dist/css/'));
}

const bundleJs = () => {
    return src('static/js/**/*.js')
    .pipe(babel({
        presets: ['@babel/preset-env']
    }))
    .pipe(concat('bundle.js'))
    .pipe(dest('dist/js'))
}

const copyStaticFiles = () => {
    const folders = [
        {src: 'static/html/*', dest: 'dist'},
        {src: 'static/assets/*', dest: 'dist/assets'}
    ];

    let tasks = folders.map((el) => {
        return src(el.src)
        .pipe(dest(el.dest));
    })

    return merge(tasks);
}

const devWatch = () => {
    watch('static/**/*', bundleSass);
}

exports.bundle = bundle;
exports.bundleSass = bundleSass;
exports.devWatch = devWatch;
exports.bundleJs = bundleJs;