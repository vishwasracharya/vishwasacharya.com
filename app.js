const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const PORT = process.env.PORT || 5000

dotenv.config({ path: './config/config.env' });
require('./db/conn');

// Routers for the different pages
let indexRouter = require('./routes/index');

let app = express();


app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`App Started on ${ PORT }`))

app.use('/', indexRouter)

module.exports = app;