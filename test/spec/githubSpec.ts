/// <reference path="../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../typings/node/node.d.ts" />

import {
  GithubUserProfile,
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
} from "../../src/github_model";

import {GithubUtil, GithubResponse } from "../../src/github_util";
import {SampleResources} from "./sampleResource";

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
        let invalidUri = "i-n-v-a-l-i-d";

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
        let json1 = "<https://api.github.com/user/1ambda/repos?access_token=1&page=2>; rel=\"next\", <https://api.github.com/user/1ambda/repos?access_token=1&page=2>; rel=\"last\"";
        let json2 = "<https://api.github.com/user/1ambda/repos?access_token=1&page=1>; rel=\"first\", <https://api.github.com/user/1ambda/repos?access_token=1&page=3>; rel=\"last\"";
        let json3 = "<https://api.github.com/user/1ambda/repos?access_token=1&page=4>; rel=\"last\"";
        let json4 = "<https://api.github.com/user/1ambda/repos?access_token=1&page=45000>; rel=\"last\"";

        expect(GithubResponse.parseLastLinkCount(json1)).toEqual(2);
        expect(GithubResponse.parseLastLinkCount(json2)).toEqual(3);
        expect(GithubResponse.parseLastLinkCount(json3)).toEqual(4);
        expect(GithubResponse.parseLastLinkCount(json4)).toEqual(45000);
      });

      it("should return null when cannot parse the `Link`", () => {
        let json1 = "<https://api.github.com/user/1ambda/repos?access_token=1&page=>; rel=\"last\"";
        let json2 = "<https://api.github.com/user/1ambda/repos?access_token=1&=45000>; rel=\"last\"";
        let json3 = "<https://api.github.com/user/1ambda/repos?access_token=1&page=46000AA>; rel=\"last\"";
        let json4 = "<https://api.github.com/user/1ambda/repos?access_token=1&page=AA47000>; rel=\"last\"";

        expect(GithubResponse.parseLastLinkCount(json1)).toEqual(null);
        expect(GithubResponse.parseLastLinkCount(json2)).toEqual(null);
        // TODO: expect(GithubResponse.parseLastLinkCount(json3)).toEqual(null);
        expect(GithubResponse.parseLastLinkCount(json4)).toEqual(null);
      });

      it("should return null given `Link` header contains no `rel:\"next\"`", () => {
        let json1 = "<https://api.github.com/user/1ambda/repos?access_token=1&page=2>;";
        let json2 = "rel=\"last\"";

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
        let raw = SampleResources.pushEvent1;
        let pushEvent1 = GithubPushEvent.deserialize(GithubPushEvent, raw);

        expect(pushEvent1.event_id).toEqual(raw.id);
        expect(pushEvent1.event_type).toEqual(raw.type);
        expect(pushEvent1.event_type).toEqual(GithubPushEvent.EVENT_TYPE);
        expect(pushEvent1.actor).toEqual(raw.actor.login);
        expect(pushEvent1.repo).toEqual(raw.repo.name);
        expect(pushEvent1.created_at).toEqual(raw.created_at);

        let payload = pushEvent1.payload;

        expect(payload.push_id).toEqual(raw.payload.push_id);
        expect(payload.size).toEqual(raw.payload.size);
        expect(payload.distinct_size).toEqual(raw.payload.distinct_size);
        expect(payload.ref).toEqual(raw.payload.ref);
        expect(payload.head).toEqual(raw.payload.head);
        expect(payload.before).toEqual(raw.payload.before);

        expect(payload.commit_urls.length).toEqual(1);
        expect(payload.commit_urls[0])
          .toEqual(`${GithubPushEventPayload.COMMIT_URI_PREFIX}7f6d1d80f5458e37db9b48958dd9fb2a07a78fd3`);
      });
    });

    describe("PullRequestEvent", () => {
      it("should be deserialized", () => {
        let raw = SampleResources.pullRequestEvent1;
        let prEvent = GithubPullRequestEvent.deserialize(GithubPullRequestEvent, raw);

        expect(prEvent.event_id).toEqual(raw.id);
        expect(prEvent.event_type).toEqual(raw.type);
        expect(prEvent.event_type).toEqual(GithubPullRequestEvent.EVENT_TYPE);
        expect(prEvent.actor).toEqual(raw.actor.login);
        expect(prEvent.repo).toEqual(raw.repo.name);
        expect(prEvent.created_at).toEqual(raw.created_at);

        let payload = prEvent.payload;

        expect(payload.action).toEqual(raw.payload.action);
        expect(payload.number).toEqual(raw.payload.number);
        expect(payload.pull_request_id).toEqual(raw.payload.pull_request.id);
        expect(payload.pull_request_merged).toEqual(raw.payload.pull_request.merged);
        expect(payload.pull_request_title).toEqual(raw.payload.pull_request.title);
        expect(payload.pull_request_url).toEqual(raw.payload.pull_request.url);
        expect(payload.pull_request_commits).toEqual(raw.payload.pull_request.commits);
        expect(payload.pull_request_additions).toEqual(raw.payload.pull_request.additions);
        expect(payload.pull_request_deletions).toEqual(raw.payload.pull_request.deletions);
        expect(payload.pull_request_changed_files).toEqual(raw.payload.pull_request.changed_files);
      });
    });

    describe("IssuesEvent", () => {
      it("should be deserialized", () => {
        let raw = SampleResources.issuesEvent1;
        let issuesEvent = GithubIssuesEvent.deserialize(GithubIssuesEvent, raw);

        expect(issuesEvent.event_id).toEqual(raw.id);
        expect(issuesEvent.event_type).toEqual(raw.type);
        expect(issuesEvent.event_type).toEqual(GithubIssuesEvent.EVENT_TYPE);
        expect(issuesEvent.actor).toEqual(raw.actor.login);
        expect(issuesEvent.repo).toEqual(raw.repo.name);
        expect(issuesEvent.created_at).toEqual(raw.created_at);

        let payload = issuesEvent.payload;

        expect(payload.action).toEqual(raw.payload.action);
        expect(payload.issue_id).toEqual(raw.payload.issue.id);
        expect(payload.issue_number).toEqual(raw.payload.issue.number);
        expect(payload.issue_title).toEqual(raw.payload.issue.title);
        expect(payload.issue_url).toEqual(raw.payload.issue.html_url);
      });
    });

    describe("IssueCommentEvent", () => {
      it("should be deserialized", () => {
        let raw = SampleResources.issueCommentEvent1;
        let issueCommentEvent = GithubIssueCommentEvent.deserialize(GithubIssueCommentEvent, raw);

        expect(issueCommentEvent.event_id).toEqual(raw.id);
        expect(issueCommentEvent.event_type).toEqual(raw.type);
        expect(issueCommentEvent.event_type).toEqual(GithubIssueCommentEvent.EVENT_TYPE);
        expect(issueCommentEvent.actor).toEqual(raw.actor.login);
        expect(issueCommentEvent.repo).toEqual(raw.repo.name);
        expect(issueCommentEvent.created_at).toEqual(raw.created_at);

        let payload = issueCommentEvent.payload;

        expect(payload.action).toEqual(raw.payload.action);
        expect(payload.issue_id).toEqual(raw.payload.issue.id);
        expect(payload.issue_number).toEqual(raw.payload.issue.number);
        expect(payload.issue_title).toEqual(raw.payload.issue.title);
        expect(payload.comment_url).toEqual(raw.payload.comment.html_url);
      });
    });

    describe("WatchEvent", () => {
      it("should be deserialized", () => {
        let raw = SampleResources.watchEvent1;
        let watchEvent = GithubWatchEvent.deserialize(GithubWatchEvent, raw);

        expect(watchEvent.event_id).toEqual(raw.id);
        expect(watchEvent.event_type).toEqual(raw.type);
        expect(watchEvent.event_type).toEqual(GithubWatchEvent.EVENT_TYPE);
        expect(watchEvent.actor).toEqual(raw.actor.login);
        expect(watchEvent.repo).toEqual(raw.repo.name);
        expect(watchEvent.created_at).toEqual(raw.created_at);

        let payload = watchEvent.payload;

        expect(payload.action).toEqual(raw.payload.action);
      });
    });

    describe("ForkEvent", () => {
      it("should be deserialized", () => {
        let raw = SampleResources.forkEvent1;
        let forkEvent = GithubForkEvent.deserialize(GithubForkEvent, raw);

        expect(forkEvent.event_id).toEqual(raw.id);
        expect(forkEvent.event_type).toEqual(raw.type);
        expect(forkEvent.event_type).toEqual(GithubForkEvent.EVENT_TYPE);
        expect(forkEvent.actor).toEqual(raw.actor.login);
        expect(forkEvent.repo).toEqual(raw.repo.name);
        expect(forkEvent.created_at).toEqual(raw.created_at);

        let payload = forkEvent.payload;

        expect(payload.forkee_id).toEqual(raw.payload.forkee.id);
        expect(payload.forkee_name).toEqual(raw.payload.forkee.name);
        expect(payload.forkee_full_name).toEqual(raw.payload.forkee.full_name);
        expect(payload.forkee_url).toEqual(raw.payload.forkee.html_url);
        expect(payload.forkee_language).toEqual(raw.payload.forkee.language);
      });
    });

    describe("ReleaseEvent", () => {
      it("should be deserialize", () => {
        let raw = SampleResources.releaseEvent1;

        let releaseEvent = GithubReleaseEvent.deserialize(GithubReleaseEvent, raw);

        expect(releaseEvent.event_id).toEqual(raw.id);
        expect(releaseEvent.event_type).toEqual(raw.type);
        expect(releaseEvent.event_type).toEqual(GithubReleaseEvent.EVENT_TYPE);
        expect(releaseEvent.actor).toEqual(raw.actor.login);
        expect(releaseEvent.repo).toEqual(raw.repo.name);
        expect(releaseEvent.created_at).toEqual(raw.created_at);

        let payload = releaseEvent.payload;

        expect(payload.release_prerelease).toEqual(raw.payload.release.prerelease);
        expect(payload.release_id).toEqual(raw.payload.release.id);
        expect(payload.release_url).toEqual(raw.payload.release.html_url);
        expect(payload.release_tag_name).toEqual(raw.payload.release.tag_name);
        expect(payload.release_name).toEqual(raw.payload.release.name);
        expect(payload.release_target_commitish).toEqual(raw.payload.release.target_commitish);
      });
    });

    describe("CreateEvent", () => {
      it("should be deserialized the given event contains the ref_type as branch", () => {
        let raw = SampleResources.createEventBranch1;
        let createEvent = GithubCreateEvent.deserialize(GithubCreateEvent, raw);

        expect(createEvent.event_id).toEqual(raw.id);
        expect(createEvent.event_type).toEqual(raw.type);
        expect(createEvent.event_type).toEqual(GithubCreateEvent.EVENT_TYPE);
        expect(createEvent.actor).toEqual(raw.actor.login);
        expect(createEvent.repo).toEqual(raw.repo.name);
        expect(createEvent.created_at).toEqual(raw.created_at);

        let payload = createEvent.payload;

        expect(payload.ref).toEqual(raw.payload.ref);
        expect(payload.ref_type).toEqual(raw.payload.ref_type);
        expect(payload.ref_type).toEqual(GithubCreateEventPayload.REF_TYPE_BRANCH);
        expect(payload.master_branch).toEqual(raw.payload.master_branch);
        expect(payload.description).toEqual(raw.payload.description);
        expect(payload.pusher_type).toEqual(raw.payload.pusher_type);
      });

      it("should be deserialized the given event contains the ref_type as repository", () => {
        let raw = SampleResources.createEventRepository1;
        let createEvent = GithubCreateEvent.deserialize(GithubCreateEvent, raw);

        expect(createEvent.event_id).toEqual(raw.id);
        expect(createEvent.event_type).toEqual(raw.type);
        expect(createEvent.event_type).toEqual(GithubCreateEvent.EVENT_TYPE);
        expect(createEvent.actor).toEqual(raw.actor.login);
        expect(createEvent.repo).toEqual(raw.repo.name);
        expect(createEvent.created_at).toEqual(raw.created_at);

        let payload = createEvent.payload;

        expect(payload.ref).toEqual(raw.payload.ref);
        expect(payload.ref_type).toEqual(raw.payload.ref_type);
        expect(payload.ref_type).toEqual(GithubCreateEventPayload.REF_TYPE_REPOSITORY);
        expect(payload.master_branch).toEqual(raw.payload.master_branch);
        expect(payload.description).toEqual(raw.payload.description);
        expect(payload.pusher_type).toEqual(raw.payload.pusher_type);
      });
    });

    it("should be deserialized the given event contains the ref_type as tag", () => {
      let raw = SampleResources.createEventTag1;
      let createEvent = GithubCreateEvent.deserialize(GithubCreateEvent, raw);

      expect(createEvent.event_id).toEqual(raw.id);
      expect(createEvent.event_type).toEqual(raw.type);
      expect(createEvent.event_type).toEqual(GithubCreateEvent.EVENT_TYPE);
      expect(createEvent.actor).toEqual(raw.actor.login);
      expect(createEvent.repo).toEqual(raw.repo.name);
      expect(createEvent.created_at).toEqual(raw.created_at);

      let payload = createEvent.payload;

      expect(payload.ref).toEqual(raw.payload.ref);
      expect(payload.ref_type).toEqual(raw.payload.ref_type);
      expect(payload.ref_type).toEqual(GithubCreateEventPayload.REF_TYPE_TAG);
      expect(payload.master_branch).toEqual(raw.payload.master_branch);
      expect(payload.description).toEqual(raw.payload.description);
      expect(payload.pusher_type).toEqual(raw.payload.pusher_type);
    });
  });
});

