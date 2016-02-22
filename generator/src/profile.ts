/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

import * as _ from "lodash";

import {Util, Log} from "./util"
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
  @deserialize public github_user: string;
  @deserialize public github_repository: string;
  @deserialize public ignored_repositories: Array<string> = new Array<string>();

  /** since cerialize overwrite values even if it is `null`, we need to use `OnDeserialize` */
  // TODO: create PR (preventing from overwriting field to `null`)
  public schema_version = MetaField.PROFILE_SCHEMA_VERSION;
  public schema_created_at: string = MetaField.CURRENT_DATE;
  public schema_collected_ats: Array<string> = new Array<string>(MetaField.CURRENT_DATE);

  public static OnDeserialized(instance: MetaField, json: any): void {
    let profSchemaVersion = json.schema_version;

    if (null !== profSchemaVersion && profSchemaVersion !== MetaField.PROFILE_SCHEMA_VERSION) {
      Util.reportMessageAndExit(`Invalid \`_$meta.schema_version\`: ${profSchemaVersion}`);
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
  @deserializeAs(MetaField) public _$meta: MetaField = new MetaField();
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

  public static updateMeta(currentProfile: Profile, prevMeta: MetaField): Profile {
    let currentMeta = currentProfile._$meta;
    let meta: MetaField = Util.copyObject(prevMeta);

    /** 1. update schema_collected_ats */
    meta.schema_collected_ats.push(MetaField.CURRENT_DATE);

    /** 2. update ignored_repositories */
    meta.ignored_repositories = _.union(
      currentMeta.ignored_repositories, prevMeta.ignored_repositories
    );

    currentProfile._$meta = meta;

    return currentProfile;
  }

  public updateMeta(prevMeta: MetaField): Profile {
    return Profile.updateMeta(this, prevMeta);
  }
}

export function printProfile(user: GithubUser,
                             langInfos: Array<LanguageInformation>,
                             repos: Array<Repository>,
                             prevProfile: Profile,
                             currentProfile: Profile,
                             ignoredRepos: Array<string>): void {

  function renderTitle(tag: any): void {
    Log.blue(`\n  ${tag}`, "");
  }

  function renderText(tag: string, message: any): void {
    Log.magentaReverse(`    ${tag}`, message);
  }

  /** user */
  renderTitle("[USER]");
  renderText("Github User: ", user.login);
  renderText("Created At:  ", user.created_at);
  renderText("Following:   ", user.following);
  renderText("Follower :   ", user.followers);
  renderText("Public Repo: ", user.public_repos);
  renderText("Public Gist: ", user.public_gists);

  /** langauge */
  renderTitle("[LANGUAGE]");

  if (!_.isEmpty(langInfos)) {
    let langSet = langInfos.reduce((acc, langInfo) => {
      if (_.isEmpty(langInfo.languages) || langInfo.languages.length === 0) return acc;

      langInfo.languages.map(lang => lang.name).forEach(name => {
        acc.add(name);
      });

      return acc;
    }, new Set<string>());

    renderText("Language Count: ", langSet.size);
    renderText("Supported Languages: ", Array.from(langSet).join(", "));
    // TODO converts to ir, il options (ignoreLanguage, ignoreRepository)
    renderText("Ignored Repositories: ", ignoredRepos);
  }

  /** repository */
  renderTitle("[REPOSITORY]")

  // TODO refactor, print ignored repos
  // TODO featured reos
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

    renderText("Repository Count: ", repoSummary.repository_count);
  }

  /** activity */
  renderTitle("[ACTIVITY]");

  let prevActs    = prevProfile.activities;
  let prevActIds  = new Set(prevActs.map(act => act.event_id));
  let currentActs = currentProfile.activities;
  let newActs = currentActs.filter(act =>
    !prevActIds.has(act.event_id)
  );

  renderText("Current Profile Activity: ", currentActs.length);
  if (prevActs.length !== currentActs.length) {
    renderText("Previous Profile Activity: ", prevActs.length);

    renderText("New Activity Details:", "");
    let eventTypeToCount = {};

    for (let i = 0; i < newActs.length; i++) {
      let act = newActs[i];
      if (!eventTypeToCount.hasOwnProperty(act.type))
        eventTypeToCount[act.type] = 0;

      eventTypeToCount[act.type] += 1;
    }

    let eventTypes = Object
      .keys(eventTypeToCount)
      .filter(type => eventTypeToCount.hasOwnProperty(type));

    for(let j = 0; j < eventTypes.length; j++) {
      let type = eventTypes[j];
      renderText(`  ${type}: `, `${eventTypeToCount[type]}`);
    }
  }
}

export async function createProfile(token: string,
                                    prevProf: Profile,
                                    ignoredRepos: Array<string>): Promise<Profile> {

  let user = prevProf._$meta.github_user;

  let currentProf = new Profile();
  currentProf._$meta.ignored_repositories = ignoredRepos;

  let allIgnoredRepos = _.union(ignoredRepos, prevProf._$meta.ignored_repositories);

  let githubUser = await GithubUtil.getGithubUser(token, user);
  let repos = await GithubUtil.getUserRepositories(token, user);
  let langs = await GithubUtil.getUserLanguages(token, user, allIgnoredRepos);
  let currentActs = await GithubUtil.getUserActivities(token, user);

  let uniqActs = GithubEvent.mergeByEventId(prevProf.activities, currentActs);
  currentProf.activities = uniqActs;
  currentProf.repositories = repos;
  currentProf.languages = langs;
  currentProf.user = githubUser;

  /** printProfile before updating meta */
  printProfile(githubUser, langs, repos, prevProf, currentProf, allIgnoredRepos);

  currentProf.updateMeta(prevProf._$meta);

  return currentProf;
}

