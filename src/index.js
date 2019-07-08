// Import dependencies
require("./config/config");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

let app = express();

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

// Routes
app.use(require("./routes/index"));

// Connect to MongoDb
mongoose.connect(process.env.URLDB, { useNewUrlParser: true }, (err, res) => {
  if (err) throw err;
  console.log("Database ONLINE");
});

// Start express server
let port = normalizePort(process.env.PORT || "3000");
app.listen(port, () => {
  console.log("Server listen on port " + port);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
