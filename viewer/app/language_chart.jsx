"use strict";

import React from 'react';
import c3 from "c3";

import ProfileUtil from "./profile_util";
const DOM_ELEM_LANGUAGE_CHART = "language_chart";

export default class LanguageChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chart: null,
      top5Langs: [],
      chartConfiguration: {
        bindto: `#${DOM_ELEM_LANGUAGE_CHART}`,
        color: { pattern: [
          "FF6B6B",
          "FFE66B",
          "7A62C9",
          "5CDD5C",
          "FFAE6B"
        ]},
        donut: {
          title: "Language Top 5"
        },
        tooltip: {
          format: { value: (value) => { return `${value} lines`; } }
        },

        data: {
          columns: [],
          type : 'donut'
        }
      }
    };


    ProfileUtil.getLanguagePromise()
      .then(langInfos => {
        let merged = {};

        langInfos
          .filter(langInfo => !langInfo.repo_name.endsWith("github.io"))
          .map(langInfo => langInfo.languages)
          .reduce((acc, langs) => acc.concat(langs), [])
          .filter(lang => typeof lang !== "undefined")
          .forEach((lang) => {
            if (!merged[lang.name]) merged[lang.name] = 0;
            merged[lang.name] += lang.line;
          });

        let top5 = Object.keys(merged)
          .map(name => [name, merged[name]])
          .sort((l, r) => r[1] - l[1])
          .slice(1, 6);

        this.setState({top5Langs: top5});
      });
  }

  componentDidMount() {
    /** since c3 requires HTML element, we should use `DidMount` */
    this.state.chart = c3.generate(this.state.chartConfiguration);
  }

  componentDidUpdate() {
    this.state.chart.load({
      columns: this.state.top5Langs
    });
  }

  render() {
    return (
        <div id={DOM_ELEM_LANGUAGE_CHART} />
    );
  }
}
