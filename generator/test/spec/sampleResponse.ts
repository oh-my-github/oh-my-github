/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />


export class SampleResources {

  /**
   * sampleActivities1 (4) + sampleActivities2 (4) = 7 (shared 1 activity)
   * sampleActivities1 (4) + sampleActivities3 (4) = 8 (no shared activity)
   * sampleActivities2 (4) + sampleActivities3 (4) = 5 (shared 3 shared activity)
   */
  static sampleActivities1 = [
    {
      "payload": {
        "ref": "0.4.0-jar-replace",
        "ref_type": "tag",
        "master_branch": "master",
        "description": "",
        "pusher_type": "user"
      },
      "event_id": "3513135974",
      "event_type": "CreateEvent",
      "created_at": "2016-01-11T08:43:18Z",
      "actor": "1ambda",
      "repo": "skpdi/rake-android"
    },
    {
      "payload": {
        "ref": "0.4.1",
        "ref_type": "tag",
        "master_branch": "master",
        "description": "",
        "pusher_type": "user"
      },
      "event_id": "3513135973",
      "event_type": "CreateEvent",
      "created_at": "2016-01-11T08:43:18Z",
      "actor": "1ambda",
      "repo": "skpdi/rake-android"
    },
    {
      "payload": {
        "push_id": 929703223,
        "size": 2,
        "distinct_size": 2,
        "ref": "refs/heads/master",
        "head": "d57ba37c7d980e600e9e4698c9264972c8eed18f",
        "before": "13b66a7b7515109068d61d3284fef93f5fdc2e7a",
        "commit_urls": [
          "https://github.com/oh-my-github/generator/commit/ada68e000ffd64b5b8056e54a31448d14479ed56",
          "https://github.com/oh-my-github/generator/commit/d57ba37c7d980e600e9e4698c9264972c8eed18f"
        ]
      },
      "event_id": "3513132265",
      "event_type": "PushEvent",
      "created_at": "2016-01-11T08:41:44Z",
      "actor": "1ambda",
      "repo": "skpdi/rake-android"
    },
    {
      "payload": {
        "push_id": 929688703,
        "size": 34,
        "distinct_size": 1,
        "ref": "refs/heads/master",
        "head": "13b66a7b7515109068d61d3284fef93f5fdc2e7a",
        "before": "c7301390e53c5dcf64819f027b9f10ea0cd6eea3",
        "commit_urls": [
          "https://github.com/oh-my-github/generator/commit/856e6fcb951cb5c955b5a05d7dd594491556e6b2",
          "https://github.com/oh-my-github/generator/commit/c77c05677526fc4da2f9e0f5675fd055c5f88dd6"
        ]
      },
      "event_id": "3513095439",
      "event_type": "PushEvent",
      "created_at": "2016-01-11T08:24:40Z",
      "actor": "1ambda",
      "repo": "skpdi/rake-android"
    }
  ];

