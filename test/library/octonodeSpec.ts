/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

/** import doesn't work with nodejs modules */
let github = require("octonode");
let prettyjson = require('prettyjson');
let GITHUB_TOKEN = process.env.GITHUB_TOKEN;

let client = github.client(GITHUB_TOKEN);
const user = "1ambda";
const repoName1 = "scala";

describe("octonode", () => {
  //describe("client", () => {
  //  it("getUserInfo", callback => {
  //    getUserInfo(client, user)
  //      .then((userInfo: { login: string }) => {
  //        expect(userInfo.login).toEqual(user);
  //        callback();
  //      });
  //  });
  //
  //  it("getUserRepos", callback => {
  //    getUserRepos(client, user).then((repos: { name: string }[]) => {
  //      let names: string[] = repos.map(repo => repo.name);
  //      expect(names).toContain("dotfiles");
  //      callback();
  //    })
  //  });
  //
  //  it("getRepoStat", callback => {
  //    getRepoStat(client, user, repoName1).then(repo => {
  //      expect(repo.name).toEqual(repoName1);
  //      expect(repo.full_name).toEqual(`${user}/${repoName1}`);
  //      callback();
  //    });
  //  });
  //
  //  it("createUserProfile", callback => {
  //    createUserProfile(client, user).then(profile => {
  //      expect(profile.login).toEqual(user);
  //      callback();
  //    })
  //  });
  //});
});

interface Repository {
  name: string;
  full_name: string;
  forks_count: number;
  stargazers_count: number;
  watchers_count: number;
}

interface UserInfo {
  login: string;
  followers: number;
  following: number;
}

class UserProfile {
  constructor(public login: string,
              public repository_count: number,
              public followers: number,
              public following: number,
              public forks_count: number,
              public stargazers_count: number,
              public watchers_count: number) { }
}

async function createUserProfile(client, owner: string): Promise<UserProfile> {
  let info = await getUserInfo(client, owner);
  let repos = await getUserRepos(client, owner);

  let stars = 0;
  let forks = 0;
  let watchers = 0;
  let repoCount = 0;

  for(let repo of repos) { /** use `of` instead of `in` */
    repoCount += 1;
    stars += repo.stargazers_count;
    forks += repo.forks_count;
    watchers += repo.watchers_count;
  }

  return new UserProfile(owner, repoCount, info.followers, info.following, forks, stars, watchers);
}

async function getRepoStat(client, owner: string, repo: string): Promise<Repository> {
  return createGithubRequest(client, `/repos/${owner}/${repo}`)
}

async function getUserRepos(client, user: string): Promise<Repository[]> {
  return createGithubRequest(client, `/users/${user}/repos`);
}

async function getUserInfo(client, user: string): Promise<UserInfo> {
  return createGithubRequest(client, `/users/${user}`);
}

async function createGithubRequest(client, uri: string): Promise<any>{
  return new Promise(resolve => {
    client.get(uri, {}, (err, status, body, headers) => {
      resolve(body);
    })
  })
}
