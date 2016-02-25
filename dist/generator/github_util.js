/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
"use strict";

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

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

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

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
var __awaiter = undefined && undefined.__awaiter || function (thisArg, _arguments, P, generator) {
    return new (P || (P = _promise2.default))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }
        function rejected(value) {
            try {
                step(generator.throw(value));
            } catch (e) {
                reject(e);
            }
        }
        function step(result) {
            result.done ? resolve(result.value) : new P(function (resolve) {
                resolve(result.value);
            }).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments)).next());
    });
};
var github_model_1 = require("./github_model");
var serialize_1 = require("./serialize");
var axios = require('axios');
var _ = require("lodash");

var GithubError = function (_serialize_1$Deserial) {
    (0, _inherits3.default)(GithubError, _serialize_1$Deserial);

    function GithubError() {
        (0, _classCallCheck3.default)(this, GithubError);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(GithubError).apply(this, arguments));
    }

    return GithubError;
}(serialize_1.Deserializable);

__decorate([serialize_1.deserializeAs("name")], GithubError.prototype, "name", void 0);
__decorate([serialize_1.deserializeAs("message")], GithubError.prototype, "message", void 0);
__decorate([serialize_1.deserializeAs("statusCode")], GithubError.prototype, "statusCode", void 0);
__decorate([serialize_1.deserializeAs("headers")], GithubError.prototype, "headers", void 0);
__decorate([serialize_1.deserializeAs("body")], GithubError.prototype, "body", void 0);
exports.GithubError = GithubError;

var GithubResponse = function () {
    function GithubResponse(headers, body) {
        (0, _classCallCheck3.default)(this, GithubResponse);

        this.headers = headers;
        this.body = body;
    }
    /**
     * return null if failed to parse github pagination response
     */


    (0, _createClass3.default)(GithubResponse, null, [{
        key: "parseLastLinkCount",
        value: function parseLastLinkCount(link) {
            if (typeof link === "undefined" || typeof link === null || typeof link !== "string") return null;
            if (link === "rel=\"last\"") return null;
            var lastLinkCount = null;
            try {
                var uriAndRels = link.split(",");
                for (var i = 0; i < uriAndRels.length; i++) {
                    var splited = uriAndRels[i].split(";");
                    if (splited.length < 2) break; /** `rel= "last"` */
                    var rel = splited[1].trim();
                    if (rel === "rel=\"last\"") {
                        var stringified = splited[0].split("&page=")[1].trim();
                        lastLinkCount = parseInt(stringified, 10);
                        if (isNaN(lastLinkCount)) lastLinkCount = null;
                        break;
                    }
                }
            } catch (err) {
                return null;
            }
            return lastLinkCount;
        }
    }]);
    return GithubResponse;
}();

exports.GithubResponse = GithubResponse;

