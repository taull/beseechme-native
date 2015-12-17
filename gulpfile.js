var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

//Concatenate (and minify) all scripts to dest/main.js

gulp.task('scripts', function () {
	return gulp.src(['./scripts/main.js','./scripts/views/*.js','./scripts/router.js'])
	.pipe(concat('main.js'))
	// .pipe(uglify()) don't need to minify yet
	.pipe(gulp.dest('./dest/'));
});

//Watch for changes on main.js, and concat all scripts on save

gulp.task('watch', function () {
	gulp.watch('./scripts/**', ['scripts']);
});


//Default will concatenate and then watch for changes
gulp.task('default', ['scripts', 'watch']);