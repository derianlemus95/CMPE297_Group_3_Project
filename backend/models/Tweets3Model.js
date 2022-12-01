const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var tweet3Schema = new Schema(
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

const tweet3Model = mongoose.model("tweet3", tweet3Schema, "Tweets3");
module.exports = tweet3Model;
