var gulp 			= require('gulp'),
	gutil 			= require('gulp-util'),
	browserify 		= require('gulp-browserify'),
	compass			= require('gulp-compass'),
	minifyCSS 		= require('gulp-minify-css'),
	uglify 			= require('gulp-uglify'),
	postcss 		= require('gulp-postcss'),
  	autoprefixer 	= require('autoprefixer'),
  	scss 			= require('gulp-sass'),
  	imagemin 		= require('gulp-imagemin'),
	concat			= require('gulp-concat'),
	env				= process.env.NODE_ENV || 'dev',
	mainPath 		= ['development/'],
	jsPath			= [mainPath + 'js/'],
	imagesSrc		= [mainPath + 'images/**/*.*'],
	sassSrc			= [mainPath + 'scss/*.scss'],
	sassSrcWatch	= [mainPath + 'scss/**/*.scss'],
	jsSrc = [ jsPath + 'javascripts.js' ],
	output;

if (env === 'dev') {
	output = ['../tanafus/branches/20161023_english-764_M/front_public/'];
} else {
	output = ['production/'];
}

gulp.task('js', function() {
	gulp.src(jsSrc)
		.pipe(concat('javascripts.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest(output + 'assets/js'));
	gulp.src(jsSrc)
		.pipe(concat('javascripts.js'))
		.pipe(gulp.dest(output + 'assets/js/src'))
});

gulp.task('css', ['css-src'], function() {
	gulp.src(sassSrc)
		.pipe(compass({
			css: output + 'skin/css',
			sass: mainPath + 'scss/',
			image: imagesSrc
		}))
		.pipe(postcss([
	    	autoprefixer()
	    ]))
	    .pipe(minifyCSS())
		.on('error', gutil.log)
		.pipe(gulp.dest(output + 'skin/css'));
});

gulp.task('css-src', function() {
	gulp.src(sassSrc)
		.pipe(compass({
			css: output + 'skin/css',
			sass: mainPath + 'scss/',
			image: imagesSrc
		}))
		.pipe(postcss([
	    	autoprefixer()
	    ]))
		.on('error', gutil.log)
		.pipe(gulp.dest(output + 'skin/css/src'));
});

gulp.task('img', function() {
	gulp.src(imagesSrc)
		.pipe(imagemin())
		.on('error', gutil.log)
		.pipe(gulp.dest(output + 'skin/images'));
});

gulp.task('watch', function() {
	gulp.watch(jsSrc, ['js']);
	gulp.watch(sassSrcWatch, ['css']);
	gulp.watch(imagesSrc, ['img']);
});
gulp.task('default', ['js', 'css', 'img']);



