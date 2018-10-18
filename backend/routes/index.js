var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Hello");
});

module.exports = router;


// Creating express app and configuring middleware needed for authentication
var app = express();

app.use(express.static("public"));

// Requiring our routes
require("./html-routes.js")(app);//"./Routes/html-routes.js"

