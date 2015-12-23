/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

/** import doesn't work with nodejs modules */
let github = require("octonode");
let prettyjson = require('prettyjson');
let GITHUB_TOKEN = process.env.GITHUB_TOKEN;

describe("octonode", () => {
  describe("client", () => {
    it("client.get", callback => {
      let client = github.client(GITHUB_TOKEN);

      async function getUserInfo(user: string) {
        new Promise(resolve => {
          client.get(`/users/${user}`, {}, (err, status, body, headers) => {
            resolve(body);
          })
        })
      }

      const user = "1ambda";

      getUserInfo(user)
        .then(userInfo => {
          console.info("\n" + userInfo);
          callback();
        })
        .catch(e => {
          fail();
        });
    });
  });
});