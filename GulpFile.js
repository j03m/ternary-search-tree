var gulp = require("gulp");
var mocha = require("gulp-mocha");
var _ = require("lodash");
var tests = "tests/**/*.js";
var sources = "src/**/*.js";


gulp.task('test', function () {
    return gulp.src(tests)
        .pipe(mocha({ reporter: 'spec', growl: 'true' }));
});
