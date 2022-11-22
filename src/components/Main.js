import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "./Navbar/Navbar";
import Home from "./Home/Home";
class Main extends Component {
  render() {
    return (
      <div>
        <Route path="/" component={Home} />
      </div>
    );
  }
}

//Export main component
export default Main;