  static sampleActivities2 = [
    {
      "payload": {
        "push_id": 929688703,
        "size": 34,
        "distinct_size": 1,
        "ref": "refs/heads/master",
        "head": "13b66a7b7515109068d61d3284fef93f5fdc2e7a",
        "before": "c7301390e53c5dcf64819f027b9f10ea0cd6eea3",
        "commit_urls": [
          "https://github.com/oh-my-github/generator/commit/856e6fcb951cb5c955b5a05d7dd594491556e6b2",
          "https://github.com/oh-my-github/generator/commit/c77c05677526fc4da2f9e0f5675fd055c5f88dd6"
        ]
      },
      "event_id": "3513095439",
      "event_type": "PushEvent",
      "created_at": "2016-01-11T08:24:40Z",
      "actor": "1ambda",
      "repo": "skpdi/rake-android"
    },
    {
      "payload": {
        "push_id": 929688466,
        "size": 19,
        "distinct_size": 3,
        "ref": "refs/heads/develop",
        "head": "c618ff3e225e1f72b6184aed73411f45ee306889",
        "before": "0fd03010b31fbedc15897416427e8ad8145f8346",
        "commit_urls": [
          "https://github.com/oh-my-github/generator/commit/c6ec13ef5a713d40bd6cac957caa6b3ae5f159b6",
          "https://github.com/oh-my-github/generator/commit/77c90d2c988713b26e793785bfee422c12d0a151"
        ]
      },
      "event_id": "3513094761",
      "event_type": "PushEvent",
      "created_at": "2016-01-11T08:24:21Z",
      "actor": "1ambda",
      "repo": "skpdi/rake-android"
    },
    {
      "payload": {
        "push_id": 929514457,
        "size": 1,
        "distinct_size": 1,
        "ref": "refs/heads/master",
        "head": "d87c68e020eaca7f3f3a3d0562ccd365c70d9f14",
        "before": "ad94fc39a7e4d26b653d1fa3d9be413178c075e1",
        "commit_urls": [
          "https://github.com/oh-my-github/generator/commit/d87c68e020eaca7f3f3a3d0562ccd365c70d9f14"
        ]
      },
      "event_id": "3512661098",
      "event_type": "PushEvent",
      "created_at": "2016-01-11T03:37:49Z",
      "actor": "1ambda",
      "repo": "oh-my-github/generator"
    },
    {
      "payload": {
        "action": "opened",
        "issue_id": 125827766,
        "issue_number": 7,
        "issue_title": "Add all_event_types to meta",
        "issue_url": "https://github.com/oh-my-github/generator/issues/7"
      },
      "event_id": "3511830206",
      "event_type": "IssuesEvent",
      "created_at": "2016-01-10T15:59:35Z",
      "actor": "1ambda",
      "repo": "oh-my-github/generator"
    }
  ];

  static sampleActivities3 = [
    {
      "payload": {
        "push_id": 929688703,
        "size": 34,
        "distinct_size": 1,
        "ref": "refs/heads/master",
        "head": "13b66a7b7515109068d61d3284fef93f5fdc2e7a",
        "before": "c7301390e53c5dcf64819f027b9f10ea0cd6eea3",
        "commit_urls": [
          "https://github.com/oh-my-github/generator/commit/856e6fcb951cb5c955b5a05d7dd594491556e6b2",
          "https://github.com/oh-my-github/generator/commit/c77c05677526fc4da2f9e0f5675fd055c5f88dd6"
        ]
      },
      "event_id": "3513095430",
      "event_type": "PushEvent",
      "created_at": "2016-01-11T08:24:40Z",
      "actor": "1ambda",
      "repo": "skpdi/rake-android"
    },
    {
      "payload": {
        "push_id": 929688466,
        "size": 19,
        "distinct_size": 3,
        "ref": "refs/heads/develop",
        "head": "c618ff3e225e1f72b6184aed73411f45ee306889",
        "before": "0fd03010b31fbedc15897416427e8ad8145f8346",
        "commit_urls": [
          "https://github.com/oh-my-github/generator/commit/c6ec13ef5a713d40bd6cac957caa6b3ae5f159b6",
          "https://github.com/oh-my-github/generator/commit/77c90d2c988713b26e793785bfee422c12d0a151"
        ]
      },
      "event_id": "3513094761",
      "event_type": "PushEvent",
      "created_at": "2016-01-11T08:24:21Z",
      "actor": "1ambda",
      "repo": "skpdi/rake-android"
    },
    {
      "payload": {
        "push_id": 929514457,
        "size": 1,
        "distinct_size": 1,
        "ref": "refs/heads/master",
        "head": "d87c68e020eaca7f3f3a3d0562ccd365c70d9f14",
        "before": "ad94fc39a7e4d26b653d1fa3d9be413178c075e1",
        "commit_urls": [
          "https://github.com/oh-my-github/generator/commit/d87c68e020eaca7f3f3a3d0562ccd365c70d9f14"
        ]
      },
      "event_id": "3512661098",
      "event_type": "PushEvent",
      "created_at": "2016-01-11T03:37:49Z",
      "actor": "1ambda",
      "repo": "oh-my-github/generator"
    },
    {
      "payload": {
        "action": "opened",
        "issue_id": 125827766,
        "issue_number": 7,
        "issue_title": "Add all_event_types to meta",
        "issue_url": "https://github.com/oh-my-github/generator/issues/7"
      },
      "event_id": "3511830206",
      "event_type": "IssuesEvent",
      "created_at": "2016-01-10T15:59:35Z",
      "actor": "1ambda",
      "repo": "oh-my-github/generator"
    }
  ];