var GithubUtil = function () {
    function GithubUtil() {
        (0, _classCallCheck3.default)(this, GithubUtil);
    }

    (0, _createClass3.default)(GithubUtil, null, [{
        key: "getGithubResponse",
        value: function getGithubResponse(token, uri) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
                var r;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                r = new _promise2.default(function (resolve, reject) {
                                    if (_.includes(uri, "?")) uri = "https://api.github.com" + uri + "&access_token=" + token;else uri = "https://api.github.com" + uri + "?access_token=" + token;
                                    axios.get(uri).then(function (response) {
                                        return resolve(new GithubResponse(response.headers, response.data));
                                    }).catch(function (response) {
                                        if (response instanceof Error) return reject(response);
                                        response.data.statusCode = response.status;
                                        return reject(response.data);
                                    });
                                });
                                return _context.abrupt("return", r);

                            case 2:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, this);
            }));
        }
        /** collect all API using pagination */

    }, {
        key: "getGithubResponses",
        value: function getGithubResponses(token, uri) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
                var responses, r, lastCount, ps, i, rs, merged;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                responses = new Array();
                                _context2.next = 3;
                                return GithubUtil.getGithubResponse(token, uri);

                            case 3:
                                r = _context2.sent;

                                responses.push(r);
                                lastCount = GithubResponse.parseLastLinkCount(r.headers.link);

                                if (!(lastCount === null)) {
                                    _context2.next = 8;
                                    break;
                                }

                                return _context2.abrupt("return", responses);

                            case 8:
                                ps = new Array();

                                for (i = 2; i <= lastCount; i++) {
                                    ps.push(GithubUtil.getGithubResponse(token, uri + "?page=" + i));
                                }
                                _context2.next = 12;
                                return _promise2.default.all(ps);

                            case 12:
                                rs = _context2.sent;
                                merged = responses.concat(rs);
                                return _context2.abrupt("return", merged);

                            case 15:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, this);
            }));
        }
    }, {
        key: "getGithubResponseBody",
        value: function getGithubResponseBody(token, uri) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
                var r;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                _context3.next = 2;
                                return GithubUtil.getGithubResponse(token, uri);

                            case 2:
                                r = _context3.sent;
                                return _context3.abrupt("return", r.body);

                            case 4:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, this);
            }));
        }
        /**
         * 1. retrieve page header
         * 2. get all pages
         * 3. return flattened
         */

    }, {
        key: "getGithubResponsesBody",
        value: function getGithubResponsesBody(token, uri) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee4() {
                var rs, bodies, flattened;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _context4.next = 2;
                                return GithubUtil.getGithubResponses(token, uri);

                            case 2:
                                rs = _context4.sent;
                                bodies = rs.map(function (r) {
                                    return r.body;
                                }); /* each body is an array */

                                flattened = bodies.reduce(function (acc, body) {
                                    if (Array.isArray(body) && body.length > 0) return acc.concat(body);else return acc;
                                });
                                return _context4.abrupt("return", flattened);

                            case 6:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, this);
            }));
        }
    }, {
        key: "getGithubUser",
        value: function getGithubUser(token, user) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee5() {
                var raw;
                return _regenerator2.default.wrap(function _callee5$(_context5) {
                    while (1) {
                        switch (_context5.prev = _context5.next) {
                            case 0:
                                _context5.next = 2;
                                return GithubUtil.getGithubResponseBody(token, "/users/" + user);

                            case 2:
                                raw = _context5.sent;
                                return _context5.abrupt("return", github_model_1.GithubUser.deserialize(github_model_1.GithubUser, raw));

                            case 4:
                            case "end":
                                return _context5.stop();
                        }
                    }
                }, _callee5, this);
            }));
        }
    }, {
        key: "getUserLanguages",
        value: function getUserLanguages(token, user, ignoredRepos) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee6() {
                var repos, repoNames, ps, rawLangInfos, langInfos;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                    while (1) {
                        switch (_context6.prev = _context6.next) {
                            case 0:
                                _context6.next = 2;
                                return GithubUtil.getUserRepositories(token, user);

                            case 2:
                                repos = _context6.sent;
                                repoNames = repos.map(function (r) {
                                    return r.name;
                                }).filter(function (name) {
                                    return !_.contains(ignoredRepos, name);
                                }); /** filter out ignored repos */

                                if (!(repos.length === 0)) {
                                    _context6.next = 6;
                                    break;
                                }

                                return _context6.abrupt("return", new Array());

                            case 6:
                                ps = repoNames.map(function (name) {
                                    return GithubUtil.getGithubResponseBody(token, "/repos/" + user + "/" + name + "/languages").then(function (langObject) {
                                        return {
                                            owner: user,
                                            repo_name: name,
                                            url: "http://github.com/" + user + "/" + name,
                                            langObject: langObject
                                        };
                                    });
                                });
                                _context6.next = 9;
                                return _promise2.default.all(ps);

                            case 9:
                                rawLangInfos = _context6.sent;

                                if (!_.isEmpty(rawLangInfos)) {
                                    _context6.next = 12;
                                    break;
                                }

                                return _context6.abrupt("return", new Array());

                            case 12:
                                langInfos = rawLangInfos.map(function (rawLangInfo) {
                                    return github_model_1.LanguageInformation.deserialize(github_model_1.LanguageInformation, rawLangInfo);
                                });
                                // TODO try-catch
                                // TODO filter empty array in languages

                                return _context6.abrupt("return", langInfos);

                            case 14:
                            case "end":
                                return _context6.stop();
                        }
                    }
                }, _callee6, this);
            }));
        }
    }, {
        key: "getUserRepositories",
        value: function getUserRepositories(token, user) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee7() {
                var raw, repos;
                return _regenerator2.default.wrap(function _callee7$(_context7) {
                    while (1) {
                        switch (_context7.prev = _context7.next) {
                            case 0:
                                _context7.next = 2;
                                return GithubUtil.getGithubResponsesBody(token, "/users/" + user + "/repos");

                            case 2:
                                raw = _context7.sent;
                                repos = github_model_1.Repository.deserializeArray(github_model_1.Repository, raw);
                                return _context7.abrupt("return", repos);

                            case 5:
                            case "end":
                                return _context7.stop();
                        }
                    }
                }, _callee7, this);
            }));
        }
    }, {
        key: "getUserActivities",
        value: function getUserActivities(token, user) {
            return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee8() {
                var raw, events;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                    while (1) {
                        switch (_context8.prev = _context8.next) {
                            case 0:
                                _context8.next = 2;
                                return GithubUtil.getGithubResponsesBody(token, "/users/" + user + "/events/public");

                            case 2:
                                raw = _context8.sent;
                                events = github_model_1.GithubEvent.deserializeGithubEvent(raw);
                                return _context8.abrupt("return", events.filter(function (e) {
                                    return e !== null;
                                }));

                            case 5:
                            case "end":
                                return _context8.stop();
                        }
                    }
                }, _callee8, this);
            }));
        }
    }]);
    return GithubUtil;
}();

exports.GithubUtil = GithubUtil;
//# sourceMappingURL=github_util.js.map
