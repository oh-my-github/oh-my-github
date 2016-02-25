/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
"use strict";

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = (0, _getOwnPropertyDescriptor2.default)(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && (0, _defineProperty2.default)(target, key, r), r;
};
var serialize_1 = require("./serialize");
var util_1 = require("./util");
var _ = require("lodash");

var GithubUser = function (_serialize_1$Deserial) {
    (0, _inherits3.default)(GithubUser, _serialize_1$Deserial);

    function GithubUser() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, GithubUser);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(GithubUser)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.login = null;
        _this.type = null;
        _this.name = null;
        _this.avatar_url = null;
        _this.company = null;
        _this.blog = null;
        _this.location = null;
        _this.email = null;
        _this.hireable = null;
        _this.following = null;
        _this.followers = null;
        _this.public_repos = null;
        _this.public_gists = null;
        _this.created_at = null;
        _this.updated_at = null;
        _this.url = null;
        return _this;
    }

    return GithubUser;
}(serialize_1.Deserializable);

__decorate([serialize_1.deserialize], GithubUser.prototype, "login", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "type", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "name", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "avatar_url", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "company", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "blog", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "location", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "email", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "hireable", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "following", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "followers", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "public_repos", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "public_gists", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "created_at", void 0);
__decorate([serialize_1.deserialize], GithubUser.prototype, "updated_at", void 0);
__decorate([serialize_1.deserializeAs("html_url")], GithubUser.prototype, "url", void 0);
exports.GithubUser = GithubUser;

var Language = function (_serialize_1$Deserial2) {
    (0, _inherits3.default)(Language, _serialize_1$Deserial2);

    function Language() {
        var _Object$getPrototypeO2;

        (0, _classCallCheck3.default)(this, Language);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO2 = (0, _getPrototypeOf2.default)(Language)).call.apply(_Object$getPrototypeO2, [this].concat(args)));

        _this2.name = null;
        _this2.line = null;
        return _this2;
    }

    return Language;
}(serialize_1.Deserializable);

__decorate([serialize_1.deserialize], Language.prototype, "name", void 0);
__decorate([serialize_1.deserialize], Language.prototype, "line", void 0);
exports.Language = Language;

var LanguageInformation = function (_serialize_1$Deserial3) {
    (0, _inherits3.default)(LanguageInformation, _serialize_1$Deserial3);

    function LanguageInformation() {
        (0, _classCallCheck3.default)(this, LanguageInformation);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(LanguageInformation).apply(this, arguments));
    }

    (0, _createClass3.default)(LanguageInformation, null, [{
        key: "OnDeserialized",

        /** used to deserialize Github API response */
        value: function OnDeserialized(instance, json) {
            if (!_.isEmpty(json.langObject)) {
                instance.languages = LanguageInformation.createLanguages(json.langObject);
            }
        }
        /** since Github API returns languages as object not array, we need a factory method */

    }, {
        key: "createLanguages",
        value: function createLanguages(body) {
            var langs = new Array();
            if (_.isEmpty(body)) return langs;
            _.forOwn(body, function (value, key) {
                var l = new Language();
                l.name = key;
                l.line = value;
                langs.push(l);
            });
            return langs;
        }
    }]);
    return LanguageInformation;
}(serialize_1.Deserializable);

__decorate([serialize_1.deserialize], LanguageInformation.prototype, "owner", void 0);
__decorate([serialize_1.deserialize], LanguageInformation.prototype, "repo_name", void 0);
__decorate([serialize_1.deserialize], LanguageInformation.prototype, "url", void 0);
__decorate([serialize_1.deserializeAs(Language)], LanguageInformation.prototype, "languages", void 0);
exports.LanguageInformation = LanguageInformation;

var Repository = function (_serialize_1$Deserial4) {
    (0, _inherits3.default)(Repository, _serialize_1$Deserial4);

    function Repository() {
        (0, _classCallCheck3.default)(this, Repository);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(Repository).apply(this, arguments));
    }

    return Repository;
}(serialize_1.Deserializable);

