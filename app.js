//Library Imports
var createError = require('http-errors');
var cors = require('cors');
var express = require('express');
var session = require('express-session');
var bodyparser = require('body-parser');
var path = require('path');
var logger = require('morgan');
var passport = require('passport');
const webpush = require("web-push");

var app = express();
app.use(cors());
//Import from project files
//body parser code
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.static(path.join(__dirname, '/frontend/build'))); 


const db = require('./backend/config/db.config.js');
if (process.env.NODE_ENV !== 'production') require('dotenv').config();
require('./backend/config/passport.js')(passport, db.user);
require('./backend/routes/main.route.js')(app,passport);
require('./backend/Services/passportStrategy')(passport);

// var models = require('./backend/models');
// var indexRouter = require('./backend/routes/index');
// var usersRouter = require('./backend/routes/users');


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
  res.send('The page is not available');
});

// app.get('/', function(req, res) {
//   res.send('Nice meeting you wizard, I\'m deema!');
// });

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

///////////////////////Push Notification //
// Creating express app and configuring middleware needed for authentication
//const app = express();

// Set static path
//app.use(express.static(path.join(__dirname, "../frontend")));

app.use(bodyparser.json());

// const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
// const privateVapidKey = process.env.PRIVATE_VAPID_KEY;
///////// Keys ////////////////////////////////////////////////////////////////////
// const privateVapidKey="4IPU7p8KvW5ZUOflDb-TNZp8GyojX4O8Btn_thFk5X8";
// const publicVapidKey= "BFSGOd7W_UObKJRIy0eXoqIKWkYpkM7imDBtE_Ds5aeE5f4LNw2h7yUQO9R5xQqDyfaNu_hf7kzzKhlCZrG_QZQ";
// /////////////////////////////////////////////////////////////////////////////////////

// webpush.setVapidDetails(
//   "mailto:water@water_reporter.com",
//   publicVapidKey,
//   privateVapidKey
// );

// // Subscribe Route .. This shall be called only if a trigger happened in DB 
// app.post("/subscribe", (req, res, next) => {
//   // Get pushSubscription object
//   const subscription = req.body;
//   console.log(subscription)

//   // Send 201 - resource created
//   res.status(201).json({});

//   var percent=85; //frm db 
//   // Create payload
//   const payload = JSON.stringify({ 
//     title: "Water Usage Alert" ,
//     body: "Your Water Usage Exceeded "+ percent+"%",
//     //icon: follower.photoURL
//   });

//   pushIntervalID = setInterval(() => {
//   // Pass object into sendNotification
//   webpush
//     .sendNotification(subscription, payload)
//     //.catch(err => console.error(err));
//     .catch(() => clearInterval(pushIntervalID))
//   }, 30000)
// });


// app.delete("/unsubscribe", (req, res, next) => {
//   subscription = null
//   clearInterval(pushIntervalID)
//   res.sendStatus(200)
// })

module.exports = app;
