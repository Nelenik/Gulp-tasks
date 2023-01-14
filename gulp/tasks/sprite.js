const svgSprite = require('gulp-svg-sprite')


exports.sprite = () => {
  return app.gulp.src(app.pathes.src.spriteicons)
    .pipe(app.plugins.plumber(app.plugins.notify.onError({
      title: "SPRITE",
      message: "Error: <%= error.message %>"
    })))
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    
    .pipe(app.gulp.dest(app.pathes.build.html))
    .pipe(app.plugins.browsersync.stream())
}