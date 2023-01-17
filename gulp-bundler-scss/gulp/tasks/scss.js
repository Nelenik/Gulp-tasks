const cleanCss = require('gulp-clean-css');
const autoprefixes = require('gulp-autoprefixer');
const sass = require('gulp-sass')(require('sass'))

exports.scss = () => {
  return app.gulp.src(app.pathes.src.scss)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "SCSS",
      message: "Error: <%= error.message %>"
    })))
    .pipe(app.plugins.gulpif(!app.isBuild, app.plugins.sourcemaps.init()))
    .pipe(sass())
    .pipe(cleanCss({
      format: app.isBuild ? "" : "beautify",
      // inline: ['all'],
      // rebase: false,
      level: 2,
    }))
    .pipe(app.plugins.replace(/@img\//g, '../img/'))
    .pipe(app.plugins.replace(/@fonts\//g, '../resources/fonts/'))
    .pipe(autoprefixes({
      cascade: false,
      grid: true,
      overrideBrowserslist: ["last 5 versions"]
    }))
    .pipe(app.plugins.gulpif(!app.isBuild, app.plugins.sourcemaps.write()))
    .pipe(app.gulp.dest(app.pathes.build.css))
    .pipe(app.plugins.browsersync.stream())
}