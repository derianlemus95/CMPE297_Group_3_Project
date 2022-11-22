import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tweets: [],
      longitude: "-121.9",
      latitude: "37.3333",
    };
    this.longitudeChangeHandler = this.longitudeChangeHandler.bind(this);
    this.latitudeChangeHandler = this.latitudeChangeHandler.bind(this);
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
  submitForm = (e) => {
    e.preventDefault();
    const data = {
      longitude: this.state.longitude,
      latitude: this.state.latitude,
    };
    axios.post("/tweets/search/likes", data).then((response) => {
      if (response) {
        console.log(response.data);
        this.setState({ tweets: response.data });
      } else {
        console.log("Error retrieving Tweets");
      }
    });
  };
  componentDidMount() {
    axios.get("/tweets/all").then((response) => {
      if (response) {
        console.log(response.data);
        this.setState({ tweets: response.data });
      } else {
        console.log("Error retrieving Tweets");
      }
    });
  }

  render() {
    return (
      <div>
        <h2>
          This page display the map and top ten tweets for the given coordiantes
          are displayed{" "}
        </h2>
        <div>
          <form onSubmit={this.submitForm}>
            <input
              onChange={this.longitudeChangeHandler}
              type="text"
              name="longitude"
            />
            <input
              onChange={this.latitudeChangeHandler}
              type="text"
              name="latitude"
            />
            <button type="submit" class="btn btn-primary">
              Search
            </button>
          </form>

          {this.state.tweets.map((tweet) => {
            return (
              <div>
                {tweet.date}
                {tweet.rawContent}
                <p>like count</p>
                {tweet.likeCount}
                <p>retweet count</p>
                {tweet.likeCount}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Home;
