var gulp = require('gulp');
var browserify = require('browserify');
var vueify = require('vueify');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');


gulp.task('build-js',function () {
	return browserify({
		entries: './js/vueku.js',
		debug: true
	})
	.transform(vueify)
	.bundle()
	.pipe(source('build.js'))
	.pipe(gulp.dest('./js/'));
});

gulp.task('build-css',function () {
	gulp.src('./sass/main.sass')
	.pipe(
		sass({
			outputStyle: 'compressed'
		})
		.on('error', sass.logError)
	)
	.pipe(gulp.dest('./css'));
});

gulp.task('dev', function () {
	gulp.watch(['./vue/*.vue','./js/vueku.js'],['build-js']);
	gulp.watch('./sass/*.sass',['build-css']);
});

gulp.task('default', ['dev']);
