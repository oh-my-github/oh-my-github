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
      },

      btn_repo_summary_text: {
        minWidth: "110px",
        borderTopLeftRadius: "3px",
        borderBottomLeftRadius: "3ox",
        color: "white",
        fontWeight: 400,
        textShadow: "none"
      },

      btn_repo_summary_count: {
        minWidth: "60px",
        borderTopRightRadius: "3px",
        borderBottomRightRadius: "3px"
      }
    };

    let watchedButtonColor = "rgb(255, 107, 107)";
    let starredButtonColor = "rgb(122, 98, 201)";
    let forkedButtonColor = "rgb(11, 98, 164)";

    this.style.btn_watched_text = Object.assign({
      borderColor: watchedButtonColor,
      backgroundColor: watchedButtonColor
    }, this.style.btn_repo_summary_text);

    this.style.btn_watched_count = Object.assign({
      borderColor: watchedButtonColor
    }, this.style.btn_repo_summary_count);

    this.style.btn_starred_text = Object.assign({
      borderColor: starredButtonColor,
      backgroundColor: starredButtonColor
    }, this.style.btn_repo_summary_text);

    this.style.btn_starred_count = Object.assign({
      borderColor: starredButtonColor
    }, this.style.btn_repo_summary_count);

    this.style.btn_forked_text = Object.assign({
      borderColor: forkedButtonColor,
      backgroundColor: forkedButtonColor
    }, this.style.btn_repo_summary_text);

    this.style.btn_forked_count = Object.assign({
      borderColor: forkedButtonColor
    }, this.style.btn_repo_summary_count);

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
              <button className="btn btn-default" href="#" style={this.style.btn_watched_text}>
                <i className="fa fa-eye fa-lg"></i> Watched
              </button>
              <button className="btn btn-default" style={this.style.btn_watched_count}>
                {this.state.repositorySummary.watchersCount}
              </button>
            </div>
          </div>

          <di className="input-group row-centered" style={{margin: "10px"}}>
            <div className="input-group-btn">
              <button className="btn btn-default" href="#" style={this.style.btn_starred_text}> <i className="fa fa-star fa-lg"></i> Starred</button>
              <button className="btn btn-default" style={this.style.btn_starred_count}>{this.state.repositorySummary.stargazersCount}</button>
            </div>
          </di>

          <div className="input-group row-centered" style={{margin: "10px"}}>
            <div className="input-group-btn">
              <button className="btn btn-info" href="#" style={this.style.btn_forked_text}> <i className="fa fa-code-fork fa-lg"></i> Forked</button>
              <button className="btn btn-default" style={this.style.btn_forked_count}>{this.state.repositorySummary.forksCount}</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

}
