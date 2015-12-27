/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import {GithubUserProfile, Repository, GithubUtil} from "../../src/github";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const user1 = "1ambda";

describe("github.ts", () => {
  describe("GithubUtil", () => {
    it("getUserProfile", callback => {
      GithubUtil.getUserProfile(GITHUB_TOKEN, user1).then(profile => {
        expect(profile instanceof GithubUserProfile).toBeTruthy();
        expect(profile.login).toBeDefined();
        expect(profile.followers).toBeDefined();
        expect(profile.following).toBeDefined();
        callback();
      })
    });
  });
});
