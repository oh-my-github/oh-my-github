"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Profile = exports.MetaField = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _keys = require("babel-runtime/core-js/object/keys");

var _keys2 = _interopRequireDefault(_keys);

var _from = require("babel-runtime/core-js/array/from");

var _from2 = _interopRequireDefault(_from);

var _set = require("babel-runtime/core-js/set");

var _set2 = _interopRequireDefault(_set);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

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

exports.printProfile = printProfile;
exports.createProfile = createProfile;

var _lodash = require("lodash");

var _ = _interopRequireWildcard(_lodash);

var _util = require("./util");

var _serialize = require("./serialize");

var _github_util = require("./github_util");

var _github_model = require("./github_model");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = (0, _getOwnPropertyDescriptor2.default)(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && (0, _defineProperty2.default)(target, key, r), r;
};
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, Promise, generator) {
    return new Promise(function (resolve, reject) {
        generator = generator.call(thisArg, _arguments);
        function cast(value) {
            return value instanceof Promise && value.constructor === Promise ? value : new Promise(function (resolve) {
                resolve(value);
            });
        }
        function onfulfill(value) {
            try {
                step("next", value);
            } catch (e) {
                reject(e);
            }
        }
        function onreject(value) {
            try {
                step("throw", value);
            } catch (e) {
                reject(e);
            }
        }
        function step(verb, value) {
            var result = generator[verb](value);
            result.done ? resolve(result.value) : cast(result.value).then(onfulfill, onreject);
        }
        step("next", void 0);
    });
};

var MetaField = exports.MetaField = function (_Deserializable) {
    (0, _inherits3.default)(MetaField, _Deserializable);

    function MetaField() {
        var _Object$getPrototypeO;

        (0, _classCallCheck3.default)(this, MetaField);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO = (0, _getPrototypeOf2.default)(MetaField)).call.apply(_Object$getPrototypeO, [this].concat(args)));

        _this.ignored_repositories = new Array();
        /** since cerialize overwrite values even if it is `null`, we need to use `OnDeserialize` */
        // TODO: create PR (preventing from overwriting field to `null`)
        _this.schema_version = MetaField.PROFILE_SCHEMA_VERSION;
        _this.schema_created_at = MetaField.CURRENT_DATE;
        _this.schema_collected_ats = new Array(MetaField.CURRENT_DATE);
        return _this;
    }

    (0, _createClass3.default)(MetaField, null, [{
        key: "OnDeserialized",
        value: function OnDeserialized(instance, json) {
            var profSchemaVersion = json.schema_version;
            if (null !== profSchemaVersion && profSchemaVersion !== MetaField.PROFILE_SCHEMA_VERSION) {
                _util.Util.reportMessageAndExit("Invalid `_$meta.schema_version`: " + profSchemaVersion);
            }
            if (_.isEmpty(profSchemaVersion)) profSchemaVersion = MetaField.PROFILE_SCHEMA_VERSION;
            instance.schema_version = profSchemaVersion;
            var created_at = json.schema_created_at;
            if (_.isEmpty(created_at)) created_at = MetaField.CURRENT_DATE;
            instance.schema_created_at = created_at;
            var collected_ats = json.schema_collected_ats;
            if (_.isEmpty(collected_ats)) collected_ats = new Array(MetaField.CURRENT_DATE);
            instance.schema_collected_ats = collected_ats;
        }
    }]);
    return MetaField;
}(_serialize.Deserializable);

MetaField.PROFILE_SCHEMA_VERSION = 1;
MetaField.CURRENT_DATE = new Date().toISOString();
__decorate([_serialize.deserialize], MetaField.prototype, "agent", void 0);
__decorate([_serialize.deserialize], MetaField.prototype, "github_user", void 0);
__decorate([_serialize.deserialize], MetaField.prototype, "github_repository", void 0);
__decorate([_serialize.deserialize], MetaField.prototype, "ignored_repositories", void 0);

var Profile = exports.Profile = function (_Deserializable2) {
    (0, _inherits3.default)(Profile, _Deserializable2);

    function Profile() {
        var _Object$getPrototypeO2;

        (0, _classCallCheck3.default)(this, Profile);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        var _this2 = (0, _possibleConstructorReturn3.default)(this, (_Object$getPrototypeO2 = (0, _getPrototypeOf2.default)(Profile)).call.apply(_Object$getPrototypeO2, [this].concat(args)));

        _this2._$meta = new MetaField();
        /**
         * since GithubEvent is the base class of all Github*Event, (e.g GithubPushEvent)
         * we need to custom deserializer instead of @deserializeAs
         * to avoid losing information while deserializing
         */
        _this2.activities = new Array();
        return _this2;
    }

    (0, _createClass3.default)(Profile, [{
        key: "updateMeta",
        value: function updateMeta(prevMeta) {
            return Profile.updateMeta(this, prevMeta);
        }
    }], [{
        key: "OnDeserialized",
        value: function OnDeserialized(instance, json) {
            if (_.isEmpty(json)) return;
            if (_.isEmpty(json.activities)) return;
            var activities = _github_model.GithubEvent.deserializeGithubEvent(json.activities);
            instance.activities = activities;
        }
    }, {
        key: "updateMeta",
        value: function updateMeta(currentProfile, prevMeta) {
            var currentMeta = currentProfile._$meta;
            var meta = _util.Util.copyObject(prevMeta);
            /** 1. update schema_collected_ats */
            meta.schema_collected_ats.push(MetaField.CURRENT_DATE);
            /** 2. update ignored_repositories */
            meta.ignored_repositories = _.union(currentMeta.ignored_repositories, prevMeta.ignored_repositories);
            currentProfile._$meta = meta;
            return currentProfile;
        }
    }]);
    return Profile;
}(_serialize.Deserializable);

