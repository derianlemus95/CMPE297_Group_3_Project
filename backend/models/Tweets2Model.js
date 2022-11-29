const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var tweet2Schema = new Schema(
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

const tweet2Model = mongoose.model("tweet2", tweet2Schema, "Tweets2");
module.exports = tweet2Model;
