const { src, dest, series, watch, parallel } = require('gulp')
const browserSync = require('browser-sync').create()

const sass = require('gulp-sass')

// const sass = require("gulp-sass")(require("sass"));

function clean(cb) {
  // body omitted
  cb()
}

function build(cb) {
  cb()
}

function image() {
  return src('./images/*').pipe(dest('./build/images'))
}

function buildHTML() {
  return src('*.html').pipe(dest('build'))
}

function buildStyles() {
  return src('./sass/*.scss').pipe(sass.sync()).pipe(dest('./build/css'))
}

const watchBuild = () => {
  return watch(['*.html', '**/**/*.scss'], { events: 'all' }, (cb) => {
    console.log('here')
    return buildHTML(), buildStyles()
  })
}

const browser = () => {
  const files = ['*.html', './**/**/*.scss'] 

  return browserSync.init(files, {
    server: './build/',
    port: 9000,
  })
}

exports.watch = parallel(watchBuild, browser)
exports.image = series(image)
exports.default = series(buildHTML, buildStyles, image, build)
