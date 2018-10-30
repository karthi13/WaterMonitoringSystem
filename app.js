//Library Imports
var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var passport = require('passport');

var app = express();
app.use(cors());
//Import from project files
//body parser code
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 


const db = require('./backend/config/db.config.js');
require('dotenv').config();
require('./backend/config/passport.js')(passport, db.user);
require('./backend/routes/main.route.js')(app,passport);
require('./backend/Services/passportStrategy')(passport);

// var models = require('./backend/models');
// var indexRouter = require('./backend/routes/index');
// var usersRouter = require('./backend/routes/users');

app.get('/', function(req, res) {
  res.send('Nice meeting you wizard, I\'m deema!');
});

const port = process.env.PORT || 4000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));



// Passport
app.use(
  session({ secret: 'CoolCoder', resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session());


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// force: true will drop the table if it already exists
db.sequelize.sync({force: false, alert: true}).then(() => {
  console.log('Drop and Resync with { force: false }');
});

app.listen(port, () => console.log(port));

module.exports = app;