  static githubUser1 = {
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
    "site_admin": false,
    "name": "Hoon",
    "company": "Sungkyunkwan University",
    "blog": "http://1ambda.github.io",
    "location": "Republic of Korea",
    "email": "1amb4a@gmail.com",
    "hireable": true,
    "bio": null,
    "public_repos": 53,
    "public_gists": 42,
    "followers": 32,
    "following": 34,
    "created_at": "2013-07-08T22:03:28Z",
    "updated_at": "2015-12-26T16:43:27Z"
  };

  static languageObject1 = {
    "Scala": 5695455,
    "Java": 1495691,
    "HTML": 141830,
    "Shell": 30597,
    "JavaScript": 27425,
    "Protocol Buffer": 19875,
    "CSS": 19782,
    "Python": 9906,
    "Perl": 1356,
    "Batchfile": 287
  };

  static repository1 = {
    "id": 21211161,
    "name": "1ambda.github.io",
    "full_name": "1ambda/1ambda.github.io",
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
    "html_url": "https://github.com/1ambda/1ambda.github.io",
    "description": "",
    "fork": false,
    "url": "https://api.github.com/repos/1ambda/1ambda.github.io",
    "forks_url": "https://api.github.com/repos/1ambda/1ambda.github.io/forks",
    "keys_url": "https://api.github.com/repos/1ambda/1ambda.github.io/keys{/key_id}",
    "collaborators_url": "https://api.github.com/repos/1ambda/1ambda.github.io/collaborators{/collaborator}",
    "teams_url": "https://api.github.com/repos/1ambda/1ambda.github.io/teams",
    "hooks_url": "https://api.github.com/repos/1ambda/1ambda.github.io/hooks",
    "issue_events_url": "https://api.github.com/repos/1ambda/1ambda.github.io/issues/events{/number}",
    "events_url": "https://api.github.com/repos/1ambda/1ambda.github.io/events",
    "assignees_url": "https://api.github.com/repos/1ambda/1ambda.github.io/assignees{/user}",
    "branches_url": "https://api.github.com/repos/1ambda/1ambda.github.io/branches{/branch}",
    "tags_url": "https://api.github.com/repos/1ambda/1ambda.github.io/tags",
    "blobs_url": "https://api.github.com/repos/1ambda/1ambda.github.io/git/blobs{/sha}",
    "git_tags_url": "https://api.github.com/repos/1ambda/1ambda.github.io/git/tags{/sha}",
    "git_refs_url": "https://api.github.com/repos/1ambda/1ambda.github.io/git/refs{/sha}",
    "trees_url": "https://api.github.com/repos/1ambda/1ambda.github.io/git/trees{/sha}",
    "statuses_url": "https://api.github.com/repos/1ambda/1ambda.github.io/statuses/{sha}",
    "languages_url": "https://api.github.com/repos/1ambda/1ambda.github.io/languages",
    "stargazers_url": "https://api.github.com/repos/1ambda/1ambda.github.io/stargazers",
    "contributors_url": "https://api.github.com/repos/1ambda/1ambda.github.io/contributors",
    "subscribers_url": "https://api.github.com/repos/1ambda/1ambda.github.io/subscribers",
    "subscription_url": "https://api.github.com/repos/1ambda/1ambda.github.io/subscription",
    "commits_url": "https://api.github.com/repos/1ambda/1ambda.github.io/commits{/sha}",
    "git_commits_url": "https://api.github.com/repos/1ambda/1ambda.github.io/git/commits{/sha}",
    "comments_url": "https://api.github.com/repos/1ambda/1ambda.github.io/comments{/number}",
    "issue_comment_url": "https://api.github.com/repos/1ambda/1ambda.github.io/issues/comments{/number}",
    "contents_url": "https://api.github.com/repos/1ambda/1ambda.github.io/contents/{+path}",
    "compare_url": "https://api.github.com/repos/1ambda/1ambda.github.io/compare/{base}...{head}",
    "merges_url": "https://api.github.com/repos/1ambda/1ambda.github.io/merges",
    "archive_url": "https://api.github.com/repos/1ambda/1ambda.github.io/{archive_format}{/ref}",
    "downloads_url": "https://api.github.com/repos/1ambda/1ambda.github.io/downloads",
    "issues_url": "https://api.github.com/repos/1ambda/1ambda.github.io/issues{/number}",
    "pulls_url": "https://api.github.com/repos/1ambda/1ambda.github.io/pulls{/number}",
    "milestones_url": "https://api.github.com/repos/1ambda/1ambda.github.io/milestones{/number}",
    "notifications_url": "https://api.github.com/repos/1ambda/1ambda.github.io/notifications{?since,all,participating}",
    "labels_url": "https://api.github.com/repos/1ambda/1ambda.github.io/labels{/name}",
    "releases_url": "https://api.github.com/repos/1ambda/1ambda.github.io/releases{/id}",
    "created_at": "2014-06-25T16:54:33Z",
    "updated_at": "2015-12-31T02:32:52Z",
    "pushed_at": "2015-12-18T15:46:37Z",
    "git_url": "git://github.com/1ambda/1ambda.github.io.git",
    "ssh_url": "git@github.com:1ambda/1ambda.github.io.git",
    "clone_url": "https://github.com/1ambda/1ambda.github.io.git",
    "svn_url": "https://github.com/1ambda/1ambda.github.io",
    "homepage": "http://1ambda.github.com",
    "size": 57968,
    "stargazers_count": 6,
    "watchers_count": 6,
    "language": "HTML",
    "has_issues": true,
    "has_downloads": true,
    "has_wiki": true,
    "has_pages": true,
    "forks_count": 0,
    "mirror_url": null,
    "open_issues_count": 1,
    "forks": 0,
    "open_issues": 1,
    "watchers": 6,
    "default_branch": "master"
  };

