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


// Requiring our routes
require("./main.route.js")(app,passport);//"./Routes/html-routes.js"

module.exports = router;