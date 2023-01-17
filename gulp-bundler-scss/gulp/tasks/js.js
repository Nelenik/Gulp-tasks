const babel = require("gulp-babel");
const minify = require("gulp-terser")

exports.js = () => {
  return app.gulp.src(app.pathes.src.js)
  .pipe(app.plugins.plumber(app.plugins.notify.onError({
    title: "JS",
    message: "Error: <%= error.message %>"
  })))
  .pipe(app.plugins.gulpif(!app.isBuild, app.plugins.sourcemaps.init()))
  .pipe(app.plugins.concat('app.js'))
  .pipe(app.plugins.gulpif(app.isBuild, babel({
    presets: ['@babel/env']
  })))
  .pipe(app.plugins.gulpif(app.isBuild, minify()))
  .pipe(app.plugins.gulpif(!app.isBuild, app.plugins.sourcemaps.write()))
  .pipe(app.gulp.dest(app.pathes.build.js))
  .pipe(app.plugins.browsersync.stream())
}
