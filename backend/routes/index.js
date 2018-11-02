var express = require('express');
var passport = require('passport');
const webpush = require("web-push");
const bodyParser = require("body-parser");
const path = require("path");

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello");
});


// Creating express app and configuring middleware needed for authentication
const app = express();

// Set static path
app.use(express.static(path.join(__dirname, "../frontend")));

app.use(bodyParser.json());

const publicVapidKey = process.env.PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route .. This shall be called only if a trigger happened in DB 
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  var percent=85; //frm db 
  // Create payload
  const payload = JSON.stringify({ 
    title: "Water Usage Alert" ,
    body: "Your Water Usage Exceeded "+ percent+"%",
    //icon: follower.photoURL
  });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

// Requiring our routes
require("./main.route.js")(app,passport);//"./Routes/html-routes.js"

module.exports = router;