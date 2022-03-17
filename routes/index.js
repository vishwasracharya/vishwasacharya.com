// 🏠 Home Router (index.js)
let express = require('express');
let router = express.Router();
const path = require('path');
const keys = require('../config/keys');

function getPathFromUrl(url) {
    return url.split("?")[0];
}

// 🏠 Home Page Route (Landing Page)
router.get('/', addLocals, function (req, res) {
    res.render('index', {
        slug: getPathFromUrl(req.originalUrl),
    });
});

// 🤔 About Page Route (Landing Page)
router.get('/about', addLocals, function (req, res) {
    res.render('about', {
        slug: getPathFromUrl(req.originalUrl),
    });
});

// 🎙 Podcast Page Route (Landing Page)
router.get('/podcast', addLocals, function (req, res) {
    res.render('podcast', {
        slug: getPathFromUrl(req.originalUrl),
    });
});

function addLocals(req, res, next) {
    res.locals.site_url = keys.site_url;
    res.locals.slug = getPathFromUrl(req.originalUrl);
    return next();
}

module.exports = router;