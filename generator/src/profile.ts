/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/chalk/chalk.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

import * as _ from "lodash";
import {
  red as chalkRed, blue as chalkBlue, green as chalkGreen,
  yellow as chalkYellow, magenta as chalkMagenta, bold as chalkBold
} from "chalk";
let pretty      = require("prettyjson");

import {deserialize, deserializeAs, Deserializable} from "./serialize";
import {GithubUtil} from "./github_util";
import {
  GithubUser, Repository, Language, LanguageInformation, RepositorySummary,
  GithubEvent, GithubPushEvent, GithubPullRequestEvent,
  GithubIssuesEvent, GithubIssueCommentEvent, GithubReleaseEvent,
  GithubWatchEvent, GithubForkEvent, GithubCreateEvent } from "./github_model";

export class MetaField extends Deserializable {

  public static PROFILE_SCHEMA_VERSION = 1;
  public static CURRENT_DATE = new Date().toISOString();

  @deserialize public agent: string;
  @deserialize public github_repository: string;
  @deserialize public github_user: string;

  /** since cerialize overwrite values even if it is `null`, we need to use `OnDeserialize` */
  // TODO: create PR (preventing from overwriting field to `null`)
  public schema_version = MetaField.PROFILE_SCHEMA_VERSION;
  public schema_created_at: string = MetaField.CURRENT_DATE;
  public schema_collected_ats: Array<string> = new Array<string>(MetaField.CURRENT_DATE);

  public static OnDeserialized(instance: MetaField, json: any): void {
    let profSchemaVersion = json.schema_version;

    if (null !== profSchemaVersion && profSchemaVersion !== MetaField.PROFILE_SCHEMA_VERSION) {
      throw new Error(`${chalkRed("Invalid schema_version: ")} ${profSchemaVersion}`)
    }

    if (_.isEmpty(profSchemaVersion)) profSchemaVersion = MetaField.PROFILE_SCHEMA_VERSION;
    instance.schema_version = profSchemaVersion;

    let created_at = json.schema_created_at;
    if (_.isEmpty(created_at)) created_at = MetaField.CURRENT_DATE;
    instance.schema_created_at = created_at;

    let collected_ats = json.schema_collected_ats;
    if (_.isEmpty(collected_ats)) collected_ats = new Array<string>(MetaField.CURRENT_DATE);
    instance.schema_collected_ats = collected_ats;
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

    let activities = GithubEvent.deserializeGithubEvent(json.activities);

    instance.activities = activities;
  }

  public static updateMeta(profile: Profile, meta: MetaField): Profile {
    let collectedAts = meta.schema_collected_ats.slice(); /** copy array */
    collectedAts.push(MetaField.CURRENT_DATE);

    profile._$meta = copyObject(meta);
    profile._$meta.schema_collected_ats = collectedAts;
    return profile;
  }

  public updateMeta(meta: MetaField): Profile {
    return Profile.updateMeta(this, meta);
  }
}

export function printProfile(user: GithubUser,
                             langInfos: Array<LanguageInformation>,
                             repos: Array<Repository>,
                             acts: Array<GithubEvent>): void {

  /** debug info */
  console.log(`\n${chalkBlue("[USER]")}`);
  console.log(pretty.render(user));

  console.log(`\n${chalkBlue("[LANGUAGE]")}`);

  if (!_.isEmpty(langInfos)) {
    let langSet = langInfos.reduce((acc, langInfo) => {
      if (_.isEmpty(langInfo.languages) || langInfo.languages.length === 0) return acc;

      langInfo.languages.map(lang => lang.name).forEach(name => {
        acc.add(name);
      });

      return acc;
    }, new Set<string>());

    console.log(`Language Count: ${langSet.size}`);
    console.log(`Supported Languages: ${Array.from(langSet).join(", ")}`);
  }

  console.log(`\n${chalkBlue("[REPOSITORY]")}`);
  if (!_.isEmpty(repos)) {
    let repoSummary = new RepositorySummary();
    repos.reduce((sum, repo) => {
      sum.repository_names.push(repo.name);
      sum.repository_count += 1;
      sum.watchers_count += repo.watchers_count;
      sum.stargazers_count += repo.stargazers_count;
      sum.forks_count += repo.forks_count;

      return sum;
    }, repoSummary);

    console.log(`Repository Count: ${repoSummary.repository_count}`);
  }

  console.log(`\n${chalkBlue("[ACTIVITY]")}`);
}

export async function createProfile(token: string,
                                    user: string,
                                    ignoredRepos: Array<string>): Promise<Profile> {

  let githubUser = await GithubUtil.getGithubUser(token, user);
  let repos = await GithubUtil.getUserRepositories(token, user);
  let langs = await GithubUtil.getUserLanguages(token, user);
  let acts = await GithubUtil.getUserActivities(token, user);

  // TODO: add repo name to language
  printProfile(githubUser, langs, repos, acts);

  let profile = new Profile();
  profile.user = githubUser;
  profile.languages = langs;
  profile.repositories = repos;
  profile.activities = acts;

  return profile;
}

function copyObject(object: any): any {
  return JSON.parse(JSON.stringify(object));
}


