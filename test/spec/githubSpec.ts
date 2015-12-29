/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import {GithubUserProfile, Repository, GithubResponse, Language, GithubUtil} from "../../src/github";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const user1 = "1ambda";

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
});
