/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

"use strict";

import {deserialize, deserializeAs, Deserializable} from "./serialize";
import * as _ from "lodash";

let octonode = require("octonode");

export interface GithubClient {
  get (uri: string,
       nothing: any,
       callback: (error: Error, status: number, body: any, header: Object) => void);
}

export class Language {
  constructor(
    public name: string,
    public line: number) {}

  public static create(body: Object): Array<Language> {
    let langs = new Array<Language>();

    try {
      _.forOwn(body, (value, key) => { langs.push(new Language(key, value)); })
    } catch (err) {
      console.log(`Can't create Array<Langauge> due to ${err} (raw: ${body})`);
    }

    return langs;
  }
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

export class LanguageSummary {
  constructor(
    public owner: string,
    public langauge_lines: Map<string, number>
  ) {}

  public getLangaugeCount(): number {
    return this.langauge_lines.size;
  }

  public getLanguageObject(): Object {
    let langObj = new Object();

    this.langauge_lines.forEach((line, name) => {
      langObj[name] = line ;
    });

    return langObj;
  }
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

  public static async getUserLanguages(token: string, user: string): Promise<Array<Language>> {
    let langs = new Array<Language>();
    let repos = await GithubUtil.getUserRepositories(token, user);

    let repoNames = repos.map(r => r.name);

    if (repos.length === 0) return langs;

    let ps = repoNames.map(name=> {
      return GithubUtil.getGithubResponseBody(token, `/repos/${user}/${name}/languages`);
    });

    let langObjects = await Promise.all(ps);

    if (_.isEmpty(langObjects)) return langs; /* return empty set */

    let lss = langObjects.map(langObject => {
      let ls = Language.create(langObject);
      return ls
    });

    lss = lss.filter(ls => ls.length > 0);

    if (lss.length === 0) return langs;

    return lss.reduce((ls1, ls2) => ls1.concat(ls2));
  }

  public static async getUserProfile(token: string, user: string): Promise<GithubUserProfile> {
    let raw = await GithubUtil.getGithubResponseBody(token, `/users/${user}`);
    return GithubUserProfile.deserialize<GithubUserProfile>(GithubUserProfile, raw);
  }

  public static async getRepositorySummary(token: string, user: string): Promise<RepositorySummary> {
    let repos = await GithubUtil.getUserRepositories(token, user);

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

  public static async getLanguageSummary(token: string, user: string): Promise<LanguageSummary> {
    let langs = await GithubUtil.getUserLanguages(token, user);

    if (_.isEmpty(langs)) return null;

    let langNames = langs.map(lang => lang.name);
    let langMap = new Map<string, number>();

    langs.forEach(lang => {
      if (!langMap.has(lang.name)) langMap.set(lang.name, 0);

      let currentLine = langMap.get(lang.name);
      langMap.set(lang.name, lang.line + currentLine);
    });

    return new LanguageSummary(user, langMap);
  }
}

