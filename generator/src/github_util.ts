/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

import {
  GithubUser,
  Repository, RepositorySummary,
  Language, LanguageInformation, LanguageSummary,

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

let axios = require('axios');

import * as _ from "lodash";

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

  public static async getGithubResponse(token: string, uri: string): Promise<GithubResponse> {
    let r: any = new Promise((resolve, reject) => {

      if (_.includes(uri, "?")) uri = `https://api.github.com${uri}&access_token=${token}`;
      else uri = `https://api.github.com${uri}?access_token=${token}`;

      axios.get(uri)
      .then(response => {
          return resolve(new GithubResponse(response.headers, response.data))
        })
      .catch(response => {
          if (response instanceof Error) return reject(response);
          response.data.statusCode = response.status;
          return reject(response.data);
        });
    });

    return r;
  }

  /** collect all API using pagination */
  public static async getGithubResponses(token: string, uri: string): Promise<Array<GithubResponse>> {
    let responses = new Array<GithubResponse>();

    let r: any = await GithubUtil.getGithubResponse(token, uri);
    responses.push(r);

    let lastCount = GithubResponse.parseLastLinkCount(r.headers.link);
    if (lastCount === null) return responses;

    let ps = new Array<Promise<GithubResponse>>();

    for (let i = 2; i <= lastCount; i++) {
      ps.push(GithubUtil.getGithubResponse(token, `${uri}?page=${i}`));
    }

    let rs = await Promise.all(ps);
    let merged = responses.concat(rs);

    return merged;
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
    let rs = await GithubUtil.getGithubResponses(token, uri);
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

  public static async getUserLanguages(token: string, user: string): Promise<Array<LanguageInformation>> {
    let repos = await GithubUtil.getUserRepositories(token, user);

    let repoNames = repos.map(r => r.name);

    if (repos.length === 0) return new Array<LanguageInformation>();

    let ps = repoNames.map(name => {
      return GithubUtil.getGithubResponseBody(token, `/repos/${user}/${name}/languages`)
        .then(langObject => {

          return {
            owner: user,
            repo_name: name,
            url: `http://github.com/${user}/${name}`,
            langObject: langObject
          };
        });
    });

    let rawLangInfos = await Promise.all(ps);

    if (_.isEmpty(rawLangInfos)) return new Array<LanguageInformation>();

    let langInfos = rawLangInfos.map(rawLangInfo => {
      return LanguageInformation.deserialize(LanguageInformation, rawLangInfo);
    });

    // TODO try-catch
    // TODO filter empty array in languages
    return langInfos;
  }

  public static async getUserRepositories(token: string, user: string): Promise<Array<Repository>> {
    let raw = await GithubUtil.getGithubResponsesBody(token, `/users/${user}/repos`);
    let repos = Repository.deserializeArray(Repository, raw);
    return repos;
  }

  public static deserializeGithubEventFromAPI(events: Array<any>): Array<GithubEvent> {
    return GithubUtil.deserializeGithubEvent(events, "type");
  }

  public static deserializeGithubEventFromFile(events: Array<any>): Array<GithubEvent> {
    return GithubUtil.deserializeGithubEvent(events, "event_type");
  }

  public static deserializeGithubEvent(events: Array<any>, typeField: string): Array<GithubEvent> {
    let deserializedEvents = events.map(e => {
      switch (e[typeField]) {
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

    return deserializedEvents.filter(e => e !== null);
  }

  public static async getUserActivities(token: string, user: string): Promise<Array<GithubEvent>> {
    let raw = await GithubUtil.getGithubResponsesBody(token, `/users/${user}/events/public`);
    let events = GithubUtil.deserializeGithubEventFromAPI(raw);
    return <Array<GithubEvent>> events.filter(e => e !== null);
  }
}
