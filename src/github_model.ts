/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

"use strict";

import {deserialize, deserializeAs, Deserializable, inheritSerialization} from "./serialize";
import * as _ from "lodash";

export class GithubUser extends Deserializable {
  @deserialize public login: string = null;
  @deserialize public type: string = null;
  @deserialize public name: string = null;
  @deserialize public company: string = null;
  @deserialize public blog: string = null;
  @deserialize public location: string = null;
  @deserialize public email: string = null;
  @deserialize public hireable: boolean = null;
  @deserialize public following: number = null;
  @deserialize public followers: number = null;
  @deserialize public public_repos: number = null;
  @deserialize public public_gists: number = null;
  @deserialize public created_at: string = null;
  @deserialize public updated_at: string = null;

  @deserializeAs("html_url") public url: string = null;
}

export class Language extends Deserializable {
  @deserialize public name: string;
  @deserialize public line: number;

  /** since Github API returns languages as object, we need a factory method */
  public static create(body: Object): Array<Language> {
    let langs = new Array<Language>();

    if (_.isEmpty(body)) return langs;

    _.forOwn(body, (value, key) => {
      let l = new Language();
      l.name = key;
      l.line = value;
      langs.push(l);
    });

    return langs;
  }
}

export class Repository extends Deserializable {
  @deserialize public name: string;
  @deserialize public full_name: string;
  @deserialize public forks_count: number;
  @deserialize public stargazers_count: number;
  @deserialize public watchers_count: number;
  @deserialize public language: string;
  @deserialize public fork: boolean;
  @deserialize public open_issues_count: number;

  @deserializeAs("html_url") public url: string;
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

export class GithubEvent extends Deserializable {
  @deserializeAs("id") public event_id: string;
  @deserializeAs("type") public event_type: string;
  @deserializeAs("created_at") public created_at: string;
  public actor: string; /** actor.login */
  public repo: string; /** owner/repo_name */

  public static OnDeserialized(instance: GithubEvent, json: any): void {
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
        return `${GithubPushEventPayload.COMMIT_URI_PREFIX}${c.sha}`;
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
  public pull_request_title: string;
  public pull_request_url: string;
  public pull_request_merged: boolean;
  public pull_request_commits: number;
  public pull_request_additions: number;
  public pull_request_deletions: number;
  public pull_request_changed_files: number;

  public static OnDeserialized(instance: GithubPullRequestEventPayload, payload: any): void {
    if (_.isEmpty(payload)) return;

    if (!_.isEmpty(payload.pull_request)) {
      let pr = payload.pull_request;
      instance.pull_request_id = pr.id;
      instance.pull_request_title = pr.title;
      instance.pull_request_url = pr.url;
      instance.pull_request_merged = pr.merged;
      instance.pull_request_commits = pr.commits;
      instance.pull_request_additions = pr.additions;
      instance.pull_request_deletions = pr.deletions;
      instance.pull_request_changed_files = pr.changed_files;
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
  public issue_id: number;     /* issue.id */
  public issue_number: string; /* issue.number */
  public issue_title: string;  /* issue.title */
  public issue_url: string;    /* issue.html_url */

  public static OnDeserialized(instance: GithubIssuesEventPayload, payload: any): void {
    if (_.isEmpty(payload)) return;

    if (!_.isEmpty(payload.issue)) {
      let issue = payload.issue;

      instance.issue_id = issue.id;
      instance.issue_number = issue.number;
      instance.issue_title = issue.title;
      instance.issue_url = issue.html_url;
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
  public issue_id: number;     /* issue.id */
  public issue_number: string; /* issue.number */
  public issue_title: string;  /* issue.title */
  public comment_url: string;  /* comment.html_url */

  public static OnDeserialized(instance: GithubIssueCommentEventPayload, payload: any): void {
    if (_.isEmpty(payload)) return;

    if (!_.isEmpty(payload.issue)) {
      let issue = payload.issue;

      instance.issue_id = issue.id;
      instance.issue_number = issue.number;
      instance.issue_title = issue.title;
    }

    if (!_.isEmpty(payload.comment)) {
      let comment = payload.comment;
      instance.comment_url = comment.html_url;
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

  public release_id: number;               /* release.id */
  public release_url: string;              /* release.html_url */
  public release_tag_name: string;         /* release.tag_name */
  public release_name: string;             /* release.name */
  public release_target_commitish: string; /* release.target_commitish */
  public release_prerelease: string;       /* release.prerelease */

  public static OnDeserialized(instance: GithubReleaseEventPayload, payload: any): void {
    if (_.isEmpty(payload)) return;

    if (!_.isEmpty(payload.release)) {
      let release = payload.release;

      instance.release_id = release.id;
      instance.release_url = release.html_url;
      instance.release_tag_name = release.tag_name;
      instance.release_target_commitish = release.target_commitish;
      instance.release_name = release.name;
      instance.release_prerelease = release.prerelease;
    }
  }
}

@inheritSerialization(GithubEvent)
export class GithubReleaseEvent extends GithubEvent {
  public static EVENT_TYPE: string = "ReleaseEvent";

  @deserializeAs(GithubReleaseEventPayload, "payload") public payload: GithubReleaseEventPayload;
}

export class GithubWatchEventPayload {
  public static ACTION_TYPE_STARTED = "started";

  @deserializeAs("action") public action: string;
}

@inheritSerialization(GithubEvent)
export class GithubWatchEvent extends GithubEvent {
  public static EVENT_TYPE: string = "WatchEvent";

  @deserializeAs(GithubWatchEventPayload, "payload") public payload: GithubWatchEventPayload;
}

export class GithubForkEventPayload {
  /** even if ForkEventPayload doesn't need to have action field,
   *  we need it otherwise `OnDeserialized` is not called (See, https://github.com/weichx/cerialize/issues/16)
   */
  @deserializeAs("action") public action: string;
  public forkee_id: string;
  public forkee_name: string;
  public forkee_full_name: string;
  public forkee_url: string;
  public forkee_language: string;

  public static OnDeserialized(instance: GithubForkEventPayload, payload: any): void {
    if (_.isEmpty(payload)) return;

    if (!_.isEmpty(payload.forkee)) {
      let forkee = payload.forkee;
      instance.forkee_id = forkee.id;
      instance.forkee_name = forkee.name;
      instance.forkee_full_name = forkee.full_name;
      instance.forkee_url = forkee.html_url;
      instance.forkee_language = forkee.language;
    }
  }
}

@inheritSerialization(GithubEvent)
export class GithubForkEvent extends GithubEvent {
  public static EVENT_TYPE = "ForkEvent";

  @deserializeAs(GithubForkEventPayload, "payload") public payload: GithubForkEventPayload;
}

export class GithubCreateEventPayload {
  public static REF_TYPE_REPOSITORY = "repository";
  public static REF_TYPE_BRANCH = "branch";
  public static REF_TYPE_TAG = "tag";

  @deserialize public ref: string; /* might be null, if repository is just created */
  @deserialize public ref_type: string;
  @deserialize public master_branch: string;
  @deserialize public description: string;
  @deserialize public pusher_type: string;
}

@inheritSerialization(GithubEvent)
export class GithubCreateEvent extends GithubEvent {
  public static EVENT_TYPE = "CreateEvent";

  @deserializeAs(GithubCreateEventPayload, "payload") public payload: GithubCreateEventPayload;
}