  static releaseEvent1 = {
    "id": "3487658096",
    "type": "ReleaseEvent",
    "actor": {
      "id": 4968473,
      "login": "1ambda",
      "gravatar_id": "",
      "url": "https://api.github.com/users/1ambda",
      "avatar_url": "https://avatars.githubusercontent.com/u/4968473?"
    },
    "repo": {
      "id": 41334579,
      "name": "oh-my-github/datacow",
      "url": "https://api.github.com/repos/oh-my-github/datacow"
    },
    "payload": {
      "action": "published",
      "release": {
        "url": "https://api.github.com/repos/oh-my-github/datacow/releases/2362432",
        "assets_url": "https://api.github.com/repos/oh-my-github/datacow/releases/2362432/assets",
        "upload_url": "https://uploads.github.com/repos/oh-my-github/datacow/releases/2362432/assets{?name,label}",
        "html_url": "https://github.com/oh-my-github/datacow/releases/tag/0.0.1",
        "id": 2362432,
        "tag_name": "0.0.1",
        "target_commitish": "master",
        "name": "example release",
        "draft": false,
        "author": {
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
        "prerelease": true,
        "created_at": "2015-09-25T14:38:23Z",
        "published_at": "2016-01-02T04:39:46Z",
        "assets": [],
        "tarball_url": "https://api.github.com/repos/oh-my-github/datacow/tarball/0.0.1",
        "zipball_url": "https://api.github.com/repos/oh-my-github/datacow/zipball/0.0.1",
        "body": ""
      }
    },
    "public": true,
    "created_at": "2016-01-02T04:39:46Z",
    "org": {
      "id": 13924389,
      "login": "oh-my-github",
      "gravatar_id": "",
      "url": "https://api.github.com/orgs/oh-my-github",
      "avatar_url": "https://avatars.githubusercontent.com/u/13924389?"
    }
  };

  static createEventTag1 = {
    "id": "3487658099",
    "type": "CreateEvent",
    "actor": {
      "id": 4968473,
      "login": "1ambda",
      "gravatar_id": "",
      "url": "https://api.github.com/users/1ambda",
      "avatar_url": "https://avatars.githubusercontent.com/u/4968473?"
    },
    "repo": {
      "id": 41334579,
      "name": "oh-my-github/datacow",
      "url": "https://api.github.com/repos/oh-my-github/datacow"
    },
    "payload": {
      "ref": "0.0.1",
      "ref_type": "tag",
      "master_branch": "master",
      "description": "",
      "pusher_type": "user"
    },
    "public": true,
    "created_at": "2016-01-02T04:39:46Z",
    "org": {
      "id": 13924389,
      "login": "oh-my-github",
      "gravatar_id": "",
      "url": "https://api.github.com/orgs/oh-my-github",
      "avatar_url": "https://avatars.githubusercontent.com/u/13924389?"
    }
  };

  static createEventRepository1 = {
    "id": "3475024447",
    "type": "CreateEvent",
    "actor": {
      "id": 7614353,
      "login": "njir",
      "gravatar_id": "",
      "url": "https://api.github.com/users/njir",
      "avatar_url": "https://avatars.githubusercontent.com/u/7614353?"
    },
    "repo": {
      "id": 48573189,
      "name": "njir/spring_udemy",
      "url": "https://api.github.com/repos/njir/spring_udemy"
    },
    "payload": {
      "ref": null,
      "ref_type": "repository",
      "master_branch": "master",
      "description": "spring project on udemy",
      "pusher_type": "user"
    },
    "public": true,
    "created_at": "2015-12-25T08:27:13Z"
  };

  static createEventBranch1 = {
    "id": "3486991613",
    "type": "CreateEvent",
    "actor": {
      "id": 4968473,
      "login": "1ambda",
      "gravatar_id": "",
      "url": "https://api.github.com/users/1ambda",
      "avatar_url": "https://avatars.githubusercontent.com/u/4968473?"
    },
    "repo": {
      "id": 48599725,
      "name": "1ambda/cerialize",
      "url": "https://api.github.com/repos/1ambda/cerialize"
    },
    "payload": {
      "ref": "supporrt-OnDeserialized-for-subclassing",
      "ref_type": "branch",
      "master_branch": "master",
      "description": "Easy serialization through ES7/Typescript annotations",
      "pusher_type": "user"
    },
    "public": true,
    "created_at": "2016-01-01T10:28:51Z"
  };

  static forkEvent1 = {
    "id": "3475819128",
    "type": "ForkEvent",
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
      "forkee": {
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
        "pushed_at": "2015-12-09T15:46:08Z",
        "git_url": "git://github.com/1ambda/cerialize.git",
        "ssh_url": "git@github.com:1ambda/cerialize.git",
        "clone_url": "https://github.com/1ambda/cerialize.git",
        "svn_url": "https://github.com/1ambda/cerialize",
        "homepage": null,
        "size": 69,
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
        "default_branch": "master",
        "public": true
      }
    },
    "public": true,
    "created_at": "2015-12-26T04:47:20Z"
  };

