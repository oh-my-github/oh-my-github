/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

"use strict";

import {deserialize, deserializeAs, Deserializable, inheritSerialization} from "./serialize";
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

export class GithubEvent extends Deserializable {
  @deserializeAs("id") public event_id: string;
  @deserializeAs("type") public event_type: string;
  @deserializeAs("created_at") public created_at: string;
  public actor: string; /** actor.login */
  public repo: string; /** owner/repo_name */

  public static OnDeserialized(instance : GithubEvent, json : any) : void {
    if (!_.isEmpty(json) && !_.isEmpty(json.actor))
      instance.actor = json.actor.login;

    if (!_.isEmpty(json) && !_.isEmpty(json.repo))
      instance.repo = json.repo.name;
  }
}

export class GithubPushEventPayload {
  @deserializeAs("push_id") public push_id: number;
  @deserializeAs("size") public size: number;
  @deserializeAs("distinct_size") public distinct_size: number;
  @deserializeAs("ref") public ref: string;
  @deserializeAs("head") public head: string;
  @deserializeAs("before") public before: string;

  public commit_urls: Array<string>;
  public static COMMIT_URI_PREFIX: string = "https://github.com/oh-my-github/generator/commit/";

  public static OnDeserialized(instance: GithubPushEventPayload, payload: any): void {
    if (_.isEmpty(payload)) return;

    if (!_.isEmpty(payload.commits) && Array.isArray(payload.commits))
      instance.commit_urls = payload.commits.map(c => {
        return `${GithubPushEventPayload.COMMIT_URI_PREFIX}${c.sha}`
      });
  }
}

@inheritSerialization(GithubEvent)
export class GithubPushEvent extends GithubEvent {
  public static EVENT_TYPE: string = "PushEvent";
  @deserializeAs(GithubPushEventPayload, "payload") public payload: GithubPushEventPayload;
}


export class GithubPullRequestEventPayload {
  public static ACTION_VALUE_ASSIGNED = "assigned";
  public static ACTION_VALUE_UNASSIGNED = "unassigned";
  public static ACTION_VALUE_LABELED = "labeled";
  public static ACTION_VALUE_UNLABELED = "unlabeled";
  public static ACTION_VALUE_OPENED = "opened";
  public static ACTION_VALUE_CLOSED = "closed";
  public static ACTION_VALUE_SYNCHRONIZED = "synchronize";

  @deserializeAs("action") public action: string;
  @deserializeAs("number") public number: string;
  public pull_request_id: string;
  public title: string;
  public url: string;
  public merged: boolean;
  public commits: number;
  public additions: number;
  public deletions: number;
  public changed_files: number;

  public static OnDeserialized(instance: GithubPullRequestEventPayload, payload: any): void {
    if (_.isEmpty(payload)) return;

    if (!_.isEmpty(payload.pull_request)) {
      let pr = payload.pull_request;
      instance.pull_request_id = pr.id;
      instance.title = pr.title;
      instance.url = pr.url;
      instance.merged = pr.merged;
      instance.commits = pr.commits;
      instance.additions= pr.additions;
      instance.deletions = pr.deletions;
      instance.changed_files = pr.changed_files;
    }
  }
}

@inheritSerialization(GithubEvent)
export class GithubPullRequestEvent extends GithubEvent {
  public static EVENT_TYPE: string = "PullRequestEvent";
  @deserializeAs(GithubPullRequestEventPayload, "payload") public payload: GithubPullRequestEventPayload;
}


export class GithubIssuesEventPayload {
  public static ACTION_VALUE_ASSIGNED = "assigned";
  public static ACTION_VALUE_UNASSIGNED = "unassigned";
  public static ACTION_VALUE_LABELED = "labeled";
  public static ACTION_VALUE_UNLABELED = "unlabeled";
  public static ACTION_VALUE_OPENED = "opened";
  public static ACTION_VALUE_CLOSED = "closed";
  public static ACTION_VALUE_REOPENED = "reopened";

  @deserializeAs("action") public action: string;
  public issue_id: number; /* issue.id */
  public number: string;   /* issue.number */
  public title: string;    /* issue.title */
  public url: string;      /* issue.html_url */

