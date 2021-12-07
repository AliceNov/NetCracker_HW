var gulp = require("gulp");
var ts = require("gulp-typescript");
var uglify = require('gulp-uglify');
const { src, dest } = require('gulp');
var tsProject = ts.createProject("tsconfig.json");
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', function(){
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
        online:false,
        notify: false
    });

    gulp.watch('dist/*.html').on('change', browserSync.reload);
});

gulp.task('scripts', function(){
    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(uglify('main.js')).pipe(dest("dist"));
});

gulp.task("code", function () {
	return gulp.src('src/index.html')
		 .pipe(gulp.dest("dist"));
});

gulp.task("style", function () {
	return gulp.src('src/style.css')
		 .pipe(gulp.dest("dist"));
});

gulp.task('default', gulp.series('code', 'style','scripts','browser-sync'));
