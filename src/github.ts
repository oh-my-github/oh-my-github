/// <reference path="../typings/node/node.d.ts" />

"use strict";

import {deserialize, deserializeAs, Deserializable} from "./serialize";

let octonode = require("octonode");

export interface GithubClient {
  get (uri: string,
       nothing: any,
       callback: (error: Error, status: number, body: string, header: Array<Object>) => void);
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

export class GithubUtil {

  public static createGithubClient(token: string): GithubClient {
    return octonode.client(token);
  }

  public static async createGithubRequest(token: string, uri: string): Promise<any>{
    return new Promise((resolve, reject) => {
      let client = GithubUtil.createGithubClient(token);

      client.get(uri, {}, (err, status, body, headers) => {
        if (err) return reject(GithubError.deserialize<GithubError>(GithubError, err));
        else return resolve(body);
      })
    })
  }

  public static async getUserRepositories(token: string, user: string): Promise<Array<Repository>> {
    let raw = await GithubUtil.createGithubRequest(token, `/users/${user}/repos`);
    return Repository.deserialize<Array<Repository>>(Repository, raw);
  }

  public static async getUserProfile(token: string, user: string): Promise<GithubUserProfile> {
    let raw = await GithubUtil.createGithubRequest(token, `/users/${user}`);
    return GithubUserProfile.deserialize<GithubUserProfile>(GithubUserProfile, raw);
  }
}
