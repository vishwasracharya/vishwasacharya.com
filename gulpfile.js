/* Include gulp and plugins */
var gulp = require('gulp'),
    { src, dest, watch, series, parallel, task } = require('gulp'),
    cleancss = require('gulp-clean-css'),
    purgecss = require('gulp-purgecss'),
    concat = require('gulp-concat'),
    inject = require('gulp-inject'),
    uglify = require('gulp-uglify'),
    Path = require('path')
;
    
/* Paths */
var paths = {
    baseDir : {
        views : './views/',
        css : './public/css/',
        js : './public/js/',
    },
    css : {
        bootstrap : 'bootstrap.min.css',
        custom : 'custom.css',
        animation : 'animation.css',
    },
    js : {
        bootstrap : 'bootstrap.min.js',
        custom : 'custom.js',
    },
    dest : {
        css : './public/css/min/',
        js : './public/js/min/',
    }
}

var Files = ['blog/index', 'blog/posts', 'legal/privacy-policy', 'legal/terms-of-services', 'podcast/episode', 'podcast/index', 'about', 'contact', 'index', 'projects'];

/* ALL Tasks */

task('css', function() {
    return src(paths.baseDir.css + '**/*.css')
        .pipe(purgecss({ content: [ paths.baseDir.views + '**/*.ejs' ] }))
        .pipe(concat('style.css'))
        .pipe(cleancss())
        .pipe(dest(paths.dest.css));
});

task('inject:css', function() {
    const tasks = Files.map((fileName) => {
        return src([paths.baseDir.views + fileName + '.ejs'])
            .pipe(inject(src('public/dist/css/' + fileName + '.css'), {
                ignorePath: "public/",
                addRootSlash: true,
            }))
            .pipe(dest(paths.baseDir.views + Path.dirname(fileName)));
    });
    return Promise.all(tasks);
});

task('minify:js', function() {
    return src(paths.baseDir.js + paths.js.bootstrap).pipe(src(paths.baseDir.js + paths.js.custom))
        .pipe(uglify())
        .pipe(dest(paths.dest.js));
});

function cssTask(fileName) {
    return src(paths.baseDir.css + paths.css.bootstrap).pipe(src(paths.baseDir.css + paths.css.custom)).pipe(src(paths.baseDir.css + paths.css.animation))
        .pipe(purgecss({ content: [ paths.baseDir.views + fileName + '.ejs' ] }))
        .pipe(concat(Path.basename(fileName) + '.css'))
        .pipe(cleancss())
        .pipe(dest(paths.dest.css + Path.dirname(fileName)));
}

task('blog/index', () => {return cssTask(Files[0]);});
task('blog/posts', () => {return cssTask(Files[1]);});
task('legal/privacy-policy', () => {return cssTask(Files[2]);});
task('legal/terms-of-services', () => {return cssTask(Files[3]);});
task('podcast/episode', () => {return cssTask(Files[4]);});
task('podcast/index', () => {return cssTask(Files[5]);});
task('about', () => {return cssTask(Files[6]);});
task('contact', () => {return cssTask(Files[7]);});
task('index', () => {return cssTask(Files[8]);});
task('projects', () => {return cssTask(Files[9]);});

task('watch', () => {
    watch(paths.baseDir.views + Files[0] + '.ejs', series('blog/index'));
    watch(paths.baseDir.views + Files[1] + '.ejs', series('blog/posts'));
    watch(paths.baseDir.views + Files[2] + '.ejs', series('legal/privacy-policy'));
    watch(paths.baseDir.views + Files[3] + '.ejs', series('legal/terms-of-services'));
    watch(paths.baseDir.views + Files[4] + '.ejs', series('podcast/episode'));
    watch(paths.baseDir.views + Files[5] + '.ejs', series('podcast/index'));
    watch(paths.baseDir.views + Files[6] + '.ejs', series('about'));
    watch(paths.baseDir.views + Files[7] + '.ejs', series('contact'));
    watch(paths.baseDir.views + Files[8] + '.ejs', series('index'));
    watch(paths.baseDir.views + Files[9] + '.ejs', series('projects'));
});

task('default', series('watch'));