__decorate([serialize_1.deserialize], Repository.prototype, "name", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "description", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "full_name", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "fork", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "forks_count", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "stargazers_count", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "watchers_count", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "language", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "open_issues_count", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "default_branch", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "created_at", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "updated_at", void 0);
__decorate([serialize_1.deserialize], Repository.prototype, "pushed_at", void 0);
__decorate([serialize_1.deserializeAs("html_url")], Repository.prototype, "url", void 0);
exports.Repository = Repository;

var RepositorySummary = function RepositorySummary() {
    (0, _classCallCheck3.default)(this, RepositorySummary);

    this.repository_names = new Array();
    this.repository_count = 0;
    this.forks_count = 0;
    this.stargazers_count = 0;
    this.watchers_count = 0;
};

exports.RepositorySummary = RepositorySummary;

var LanguageSummary = function () {
    function LanguageSummary(owner, langauge_lines) {
        (0, _classCallCheck3.default)(this, LanguageSummary);

        this.owner = owner;
        this.langauge_lines = langauge_lines;
    }

    (0, _createClass3.default)(LanguageSummary, [{
        key: "getLangaugeCount",
        value: function getLangaugeCount() {
            return this.langauge_lines.size;
        }
    }, {
        key: "getLanguageObject",
        value: function getLanguageObject() {
            var langObj = new Object();
            this.langauge_lines.forEach(function (line, name) {
                langObj[name] = line;
            });
            return langObj;
        }
    }]);
    return LanguageSummary;
}();

exports.LanguageSummary = LanguageSummary;

var GithubEvent = function (_serialize_1$Deserial5) {
    (0, _inherits3.default)(GithubEvent, _serialize_1$Deserial5);

    function GithubEvent() {
        (0, _classCallCheck3.default)(this, GithubEvent);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GithubEvent).apply(this, arguments));
    }

    (0, _createClass3.default)(GithubEvent, null, [{
        key: "OnDeserialized",
        value: function OnDeserialized(instance, json) {
            if (!_.isEmpty(json) && !_.isEmpty(json.actor)) instance.actor = json.actor.login;
            if (!_.isEmpty(json) && !_.isEmpty(json.repo)) instance.repo = json.repo.name;
        }
        /** concat and remove duplicated activities by filtering out using event_id */

    }, {
        key: "mergeByEventId",
        value: function mergeByEventId(es1, es2) {
            if (_.isEmpty(es1) && _.isEmpty(es2)) return new Array();
            var events1 = util_1.Util.copyObject(es1);
            var events2 = util_1.Util.copyObject(es2);
            var uniq = util_1.Util.unionBy(events1, events2, function (event) {
                return event.event_id;
            });
            return uniq;
        }
    }, {
        key: "deserializeGithubEvent",
        value: function deserializeGithubEvent(events) {
            /**
             * TODO: GollumEvent, DeleteEvent, CommitCommentEvent
             */
            var droppedEvents = new Array();
            var deserializedEvents = events.map(function (e) {
                switch (e.type) {
                    case GithubPushEvent.EVENT_TYPE:
                        return GithubPushEvent.deserialize(GithubPushEvent, e);
                    case GithubPullRequestEvent.EVENT_TYPE:
                        return GithubPullRequestEvent.deserialize(GithubPullRequestEvent, e);
                    case GithubIssuesEvent.EVENT_TYPE:
                        return GithubIssuesEvent.deserialize(GithubIssuesEvent, e);
                    case GithubIssueCommentEvent.EVENT_TYPE:
                        return GithubIssueCommentEvent.deserialize(GithubIssueCommentEvent, e);
                    case GithubWatchEvent.EVENT_TYPE:
                        return GithubWatchEvent.deserialize(GithubWatchEvent, e);
                    case GithubForkEvent.EVENT_TYPE:
                        return GithubForkEvent.deserialize(GithubForkEvent, e);
                    case GithubReleaseEvent.EVENT_TYPE:
                        return GithubReleaseEvent.deserialize(GithubReleaseEvent, e);
                    case GithubCreateEvent.EVENT_TYPE:
                        return GithubCreateEvent.deserialize(GithubCreateEvent, e);
                    default:
                        droppedEvents.push(e.type);
                        return null;
                }
            });
            // TODO print profile
            if (droppedEvents.length > 0) {
                var uniq = (0, _from2.default)(new _set2.default(droppedEvents)).join(", ");
                util_1.Log.warn("dropped events (" + droppedEvents.length + "): " + uniq);
            }
            return deserializedEvents.filter(function (e) {
                return e !== null;
            });
        }
    }]);
    return GithubEvent;
}(serialize_1.Deserializable);

