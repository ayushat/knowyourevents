const express = require('express');
const nunjucks = require('nunjucks');
const session = require('express-session');
const indexRouter = require('./routes/index.route');

const app = express();

require('dotenv').config();

// nunjucks config
nunjucks.configure('views', {
  autoescape: true,
  express: app,
});

// init static files
// this files contain css and js for views
app.use(express.static('public'));

// express-session config
app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: "sssh, quiet! it's a secret!",
    cookie: {
      maxAge: 1000 * 60 * 60 * 2,
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

// test route
app.get('/index', (req, res) => {
  res.send('App works');
});

// index route
app.use('', indexRouter);

// let port = process.env.PORT;
// if (port == null || port == "") {
//   port = 3000;
// }
// app.listen(port || 3000, (req, res) => {
//   console.log('Server running on 3000');
// });

module.exports = app;
