/// <reference path="../typings/node/node.d.ts" />
/// <reference path="../typings/lodash/lodash.d.ts" />

import {deserialize, deserializeAs, Deserializable} from "./serialize";
import {GithubUtil} from "./github_util"
import {
  GithubUser,
  Repository,
  Language, LanguageInformation,

  GithubEvent,
  GithubPushEvent,
  GithubPullRequestEvent,
  GithubIssuesEvent,
  GithubIssueCommentEvent,
  GithubReleaseEvent,
  GithubWatchEvent,
  GithubForkEvent,
  GithubCreateEvent
} from "./github_model"

import * as _ from "lodash";

export class MetaField extends Deserializable {
  // TODO created_at
  @deserialize public agent: string;
  @deserialize public publish_repository: string;
}

export class Profile extends Deserializable {
  @deserializeAs(MetaField) public _$meta: MetaField;
  @deserializeAs(GithubUser) public user: GithubUser;
  @deserializeAs(LanguageInformation) public languages: Array<LanguageInformation>;
  @deserializeAs(Repository) public repositories: Array<Repository>;

  /**
   * since GithubEvent is the base class of all Github*Event, (e.g GithubPushEvent)
   * we need to custom deserializer instead of @deserializeAs
   * to avoid losing information while deserializing
   */
  public activities: Array<GithubEvent>;

  public static OnDeserialized(instance: Profile, json: any): void {
    if (_.isEmpty(json)) return;
    if (_.isEmpty(json.activities)) return;

    let activities = json.activities;

    instance.activities = GithubUtil.deserializeGithubEvent(activities);
  }
}