  static repositoryEvent1 = {
    "id": "3485516586",
    "type": "RepositoryEvent",
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
    "created_at": "2015-12-31T07:51:50Z",
    "payload": {
      "action": "created",
      "repository": {
        "id": 27496774,
        "name": "new-repository",
        "full_name": "baxterandthehackers/new-repository",
        "owner": {
          "login": "baxterandthehackers",
          "id": 7649605,
          "avatar_url": "https://avatars.githubusercontent.com/u/7649605?v=3",
          "gravatar_id": "",
          "url": "https://api.github.com/users/baxterandthehackers",
          "html_url": "https://github.com/baxterandthehackers",
          "followers_url": "https://api.github.com/users/baxterandthehackers/followers",
          "following_url": "https://api.github.com/users/baxterandthehackers/following{/other_user}",
          "gists_url": "https://api.github.com/users/baxterandthehackers/gists{/gist_id}",
          "starred_url": "https://api.github.com/users/baxterandthehackers/starred{/owner}{/repo}",
          "subscriptions_url": "https://api.github.com/users/baxterandthehackers/subscriptions",
          "organizations_url": "https://api.github.com/users/baxterandthehackers/orgs",
          "repos_url": "https://api.github.com/users/baxterandthehackers/repos",
          "events_url": "https://api.github.com/users/baxterandthehackers/events{/privacy}",
          "received_events_url": "https://api.github.com/users/baxterandthehackers/received_events",
          "type": "Organization",
          "site_admin": false
        },
        "private": true,
        "html_url": "https://github.com/baxterandthehackers/new-repository",
        "description": "",
        "fork": false,
        "url": "https://api.github.com/repos/baxterandthehackers/new-repository",
        "forks_url": "https://api.github.com/repos/baxterandthehackers/new-repository/forks",
        "keys_url": "https://api.github.com/repos/baxterandthehackers/new-repository/keys{/key_id}",
        "collaborators_url": "https://api.github.com/repos/baxterandthehackers/new-repository/collaborators{/collaborator}",
        "teams_url": "https://api.github.com/repos/baxterandthehackers/new-repository/teams",
        "hooks_url": "https://api.github.com/repos/baxterandthehackers/new-repository/hooks",
        "issue_events_url": "https://api.github.com/repos/baxterandthehackers/new-repository/issues/events{/number}",
        "events_url": "https://api.github.com/repos/baxterandthehackers/new-repository/events",
        "assignees_url": "https://api.github.com/repos/baxterandthehackers/new-repository/assignees{/user}",
        "branches_url": "https://api.github.com/repos/baxterandthehackers/new-repository/branches{/branch}",
        "tags_url": "https://api.github.com/repos/baxterandthehackers/new-repository/tags",
        "blobs_url": "https://api.github.com/repos/baxterandthehackers/new-repository/git/blobs{/sha}",
        "git_tags_url": "https://api.github.com/repos/baxterandthehackers/new-repository/git/tags{/sha}",
        "git_refs_url": "https://api.github.com/repos/baxterandthehackers/new-repository/git/refs{/sha}",
        "trees_url": "https://api.github.com/repos/baxterandthehackers/new-repository/git/trees{/sha}",
        "statuses_url": "https://api.github.com/repos/baxterandthehackers/new-repository/statuses/{sha}",
        "languages_url": "https://api.github.com/repos/baxterandthehackers/new-repository/languages",
        "stargazers_url": "https://api.github.com/repos/baxterandthehackers/new-repository/stargazers",
        "contributors_url": "https://api.github.com/repos/baxterandthehackers/new-repository/contributors",
        "subscribers_url": "https://api.github.com/repos/baxterandthehackers/new-repository/subscribers",
        "subscription_url": "https://api.github.com/repos/baxterandthehackers/new-repository/subscription",
        "commits_url": "https://api.github.com/repos/baxterandthehackers/new-repository/commits{/sha}",
        "git_commits_url": "https://api.github.com/repos/baxterandthehackers/new-repository/git/commits{/sha}",
        "comments_url": "https://api.github.com/repos/baxterandthehackers/new-repository/comments{/number}",
        "issue_comment_url": "https://api.github.com/repos/baxterandthehackers/new-repository/issues/comments/{number}",
        "contents_url": "https://api.github.com/repos/baxterandthehackers/new-repository/contents/{+path}",
        "compare_url": "https://api.github.com/repos/baxterandthehackers/new-repository/compare/{base}...{head}",
        "merges_url": "https://api.github.com/repos/baxterandthehackers/new-repository/merges",
        "archive_url": "https://api.github.com/repos/baxterandthehackers/new-repository/{archive_format}{/ref}",
        "downloads_url": "https://api.github.com/repos/baxterandthehackers/new-repository/downloads",
        "issues_url": "https://api.github.com/repos/baxterandthehackers/new-repository/issues{/number}",
        "pulls_url": "https://api.github.com/repos/baxterandthehackers/new-repository/pulls{/number}",
        "milestones_url": "https://api.github.com/repos/baxterandthehackers/new-repository/milestones{/number}",
        "notifications_url": "https://api.github.com/repos/baxterandthehackers/new-repository/notifications{?since,all,participating}",
        "labels_url": "https://api.github.com/repos/baxterandthehackers/new-repository/labels{/name}",
        "releases_url": "https://api.github.com/repos/baxterandthehackers/new-repository/releases{/id}",
        "created_at": "2014-12-03T16:39:25Z",
        "updated_at": "2014-12-03T16:39:25Z",
        "pushed_at": "2014-12-03T16:39:25Z",
        "git_url": "git://github.com/baxterandthehackers/new-repository.git",
        "ssh_url": "git@github.com:baxterandthehackers/new-repository.git",
        "clone_url": "https://github.com/baxterandthehackers/new-repository.git",
        "svn_url": "https://github.com/baxterandthehackers/new-repository",
        "homepage": null,
        "size": 0,
        "stargazers_count": 0,
        "watchers_count": 0,
        "language": null,
        "has_issues": true,
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
      },
      "organization": {
        "login": "baxterandthehackers",
        "id": 7649605,
        "url": "https://api.github.com/orgs/baxterandthehackers",
        "repos_url": "https://api.github.com/orgs/baxterandthehackers/repos",
        "events_url": "https://api.github.com/orgs/baxterandthehackers/events",
        "members_url": "https://api.github.com/orgs/baxterandthehackers/members{/member}",
        "public_members_url": "https://api.github.com/orgs/baxterandthehackers/public_members{/member}",
        "avatar_url": "https://avatars.githubusercontent.com/u/7649605?v=2"
      },
      "sender": {
        "login": "baxterthehacker",
        "id": 6752317,
        "avatar_url": "https://avatars.githubusercontent.com/u/6752317?v=2",
        "gravatar_id": "",
        "url": "https://api.github.com/users/baxterthehacker",
        "html_url": "https://github.com/baxterthehacker",
        "followers_url": "https://api.github.com/users/baxterthehacker/followers",
        "following_url": "https://api.github.com/users/baxterthehacker/following{/other_user}",
        "gists_url": "https://api.github.com/users/baxterthehacker/gists{/gist_id}",
        "starred_url": "https://api.github.com/users/baxterthehacker/starred{/owner}{/repo}",
        "subscriptions_url": "https://api.github.com/users/baxterthehacker/subscriptions",
        "organizations_url": "https://api.github.com/users/baxterthehacker/orgs",
        "repos_url": "https://api.github.com/users/baxterthehacker/repos",
        "events_url": "https://api.github.com/users/baxterthehacker/events{/privacy}",
        "received_events_url": "https://api.github.com/users/baxterthehacker/received_events",
        "type": "User",
        "site_admin": false
      }
    }
  };

