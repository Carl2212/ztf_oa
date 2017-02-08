var gulp = require('gulp');
var minifyCSS = require('gulp-minify-css')

gulp.task('css', function (cb) {
        // 1\. 找到文件
    gulp.src('dist/resources/static/*.css')
        // 2\. 压缩文件
        .pipe(minifyCSS())
        // 3\. 另存为压缩文件
        .pipe(gulp.dest('dist/resources/static/'))
});

