import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
import Map from "./Map/Map";
class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Navbar} />
        <Route path="/home" component={Home} />
        <Route path="/map" component={Map} />
      </div>
    );
  }
}

//Export main component
export default Main;
