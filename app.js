const express = require('express'),
      dotenv = require('dotenv'),
      path = require('path'),
      compression = require('compression'),
      bodyParser = require('body-parser'),
      helmet = require('helmet');

const PORT = process.env.PORT || 5000

dotenv.config({ path: './config/config.env' });
require('./db/conn');

// Routers for the different pages
let indexRouter = require('./routes/index'),
    blogRouter = require('./routes/blog'),
    podcastRouter = require('./routes/podcast');

let app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app
  .use(express.static(path.join(__dirname, 'public')))
  .use(compression())
  // .use(helmet())
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`App Started on ${ PORT }`))
  
app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=31536000');
    next();
});

app.use('/', indexRouter)
app.use('/blog', blogRouter)
app.use('/podcast', podcastRouter)

module.exports = app;