const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000

let indexRouter = require('./routes/index');

let app = express();


app
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

app.use('/', indexRouter)

module.exports = app;