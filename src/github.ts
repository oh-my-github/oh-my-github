/// <reference path="../typings/node/node.d.ts" />

"use strict";

import {deserialize, deserializeAs, Deserializable} from "./serialize";

let octonode = require("octonode");

export interface GithubClient {
  get (uri: string,
       nothing: any,
       callback: (error: Error, status: number, body: any, header: Object) => void);
}

export class GithubError extends Deserializable {
  @deserializeAs("name") public name: string;
  @deserializeAs("message") public message: string;
  @deserializeAs("statusCode") public statusCode: number;
  @deserializeAs("headers") public headers: Object;
  @deserializeAs("body") public body: Object;
}

export class GithubUserProfile extends Deserializable {
  @deserializeAs("login") public login: string;
  @deserializeAs("following") public following: number;
  @deserializeAs("followers") public followers: number;
}

export class Repository extends Deserializable {
  @deserializeAs("name") public name: string;
  @deserializeAs("full_name") public full_name: string;
  @deserializeAs("forks_count") public forks_count: number;
  @deserializeAs("stargazers_count") public stargazers_count: number;
  @deserializeAs("watchers_count") public watchers_count: number;
}

export class RepositorySummary {
  public owner: string;
  public repository_names: string[] = new Array<string>();
  public repository_count: number = 0;
  public forks_count: number = 0;
  public stargazers_count: number = 0;
  public watchers_count: number = 0;
}

export class UserSummary {
  constructor(
    public github_profile: GithubUserProfile,
    public repository_summary: RepositorySummary) {}
}

export class GithubLink {
}

export class GithubResponse {
  constructor(public headers: any, public body: any) {}

  public static parseLastLinkCount(link: string): number {
    if (typeof link === "undefined" ||
        typeof link === null ||
        typeof link !== "string") return null;
    if (link === "rel=\"last\"") return null;

    let lastLinkCount: number = null;

    try {
      let uriAndRels = link.split(",");

      for (let i = 0; i < uriAndRels.length; i ++) {
        let splited = uriAndRels[i].split(";");

        if (splited.length < 2) break; /** `rel= "last"` */

        let rel = splited[1].trim();
        if (rel === "rel=\"last\"") {
          let stringified = splited[0].split("&page=")[1].trim();

          lastLinkCount = parseInt(stringified, 10);

          if (isNaN(lastLinkCount)) lastLinkCount = null;
          break;
        }
      }
    } catch (err) { console.error(`Can't parse link: ${link} due to ${err}`); }

    return lastLinkCount;
  }
}

export class GithubUtil {

  public static createGithubClient(token: string): GithubClient {
    return octonode.client(token);
  }

  public static async getGithubResponse(token: string, uri: string): Promise<GithubResponse> {
    let r: any = new Promise((resolve, reject) => {
      let client = GithubUtil.createGithubClient(token);
      client.get(uri, {}, (err, status, body, headers) => {
        if (err) return reject(GithubError.deserialize<GithubError>(GithubError, err));
        else return resolve(new GithubResponse(headers, body));
      })
    });

    return r;
  }

  public static async getGithubReponses(token: string, uri: string): Promise<Array<GithubResponse>> {
    let responses = new Array<GithubResponse>();

    let r: any = await GithubUtil.getGithubResponse(token, uri);
    responses.push(r);

    let lastCount = GithubResponse.parseLastLinkCount(r.headers.link);
    if (lastCount === null) return responses;

    let ps = new Array<Promise<GithubResponse>>();

    for (let i = 2; i <= lastCount; i++) {
      let uriWithPage = uri + "?page=" + i;
      ps.push(GithubUtil.getGithubResponse(token, uriWithPage));
    }

    let rs = await Promise.all(ps);

    return responses.concat(rs);
  }

  public static async getGithubResponseBody(token: string, uri: string): Promise<any> {
    let r = await GithubUtil.getGithubResponse(token, uri);

    return r.body;
  }

  public static async getGithubResponsesBody(token: string, uri: string): Promise<Array<any>> {
    let rs = await GithubUtil.getGithubReponses(token, uri);

    return rs.map(r => r.body);
  }

  public static async getUserRepositories(token: string, user: string): Promise<Array<Repository>> {
    let raw = await GithubUtil.getGithubResponsesBody(token, `/users/${user}/repos`);
    let rss = raw.map(body => Repository.deserialize<Array<Repository>>(Repository, body));
    let repos = rss.reduce((acc, rs) => acc.concat(rs));
    return repos;
  }

  public static async getUserProfile(token: string, user: string): Promise<GithubUserProfile> {
    let raw = await GithubUtil.getGithubResponseBody(token, `/users/${user}`);
    return GithubUserProfile.deserialize<GithubUserProfile>(GithubUserProfile, raw);
  }

  public static async getRepositorySummary(token: string, user: string): Promise<RepositorySummary> {
    let repos = await GithubUtil.getUserRepositories(token, user);

    console.log(repos.length);

    let summary = new RepositorySummary;
    summary.owner = user;
    return repos.reduce((sum, repo) => {
      sum.repository_names.push(repo.name);
      sum.repository_count += 1;
      sum.watchers_count += repo.watchers_count;
      sum.stargazers_count += repo.stargazers_count;
      sum.forks_count += repo.forks_count;

      return sum;
    }, summary);
  }

  public static async getUserSummary(token: string, user: string): Promise<UserSummary> {
    let profile = await GithubUtil.getUserProfile(token, user);
    let repoSummary = await GithubUtil.getRepositorySummary(token, user);

    return new UserSummary(profile, repoSummary);
  }
}


