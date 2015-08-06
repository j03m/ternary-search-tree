var gulp = require("gulp");
var istanbul = require("gulp-istanbul");
var mocha = require("gulp-mocha");
var _ = require("lodash");
var tests = "tests/**/*.js";
var sources = "src/**/*.js";
gulp.task('instrument', function () {
    freshFiles();
    return gulp.src(sources)
        .pipe(istanbul());
});

gulp.task('test', function () {
    freshFiles();
    return gulp.src(tests)
        .pipe(mocha({ reporter: 'spec', growl: 'true' }));
});


// Run tests and output reports
gulp.task('cover', ['instrument'], function () {
    return gulp.src(tests)
            .pipe(mocha()) // Run any unit test frameworks here
            .pipe(istanbul.writeReports());
});

function freshFiles(){
    _.forOwn(require.cache, function(value, key){
        if (key.indexOf('cat-stats') !== -1 && key.indexOf('node_modules')===-1){
            delete require.cache[key];
        }
    });
}