__decorate([serialize_1.deserializeAs("id")], GithubEvent.prototype, "event_id", void 0);
__decorate([serialize_1.deserializeAs("type")], GithubEvent.prototype, "type", void 0);
__decorate([serialize_1.deserializeAs("created_at")], GithubEvent.prototype, "created_at", void 0);
exports.GithubEvent = GithubEvent;

var GithubPushEventPayload = function () {
    function GithubPushEventPayload() {
        (0, _classCallCheck3.default)(this, GithubPushEventPayload);
    }

    (0, _createClass3.default)(GithubPushEventPayload, null, [{
        key: "OnDeserialized",
        value: function OnDeserialized(instance, payload) {
            if (_.isEmpty(payload)) return;
            if (!_.isEmpty(payload.commits) && Array.isArray(payload.commits)) instance.commit_shas = payload.commits.map(function (c) {
                return c.sha;
            });
        }
    }]);
    return GithubPushEventPayload;
}();

GithubPushEventPayload.COMMIT_URI_PREFIX = "https://github.com/oh-my-github/generator/commit/";
__decorate([serialize_1.deserializeAs("push_id")], GithubPushEventPayload.prototype, "push_id", void 0);
__decorate([serialize_1.deserializeAs("size")], GithubPushEventPayload.prototype, "size", void 0);
__decorate([serialize_1.deserializeAs("distinct_size")], GithubPushEventPayload.prototype, "distinct_size", void 0);
__decorate([serialize_1.deserializeAs("ref")], GithubPushEventPayload.prototype, "ref", void 0);
__decorate([serialize_1.deserializeAs("head")], GithubPushEventPayload.prototype, "head", void 0);
__decorate([serialize_1.deserializeAs("before")], GithubPushEventPayload.prototype, "before", void 0);
exports.GithubPushEventPayload = GithubPushEventPayload;
var GithubPushEvent = function (_GithubEvent) {
    (0, _inherits3.default)(GithubPushEvent, _GithubEvent);

    function GithubPushEvent() {
        (0, _classCallCheck3.default)(this, GithubPushEvent);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GithubPushEvent).apply(this, arguments));
    }

    return GithubPushEvent;
}(GithubEvent);
GithubPushEvent.EVENT_TYPE = "PushEvent";
__decorate([serialize_1.deserializeAs(GithubPushEventPayload, "payload")], GithubPushEvent.prototype, "payload", void 0);
GithubPushEvent = __decorate([serialize_1.inheritSerialization(GithubEvent)], GithubPushEvent);
exports.GithubPushEvent = GithubPushEvent;

var GithubPullRequestEventPayload = function () {
    function GithubPullRequestEventPayload() {
        (0, _classCallCheck3.default)(this, GithubPullRequestEventPayload);
    }

    (0, _createClass3.default)(GithubPullRequestEventPayload, null, [{
        key: "OnDeserialized",
        value: function OnDeserialized(instance, payload) {
            if (_.isEmpty(payload)) return;
            if (!_.isEmpty(payload.pull_request)) {
                var pr = payload.pull_request;
                instance.pull_request_id = pr.id;
                instance.pull_request_title = pr.title;
                instance.pull_request_url = pr.url;
                instance.pull_request_merged = pr.merged;
                instance.pull_request_commits = pr.commits;
                instance.pull_request_additions = pr.additions;
                instance.pull_request_deletions = pr.deletions;
                instance.pull_request_changed_files = pr.changed_files;
            }
        }
    }]);
    return GithubPullRequestEventPayload;
}();

