var express = require('express');
var passport = require('passport');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello");
});




// Creating express app and configuring middleware needed for authentication
var app = express();

// app.use(express.static("public"));

// Requiring our routes
require("./main.route.js")(app,passport);//"./Routes/html-routes.js"

module.exports = router;