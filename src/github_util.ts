/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

import {
  GithubUser,
  Repository, RepositorySummary,
  Language, LanguageSummary,

  GithubEvent,
  GithubPushEvent, GithubPushEventPayload,
  GithubPullRequestEvent, GithubPullRequestEventPayload,
  GithubIssuesEvent, GithubIssuesEventPayload,
  GithubIssueCommentEvent, GithubIssueCommentEventPayload,
  GithubWatchEvent, GithubWatchEventPayload,
  GithubForkEvent, GithubForkEventPayload,
  GithubReleaseEvent, GithubReleaseEventPayload,
  GithubCreateEvent, GithubCreateEventPayload
} from "./github_model";

import {deserialize, deserializeAs, Deserializable, inheritSerialization} from "./serialize";

import * as _ from "lodash";


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

export class GithubResponse {
  constructor(public headers: any, public body: any) {}

  /**
   * return null if failed to parse github pagination response
   */
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
    } catch (err) { return null; }

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
        if (err) return reject(GithubError.deserialize(GithubError, err));
        else return resolve(new GithubResponse(headers, body));
      });
    });

    return r;
  }

  /** collect all API using pagination */
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

  /**
   * 1. retrieve page header
   * 2. get all pages
   * 3. return flattened
   */
  public static async getGithubResponsesBody(token: string, uri: string): Promise<Array<any>> {
    let rs = await GithubUtil.getGithubReponses(token, uri);
    let bodies = rs.map(r => r.body); /* each body is an array */
    let flattened = bodies.reduce((acc, body) => {
      if (Array.isArray(body) && body.length > 0) return acc.concat(body);
      else return acc;
    });

    return flattened;
  }

  public static async getGithubUser(token: string, user: string): Promise<GithubUser> {
    let raw = await GithubUtil.getGithubResponseBody(token, `/users/${user}`);
    return GithubUser.deserialize(GithubUser, raw);
  }

  public static async getUserLanguages(token: string, user: string): Promise<Array<Language>> {
    let langs = new Array<Language>();
    let repos = await GithubUtil.getUserRepositories(token, user);

    let repoNames = repos.map(r => r.name);

    if (repos.length === 0) return langs;

    let ps = repoNames.map(name => {
      // TODO then chain. return {user: "", repo: "", langObj: ""}
      return GithubUtil.getGithubResponseBody(token, `/repos/${user}/${name}/languages`);
    });

    let langObjects = await Promise.all(ps);

    if (_.isEmpty(langObjects)) return langs; /* return empty set */

    let lss = langObjects.map(langObject => {
      let ls = Language.create(langObject);
      return ls;
    });

    lss = lss.filter(ls => ls.length > 0);

    if (lss.length === 0) return langs;

    return lss.reduce((ls1, ls2) => ls1.concat(ls2));
  }

  public static async getUserRepositories(token: string, user: string): Promise<Array<Repository>> {
    let raw = await GithubUtil.getGithubResponsesBody(token, `/users/${user}/repos`);
    let repos = Repository.deserializeArray(Repository, raw);
    return repos;
  }

  public static deserializeGithubEvent(events: Array<any>): Array<GithubEvent> {
    return events.map(e => {
      switch (e.type) {
        case GithubPushEvent.EVENT_TYPE:
          return GithubPushEvent.deserialize(GithubPushEvent, e);
        case GithubPullRequestEvent.EVENT_TYPE:
          return GithubPullRequestEvent.deserialize(GithubPullRequestEvent, e);
        case GithubIssuesEvent.EVENT_TYPE:
          return GithubIssuesEvent.deserialize(GithubIssuesEvent, e);
        case GithubIssueCommentEvent.EVENT_TYPE:
          return GithubIssueCommentEvent.deserialize(GithubIssueCommentEvent, e);
        case GithubWatchEvent.EVENT_TYPE:
          return GithubWatchEvent.deserialize(GithubWatchEvent, e);
        case GithubForkEvent.EVENT_TYPE:
          return GithubForkEvent.deserialize(GithubForkEvent, e);
        case GithubReleaseEvent.EVENT_TYPE:
          return GithubReleaseEvent.deserialize(GithubReleaseEvent, e);
        case GithubCreateEvent.EVENT_TYPE:
          return GithubCreateEvent.deserialize(GithubCreateEvent, e);
        default: return null;
      }
    });
  }

  public static async getUserActivities(token: string, user: string): Promise<Array<GithubEvent>> {
    let raw = await GithubUtil.getGithubResponsesBody(token, `/users/${user}/events/public`);
    let events = GithubUtil.deserializeGithubEvent(raw);
    return <Array<GithubEvent>> events.filter(e => e !== null);
  }
}
