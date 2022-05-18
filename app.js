const express = require('express');

const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const compression = require('compression');
const bodyParser = require('body-parser');
const minify = require("express-minify");
const favicon = require("serve-favicon");
const keys = require('./config/keys');
const helmet = require('helmet');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require('path');

const PORT = process.env.PORT || 5000

dotenv.config({ path: './config/config.env' });
require('./db/conn');

// Routers for the different pages
let indexRouter = require('./routes/index');
let blogRouter = require('./routes/blog');
let podcastRouter = require('./routes/podcast');

let app = express();

// view engine setup
app.use(express.static(path.join(__dirname, 'public')));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(cors());

app.set("trust proxy", 1);

app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(compression());
// app.use(minify());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    limit: "5mb",
    extended: true,
  })
);

app.use(cookieParser());
// app.use(helmet());

app.listen(PORT, () => console.log(`App Started on ${ PORT }`))
  
app.use((req, res, next) => {
    res.set('Cache-Control', 'public, max-age=31536000');
    next();
});

app.use('/', indexRouter)
app.use('/blog', blogRouter)
app.use('/podcast', podcastRouter)

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.render("error", { env: keys.environment });
});

module.exports = app;