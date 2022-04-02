const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const PORT = process.env.PORT || 5000

dotenv.config({ path: './config/config.env' });
require('./db/conn');
const Subscriber = require('./model/subscriberSchema');

// Routers for the different pages
let indexRouter = require('./routes/index');
let blogRouter = require('./routes/blog');
let podcastRouter = require('./routes/podcast');

let app = express();
app.use(express.json());


app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`App Started on ${ PORT }`))

app.use('/', indexRouter)
app.use('/blog', blogRouter)
app.use('/podcast', podcastRouter)

module.exports = app;