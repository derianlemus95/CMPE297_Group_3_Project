var express = require("express");
var app = express();
var session = require("express-session");
var cors = require("cors");
var config = require("./configs/config");
var mongoose = require("mongoose");

//use cors to allow cross origin resource sharing
app.use(
  cors({
    origin: config.frontendURL,
    credentials: true,
  })
);

//use express session to maintain session data
app.use(
  session({
    secret: "cmpe297-group3-project",
    resave: false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized: false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration: 60 * 60 * 1000, // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration: 5 * 60 * 1000,
  })
);

app.use(express.json());

//Allow Access Control
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", config.frontendURL);
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});

var options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(config.mongoDBURL, options, (err, res) => {
  if (err) {
    console.log(err);
    console.log(`MongoDB Connection Failed`);
  } else {
    console.log(`MongoDB Connected`);
  }
});

//API Routes imports
const Tweets = require("./routes/Tweets");
app.use("/tweets", Tweets);

//start server on port 3001
app.listen(3001, () => console.log("Server Listening port 3001"));
