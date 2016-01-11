"use strict";

import React from 'react';
import c3 from "c3";

import ProfileUtil from "./profile_util";

const DOM_ELEM_ACTIVITY_CHART = "activity_chart";
const eventTypes = [ // TODO: get from meta
  "PushEvent",
  "PullRequestEvent",
  "IssuesEvent",
  "IssueCommentEvent",
  "ReleaseEvent",
  "WatchEvent",
  "ForkEvent",
  "CreateEvent"
];


export default class ActivityChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      createdAts: [],
      activities: [],
      chart: null,
      chartConfiguration: {
        bindto: `#${DOM_ELEM_ACTIVITY_CHART}`,
        color: { pattern: [
          "FFE66B",
          "7A62C9",
          "5CDD5C",
          "FFAE6B",
          "FF6B6B",
          "FFFF6B",
          "9F59C6",
          "4EBABA",
          "FFCE6B",
          "C4F466",
          "DD5CA5",
          "5F7EC6"
        ]},
        data :{
          x: 'created_at',
          columns: [ ],
          type: 'spline'
        },
        axis: {
          x: {
            type: 'timeseries',
            tick: { format: '%Y-%m-%d' }
          },
          y: {
            min: 0,
            padding: {top: 0, bottom: 0.5}
          }
        }
      }
    };

    ProfileUtil.getActivityPromise()
      .then(acts => {
        let merged = {};

        acts
          .map(act => { act.created_at = act.created_at.slice(0, 10); return act; })
          .forEach(act => {
          if (!merged[act.created_at]) merged[act.created_at] = {};
          if (!merged[act.created_at][act.event_type]) merged[act.created_at][act.event_type] = 0;

          merged[act.created_at][act.event_type] += 1;
        });

        let createdAts = Object.keys(merged).sort();
        let activityColumns = eventTypes.map(eventType => {
          let column = [eventType];

          createdAts.forEach(createdAt => {
            let eventCountPerDay = 0;

            if (merged[createdAt][eventType]) eventCountPerDay = merged[createdAt][eventType];

            column.push(eventCountPerDay);
          });

          return column;
        });

        this.setState({
          createdAts: ["created_at"].concat(createdAts),
          activities: activityColumns.map(actColumn => {
            if (!actColumn || actColumn.length == 0 ) return actColumn;

            /** remove `Event` postfix */
            actColumn[0] = actColumn[0].replace("Event", ""); return actColumn;
          })});
      });
  }

  componentDidMount() {
    /** since c3 requires HTML element, we should use `DidMount` */
    this.state.chart = c3.generate(this.state.chartConfiguration);
  }

  componentDidUpdate() {
    let columns = [this.state.createdAts].concat(this.state.activities);
    this.state.chart.load({
      columns: columns
    });
  }

  render() {
    return (
      <div id={DOM_ELEM_ACTIVITY_CHART} />
    );
  }
}
