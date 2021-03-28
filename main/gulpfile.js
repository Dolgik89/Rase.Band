var gulp            = require('gulp');
var sass            = require('gulp-sass');
var autoprefixer    = require('gulp-autoprefixer');
var gcmq            = require('gulp-group-css-media-queries');
var clear           = require('gulp-minify-css');
var uglify          = require('gulp-uglify');
var concat          = require('gulp-concat');
var nunjucks        = require('gulp-nunjucks');
var data            = require('gulp-data');
var fs              = require('fs');
var $ = {
    gutil: require('gulp-util'),
    size: require('gulp-size')
};

var basePaths = {
    src: 'build/',
    dest: 'source/'
};
var paths = {
    styles: {
        scss: basePaths.src + 'sass/',
        css: basePaths.dest + 'css/'
    },
    js: {
        build: basePaths.src + 'js/',
        source: basePaths.dest + 'js/'
    },
    templates: {
        njk: basePaths.src + 'templates/',
        html: basePaths.dest
    }
};

gulp.task('sass', function(done){
    gulp.src(paths.styles.scss + '/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gcmq())
        .pipe(clear({processImport: false}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest(paths.styles.css));
    done();
});

gulp.task('bundleJS', function (done) {
    gulp.src([
        paths.js.build + '/moment.min.js',
        paths.js.build + '/lightpick.js',
        paths.js.build + '/tom-select.complete.min.js',
        paths.js.build + '/swiper.min.js',
        paths.js.build + '/script.js'])
        .pipe(concat('bundle.min.js'))
        .pipe(gulp.dest(paths.js.source))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.source));
    done();
});

gulp.task('nunjucks', function(done){
    gulp.src(paths.templates.njk + '/**/[^_]*.njk')
        .pipe(data(function() {
            return JSON.parse(fs.readFileSync('data.json'));
        }))
        .pipe(
            nunjucks.compile({
                autoescape: false
            })
        )
        .pipe(gulp.dest(paths.templates.html));
    done();
})

gulp.task('watch', function(done) {
    gulp.watch(paths.styles.scss + '**/*.scss', gulp.series('sass'));
    gulp.watch(paths.js.build + '**/*.js', gulp.series('bundleJS'));
    gulp.watch(paths.templates.njk + '**/*.njk', gulp.series('nunjucks'));
    done();
});
