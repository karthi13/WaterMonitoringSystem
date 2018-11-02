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

const publicVapidKey =
  "BFSGOd7W_UObKJRIy0eXoqIKWkYpkM7imDBtE_Ds5aeE5f4LNw2h7yUQO9R5xQqDyfaNu_hf7kzzKhlCZrG_QZQ";
const privateVapidKey = "4IPU7p8KvW5ZUOflDb-TNZp8GyojX4O8Btn_thFk5X8";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

// Requiring our routes
require("./main.route.js")(app,passport);//"./Routes/html-routes.js"

module.exports = router;