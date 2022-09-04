const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');

// for server
const app = express();
const port = '1923';
const host = 'localhost';

// database
const db = require('./config/mongoose');
app.use(express.urlencoded());
// for flash messages
app.use(
  session({
    name: 'URL-Shortener',
    secret: 'url',
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.success_message = req.flash('success_message');
  res.locals.error = req.flash('error');
  next();
});

// for ejs templates
app.set('view engine', 'ejs');
app.set('views', 'views');
app.use('/assets', express.static('./assets'));

// for routes
app.use('/', require('./routes/index'));

app.listen(port, host, (error) => {
  if (error) {
    console.log(`server not started`);
  }
  console.log(`server is running on http://${host}:${port}`);
});
