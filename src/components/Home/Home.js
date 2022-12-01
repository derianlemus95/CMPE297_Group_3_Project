import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import TweetCardTemp from "../tweetCard/tweetCard";
import "./Home.css";
import TweetCard from "react-tweet-card";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      longitude: "-121.9",
      latitude: "37.3333",
      selectedOption: "likes",
      radius: 50,
    };
    this.longitudeChangeHandler = this.longitudeChangeHandler.bind(this);
    this.latitudeChangeHandler = this.latitudeChangeHandler.bind(this);
    this.radiusChangeHandler = this.radiusChangeHandler.bind(this);
    this.selectedOptionChangeHandler =
      this.selectedOptionChangeHandler.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  longitudeChangeHandler = (e) => {
    this.setState({
      longitude: e.target.value,
    });
  };
  latitudeChangeHandler = (e) => {
    this.setState({
      latitude: e.target.value,
    });
  };
  radiusChangeHandler = (e) => {
    this.setState({
      radius: e.target.value,
    });
  };
  selectedOptionChangeHandler = (e) => {
    this.setState({
      selectedOption: e.target.value,
    });
  };
  submitForm = (e) => {
    e.preventDefault();
    const data = {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
      radius: this.state.radius,
      selectedOption: this.state.selectedOption,
    };
    axios.post("/tweets/updatedSearch", data).then((response) => {
      if (response) {
        console.log(response.data);
        this.setState({ tweets: response.data });
      } else {
        console.log("Error retrieving Tweets");
      }
    });
  };
  //componentDidMount() {
  //axios.get("/tweets/all").then((response) => {
  // if (response) {
  //  console.log(response.data);
  // this.setState({ tweets: response.data });
  //} else {
  //  console.log("Error retrieving Tweets");
  // }
  //});
  //}

  render() {
    let username = [];

    return (
      <div>
        <h4>ENTER COORDINATES AND THE PROGRAM WILL RETURN TOP 10 TWEETS</h4>
        <div>
          <form onSubmit={this.submitForm}>
            <div class="form-check form-check-inline">
              <input
                id="inLineRadio1"
                type="radio"
                name="sortType"
                value="likes"
                checked={this.state.selectedOption === "likes"}
                onChange={this.selectedOptionChangeHandler}
                class="form-check-input"
              />
              <label class="form-check-label" for="inLineRadio1">
                Likes
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                id="inLineRadio2"
                type="radio"
                name="sortType"
                value="reply"
                checked={this.state.selectedOption === "reply"}
                onChange={this.selectedOptionChangeHandler}
                class="form-check-input"
              />
              <label class="form-check-label" for="inLineRadio2">
                Replies
              </label>
            </div>
            <div class="form-check form-check-inline">
              <input
                id="inLineRadio3"
                type="radio"
                name="sortType"
                value="retweets"
                checked={this.state.selectedOption === "retweets"}
                onChange={this.selectedOptionChangeHandler}
                class="form-check-input"
              />
              <label class="form-check-label" for="inLineRadio3">
                Retweets
              </label>
            </div>
            <br />
            Longitude:
            <input
              onChange={this.longitudeChangeHandler}
              type="text"
              name="longitude"
            />
            Latitude:
            <input
              onChange={this.latitudeChangeHandler}
              type="text"
              name="latitude"
            />
            Radius (miles):
            <input
              onChange={this.radiusChangeHandler}
              type="text"
              name="radius"
              style={{ width: "5%" }}
            />
            <button type="submit" class="btn btn-primary">
              Search
            </button>
          </form>

          {this.state.tweets.map((tweet) => {
            return (
              <div>
                <br />
                <div class="tweetContainer">
                  <div class="tweetCard">
                    <TweetCard
                      engagement={{
                        replies: tweet.replyCount,
                        retweets: tweet.retweetCount,
                        likes: tweet.likeCount,
                      }}
                      author={{
                        name: tweet.username,
                        username: tweet.displayname,
                        image: "https://twitter.com/elonmusk/photo",
                      }}
                      tweet={tweet.renderedContent}
                      time={new Date(tweet.date)}
                      source={tweet.sourceLabel}
                      permalink="https://twitter.com/randyfactory/status/1366841622495961091" // optional
                      fitInsideContainer
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