GithubPullRequestEventPayload.ACTION_VALUE_ASSIGNED = "assigned";
GithubPullRequestEventPayload.ACTION_VALUE_UNASSIGNED = "unassigned";
GithubPullRequestEventPayload.ACTION_VALUE_LABELED = "labeled";
GithubPullRequestEventPayload.ACTION_VALUE_UNLABELED = "unlabeled";
GithubPullRequestEventPayload.ACTION_VALUE_OPENED = "opened";
GithubPullRequestEventPayload.ACTION_VALUE_CLOSED = "closed";
GithubPullRequestEventPayload.ACTION_VALUE_SYNCHRONIZED = "synchronize";
__decorate([serialize_1.deserializeAs("action")], GithubPullRequestEventPayload.prototype, "action", void 0);
__decorate([serialize_1.deserializeAs("number")], GithubPullRequestEventPayload.prototype, "number", void 0);
exports.GithubPullRequestEventPayload = GithubPullRequestEventPayload;
var GithubPullRequestEvent = function (_GithubEvent2) {
    (0, _inherits3.default)(GithubPullRequestEvent, _GithubEvent2);

    function GithubPullRequestEvent() {
        (0, _classCallCheck3.default)(this, GithubPullRequestEvent);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GithubPullRequestEvent).apply(this, arguments));
    }

    return GithubPullRequestEvent;
}(GithubEvent);
GithubPullRequestEvent.EVENT_TYPE = "PullRequestEvent";
__decorate([serialize_1.deserializeAs(GithubPullRequestEventPayload, "payload")], GithubPullRequestEvent.prototype, "payload", void 0);
GithubPullRequestEvent = __decorate([serialize_1.inheritSerialization(GithubEvent)], GithubPullRequestEvent);
exports.GithubPullRequestEvent = GithubPullRequestEvent;

var GithubIssuesEventPayload = function () {
    function GithubIssuesEventPayload() {
        (0, _classCallCheck3.default)(this, GithubIssuesEventPayload);
    }

    (0, _createClass3.default)(GithubIssuesEventPayload, null, [{
        key: "OnDeserialized",
        value: function OnDeserialized(instance, payload) {
            if (_.isEmpty(payload)) return;
            if (!_.isEmpty(payload.issue)) {
                var issue = payload.issue;
                instance.issue_id = issue.id;
                instance.issue_number = issue.number;
                instance.issue_title = issue.title;
                instance.issue_url = issue.html_url;
            }
        }
    }]);
    return GithubIssuesEventPayload;
}();

GithubIssuesEventPayload.ACTION_VALUE_ASSIGNED = "assigned";
GithubIssuesEventPayload.ACTION_VALUE_UNASSIGNED = "unassigned";
GithubIssuesEventPayload.ACTION_VALUE_LABELED = "labeled";
GithubIssuesEventPayload.ACTION_VALUE_UNLABELED = "unlabeled";
GithubIssuesEventPayload.ACTION_VALUE_OPENED = "opened";
GithubIssuesEventPayload.ACTION_VALUE_CLOSED = "closed";
GithubIssuesEventPayload.ACTION_VALUE_REOPENED = "reopened";
__decorate([serialize_1.deserializeAs("action")], GithubIssuesEventPayload.prototype, "action", void 0);
exports.GithubIssuesEventPayload = GithubIssuesEventPayload;
var GithubIssuesEvent = function (_GithubEvent3) {
    (0, _inherits3.default)(GithubIssuesEvent, _GithubEvent3);

    function GithubIssuesEvent() {
        (0, _classCallCheck3.default)(this, GithubIssuesEvent);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GithubIssuesEvent).apply(this, arguments));
    }

    return GithubIssuesEvent;
}(GithubEvent);
GithubIssuesEvent.EVENT_TYPE = "IssuesEvent";
__decorate([serialize_1.deserializeAs(GithubIssuesEventPayload, "payload")], GithubIssuesEvent.prototype, "payload", void 0);
GithubIssuesEvent = __decorate([serialize_1.inheritSerialization(GithubEvent)], GithubIssuesEvent);
exports.GithubIssuesEvent = GithubIssuesEvent;

