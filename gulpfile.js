'use strict';

var config = {    
    vendorDir: './vendor',
    sourceDir: './source',
    bowerDir: './bower_components',    
    sassPath: './source/styles/sass',
    assetsDirName: '/assets',
    assetsDir : '',
    baseDir: './source',
    distDir: './dist'

};

var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require('gulp-notify'),
    browserSync = require('browser-sync'),    
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    size = require('gulp-size'),
    uncss = require('gulp-uncss'),
    cssnano = require('gulp-cssnano'),
    rimraf = require('gulp-rimraf'),
    runSequence = require('run-sequence'),
    rjs = require('requirejs'),
    bower = require('gulp-bower');


config.assetsDir = config.baseDir + '/' + config.assetsDirName;

// create a task to do bower install
gulp.task('bower', function ()
{
    return bower().pipe(gulp.dest(config.bowerDir));
});

// Copy js files to assets/js folder
gulp.task('loadScripts', function ()
{               
        gulp.src([
            config.bowerDir + '/jquery/dist/jquery.min.js',
            config.bowerDir + '/bootstrap-sass/assets/javascripts/bootstrap.min.js',
            config.bowerDir + '/angular/angular.min.js',
            config.bowerDir + '/angular-route/angular-route.min.js',
            config.bowerDir + '/angular-sanitize/angular-sanitize.min.js',
            config.bowerDir + '/angular-resource/angular-resource.min.js',
            config.bowerDir + '/angular-aria/angular-aria.min.js',
            config.bowerDir + '/angular-animate/angular-animate.min.js',
            config.bowerDir + '/angular-messages/angular-messages.min.js',
            config.bowerDir + '/angular-material/angular-material.min.js',            
            config.bowerDir + '/domReady/domReady.js',
			config.bowerDir + '/html5shiv/dist/html5shiv.min.js',
			config.bowerDir + '/respond/dest/respond.min.js',
            config.bowerDir + '/requirejs/require.js',
            config.bowerDir + '/text/text.js',
            config.bowerDir + '/angular-loading-bar/build/loading-bar.min.js',
            config.bowerDir + '/angular-md5/angular-md5.min.js',
            config.bowerDir + '/angular-cache/dist/angular-cache.min.js',
            config.vendorDir + '/prettyPhoto/js/jquery.prettyPhoto.js',
            config.vendorDir + '/theme/js/main.js',
        ])
        .on('error', notify.onError(function (error)
        {
            return 'Error: ' + error.message;
        }))        
        .pipe(uglify())
        .pipe(size())
        .pipe(gulp.dest(config.assetsDir + '/js'));
   
});

// Copy font icons to assets/fonts folder
gulp.task('loadFonts', function ()
{
    return gulp.src([
            config.bowerDir + '/font-awesome/fonts/**.*',
            config.bowerDir + '/bootstrap-sass/assets/fonts/bootstrap/**.*'
        ])
        .on('error', notify.onError(function (error)
        {
            return 'Error: ' + error.message;
        }))
        .pipe(gulp.dest(config.assetsDir + '/fonts'));
});

