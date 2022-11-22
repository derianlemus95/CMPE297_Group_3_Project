const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var tweetSchema = new Schema(
  {
    url: { type: String },
    date: { type: Date },
    rawContent: { type: String },
    renderedContent: { type: String },
    id: { type: String },
    user: { type: String },
    replyCount: { type: String },
    retweetCount: { type: String },
    likeCount: { type: String },
    quoteCount: { type: String },
  },
  {
    versionKey: false,
  }
);

const tweetModel = mongoose.model("tweet", tweetSchema, "Tweets");
module.exports = tweetModel;
