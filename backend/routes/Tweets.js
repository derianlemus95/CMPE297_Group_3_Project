const express = require("express");
const router = express.Router();
const Tweets = require("../models/TweetsModel");

//this api is just to test the retrieval of ten tweets
router.get("/all", function (req, res) {
  Tweets.find({}, (err, tweets) => {
    if (err) {
      res.send({ err: err });
    } else {
      console.log(JSON.stringify(tweets));
      res.send(JSON.stringify(tweets));
    }
  }).limit(3);
});

//this api retrieves top 10 most liket tweets given the longitude and latitude
router.post("/searching/likes", function (req, res) {
  let long = req.body.longitude;
  let lat = req.body.latitude;
  console.log(long);
  console.log(lat);
  //Find and retrieve all top ten tweets by number of likes
  Tweets.find(
    { $geoWithin: { $centerSphere: [[long, lat], 10 / 3963.2] } },
    (err, tweets) => {
      if (err) {
        res.send({ err: err });
      } else {
        console.log(tweets);
        res.send(tweets);
      }
    }
  )
    .sort({ likeCount: 1 })
    .limit(10);
});
module.exports = router;
