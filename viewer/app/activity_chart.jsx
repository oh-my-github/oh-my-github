// activity_chart.jsx

"use strict";

import React from 'react';
import c3 from "c3";

// http://babeljs.io/blog/2015/06/07/react-on-es6-plus/
// http://egorsmirnov.me/2015/09/30/react-and-es6-part4.html
export default class ActivityChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      bindto: "#chart_1",
      data: {
        columns: [
          ['data1', 30, 200, 100, 400, 150, 250],
          ['data2', 50, 20, 10, 40, 15, 25]
        ]
      }
    }
  }

  componentDidMount() {
    /** since c3 requires HTML element, we should use `DidMount` */
    this.updateChart();
  }

  updateChart() {
    let state = this.state;
    c3.generate(state);
  }

  render() {
    return (
        <div id="chart_1"></div>
    )
  }
}
