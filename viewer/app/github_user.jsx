"use strict";

import React from 'react';
import c3 from "c3";

import ProfileUtil from "./profile_util";

export default class GithubUser extends React.Component {
  static createRepositorySummary() {
    return {
      forksCount: 0,
      stargazersCount: 0,
      watchersCount: 0
    };
  }

  constructor(props) {
    super(props);

    this.state = {
      user: {},
      repositorySummary: GithubUser.createRepositorySummary()
    };

    this.style = {
      circle_img: {
        width: "100px",
        height: "100px",
        borderRadius: "50%",
        boxShadow: "0 0 8px rgba(0, 0, 0, .8)",
        display: "block",
        backgroundPositionY: "25%",
        margin: "0 auto"
      }
    };

    ProfileUtil.getUserPromise()
      .then(user => {
        this.setState({user: user});
      });

    ProfileUtil.getRepositoryPromise()
      .then(repos => {
        let summary = GithubUser.createRepositorySummary();

        repos.forEach(repo => {
          summary.forksCount += repo.forks_count;
          summary.stargazersCount += repo.stargazers_count;
          summary.watchersCount += repo.watchers_count;
        });

        this.setState({repositorySummary : summary});
      });
  }

  render() {
    return (
      <div className="row-centered">
        <img className="row" src={this.state.user.avatar_url} style={this.style.circle_img} />
        <h3 className="row">{this.state.user.login}</h3>
        <hr style={{width: "600px"}} />
        <div className="row row-centered form-inline">
          <a href={`https://github.com/${this.state.user.login}?tab=repositories`} style={{margin: "10px"}}>
            <span className="badge vertical-default">{this.state.user.public_repos}</span> Repository
          </a>
          <a href={`https://gist.github.com/${this.state.user.login}`} style={{margin: "10px"}}>
            <span className="badge vertical-default">{this.state.user.public_gists}</span> Gist
          </a>
        </div>
        <hr style={{width: "600px"}} />
        <div className="row row-centered form-inline">
          <div className="input-group row-centered" style={{margin: "10px"}}>
            <div className="input-group-btn">
              <button className="btn btn-danger" href="#" style={{minWidth: "110px"}}> <i className="fa fa-eye fa-lg"></i> Watched</button>
              <button className="btn btn-default" style={{minWidth: "60px"}}>{this.state.repositorySummary.watchersCount}</button>
            </div>
          </div>

          <di className="input-group row-centered" style={{margin: "10px"}}>
            <div className="input-group-btn">
              <button className="btn btn-warning" href="#" style={{minWidth: "110px"}}> <i className="fa fa-star fa-lg"></i> Starred</button>
              <button className="btn btn-default" style={{minWidth: "60px"}}>{this.state.repositorySummary.stargazersCount}</button>
            </div>
          </di>

          <div className="input-group row-centered" style={{margin: "10px"}}>
            <div className="input-group-btn">
              <button className="btn btn-info" href="#" style={{minWidth: "110px"}}> <i className="fa fa-code-fork fa-lg"></i> Forked</button>
              <button className="btn btn-default" style={{minWidth: "60px"}}>{this.state.repositorySummary.forksCount}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
