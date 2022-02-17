// 🏠 Home Router (index.js)
let express = require('express');
let router = express.Router();
const path = require('path');

function getPathFromUrl(url) {
    return url.split("?")[0];
}

// 🏠 Home Page Route (Landing Page)
router.get('/', function (req, res) {
    res.render('index', {
        slug: getPathFromUrl(req.url),
    });
});

// 🤔 About Page Route (Landing Page)
router.get('/about', function (req, res) {
    res.render('about', {
        slug: getPathFromUrl(req.url),
    });
});

// 🎙 Podcast Page Route (Landing Page)
router.get('/podcast', function (req, res) {
    res.render('podcast', {
        slug: getPathFromUrl(req.url),
    });
});

module.exports = router;