  static watchEvent1 = {
    "id": "3485510857",
    "type": "WatchEvent",
    "actor": {
      "id": 4968473,
      "login": "1ambda",
      "gravatar_id": "",
      "url": "https://api.github.com/users/1ambda",
      "avatar_url": "https://avatars.githubusercontent.com/u/4968473?"
    },
    "repo": {
      "id": 48739249,
      "name": "remixz/run-js",
      "url": "https://api.github.com/repos/remixz/run-js"
    },
    "payload": {
      "action": "started"
    },
    "public": true,
    "created_at": "2015-12-31T07:51:50Z"
  };


  static issuesEvent1 = {
    "id": "3485566586",
    "type": "IssuesEvent",
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
      "action": "opened",
      "issue": {
        "url": "https://api.github.com/repos/oh-my-github/generator/issues/2",
        "labels_url": "https://api.github.com/repos/oh-my-github/generator/issues/2/labels{/name}",
        "comments_url": "https://api.github.com/repos/oh-my-github/generator/issues/2/comments",
        "events_url": "https://api.github.com/repos/oh-my-github/generator/issues/2/events",
        "html_url": "https://github.com/oh-my-github/generator/issues/2",
        "id": 124448241,
        "number": 2,
        "title": "Expose runnable (e.g index.js)",
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
        "labels": [
          {
            "url": "https://api.github.com/repos/oh-my-github/generator/labels/feature",
            "name": "feature",
            "color": "159818"
          }
        ],
        "state": "open",
        "locked": false,
        "assignee": {
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
        "milestone": null,
        "comments": 0,
        "created_at": "2015-12-31T08:41:08Z",
        "updated_at": "2015-12-31T08:41:08Z",
        "closed_at": null,
        "body": ""
      }
    },
    "public": true,
    "created_at": "2015-12-31T08:41:08Z",
    "org": {
      "id": 13924389,
      "login": "oh-my-github",
      "gravatar_id": "",
      "url": "https://api.github.com/orgs/oh-my-github",
      "avatar_url": "https://avatars.githubusercontent.com/u/13924389?"
    }
  };

