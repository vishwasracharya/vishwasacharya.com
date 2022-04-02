let express = require('express');
let router = express.Router();
const keys = require('../config/keys');
const podData = require('../data/podcast.json');

function getPathFromUrl(url) {
    return url.split("?")[0];
}

router.get('/', addLocals, function (req, res) {
    res.render('podcast/index', {
        slug: getPathFromUrl(req.originalUrl),
        podDetails: podData[0].pod_details,
        podAvailaibility: podData[0].pod_availaibility,
        podEpisodes: podData[0].pod_episodes,
    });
});

router.get('/:selected_episode', addLocals, function (req, res) {
    res.render('podcast/episode', {
        slug: getPathFromUrl(req.originalUrl),
        podDetails: podData[0].pod_details,
        podAvailaibility: podData[0].pod_availaibility,
        podEpisodes: podData[0].pod_episodes,
        selected_episode: req.params.selected_episode,
    });
});

function addLocals(req, res, next) {
    res.locals.site_url = keys.site_url;
    res.locals.slug = getPathFromUrl(req.originalUrl);
    return next();
}

module.exports = router;