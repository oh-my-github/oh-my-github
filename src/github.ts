/// <reference path="../typings/node/node.d.ts" />

"use strict";

import {deserialize, deserializeAs, Deserializable} from "./serialize";

let octonode = require("octonode");

export interface GithubClient {
  get (uri: string,
       nothing: any,
       callback: (error: Error, status: number, body: string, header: any[]) => void);
}

export class GithubUserProfile extends Deserializable {
  @deserializeAs("login") public login: string;
  @deserializeAs("following") public following: number;
  @deserializeAs("followers") public followers: number;
}

export class Repository extends Deserializable {
  @deserialize public name: string;
  @deserialize public full_name: string;
  @deserialize public forks_count: number;
  @deserialize public stargazers_count: number;
  @deserialize public watchers_count: number;
}

export class GithubUtil {

  public static createGithubClient(token: string): GithubClient {
    return octonode.client(token);
  }

  public static async createGithubRequest(token: string, uri: string): Promise<any>{
    return new Promise((resolve, reject) => {
      let client = GithubUtil.createGithubClient(token);

      client.get(uri, {}, (err, status, body, headers) => {
        if (err) reject(err);
        if (status !== 200) reject(new Error(`Invalid Status: ${status}`));

        resolve(body);
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
