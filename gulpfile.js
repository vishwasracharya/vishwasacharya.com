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

task('css', () => {
    return src(paths.baseDir.css + '**/*.css')
        .pipe(purgecss({ content: [ paths.baseDir.views + '**/*.ejs' ] }))
        .pipe(concat('style.css'))
        .pipe(cleancss())
        .pipe(dest(paths.dest.css));
});

task('css:all', () => {
    const tasks = Files.map((fileName) => {
        cssTask(fileName);
    });
    return Promise.all(tasks);
});

task('inject:all', function() {
    const tasks = Files.map((fileName) => {
        injectTask(fileName);
    });
    return Promise.all(tasks);
});

task('minify:js', () => {
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

function injectTask(fileName) {
    const d = new Date();
    const cbString = d.getTime();
    return src([paths.baseDir.views + fileName + '.ejs'])
        .pipe(inject(src(paths.dest.css + fileName + '.css'), {
            ignorePath: "public/",
            addSuffix: "?cb=" + cbString,
            addRootSlash: true,
        }))
        .pipe(dest(paths.baseDir.views + Path.dirname(fileName)));
}

task('css:blog/index', () => {return cssTask(Files[0]);});
task('css:blog/posts', () => {return cssTask(Files[1]);});
task('css:legal/privacy-policy', () => {return cssTask(Files[2]);});
task('css:legal/terms-of-services', () => {return cssTask(Files[3]);});
task('css:podcast/episode', () => {return cssTask(Files[4]);});
task('css:podcast/index', () => {return cssTask(Files[5]);});
task('css:about', () => {return cssTask(Files[6]);});
task('css:contact', () => {return cssTask(Files[7]);});
task('css:index', () => {return cssTask(Files[8])});
task('css:projects', () => {return cssTask(Files[9]);});

task('watch', () => {
    watch(paths.baseDir.views + Files[0] + '.ejs', series('css:blog/index'));
    watch(paths.baseDir.views + Files[1] + '.ejs', series('css:blog/posts'));
    watch(paths.baseDir.views + Files[2] + '.ejs', series('css:legal/privacy-policy'));
    watch(paths.baseDir.views + Files[3] + '.ejs', series('css:legal/terms-of-services'));
    watch(paths.baseDir.views + Files[4] + '.ejs', series('css:podcast/episode'));
    watch(paths.baseDir.views + Files[5] + '.ejs', series('css:podcast/index'));
    watch(paths.baseDir.views + Files[6] + '.ejs', series('css:about'));
    watch(paths.baseDir.views + Files[7] + '.ejs', series('css:contact'));
    watch(paths.baseDir.views + Files[8] + '.ejs', series('css:index'));
    watch(paths.baseDir.views + Files[9] + '.ejs', series('css:projects'));
});

task('default', series('watch'));