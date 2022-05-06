let express = require('express');
let router = express.Router();
const keys = require('../config/keys');
const podData = require('../data/podcast.json');

function getPathFromUrl(url) {
    return url.split("?")[0];
}

function capitalizeFirstLetter(string) {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

router.get('/', addLocals, function (req, res) {
    res.render('podcast/index', {
        podDetails: podData[0].pod_details,
        podAvailaibility: podData[0].pod_availaibility,
        podEpisodes: podData[0].pod_episodes,
        title: 'Podcast | Vishwas Acharya',
    });
});

router.get('/:selected_episode', addLocals, function (req, res) {
    res.render('podcast/episode', {
        podDetails: podData[0].pod_details,
        podAvailaibility: podData[0].pod_availaibility,
        podEpisodes: podData[0].pod_episodes,
        selected_episode: req.params.selected_episode,
        title: capitalizeFirstLetter(req.params.selected_episode.split('-').join(' ')) + ' | Vishwas Acharya',
    });
});

function addLocals(req, res, next) {
    res.locals.site_url = keys.site_url;
    res.locals.slug = getPathFromUrl(req.originalUrl);
    return next();
}

module.exports = router;