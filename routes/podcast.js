let express = require('express');
let router = express.Router();
const keys = require('../config/keys');
const podData = require('../data/podcast.json');
const a = "Hello";
a.toLowerCase()

function getPathFromUrl(url) {
    return url.split("?")[0];
}

// Blog Home Page Route (Landing Page)
router.get('/', addLocals, function (req, res) {
    res.render('podcast/index', {
        slug: getPathFromUrl(req.originalUrl),
        podDetails: podData[0].pod_details,
        podAvailaibility: podData[0].pod_availaibility,
        podEpisodes: podData[0].pod_episodes,
    });
});
router.get('/:episode', addLocals, function (req, res) {
    res.render('podcast/episode', {
        slug: getPathFromUrl(req.originalUrl),
        podDetails: podData[0].pod_details,
        podAvailaibility: podData[0].pod_availaibility,
        podEpisodes: podData[0].pod_episodes,
        episode: req.params.episode.split("-").join(" ")
    });
});

function addLocals(req, res, next) {
    res.locals.site_url = keys.site_url;
    res.locals.slug = getPathFromUrl(req.originalUrl);
    return next();
}

module.exports = router;