  static issueCommentEvent1 = {
    "id": "3487031212",
    "type": "IssueCommentEvent",
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
      "action": "created",
      "issue": {
        "url": "https://api.github.com/repos/oh-my-github/generator/issues/1",
        "labels_url": "https://api.github.com/repos/oh-my-github/generator/issues/1/labels{/name}",
        "comments_url": "https://api.github.com/repos/oh-my-github/generator/issues/1/comments",
        "events_url": "https://api.github.com/repos/oh-my-github/generator/issues/1/events",
        "html_url": "https://github.com/oh-my-github/generator/issues/1",
        "id": 124236660,
        "number": 1,
        "title": "Collect user activities (events)",
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
        "labels": [
          {
            "url": "https://api.github.com/repos/oh-my-github/generator/labels/feature",
            "name": "feature",
            "color": "159818"
          }
        ],
        "state": "open",
        "locked": false,
        "assignee": {
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
        "milestone": null,
        "comments": 2,
        "created_at": "2015-12-29T16:44:32Z",
        "updated_at": "2016-01-01T11:56:59Z",
        "closed_at": null,
        "body": ""
      },
      "comment": {
        "url": "https://api.github.com/repos/oh-my-github/generator/issues/comments/168303278",
        "html_url": "https://github.com/oh-my-github/generator/issues/1#issuecomment-168303278",
        "issue_url": "https://api.github.com/repos/oh-my-github/generator/issues/1",
        "id": 168303278,
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
        "created_at": "2016-01-01T11:56:59Z",
        "updated_at": "2016-01-01T11:56:59Z",
        "body": "- Push\r\n- PullRequestEvent (current domain model requires https://github.com/weichx/cerialize/pull/15 to be merged)\r\n\r\nAnd then,\r\n\r\n- IssuesEvent\r\n- IssueCommentEvent\r\n- Release"
      }
    },
    "public": true,
    "created_at": "2016-01-01T11:56:59Z",
    "org": {
      "id": 13924389,
      "login": "oh-my-github",
      "gravatar_id": "",
      "url": "https://api.github.com/orgs/oh-my-github",
      "avatar_url": "https://avatars.githubusercontent.com/u/13924389?"
    }
  };

