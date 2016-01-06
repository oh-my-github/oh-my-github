// index.jsx

import React from "react";
import ReactDOM from "react-dom";

import HelloWorld from './hello-world';
import ActivityChart from "./activity_chart";
import RaisedButton from 'material-ui/lib/raised-button';

ReactDOM.render(
  <div>
    <RaisedButton label="Default" />
    <HelloWorld />
    <ActivityChart />
  </div>,
  document.getElementById("content")
);