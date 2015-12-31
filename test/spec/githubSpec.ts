/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import {
  GithubUtil,
  GithubUserProfile,
  GithubResponse,
  Repository,
  Language,
  GithubEvent,
  GithubPushEvent, GithubPushEventPayload
} from "../../src/github";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const user1 = "1ambda";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

let pretty = require("prettyjson");

describe("github.ts", () => {

  describe("GithubUtil", () => {
    describe("getUserProfile", () => {
      it("should return a GithubUserProfile instance", callback => {
        GithubUtil.getUserProfile(GITHUB_TOKEN, user1).then(profile => {
          expect(profile instanceof GithubUserProfile).toBeTruthy();
          expect(profile.login).toBeDefined();
          expect(profile.followers).toBeDefined();
          expect(profile.following).toBeDefined();
          callback();
        })
      });
    });

    describe("getUserRepositories", () => {
      it("should return ", callback => {
        GithubUtil.getUserRepositories(GITHUB_TOKEN, user1)
          .then(repos => {
            expect(Array.isArray(repos)).toBeTruthy();
            expect(repos.length).toBeGreaterThan(0);
            expect(repos.length).toBeGreaterThan(30);

            let repoNames = repos.map(repo => repo.name);
            expect(repoNames).toContain(`${user1}.github.io`);
            callback();
          })
      });
    });

    describe("createGithubRequest", () => {
      it("should reject promise with the `Bad credentials` message given token is invalid", callback => {
        let invalidToken = "invalid";

        GithubUtil.getGithubResponseBody(invalidToken, `/users/${user1}/repos`)
          .then(result => {
            fail();
          })
          .catch(err => {
            expect(err.message).toEqual("Bad credentials");
            expect(err.statusCode).toEqual(401);
            callback();
          })
      });

      it("should reject promise with the `Not Found` message given invalid uri", callback => {
        let invalidUri = "i-n-v-a-l-i-d";

        GithubUtil.getGithubResponseBody(GITHUB_TOKEN, invalidUri)
          .then(result => {
            fail();
          })
          .catch(err => {
            expect(err.message).toEqual("Not Found");
            expect(err.statusCode).toEqual(404);
            callback();
          })
      });
    });
  });

  describe("Language", () => {
    describe("create", () => {
      it("should return an array of Languages given github response", () => {
        let lang1 = { "Scala": 611551, "HTML": 6229 };
        let lang2 = { "Scala": 5695455, "Java": 1495691, "HTML": 141830, "Shell": 30597, "JavaScript": 27425, "Protocol Buffer": 19875, "Batchfile": 287 };

        let parsed1 = Language.create(lang1);
        let parsed1_scala = parsed1.filter(r => r.name === "Scala")[0];
        let parsed1_html = parsed1.filter(r => r.name === "HTML")[0];

        let parsed2 = Language.create(lang2);
        let parsed2_java = parsed2.filter(r => r.name === "Java")[0];

        expect(parsed1.length).toEqual(2);
        expect(parsed1.map(r => r.name)).toContain("Scala");
        expect(parsed1.map(r => r.name)).toContain("HTML");
        expect(parsed1_scala).toEqual(new Language("Scala", 611551));
        expect(parsed1_html).toEqual(new Language("HTML", 6229));

        expect(parsed2.length).toEqual(7);
        expect(parsed2_java).toEqual(new Language("Java", 1495691));
      });

      it("should return an empty array given response is empty or invalid", () => {
        let lang1 = {};
        let lang2 = null;
        let lang3 = undefined;

        let empty = new Array<Language>();

        expect(Language.create(lang1)).toEqual(empty);
        expect(Language.create(lang2)).toEqual(empty);
        expect(Language.create(lang3)).toEqual(empty);
      });
    });
  });

  describe("GithubResponse", () => {
    describe("parseLink", () => {
      it("should return nextLink given `Link` header contains `rel:\"next\"`", () => {
        let json1 = '<https://api.github.com/user/1ambda/repos?access_token=1&page=2>; rel="next", <https://api.github.com/user/1ambda/repos?access_token=1&page=2>; rel="last"';
        let json2 = '<https://api.github.com/user/1ambda/repos?access_token=1&page=1>; rel="first", <https://api.github.com/user/1ambda/repos?access_token=1&page=3>; rel="last"';
        let json3 = '<https://api.github.com/user/1ambda/repos?access_token=1&page=4>; rel="last"';
        let json4 = '<https://api.github.com/user/1ambda/repos?access_token=1&page=45000>; rel="last"';

        expect(GithubResponse.parseLastLinkCount(json1)).toEqual(2);
        expect(GithubResponse.parseLastLinkCount(json2)).toEqual(3);
        expect(GithubResponse.parseLastLinkCount(json3)).toEqual(4);
        expect(GithubResponse.parseLastLinkCount(json4)).toEqual(45000);
      });

      it("should return null when cannot parse the `Link`", () => {
        let json1 = '<https://api.github.com/user/1ambda/repos?access_token=1&page=>; rel="last"';
        let json2 = '<https://api.github.com/user/1ambda/repos?access_token=1&=45000>; rel="last"';
        let json3 = '<https://api.github.com/user/1ambda/repos?access_token=1&page=46000AA>; rel="last"';
        let json4 = '<https://api.github.com/user/1ambda/repos?access_token=1&page=AA47000>; rel="last"';

        expect(GithubResponse.parseLastLinkCount(json1)).toEqual(null);
        expect(GithubResponse.parseLastLinkCount(json2)).toEqual(null);
        // TODO: expect(GithubResponse.parseLastLinkCount(json3)).toEqual(null);
        expect(GithubResponse.parseLastLinkCount(json4)).toEqual(null);
      });

      it("should return null given `Link` header contains no `rel:\"next\"`", () => {
        let json1 = '<https://api.github.com/user/1ambda/repos?access_token=1&page=2>;';
        let json2 = 'rel="last"';

        expect(GithubResponse.parseLastLinkCount(json1)).toEqual(null);
        expect(GithubResponse.parseLastLinkCount(json2)).toEqual(null);
      });
      
      it("should return null the given arg is not typeof string", () => {
        expect(GithubResponse.parseLastLinkCount(null)).toEqual(null);
        expect(GithubResponse.parseLastLinkCount(undefined)).toEqual(null);
      });
    });
  });
  
  describe("GithubEvent", () => {
    describe("GithubPushEvent", () => {
      it("should be deserialized", () => {
        let raw1 = {
          "id": "3483461015",
          "type": "PushEvent",
          "actor": {
            "id": 4968473,
            "login": "1ambda",
            "gravatar_id": "",
            "url": "https://api.github.com/users/1ambda",
            "avatar_url": "https://avatars.githubusercontent.com/u/4968473?"
          },
          "repo": {
            "id": 48305777,
            "name": "oh-my-github/generator",
            "url": "https://api.github.com/repos/oh-my-github/generator"
          },
          "payload": {
            "push_id": 918502084,
            "size": 1,
            "distinct_size": 1,
            "ref": "refs/heads/master",
            "head": "7f6d1d80f5458e37db9b48958dd9fb2a07a78fd3",
            "before": "667fadf6bc09a2129c1ef868a4e7af0c9b2cd56b",
            "commits": [
              {
                "sha": "7f6d1d80f5458e37db9b48958dd9fb2a07a78fd3",
                "author": {
                  "email": "1amb4a@gmail.com",
                  "name": "1ambda"
                },
                "message": "test(library): Add lodashSpec.ts",
                "distinct": true,
                "url": "https://api.github.com/repos/oh-my-github/generator/commits/7f6d1d80f5458e37db9b48958dd9fb2a07a78fd3"
              }
            ]
          },
          "public": true,
          "created_at": "2015-12-30T11:44:39Z",
          "org": {
            "id": 13924389,
            "login": "oh-my-github",
            "gravatar_id": "",
            "url": "https://api.github.com/orgs/oh-my-github",
            "avatar_url": "https://avatars.githubusercontent.com/u/13924389?"
          }
        };

        let pushEvent1 = GithubPushEvent.deserialize(GithubPushEvent, raw1);

        expect(pushEvent1.id).toEqual(raw1.id);
        expect(pushEvent1.type).toEqual(raw1.type);
        expect(pushEvent1.actor).toEqual(raw1.actor.login);
        expect(pushEvent1.repo).toEqual(raw1.repo.name);
        expect(pushEvent1.created_at).toEqual(raw1.created_at);

        expect(pushEvent1.payload.push_id).toEqual(raw1.payload.push_id);
        expect(pushEvent1.payload.size).toEqual(raw1.payload.size);
        expect(pushEvent1.payload.distinct_size).toEqual(raw1.payload.distinct_size);
        expect(pushEvent1.payload.ref).toEqual(raw1.payload.ref);
        expect(pushEvent1.payload.head).toEqual(raw1.payload.head);
        expect(pushEvent1.payload.before).toEqual(raw1.payload.before);

        expect(pushEvent1.payload.commitUrls.length).toEqual(1);
        expect(pushEvent1.payload.commitUrls[0])
          .toEqual(`${GithubPushEventPayload.COMMIT_URI_PREFIX}7f6d1d80f5458e37db9b48958dd9fb2a07a78fd3`);
      });
    });

    describe("PullRequestEvent", () => {
      let raw1 = {
        "id": "3476129336",
        "type": "PullRequestEvent",
        "actor": {
          "id": 4968473,
          "login": "1ambda",
          "gravatar_id": "",
          "url": "https://api.github.com/users/1ambda",
          "avatar_url": "https://avatars.githubusercontent.com/u/4968473?"
        },
        "repo": {
          "id": 41002005,
          "name": "weichx/cerialize",
          "url": "https://api.github.com/repos/weichx/cerialize"
        },
        "payload": {
          "action": "opened",
          "number": 11,
          "pull_request": {
            "url": "https://api.github.com/repos/weichx/cerialize/pulls/11",
            "id": 54602921,
            "html_url": "https://github.com/weichx/cerialize/pull/11",
            "diff_url": "https://github.com/weichx/cerialize/pull/11.diff",
            "patch_url": "https://github.com/weichx/cerialize/pull/11.patch",
            "issue_url": "https://api.github.com/repos/weichx/cerialize/issues/11",
            "number": 11,
            "state": "open",
            "locked": false,
            "title": "Fix nested empty arrays deserialization",
            "user": {
              "login": "1ambda",
              "id": 4968473,
              "avatar_url": "https://avatars.githubusercontent.com/u/4968473?v=3",
              "gravatar_id": "",
              "url": "https://api.github.com/users/1ambda",
              "html_url": "https://github.com/1ambda",
              "followers_url": "https://api.github.com/users/1ambda/followers",
              "following_url": "https://api.github.com/users/1ambda/following{/other_user}",
              "gists_url": "https://api.github.com/users/1ambda/gists{/gist_id}",
              "starred_url": "https://api.github.com/users/1ambda/starred{/owner}{/repo}",
              "subscriptions_url": "https://api.github.com/users/1ambda/subscriptions",
              "organizations_url": "https://api.github.com/users/1ambda/orgs",
              "repos_url": "https://api.github.com/users/1ambda/repos",
              "events_url": "https://api.github.com/users/1ambda/events{/privacy}",
              "received_events_url": "https://api.github.com/users/1ambda/received_events",
              "type": "User",
              "site_admin": false
            },
            "body": "I'v fixed deserialization about **nested empty arrays**. For example,\r\n\r\n```typescript\r\n// spec\r\nclass Tree  {\r\n  @deserialize public value: string;\r\n  @deserializeAs(Array) trees: Array<Tree>;\r\n}\r\n\r\nvar root = {\r\n  trees: [{\r\n    value: \"t1\" ,\r\n    trees: new Array<Tree>()\r\n  }, {\r\n    value: \"t2\",\r\n    trees: [{\r\n      value: \"t3\",\r\n      trees: new Array<Tree>()\r\n    }, {\r\n      value: \"t4\",\r\n      trees: new Array<Tree>()\r\n    }]\r\n  }],\r\n  value: \"root2\"\r\n};\r\n\r\nvar deserialized = cerialize.Deserialize(root, Tree);\r\n```\r\n\r\nprevious implementation throw an error like\r\n\r\n```typescript\r\n// error\r\n\r\n    return new type(); //todo this probably wrong\r\n               ^\r\nTypeError: type is not a function\r\n    at deserializeObject (..../node_modules/cerialize/dist/serialize.js:363:16)\r\n    at Deserialize (/Users/1002471/github/omg/generator/node_modules/cerialize/dist/serialize.js:410:16)\r\n    at deserializeArray (/Users/1002471/github/omg/generator/node_modules/cerialize/dist/serialize.js:351:19)\r\n    at deserializeObject (/Users/1002471/github/omg/generator/node_modules/cerialize/dist/serialize.js:381:42)\r\n    at Object.Deserialize (/Users/1002471/github/omg/generator/node_modules/cerialize/dist/serialize.js:410:16)\r\n```\r\n\r\nThis PR deserialize successfully the above case. I also included test case in `spec/deserialize_function_spec.ts`  (test passed 70/71) \r\n\r\nBut the problem is, It can't deserialize `Set`. (**This is the 1 failure test case**)\r\n\r\nI'v found that `Set` is implemented using `Array` in [autoserialization_annotation_spec.ts](https://github.com/weichx/cerialize/blob/87fe32f40e29abb97055e8f6b79be13fc73c597c/spec/autoserialize_annotation_spec.ts#L76) like\r\n\r\n```\r\n/* [Weichx 12/9/15] credit to @garkin for contributing the rest of this file */\r\n// ES6 Set stub\r\n// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set\r\n// https://github.com/cloud9ide/typescript/blob/master/typings/lib.d.ts\r\ninterface Set<T> {\r\n    add(value : T): Set<T>;\r\n    clear(): void;\r\n    delete(value : T): boolean;\r\n    forEach(callbackfn : (value : T, index : T, set : Set<T>) => void, thisArg? : any): void;\r\n    has(value : T): boolean;\r\n    size: number;\r\n}\r\ndeclare var Set : {\r\n    new <T>(data? : T[]): Set<T>;\r\n};\r\n\r\nmodule Utility {\r\n    export function unpackSet<T>(_set : Set<T>) : T[] {\r\n        const result : T[] = [];\r\n        _set.forEach(v => result.push(v));\r\n        return result;\r\n    }\r\n}\r\n```\r\n\r\nIs there anyone who can help me among those who are responsible for pseudo-implemented `Set`?\r\n",
            "created_at": "2015-12-26T14:20:09Z",
            "updated_at": "2015-12-26T14:20:10Z",
            "closed_at": null,
            "merged_at": null,
            "merge_commit_sha": null,
            "assignee": null,
            "milestone": null,
            "commits_url": "https://api.github.com/repos/weichx/cerialize/pulls/11/commits",
            "review_comments_url": "https://api.github.com/repos/weichx/cerialize/pulls/11/comments",
            "review_comment_url": "https://api.github.com/repos/weichx/cerialize/pulls/comments{/number}",
            "comments_url": "https://api.github.com/repos/weichx/cerialize/issues/11/comments",
            "statuses_url": "https://api.github.com/repos/weichx/cerialize/statuses/b6ef3380ab6ac34906b8684c29a35b25eda0b8d0",
            "head": {
              "label": "1ambda:feature/recursive-deserialization",
              "ref": "feature/recursive-deserialization",
              "sha": "b6ef3380ab6ac34906b8684c29a35b25eda0b8d0",
              "user": {
                "login": "1ambda",
                "id": 4968473,
                "avatar_url": "https://avatars.githubusercontent.com/u/4968473?v=3",
                "gravatar_id": "",
                "url": "https://api.github.com/users/1ambda",
                "html_url": "https://github.com/1ambda",
                "followers_url": "https://api.github.com/users/1ambda/followers",
                "following_url": "https://api.github.com/users/1ambda/following{/other_user}",
                "gists_url": "https://api.github.com/users/1ambda/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/1ambda/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/1ambda/subscriptions",
                "organizations_url": "https://api.github.com/users/1ambda/orgs",
                "repos_url": "https://api.github.com/users/1ambda/repos",
                "events_url": "https://api.github.com/users/1ambda/events{/privacy}",
                "received_events_url": "https://api.github.com/users/1ambda/received_events",
                "type": "User",
                "site_admin": false
              },
              "repo": {
                "id": 48599725,
                "name": "cerialize",
                "full_name": "1ambda/cerialize",
                "owner": {
                  "login": "1ambda",
                  "id": 4968473,
                  "avatar_url": "https://avatars.githubusercontent.com/u/4968473?v=3",
                  "gravatar_id": "",
                  "url": "https://api.github.com/users/1ambda",
                  "html_url": "https://github.com/1ambda",
                  "followers_url": "https://api.github.com/users/1ambda/followers",
                  "following_url": "https://api.github.com/users/1ambda/following{/other_user}",
                  "gists_url": "https://api.github.com/users/1ambda/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/1ambda/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/1ambda/subscriptions",
                  "organizations_url": "https://api.github.com/users/1ambda/orgs",
                  "repos_url": "https://api.github.com/users/1ambda/repos",
                  "events_url": "https://api.github.com/users/1ambda/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/1ambda/received_events",
                  "type": "User",
                  "site_admin": false
                },
                "private": false,
                "html_url": "https://github.com/1ambda/cerialize",
                "description": "Easy serialization through ES7/Typescript annotations",
                "fork": true,
                "url": "https://api.github.com/repos/1ambda/cerialize",
                "forks_url": "https://api.github.com/repos/1ambda/cerialize/forks",
                "keys_url": "https://api.github.com/repos/1ambda/cerialize/keys{/key_id}",
                "collaborators_url": "https://api.github.com/repos/1ambda/cerialize/collaborators{/collaborator}",
                "teams_url": "https://api.github.com/repos/1ambda/cerialize/teams",
                "hooks_url": "https://api.github.com/repos/1ambda/cerialize/hooks",
                "issue_events_url": "https://api.github.com/repos/1ambda/cerialize/issues/events{/number}",
                "events_url": "https://api.github.com/repos/1ambda/cerialize/events",
                "assignees_url": "https://api.github.com/repos/1ambda/cerialize/assignees{/user}",
                "branches_url": "https://api.github.com/repos/1ambda/cerialize/branches{/branch}",
                "tags_url": "https://api.github.com/repos/1ambda/cerialize/tags",
                "blobs_url": "https://api.github.com/repos/1ambda/cerialize/git/blobs{/sha}",
                "git_tags_url": "https://api.github.com/repos/1ambda/cerialize/git/tags{/sha}",
                "git_refs_url": "https://api.github.com/repos/1ambda/cerialize/git/refs{/sha}",
                "trees_url": "https://api.github.com/repos/1ambda/cerialize/git/trees{/sha}",
                "statuses_url": "https://api.github.com/repos/1ambda/cerialize/statuses/{sha}",
                "languages_url": "https://api.github.com/repos/1ambda/cerialize/languages",
                "stargazers_url": "https://api.github.com/repos/1ambda/cerialize/stargazers",
                "contributors_url": "https://api.github.com/repos/1ambda/cerialize/contributors",
                "subscribers_url": "https://api.github.com/repos/1ambda/cerialize/subscribers",
                "subscription_url": "https://api.github.com/repos/1ambda/cerialize/subscription",
                "commits_url": "https://api.github.com/repos/1ambda/cerialize/commits{/sha}",
                "git_commits_url": "https://api.github.com/repos/1ambda/cerialize/git/commits{/sha}",
                "comments_url": "https://api.github.com/repos/1ambda/cerialize/comments{/number}",
                "issue_comment_url": "https://api.github.com/repos/1ambda/cerialize/issues/comments{/number}",
                "contents_url": "https://api.github.com/repos/1ambda/cerialize/contents/{+path}",
                "compare_url": "https://api.github.com/repos/1ambda/cerialize/compare/{base}...{head}",
                "merges_url": "https://api.github.com/repos/1ambda/cerialize/merges",
                "archive_url": "https://api.github.com/repos/1ambda/cerialize/{archive_format}{/ref}",
                "downloads_url": "https://api.github.com/repos/1ambda/cerialize/downloads",
                "issues_url": "https://api.github.com/repos/1ambda/cerialize/issues{/number}",
                "pulls_url": "https://api.github.com/repos/1ambda/cerialize/pulls{/number}",
                "milestones_url": "https://api.github.com/repos/1ambda/cerialize/milestones{/number}",
                "notifications_url": "https://api.github.com/repos/1ambda/cerialize/notifications{?since,all,participating}",
                "labels_url": "https://api.github.com/repos/1ambda/cerialize/labels{/name}",
                "releases_url": "https://api.github.com/repos/1ambda/cerialize/releases{/id}",
                "created_at": "2015-12-26T04:47:18Z",
                "updated_at": "2015-12-26T04:47:19Z",
                "pushed_at": "2015-12-26T13:57:19Z",
                "git_url": "git://github.com/1ambda/cerialize.git",
                "ssh_url": "git@github.com:1ambda/cerialize.git",
                "clone_url": "https://github.com/1ambda/cerialize.git",
                "svn_url": "https://github.com/1ambda/cerialize",
                "homepage": null,
                "size": 48,
                "stargazers_count": 0,
                "watchers_count": 0,
                "language": "TypeScript",
                "has_issues": false,
                "has_downloads": true,
                "has_wiki": true,
                "has_pages": false,
                "forks_count": 0,
                "mirror_url": null,
                "open_issues_count": 0,
                "forks": 0,
                "open_issues": 0,
                "watchers": 0,
                "default_branch": "master"
              }
            },
            "base": {
              "label": "weichx:master",
              "ref": "master",
              "sha": "87fe32f40e29abb97055e8f6b79be13fc73c597c",
              "user": {
                "login": "weichx",
                "id": 1365953,
                "avatar_url": "https://avatars.githubusercontent.com/u/1365953?v=3",
                "gravatar_id": "",
                "url": "https://api.github.com/users/weichx",
                "html_url": "https://github.com/weichx",
                "followers_url": "https://api.github.com/users/weichx/followers",
                "following_url": "https://api.github.com/users/weichx/following{/other_user}",
                "gists_url": "https://api.github.com/users/weichx/gists{/gist_id}",
                "starred_url": "https://api.github.com/users/weichx/starred{/owner}{/repo}",
                "subscriptions_url": "https://api.github.com/users/weichx/subscriptions",
                "organizations_url": "https://api.github.com/users/weichx/orgs",
                "repos_url": "https://api.github.com/users/weichx/repos",
                "events_url": "https://api.github.com/users/weichx/events{/privacy}",
                "received_events_url": "https://api.github.com/users/weichx/received_events",
                "type": "User",
                "site_admin": false
              },
              "repo": {
                "id": 41002005,
                "name": "cerialize",
                "full_name": "weichx/cerialize",
                "owner": {
                  "login": "weichx",
                  "id": 1365953,
                  "avatar_url": "https://avatars.githubusercontent.com/u/1365953?v=3",
                  "gravatar_id": "",
                  "url": "https://api.github.com/users/weichx",
                  "html_url": "https://github.com/weichx",
                  "followers_url": "https://api.github.com/users/weichx/followers",
                  "following_url": "https://api.github.com/users/weichx/following{/other_user}",
                  "gists_url": "https://api.github.com/users/weichx/gists{/gist_id}",
                  "starred_url": "https://api.github.com/users/weichx/starred{/owner}{/repo}",
                  "subscriptions_url": "https://api.github.com/users/weichx/subscriptions",
                  "organizations_url": "https://api.github.com/users/weichx/orgs",
                  "repos_url": "https://api.github.com/users/weichx/repos",
                  "events_url": "https://api.github.com/users/weichx/events{/privacy}",
                  "received_events_url": "https://api.github.com/users/weichx/received_events",
                  "type": "User",
                  "site_admin": false
                },
                "private": false,
                "html_url": "https://github.com/weichx/cerialize",
                "description": "Easy serialization through ES7/Typescript annotations",
                "fork": false,
                "url": "https://api.github.com/repos/weichx/cerialize",
                "forks_url": "https://api.github.com/repos/weichx/cerialize/forks",
                "keys_url": "https://api.github.com/repos/weichx/cerialize/keys{/key_id}",
                "collaborators_url": "https://api.github.com/repos/weichx/cerialize/collaborators{/collaborator}",
                "teams_url": "https://api.github.com/repos/weichx/cerialize/teams",
                "hooks_url": "https://api.github.com/repos/weichx/cerialize/hooks",
                "issue_events_url": "https://api.github.com/repos/weichx/cerialize/issues/events{/number}",
                "events_url": "https://api.github.com/repos/weichx/cerialize/events",
                "assignees_url": "https://api.github.com/repos/weichx/cerialize/assignees{/user}",
                "branches_url": "https://api.github.com/repos/weichx/cerialize/branches{/branch}",
                "tags_url": "https://api.github.com/repos/weichx/cerialize/tags",
                "blobs_url": "https://api.github.com/repos/weichx/cerialize/git/blobs{/sha}",
                "git_tags_url": "https://api.github.com/repos/weichx/cerialize/git/tags{/sha}",
                "git_refs_url": "https://api.github.com/repos/weichx/cerialize/git/refs{/sha}",
                "trees_url": "https://api.github.com/repos/weichx/cerialize/git/trees{/sha}",
                "statuses_url": "https://api.github.com/repos/weichx/cerialize/statuses/{sha}",
                "languages_url": "https://api.github.com/repos/weichx/cerialize/languages",
                "stargazers_url": "https://api.github.com/repos/weichx/cerialize/stargazers",
                "contributors_url": "https://api.github.com/repos/weichx/cerialize/contributors",
                "subscribers_url": "https://api.github.com/repos/weichx/cerialize/subscribers",
                "subscription_url": "https://api.github.com/repos/weichx/cerialize/subscription",
                "commits_url": "https://api.github.com/repos/weichx/cerialize/commits{/sha}",
                "git_commits_url": "https://api.github.com/repos/weichx/cerialize/git/commits{/sha}",
                "comments_url": "https://api.github.com/repos/weichx/cerialize/comments{/number}",
                "issue_comment_url": "https://api.github.com/repos/weichx/cerialize/issues/comments{/number}",
                "contents_url": "https://api.github.com/repos/weichx/cerialize/contents/{+path}",
                "compare_url": "https://api.github.com/repos/weichx/cerialize/compare/{base}...{head}",
                "merges_url": "https://api.github.com/repos/weichx/cerialize/merges",
                "archive_url": "https://api.github.com/repos/weichx/cerialize/{archive_format}{/ref}",
                "downloads_url": "https://api.github.com/repos/weichx/cerialize/downloads",
                "issues_url": "https://api.github.com/repos/weichx/cerialize/issues{/number}",
                "pulls_url": "https://api.github.com/repos/weichx/cerialize/pulls{/number}",
                "milestones_url": "https://api.github.com/repos/weichx/cerialize/milestones{/number}",
                "notifications_url": "https://api.github.com/repos/weichx/cerialize/notifications{?since,all,participating}",
                "labels_url": "https://api.github.com/repos/weichx/cerialize/labels{/name}",
                "releases_url": "https://api.github.com/repos/weichx/cerialize/releases{/id}",
                "created_at": "2015-08-18T23:12:14Z",
                "updated_at": "2015-12-23T16:00:13Z",
                "pushed_at": "2015-12-26T14:20:10Z",
                "git_url": "git://github.com/weichx/cerialize.git",
                "ssh_url": "git@github.com:weichx/cerialize.git",
                "clone_url": "https://github.com/weichx/cerialize.git",
                "svn_url": "https://github.com/weichx/cerialize",
                "homepage": null,
                "size": 69,
                "stargazers_count": 10,
                "watchers_count": 10,
                "language": "TypeScript",
                "has_issues": true,
                "has_downloads": true,
                "has_wiki": true,
                "has_pages": false,
                "forks_count": 3,
                "mirror_url": null,
                "open_issues_count": 5,
                "forks": 3,
                "open_issues": 5,
                "watchers": 10,
                "default_branch": "master"
              }
            },
            "_links": {
              "self": {
                "href": "https://api.github.com/repos/weichx/cerialize/pulls/11"
              },
              "html": {
                "href": "https://github.com/weichx/cerialize/pull/11"
              },
              "issue": {
                "href": "https://api.github.com/repos/weichx/cerialize/issues/11"
              },
              "comments": {
                "href": "https://api.github.com/repos/weichx/cerialize/issues/11/comments"
              },
              "review_comments": {
                "href": "https://api.github.com/repos/weichx/cerialize/pulls/11/comments"
              },
              "review_comment": {
                "href": "https://api.github.com/repos/weichx/cerialize/pulls/comments{/number}"
              },
              "commits": {
                "href": "https://api.github.com/repos/weichx/cerialize/pulls/11/commits"
              },
              "statuses": {
                "href": "https://api.github.com/repos/weichx/cerialize/statuses/b6ef3380ab6ac34906b8684c29a35b25eda0b8d0"
              }
            },
            "merged": false,
            "mergeable": null,
            "mergeable_state": "unknown",
            "merged_by": null,
            "comments": 0,
            "review_comments": 0,
            "commits": 1,
            "additions": 53,
            "deletions": 4,
            "changed_files": 2
          }
        },
        "public": true,
        "created_at": "2015-12-26T14:20:10Z"
      };

    });
  });
});