__decorate([(0, _serialize.deserializeAs)(MetaField)], Profile.prototype, "_$meta", void 0);
__decorate([(0, _serialize.deserializeAs)(_github_model.GithubUser)], Profile.prototype, "user", void 0);
__decorate([(0, _serialize.deserializeAs)(_github_model.LanguageInformation)], Profile.prototype, "languages", void 0);
__decorate([(0, _serialize.deserializeAs)(_github_model.Repository)], Profile.prototype, "repositories", void 0);
function printProfile(user, langInfos, repos, prevProfile, currentProfile, ignoredRepos) {
    function renderTitle(tag) {
        _util.Log.blue("\n  " + tag, "");
    }
    function renderText(tag, message) {
        _util.Log.magentaReverse("    " + tag, message);
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
        var langSet = langInfos.reduce(function (acc, langInfo) {
            if (_.isEmpty(langInfo.languages) || langInfo.languages.length === 0) return acc;
            langInfo.languages.map(function (lang) {
                return lang.name;
            }).forEach(function (name) {
                acc.add(name);
            });
            return acc;
        }, new _set2.default());
        renderText("Language Count: ", langSet.size);
        renderText("Supported Languages: ", (0, _from2.default)(langSet).join(", "));
        // TODO converts to ir, il options (ignoreLanguage, ignoreRepository)
        renderText("Ignored Repositories: ", ignoredRepos);
    }
    /** repository */
    renderTitle("[REPOSITORY]");
    // TODO refactor, print ignored repos
    // TODO featured reos
    if (!_.isEmpty(repos)) {
        var repoSummary = new _github_model.RepositorySummary();
        repos.reduce(function (sum, repo) {
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
    var prevActs = prevProfile.activities;
    var prevActIds = new _set2.default(prevActs.map(function (act) {
        return act.event_id;
    }));
    var currentActs = currentProfile.activities;
    var newActs = currentActs.filter(function (act) {
        return !prevActIds.has(act.event_id);
    });
    renderText("Current Profile Activity: ", currentActs.length);
    if (prevActs.length !== currentActs.length) {
        (function () {
            renderText("Previous Profile Activity: ", prevActs.length);
            renderText("New Activity Details:", "");
            var eventTypeToCount = {};
            for (var i = 0; i < newActs.length; i++) {
                var act = newActs[i];
                if (!eventTypeToCount.hasOwnProperty(act.type)) eventTypeToCount[act.type] = 0;
                eventTypeToCount[act.type] += 1;
            }
            var eventTypes = (0, _keys2.default)(eventTypeToCount).filter(function (type) {
                return eventTypeToCount.hasOwnProperty(type);
            });
            for (var j = 0; j < eventTypes.length; j++) {
                var type = eventTypes[j];
                renderText("  " + type + ": ", "" + eventTypeToCount[type]);
            }
        })();
    }
}
function createProfile(token, prevProf, ignoredRepos) {
    return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
        var user, currentProf, allIgnoredRepos, githubUser, repos, langs, currentActs, uniqActs;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        user = prevProf._$meta.github_user;
                        currentProf = new Profile();

                        currentProf._$meta.ignored_repositories = ignoredRepos;
                        allIgnoredRepos = _.union(ignoredRepos, prevProf._$meta.ignored_repositories);
                        _context.next = 6;
                        return _github_util.GithubUtil.getGithubUser(token, user);

                    case 6:
                        githubUser = _context.sent;
                        _context.next = 9;
                        return _github_util.GithubUtil.getUserRepositories(token, user);

                    case 9:
                        repos = _context.sent;
                        _context.next = 12;
                        return _github_util.GithubUtil.getUserLanguages(token, user, allIgnoredRepos);

                    case 12:
                        langs = _context.sent;
                        _context.next = 15;
                        return _github_util.GithubUtil.getUserActivities(token, user);

                    case 15:
                        currentActs = _context.sent;
                        uniqActs = _github_model.GithubEvent.mergeByEventId(prevProf.activities, currentActs);

                        currentProf.activities = uniqActs;
                        currentProf.repositories = repos;
                        currentProf.languages = langs;
                        currentProf.user = githubUser;
                        /** printProfile before updating meta */
                        printProfile(githubUser, langs, repos, prevProf, currentProf, allIgnoredRepos);
                        currentProf.updateMeta(prevProf._$meta);
                        return _context.abrupt("return", currentProf);

                    case 24:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
//# sourceMappingURL=profile.js.map
