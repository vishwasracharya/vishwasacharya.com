let express = require('express');
let router = express.Router();
const keys = require('../config/keys');

function getPathFromUrl(url) {
    return url.split("?")[0];
}

// Blog Home Page Route (Landing Page)
router.get('/', addLocals, function (req, res) {
    res.render('blog/index', {
        slug: getPathFromUrl(req.originalUrl),
    });
});

function addLocals(req, res, next) {
    res.locals.site_url = keys.site_url;
    res.locals.slug = getPathFromUrl(req.originalUrl);
    return next();
}

module.exports = router;