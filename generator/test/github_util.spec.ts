/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import {
  GithubUser,
  Repository,
  Language,
  GithubEvent,
  GithubPushEvent, GithubPushEventPayload,
  GithubPullRequestEvent, GithubPullRequestEventPayload,
  GithubIssuesEvent, GithubIssuesEventPayload,
  GithubIssueCommentEvent, GithubIssueCommentEventPayload,
  GithubWatchEvent, GithubWatchEventPayload,
  GithubForkEvent, GithubForkEventPayload,
  GithubReleaseEvent, GithubReleaseEventPayload,
  GithubCreateEvent, GithubCreateEventPayload
} from "../src/github_model";

import {GithubUtil, GithubResponse } from "../src/github_util";
import {SampleResources} from "./resource/sampleResponse";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const user1 = "1ambda";

jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;

let pretty = require("prettyjson");

describe("GithubUtil", () => {
  describe("getGithubUser", () => {
    it("should return a GithubUser instance", callback => {
      GithubUtil.getGithubUser(GITHUB_TOKEN, user1).then(githubUser => {

        let u1 = new GithubUser();
        let githubUserProps = Object.keys(u1).filter(p => u1.hasOwnProperty(p));

        expect(githubUser instanceof GithubUser).toBeTruthy();

        expect(githubUserProps.length).toBeGreaterThan(0);
        for (let i = 0; i < githubUserProps.length; i++) {
          let prop = githubUserProps[i];
          expect(githubUser[prop]).toBeDefined();
        }

        callback();
      });
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
        });
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
        });
    });

    it("should reject promise with the `Not Found` message given invalid uri", callback => {
      let invalidUri = "/i-n-v-a-l-i-d";

      GithubUtil.getGithubResponseBody(GITHUB_TOKEN, invalidUri)
        .then(result => {
          fail();
        })
        .catch(err => {
          expect(err.message).toEqual("Not Found");
          expect(err.statusCode).toEqual(404);
          callback();
        });
    });
  });
});