// Copy css files to assets/css folder
gulp.task('loadCss', function ()
{
    return gulp.src([
            config.bowerDir + '/angular-material/angular-material.min.css',
            config.bowerDir + '/animate.css/animate.min.css',
            config.vendorDir + '/prettyPhoto/css/prettyPhoto.css',
            config.bowerDir + '/angular-loading-bar/build/loading-bar.min.css',
            config.sourceDir + '/styles/style.css'
        ])
        .pipe(concat('style.css'))
        .pipe(size())
        //.pipe(uncss({
        //    html: [config.baseDir + '/index.html'],//'/*.html'],
        //    timeout: 2000,// wait for load js files
        //    ignore: [
        //            ".waves-ripple ",
        //            ".drag-target",
        //            "#sidenav-overlay",
        //            ".waves-effect",
        //            ".waves-effect .waves-ripple",
        //            ".waves-effect.waves-pinck .waves-ripple",
        //            ".waves-block.waves-light"
        //    ]
        //}))
        //.pipe(cssnano())
        //.pipe(size())
        .pipe(gulp.dest(config.assetsDir + '/css'))
        .on('error', notify.onError(function (error)
        {
            return 'Error: ' + error.message;
        }))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('loadImages', function ()
{
    //ui images
    gulp.src([
            config.vendorDir + '/theme/images/**/*'
        ])
        .on('error', notify.onError(function (error)
        {
            return 'Error: ' + error.message;
        }))
        .pipe(gulp.dest(config.assetsDir + '/images/'));
     return gulp.src([
            config.vendorDir + '/prettyPhoto/images/**/*'
         ])
         .on('error', notify.onError(function (error)
         {
             return 'Error: ' + error.message;
         }))
         .pipe(gulp.dest(config.assetsDir + '/images/prettyPhoto'));
});

// Copy css files to assets/css folder
gulp.task('sass', function ()
{	
	return sass(config.sourceDir + '/styles/sass/main.scss', { // Our coustom sass
			style: 'compressed',  // minify css
			loadPath: [ // load paths to easy use import in resources/sass          
			  config.bowerDir + '/bootstrap-sass/assets/stylesheets',
			  config.bowerDir + '/font-awesome/scss', // awesome icons sass files
			  //config.sourceDir + '/styles/sass'
			]
		})
		.on('error', notify.onError(function (error)
		{
			return 'Error: ' + error.message;
		}))
		.pipe(gulp.dest(config.assetsDir + '/css'))
		.pipe(browserSync.reload({
			stream: true
		}));
		
});

gulp.task('clean', function ()
{
    //clear assets directory contents
    gulp.src(config.assetsDir + '/*', { read: false })
            .pipe(rimraf({ force: true }));

    //clear dist directory contents
    return gulp.src(config.distDir + '/*', { read: false })
            .pipe(rimraf({ force: true }));
});

gulp.task('build', function ()
{    
    rjs.optimize({
        appDir: './source',
        baseUrl: './scripts',
        paths: {            
        },
        dir: 'dist',
        //optimize: "none",
        modules: [
          //First set up the common build layer.
          {
              //module names are relative to baseUrl
              name: 'common',
              //List common dependencies here. Only need to list
              //top level dependencies, "include" will find
              //nested dependencies.
              include: [
                'app'                         
              ]
          },

          //Now set up a build layer for each page, but exclude
          //the common one. "exclude" will exclude nested
          //the nested, built dependencies from "common". Any
          //"exclude" that includes built modules should be
          //listed before the build layer that wants to exclude it.
          //"include" the appropriate "app/main*" module since by default
          //it will not get added to the build since it is loaded by a nested
          //require in the page*.js files.

         //{
         //     //module names are relative to baseUrl/paths config
         //     name: './app',
         //     //include: ['app'],
         //     exclude: ['common']
         // },
          
        ]
    }, function (buildResponse)
    {
        // console.log('build response', buildResponse);
        
    });
});

gulp.task('browserSync', function ()
{
   // var bs1 = browserSync.create("publish server");
    var bs2 = browserSync.create("development server");
    
    // bs1.init({
        // port: 4000,
        // server: config.distDir,
        // ui: {
            // port: 4000
        // }
    // });

    bs2.init({
        port: 3000,
        server: config.baseDir,
        ui: {
            port: 3000
        }
    });

});

// Retrun the task when a file changes
gulp.task('run', ['loadCss', 'browserSync'], function ()
{
    gulp.watch(config.sourceDir + '/styles/**/*.scss', ['sass']);
    gulp.watch(config.sourceDir + '/styles/**/*.css', ['loadCss']);
    gulp.watch(config.htmlPath, ['html']);
    //browserSync.watch('./*.html').on('change', browserSync.reload); // browserSync watch task
});

// Run this task with :  gulp OR gulp default
gulp.task('load', function ()
{
    runSequence(
        ['clean'],
        ['bower'],
        ['sass'],
        ['loadFonts', 'loadCss', 'loadScripts', 'loadImages']
        //['build']
        );
});