var GithubIssueCommentEventPayload = function () {
    function GithubIssueCommentEventPayload() {
        (0, _classCallCheck3.default)(this, GithubIssueCommentEventPayload);
    }

    (0, _createClass3.default)(GithubIssueCommentEventPayload, null, [{
        key: "OnDeserialized",
        value: function OnDeserialized(instance, payload) {
            if (_.isEmpty(payload)) return;
            if (!_.isEmpty(payload.issue)) {
                var issue = payload.issue;
                instance.issue_id = issue.id;
                instance.issue_number = issue.number;
                instance.issue_title = issue.title;
            }
            if (!_.isEmpty(payload.comment)) {
                var comment = payload.comment;
                instance.comment_url = comment.html_url;
            }
        }
    }]);
    return GithubIssueCommentEventPayload;
}();

GithubIssueCommentEventPayload.ACTION_TYPE_CREATED = "created";
__decorate([serialize_1.deserializeAs("action")], GithubIssueCommentEventPayload.prototype, "action", void 0);
exports.GithubIssueCommentEventPayload = GithubIssueCommentEventPayload;
var GithubIssueCommentEvent = function (_GithubEvent4) {
    (0, _inherits3.default)(GithubIssueCommentEvent, _GithubEvent4);

    function GithubIssueCommentEvent() {
        (0, _classCallCheck3.default)(this, GithubIssueCommentEvent);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GithubIssueCommentEvent).apply(this, arguments));
    }

    return GithubIssueCommentEvent;
}(GithubEvent);
GithubIssueCommentEvent.EVENT_TYPE = "IssueCommentEvent";
__decorate([serialize_1.deserializeAs(GithubIssueCommentEventPayload, "payload")], GithubIssueCommentEvent.prototype, "payload", void 0);
GithubIssueCommentEvent = __decorate([serialize_1.inheritSerialization(GithubEvent)], GithubIssueCommentEvent);
exports.GithubIssueCommentEvent = GithubIssueCommentEvent;

var GithubReleaseEventPayload = function () {
    function GithubReleaseEventPayload() {
        (0, _classCallCheck3.default)(this, GithubReleaseEventPayload);
    }

    (0, _createClass3.default)(GithubReleaseEventPayload, null, [{
        key: "OnDeserialized",
        value: function OnDeserialized(instance, payload) {
            if (_.isEmpty(payload)) return;
            if (!_.isEmpty(payload.release)) {
                var release = payload.release;
                instance.release_id = release.id;
                instance.release_url = release.html_url;
                instance.release_tag_name = release.tag_name;
                instance.release_target_commitish = release.target_commitish;
                instance.release_name = release.name;
                instance.release_prerelease = release.prerelease;
            }
        }
    }]);
    return GithubReleaseEventPayload;
}();

GithubReleaseEventPayload.ACTION_TYPE_PUBLISHED = "published";
__decorate([serialize_1.deserializeAs("action")], GithubReleaseEventPayload.prototype, "action", void 0);
exports.GithubReleaseEventPayload = GithubReleaseEventPayload;
var GithubReleaseEvent = function (_GithubEvent5) {
    (0, _inherits3.default)(GithubReleaseEvent, _GithubEvent5);

    function GithubReleaseEvent() {
        (0, _classCallCheck3.default)(this, GithubReleaseEvent);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GithubReleaseEvent).apply(this, arguments));
    }

    return GithubReleaseEvent;
}(GithubEvent);
GithubReleaseEvent.EVENT_TYPE = "ReleaseEvent";
__decorate([serialize_1.deserializeAs(GithubReleaseEventPayload, "payload")], GithubReleaseEvent.prototype, "payload", void 0);
GithubReleaseEvent = __decorate([serialize_1.inheritSerialization(GithubEvent)], GithubReleaseEvent);
exports.GithubReleaseEvent = GithubReleaseEvent;

var GithubWatchEventPayload = function GithubWatchEventPayload() {
    (0, _classCallCheck3.default)(this, GithubWatchEventPayload);
};