  public static OnDeserialized(instance: GithubIssuesEventPayload, payload: any): void {
    if (_.isEmpty(payload)) return;

    if (!_.isEmpty(payload.issue)) {
      let issue = payload.issue;

      instance.issue_id = issue.id;
      instance.number = issue.number;
      instance.title = issue.title;
      instance.url = issue.html_url;
    }
  }
}

@inheritSerialization(GithubEvent)
export class GithubIssuesEvent extends GithubEvent {
  public static EVENT_TYPE: string = "IssuesEvent";
  @deserializeAs(GithubIssuesEventPayload, "payload") public payload: GithubIssuesEventPayload;
}

export class GithubIssueCommentEventPayload {
  public static ACTION_TYPE_CREATED: string = "created";

  @deserializeAs("action") public action: string;
  public issue_id: number; /* issue.id */
  public number: string;   /* issue.number */
  public title: string;    /* issue.title */
  public url: string;      /* comment.html_url */

  public static OnDeserialized(instance: GithubIssueCommentEventPayload, payload: any): void {
    if (_.isEmpty(payload)) return;

    if (!_.isEmpty(payload.issue)) {
      let issue = payload.issue;

      instance.issue_id = issue.id;
      instance.number = issue.number;
      instance.title = issue.title;
    }

    if (!_.isEmpty(payload.comment)) {
      let comment = payload.comment;
      instance.url = comment.html_url;
    }
  }
}

@inheritSerialization(GithubEvent)
export class GithubIssueCommentEvent extends GithubEvent {
  public static EVENT_TYPE: string = "IssueCommentEvent";
  @deserializeAs(GithubIssueCommentEventPayload, "payload") public payload: GithubIssueCommentEventPayload;
}

export class GithubReleaseEventPayload {
  public static ACTION_TYPE_PUBLISHED = "published";

  @deserializeAs("action") public action: string;
  public release_id: number;       /* release.id */
  public url: string;              /* release.html_url */
  public tag_name: string;         /* release.tag_name */
  public target_commitish: string; /* release.target_commitish */

  public static OnDeserialized(instance: GithubReleaseEventPayload, payload: any): void {
    if (_.isEmpty(payload)) return;

    if (!_.isEmpty(payload.release)) {
      let release = payload.release;

      instance.release_id = release.id;
      instance.url = release.html_url;
      instance.tag_name = release.tag_name;
      instance.target_commitish = release.target_commitish;
    }
  }
}

@inheritSerialization(GithubEvent)
export class GithubReleaseEvent extends GithubEvent {
  public static EVENT_TYPE: string = "ReleaseEvent";
  @deserializeAs(GithubReleaseEventPayload, "payload") public payload: GithubReleaseEventPayload;
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
      })
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
    let flattened = bodies.reduce((acc, body) => acc.concat(body));

    return flattened;
  }

  public static async getUserRepositories(token: string, user: string): Promise<Array<Repository>> {
    let raw = await GithubUtil.getGithubResponsesBody(token, `/users/${user}/repos`);
    let repos = Repository.deserializeArray(Repository, raw);
    return repos;
  }

  public static async getUserActivities(token: string, user: string): Promise<Array<GithubEvent>> {
    let raw = await GithubUtil.getGithubResponsesBody(token, `/users/${user}/events/public`)

    console.log(`raw count: ` + raw.length);

    let events = raw.map(e => {
      if (GithubPushEvent.EVENT_TYPE === e.type)
        return GithubPushEvent.deserialize(GithubPushEvent, e);
      else if (GithubPullRequestEvent.EVENT_TYPE === e.type)
        return GithubPullRequestEvent.deserialize(GithubPullRequestEvent, e);
      else if (GithubIssuesEvent.EVENT_TYPE === e.type)
        return GithubIssuesEvent.deserialize(GithubIssuesEvent, e);
      else if (GithubIssueCommentEvent.EVENT_TYPE === e.type)
        return GithubIssueCommentEvent.deserialize(GithubIssueCommentEvent, e);
      else if (GithubReleaseEvent.EVENT_TYPE === e.type)
        return GithubReleaseEvent.deserialize(GithubReleaseEvent, e);
      else return null;
    });

    // TODO: deserialize event by event.type. See GithubAPI event
    return <Array<GithubEvent>> events.filter(e => e !== null);
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
    return GithubUserProfile.deserialize(GithubUserProfile, raw);
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

