/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/chalk/chalk.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

import * as _ from "lodash";
import {
  red as chalkRed, blue as chalkBlue, green as chalkGreen,
  yellow as chalkYellow, magenta as chalkMagenta, bold as chalkBold
} from "chalk";

import {deserialize, deserializeAs, Deserializable} from "./serialize";
import {GithubUtil} from "./github_util";
import {
  GithubUser, Repository, Language, LanguageInformation,
  GithubEvent, GithubPushEvent, GithubPullRequestEvent,
  GithubIssuesEvent, GithubIssueCommentEvent, GithubReleaseEvent,
  GithubWatchEvent, GithubForkEvent, GithubCreateEvent } from "./github_model";

export class MetaField extends Deserializable {

  public static PROFILE_SCHEMA_VERSION = 1;
  public static CURRENT_DATE = new Date().toISOString();

  @deserialize public publish_repository: string;
  @deserialize public agent: string;

  /** since cerialize overwrite values even if it is `null`, we need to use `OnDeserialize` */
  // TODO: create PR (preventing from overwriting field to `null`)
  public profile_schema_version = MetaField.PROFILE_SCHEMA_VERSION;
  public created_at: string = MetaField.CURRENT_DATE;
  public collected_ats: Array<string> = new Array<string>(MetaField.CURRENT_DATE);

  public static OnDeserialized(instance: MetaField, json: any): void {
    let profSchemaVersion = json.profile_schema_version;

    if (null !== profSchemaVersion && profSchemaVersion !== MetaField.PROFILE_SCHEMA_VERSION) {
      throw new Error(`${chalkRed("Invalid profile_schema_version: ")} ${profSchemaVersion}`)
    }

    if (_.isEmpty(profSchemaVersion)) profSchemaVersion = MetaField.PROFILE_SCHEMA_VERSION;
    instance.profile_schema_version = profSchemaVersion;

    let created_at = json.created_at;
    if (_.isEmpty(created_at)) created_at = MetaField.CURRENT_DATE;
    instance.created_at = created_at;

    let collected_ats = json.collected_ats;
    if (_.isEmpty(collected_ats)) collected_ats = new Array<string>(MetaField.CURRENT_DATE);
    instance.collected_ats = collected_ats;
  }
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
  public activities: Array<GithubEvent> = new Array<GithubEvent>();

  public static OnDeserialized(instance: Profile, json: any): void {
    if (_.isEmpty(json)) return;
    if (_.isEmpty(json.activities)) return;

    let activities = json.activities;

    instance.activities = GithubUtil.deserializeGithubEvent(activities);
  }

  public static updateMeta(profile: Profile, meta: MetaField): Profile {
    let collectedAts = meta.collected_ats.slice(); /** copy array */
    collectedAts.push(MetaField.CURRENT_DATE);

    profile._$meta = copyObject(meta);
    profile._$meta.collected_ats = collectedAts;
    return profile;
  }

  public updateMeta(meta: MetaField): Profile {
    return Profile.updateMeta(this, meta);
  }
}

function copyObject(object: any): any {
  return JSON.parse(JSON.stringify(object));
}


