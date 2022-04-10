let express = require('express');
let router = express.Router();
const keys = require('../config/keys');
const { google } = require('googleapis');

const API_KEY = process.env.GOOGLE_API_KEY;
const BLOG_ID = process.env.BLOG_ID;

const blogger = google.blogger({
    version: 'v3',
    auth: API_KEY
});

const params = {
    blogId: BLOG_ID,
    maxResults: 100,
};

function getPathFromUrl(url) {
    return url.split("?")[0];
}

function formattedDate() {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let newMonth = months[oldDate.getMonth()];
    let newDate = oldDate.getDate() + ',';
    let newYear = oldDate.getFullYear();
    return [newMonth, newDate, newYear].join(' ');
}
function capitalizeFirstLetter(string) {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

router.get('/', addLocals, function (req, res) {
    blogger.posts.list(params, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.render('blog/index', {
            posts: response.data.items,
            title: 'Blog',
        });
    });
});
router.get('/:selected_blog', addLocals, function (req, res) {
    blogger.posts.list(params, (err, response) => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.render('blog/posts', {
            posts: response.data.items,
            selected_blog: req.params.selected_blog,
            title: capitalizeFirstLetter(req.params.selected_blog.split('-').join(' ')),
            
        });
    });
});

function addLocals(req, res, next) {
    res.locals.site_url = keys.site_url;
    res.locals.slug = getPathFromUrl(req.originalUrl);
    res.locals.formattedDate= formattedDate;
    return next();
}

module.exports = router;