GithubWatchEventPayload.ACTION_TYPE_STARTED = "started";
__decorate([serialize_1.deserializeAs("action")], GithubWatchEventPayload.prototype, "action", void 0);
exports.GithubWatchEventPayload = GithubWatchEventPayload;
var GithubWatchEvent = function (_GithubEvent6) {
    (0, _inherits3.default)(GithubWatchEvent, _GithubEvent6);

    function GithubWatchEvent() {
        (0, _classCallCheck3.default)(this, GithubWatchEvent);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GithubWatchEvent).apply(this, arguments));
    }

    return GithubWatchEvent;
}(GithubEvent);
GithubWatchEvent.EVENT_TYPE = "WatchEvent";
__decorate([serialize_1.deserializeAs(GithubWatchEventPayload, "payload")], GithubWatchEvent.prototype, "payload", void 0);
GithubWatchEvent = __decorate([serialize_1.inheritSerialization(GithubEvent)], GithubWatchEvent);
exports.GithubWatchEvent = GithubWatchEvent;

var GithubForkEventPayload = function () {
    function GithubForkEventPayload() {
        (0, _classCallCheck3.default)(this, GithubForkEventPayload);
    }

    (0, _createClass3.default)(GithubForkEventPayload, null, [{
        key: "OnDeserialized",
        value: function OnDeserialized(instance, payload) {
            if (_.isEmpty(payload)) return;
            if (!_.isEmpty(payload.forkee)) {
                var forkee = payload.forkee;
                instance.forkee_id = forkee.id;
                instance.forkee_name = forkee.name;
                instance.forkee_full_name = forkee.full_name;
                instance.forkee_url = forkee.html_url;
                instance.forkee_language = forkee.language;
            }
        }
    }]);
    return GithubForkEventPayload;
}();

__decorate([serialize_1.deserializeAs("action")], GithubForkEventPayload.prototype, "action", void 0);
exports.GithubForkEventPayload = GithubForkEventPayload;
var GithubForkEvent = function (_GithubEvent7) {
    (0, _inherits3.default)(GithubForkEvent, _GithubEvent7);

    function GithubForkEvent() {
        (0, _classCallCheck3.default)(this, GithubForkEvent);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GithubForkEvent).apply(this, arguments));
    }

    return GithubForkEvent;
}(GithubEvent);
GithubForkEvent.EVENT_TYPE = "ForkEvent";
__decorate([serialize_1.deserializeAs(GithubForkEventPayload, "payload")], GithubForkEvent.prototype, "payload", void 0);
GithubForkEvent = __decorate([serialize_1.inheritSerialization(GithubEvent)], GithubForkEvent);
exports.GithubForkEvent = GithubForkEvent;

var GithubCreateEventPayload = function GithubCreateEventPayload() {
    (0, _classCallCheck3.default)(this, GithubCreateEventPayload);
};

GithubCreateEventPayload.REF_TYPE_REPOSITORY = "repository";
GithubCreateEventPayload.REF_TYPE_BRANCH = "branch";
GithubCreateEventPayload.REF_TYPE_TAG = "tag";
__decorate([serialize_1.deserialize], GithubCreateEventPayload.prototype, "ref", void 0);
__decorate([
/* might be null, if repository is just created */serialize_1.deserialize], GithubCreateEventPayload.prototype, "ref_type", void 0);
__decorate([serialize_1.deserialize], GithubCreateEventPayload.prototype, "master_branch", void 0);
__decorate([serialize_1.deserialize], GithubCreateEventPayload.prototype, "description", void 0);
__decorate([serialize_1.deserialize], GithubCreateEventPayload.prototype, "pusher_type", void 0);
exports.GithubCreateEventPayload = GithubCreateEventPayload;
var GithubCreateEvent = function (_GithubEvent8) {
    (0, _inherits3.default)(GithubCreateEvent, _GithubEvent8);

    function GithubCreateEvent() {
        (0, _classCallCheck3.default)(this, GithubCreateEvent);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GithubCreateEvent).apply(this, arguments));
    }

    return GithubCreateEvent;
}(GithubEvent);
GithubCreateEvent.EVENT_TYPE = "CreateEvent";
__decorate([serialize_1.deserializeAs(GithubCreateEventPayload, "payload")], GithubCreateEvent.prototype, "payload", void 0);
GithubCreateEvent = __decorate([serialize_1.inheritSerialization(GithubEvent)], GithubCreateEvent);
exports.GithubCreateEvent = GithubCreateEvent;
//# sourceMappingURL=github_model.js.map
