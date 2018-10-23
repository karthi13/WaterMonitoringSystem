//This is an app file
var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require('dotenv').config();


var indexRouter = require('./backend/routes/index');
var usersRouter = require('./backend/routes/users');

var app = express();

const port = process.env.PORT || 4000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.post('/login', usersRouter);
app.post('/register',usersRouter);

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

app.listen(port);

//Merge content//
const passport = require('passport');
var bodyParser = require('body-parser');
app.use(bodyParser.json())

const db = require('./backend/config/db.config.js');

// Passport
app.use(
  session({ secret: 'CoolCoder', resave: true, saveUninitialized: true })
); // session secret
app.use(passport.initialize());
app.use(passport.session());
/////////////////////
// Hook the passport JWT strategy.
var hookJWTStrategy = require('./backend/Services/passportStrategy');
hookJWTStrategy(passport);
/////////////////////

  
// force: true will drop the table if it already exists
db.sequelize.sync({force: false, alert: true}).then(() => {
  console.log('Drop and Resync with { force: true }');
});


require('./backend/config/passport.js')(passport, db.user);
require('./backend/Routes/customer.route.js')(app,passport);
 
//////////////////////////////////////////////////////
// app.get('/', function(req, res) {
//   res.send('Nice meeting you wizard, I\'m deema!');
// });

// // Create a Server
// var server = app.listen(9000, function () {
 
//   var host = server.address().address
//   var port = server.address().port
 
//   console.log("App listening at http://%s:%s", host, port)
// })

//////////////////////////////

module.exports = app;
