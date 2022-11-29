const express = require("express");
const router = express.Router();
const Tweets = require("../models/TweetsModel");
const Tweets2 = require("../models/Tweets2Model");
//this api is just to test the retrieval of ten tweets
router.get("/all", function (req, res) {
  Tweets.find({}, (err, tweets) => {
    if (err) {
      res.send({ err: err });
    } else {
      console.log(JSON.stringify(tweets));
      res.send(JSON.stringify(tweets));
    }
  })
    .sort({ likeCount: -1 })
    .limit(10);
});

//this api retrieves top 10 most liket tweets given the longitude and latitude
router.post("/search", function (req, res) {
  console.log(req.body);
  let long = req.body.longitude;
  let lat = req.body.latitude;
  let radius = req.body.radius;
  let category = req.body.selectedOption;

  //Find and retrieve all top ten tweets by number of likes
  if (category == "likes") {
    Tweets.find(
      {
        coordinates: {
          $geoWithin: { $centerSphere: [[long, lat], radius / 3963.2] },
        },
      },
      (err, tweets) => {
        if (err) {
          res.send({ err: err });
        } else {
          console.log(tweets);
          res.send(tweets);
        }
      }
    )
      .sort({ likeCount: -1 })
      .limit(10);
  } else if (category == "reply") {
    //Find and retrieve all top ten tweets by number of replies
    Tweets.find(
      {
        coordinates: {
          $geoWithin: { $centerSphere: [[long, lat], radius / 3963.2] },
        },
      },
      (err, tweets) => {
        if (err) {
          res.send({ err: err });
        } else {
          console.log(tweets);
          res.send(tweets);
        }
      }
    )
      .sort({ replyCount: -1 })
      .limit(10);
  } else {
    //Find and retrieve all top ten tweets by number of retweet count
    Tweets.find(
      {
        coordinates: {
          $geoWithin: { $centerSphere: [[long, lat], radius / 3963.2] },
        },
      },
      (err, tweets) => {
        if (err) {
          res.send({ err: err });
        } else {
          console.log(tweets);
          res.send(tweets);
        }
      }
    )
      .sort({ retweetCount: -1 })
      .limit(10);
  }
});

//use aggregate pipelin to change fields in coordinates
//change to format coord: {[x,y]}
module.exports = router;
