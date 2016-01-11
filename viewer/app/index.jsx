// index.jsx

import React from "react";
import ReactDOM from "react-dom";

import ActivityChart from "./activity_chart";
import GithubUser from "./github_user";
import LanguageChart from "./language_chart";

ReactDOM.render(
  <div className="row">
    <br />
    <div className="row">
      <div className="col-sm-2" />
      <div className="col-sm-8"> <GithubUser /> </div>
      <div className="col-sm-2" />
    </div>
    <div className="row" style={{margin: "20px", marginTop: "50px"}}>
      <LanguageChart />
    </div>
    <div className="row" style={{margin: "20px", marginTop: "50px"}}>

      <div className="col-sm-2" />
      <div className="col-sm-8">
        <ActivityChart />
      </div>
      <div className="col-sm-2" />
    </div>
  </div>
  , document.getElementById("content")
);