  public static pullRequestEvent1 = {
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

  public static pushEvent1 = {
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

  public static command1 = { commands:
    [ { commands: new Array<any>(),
      options: new Array<any>(),
      _execs: {},
      _allowUnknownOption: false,
      _args: new Array<string>(),
      _name: 'profile',
      _noHelp: false,
      parent: new Array<any>(),
      _description: 'get github profile using the provided token',
      _events: {},
      _eventsCount: 2 },
      { commands: new Array<any>(),
        options: new Array<any>(),
        _execs: {},
        _allowUnknownOption: false,
        _args: new Array<string>(),
        _name: 'exec',
        _noHelp: false,
        parent: new Array<any>(),
        _alias: 'ex',
        _description: 'execute the given remote cmd',
        _events: {},
        _eventsCount: 2 } ],
    options:
      [ { flags: '-V, --version',
        required: 0,
        optional: 0,
        bool: true,
        short: '-V',
        long: '--version',
        description: 'output the version number' },
        { flags: '-C, --chdir <path>',
          required: -13,
          optional: 0,
          bool: true,
          short: '-C',
          long: '--chdir',
          description: 'change the working directory' },
        { flags: '-c, --config <path>',
          required: -14,
          optional: 0,
          bool: true,
          short: '-c',
          long: '--config',
          description: 'set config path. defaults to ./deploy.conf' },
        { flags: '-T, --no-tests',
          required: 0,
          optional: 0,
          bool: false,
          short: '-T',
          long: '--no-tests',
          description: 'ignore test hook' } ],
    _execs: {},
    _allowUnknownOption: false,
    _args: new Array<string>(),
    _name: 'gulp',
    _version: '0.0.1',
    _events: { version: new Array<string>() },
    _eventsCount: 7,
    tests: true,
    rawArgs:
      [ '/Users/1ambda/.nvm/versions/node/v5.2.0/bin/node',
        '/Users/1ambda/.nvm/versions/node/v5.2.0/bin/gulp',
        'con-test' ],
    args: [ 'con-test' ]
  };
}
