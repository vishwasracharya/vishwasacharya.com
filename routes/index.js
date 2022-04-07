// Home Router (index.js)
let express = require('express');
let router = express.Router();
const path = require('path');
const keys = require('../config/keys');
const Subscriber = require('../model/subscriberSchema');
const Contact = require('../model/contactSchema');
const projectData = require('../data/projects.json');
// require db 
require('../db/conn');

function getPathFromUrl(url) {
    return url.split("?")[0];
}

// Home Page Route (Landing Page)
router.get('/', addLocals, function (req, res) {
    res.render('index', {
        slug: getPathFromUrl(req.originalUrl),
    });
});

// About Page Route (Landing Page)
router.get('/about', addLocals, function (req, res) {
    res.render('about', {
        slug: getPathFromUrl(req.originalUrl),
    });
});

router.get('/projects', addLocals, function (req, res) {
    res.render('projects', {
        slug: getPathFromUrl(req.originalUrl),
        projectData: projectData,
    });
});

router.get('/terms-of-services', addLocals, function (req, res) {
    res.render('legal/terms-of-services', {
        slug: getPathFromUrl(req.originalUrl),
    });
});

router.get('/privacy-policy', addLocals, function (req, res) {
    res.render('legal/privacy-policy', {
        slug: getPathFromUrl(req.originalUrl),
    });
});

router.get('/contact', addLocals, function (req, res) {
    res.render('contact', {
        slug: getPathFromUrl(req.originalUrl),
    });
});

// Newsletter Route (About Page)
router.post('/subscribe', function (req, res) {
    const { name, email } = req.body;
    // validate
    if (!name || !email) {
        return res.status(400).json({
            status: 'error',
            message: 'Please fill all the fields'
        });
    }
    // save to db
    Subscriber.findOne({ email: email })
        .then(subscriber => {
            if (subscriber) {
                return res.status(400).json({
                    isSubscribed: true,
                    status: 'error',
                    message: 'Email already exists'
                });
            }
            const newSubscriber = new Subscriber({
                name,
                email
            });
            newSubscriber.save()
                .then(subscriber => {
                    res.status(201).json({
                        success: true,
                        status: 'success',
                        message: 'Subscribed successfully'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        status: 'error',
                        message: 'Something went wrong'
                    });
                });
        }).catch(err => {
            res.status(500).json({
                status: 'error',
                message: 'Something went wrong'
            });
        });
});

// Contact Page Message Route (Contact Page)
router.post('/contact', function (req, res) {
    const { name, email, phone, message } = req.body;
    // validate
    if (!name || !email || !message) {
        return res.status(400).json({
            status: 'error',
            message: 'Please fill all the fields'
        });
    }
    // save to db
    Contact.findOne({ email: email })
        .then(() => {
            const newContact = new Contact({
                name,
                email,
                phone,
                message
            });
            newContact.save()
                .then(() => {
                    res.status(201).json({
                        success: true,
                        status: 'success',
                        message: 'Message Sent successfully'
                    });
                })
                .catch(err => {
                    res.status(500).json({
                        success: false,
                        status: 'error',
                        message: 'Something went wrong'
                    });
                    console.log(err);
                });
            }).catch(err => {
                res.status(500).json({
                    status: 'error',
                    message: 'Something went wrong'
                });
                console.log(err);
        });
});

function addLocals(req, res, next) {
    res.locals.site_url = keys.site_url;
    res.locals.slug = getPathFromUrl(req.originalUrl);
    return next();
}

module.exports = router;