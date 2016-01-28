
var gulp = require('gulp'),
     concatCSS = require('gulp-concat-css'),
	 minifyCSS = require('gulp-minify-css'),
	 rename = require("gulp-rename"),
	 autoprefixer = require('gulp-autoprefixer'),
	 connect = require('gulp-connect');
	 livereload = require('gulp-livereload'),
	 var sass = require('gulp-sass'),
	 notify = require('gulp-notify');
//connect server
gulp.task('connect', function(){
	connect.server({
		root : 'app',
		livereload : true
	});
});

//css
gulp.task('css', function() {
  gulp.src("css/*.css")
    .pipe(sass().on('error', sass.logError))
  	.pipe(minifyCSS())
  	.pipe(rename("bundle.min.css"))
  	.pipe(autoprefixer("last 2 versions", '> 1%', 'ie 9'))
  	.pipe(notify("Nice!"))
  	
  	.pipe(connect.reload())
  	.pipe(gulp.dest("app/css"));
});
//html 
gulp.task('html', function (){
	gulp.src('app/index.html')
	.pipe(connect.reload());
})
//watch
gulp.task('watch', function() {
	gulp.watch('css/*.css', ['css'])
	gulp.watch('app/*index.html', ['html'])
})
//default
gulp.task('default', ['connect', 'html', 'css', 'watch']);