const express = require("express");
const router = express.Router();
const Tweets = require("../models/TweetsModel");
const Tweets2 = require("../models/Tweets2Model");
const Tweets3 = require("../models/Tweets3Model");
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
    .limit(100);
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

//const fs = require("fs");
//function storeData(tweets) {
//  var mapData = tweets.map((el) => Object.values(el));
//  fs.writeFileSync("sample.txt", mapData);
//}

router.get("/mapData", function (req, res) {
  Tweets2.find(
    { longitude: { $exists: true } },
    { _id: 0, rawContent: 1, longitude: 1, latitude: 1 },
    (err, tweets) => {
      if (err) {
        res.send({ err: err });
      } else {
        //console.log(JSON.stringify(tweets));
        //var mapData = tweets.map((el) => Object.values(el));
        //console.log(mapData);
        //let myData = JSON.stringify(tweets);
        //storeData(myData);
        res.send(JSON.stringify(tweets));
      }
    }
  ).limit(3);
});

//use aggregate pipelin to change fields in coordinates
//change to format coord: {[x,y]}

//this api retrieves top 10 most liket tweets given the longitude and latitude
router.post("/updatedSearch", function (req, res) {
  console.log(req.body);
  let long = req.body.longitude;
  let lat = req.body.latitude;
  let radius = req.body.radius;
  let category = req.body.selectedOption;

  //Find and retrieve all top ten tweets by number of likes
  if (category == "likes") {
    Tweets3.find(
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
    Tweets3.find(
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
    Tweets3.find(
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

router.get("/updatedMapData", function (req, res) {
  Tweets3.find(
    { longitude: { $exists: true } },
    {
      _id: 0,
      username: 1,
      displayname: 1,
      rawContent: 1,
      longitude: 1,
      latitude: 1,
    },
    (err, tweets) => {
      if (err) {
        res.send({ err: err });
      } else {
        //console.log(JSON.stringify(tweets));
        //var mapData = tweets.map((el) => Object.values(el));
        //console.log(mapData);
        //let myData = JSON.stringify(tweets);
        //storeData(myData);
        res.send(JSON.stringify(tweets));
      }
    }
  );
});
module.exports = router;
