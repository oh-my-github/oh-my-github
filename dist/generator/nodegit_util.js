"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.addAllAndCommit = addAllAndCommit;
exports.checkoutGhPagesBranch = checkoutGhPagesBranch;
exports.push = push;
exports.publish = publish;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _promise = require("babel-runtime/core-js/promise");

var _promise2 = _interopRequireDefault(_promise);

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/fs-extra/fs-extra.d.ts" />
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
var nodegit = require("nodegit");

function nodegitLog(message) {
    _util.Log.blue("  Running Git Command: ", message);
}
function addAllAndCommit(path, user, commitMessage, initial) {
    return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee() {
        var repo, index, oid, author, committer, head, parent;
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        nodegitLog("git commit -a -m \"" + commitMessage + "\"");
                        _context.next = 3;
                        return nodegit.Repository.open(path);

                    case 3:
                        repo = _context.sent;
                        _context.next = 6;
                        return repo.openIndex();

                    case 6:
                        index = _context.sent;
                        _context.next = 9;
                        return index.addAll();

                    case 9:
                        _context.next = 11;
                        return index.write();

                    case 11:
                        _context.next = 13;
                        return index.writeTree();

                    case 13:
                        oid = _context.sent;
                        author = nodegit.Signature.now(user, user);
                        committer = nodegit.Signature.now(user, user);

                        if (!initial) {
                            _context.next = 20;
                            break;
                        }

                        _context.next = 19;
                        return repo.createCommit("HEAD", author, committer, commitMessage, oid, []);

                    case 19:
                        return _context.abrupt("return", _context.sent);

                    case 20:
                        _context.next = 22;
                        return nodegit.Reference.nameToId(repo, "HEAD");

                    case 22:
                        head = _context.sent;
                        _context.next = 25;
                        return repo.getCommit(head);

                    case 25:
                        parent = _context.sent;
                        _context.next = 28;
                        return repo.createCommit("HEAD", author, committer, commitMessage, oid, [parent]);

                    case 28:
                        return _context.abrupt("return", _context.sent);

                    case 29:
                    case "end":
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));
}
function checkoutGhPagesBranch(path, user) {
    return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee2() {
        var repo, branch, ghPagesBranch, headCommit, branchName;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        repo = undefined;
                        /** initialize repository if not exist */

                        _context2.prev = 1;
                        _context2.next = 4;
                        return nodegit.Repository.open(path);

                    case 4:
                        repo = _context2.sent;
                        _context2.next = 13;
                        break;

                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](1);

                        nodegitLog("git init");
                        _context2.next = 12;
                        return nodegit.Repository.init(path, 0);

                    case 12:
                        repo = _context2.sent;

                    case 13:
                        branch = undefined;
                        /** do initial commit if not exist */

                        _context2.prev = 14;
                        _context2.next = 17;
                        return repo.getCurrentBranch();

                    case 17:
                        branch = _context2.sent;
                        _context2.next = 30;
                        break;

                    case 20:
                        _context2.prev = 20;
                        _context2.t1 = _context2["catch"](14);
                        _context2.next = 24;
                        return addAllAndCommit(path, user, "initial commit", true);

                    case 24:
                        _context2.next = 26;
                        return nodegit.Repository.open(path);

                    case 26:
                        repo = _context2.sent;
                        _context2.next = 29;
                        return repo.getCurrentBranch();

                    case 29:
                        branch = _context2.sent;

                    case 30:
                        _context2.prev = 30;
                        _context2.next = 33;
                        return repo.getBranch("gh-pages");

                    case 33:
                        ghPagesBranch = _context2.sent;
                        _context2.next = 44;
                        break;

                    case 36:
                        _context2.prev = 36;
                        _context2.t2 = _context2["catch"](30);

                        nodegitLog("git branch gh-pages HEAD");
                        _context2.next = 41;
                        return repo.getHeadCommit();

                    case 41:
                        headCommit = _context2.sent;
                        _context2.next = 44;
                        return repo.createBranch("gh-pages", headCommit, 0, repo.defaultSignature(), "message");

                    case 44:
                        /** checkout gh-pages */
                        branchName = branch.name();

                        if (branchName.endsWith("/gh-pages")) {
                            _context2.next = 53;
                            break;
                        }

                        nodegitLog("git checkout gh-pages");
                        _context2.next = 49;
                        return nodegit.Repository.open(path);

                    case 49:
                        repo = _context2.sent;
                        _context2.next = 52;
                        return repo.checkoutBranch("gh-pages", {
                            checkoutStrategy: nodegit.Checkout.STRATEGY.SAFE | nodegit.Checkout.STRATEGY.RECREATE_MISSING
                        });

                    case 52:
                        return _context2.abrupt("return", _context2.sent);

                    case 53:
                        _context2.next = 55;
                        return _promise2.default.resolve();

                    case 55:
                        return _context2.abrupt("return", _context2.sent);

                    case 56:
                    case "end":
                        return _context2.stop();
                }
            }
        }, _callee2, this, [[1, 7], [14, 20], [30, 36]]);
    }));
}
/**
 * branchName: e.g 'gh-pages'
 * remoteName: e.g 'origin'
 * gitUrl: e.g 'git@github.com:1ambda/oh-my-github'
 */
function push(path, branchName, remoteName, gitUrl) {
    return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee3() {
        var repo, remote;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return nodegit.Repository.open(path);

                    case 2:
                        repo = _context3.sent;
                        remote = undefined;
                        _context3.prev = 4;
                        _context3.next = 7;
                        return nodegit.Remote.lookup(repo, remoteName);

                    case 7:
                        remote = _context3.sent;
                        _context3.next = 16;
                        break;

                    case 10:
                        _context3.prev = 10;
                        _context3.t0 = _context3["catch"](4);

                        nodegitLog("git remote add " + remoteName + " " + nodegit.rl);
                        _context3.next = 15;
                        return nodegit.Remote.create(repo, remoteName, gitUrl);

                    case 15:
                        remote = _context3.sent;

                    case 16:
                        nodegitLog("git push origin " + branchName + ":" + branchName + " --force");
                        _context3.next = 19;
                        return remote.push(["+refs/heads/" + branchName + ":refs/heads/" + branchName], { callbacks: {
                                credentials: function credentials(url, userName) {
                                    return nodegit.Cred.sshKeyFromAgent(userName);
                                }
                            } });

                    case 19:
                        return _context3.abrupt("return", _context3.sent);

                    case 20:
                    case "end":
                        return _context3.stop();
                }
            }
        }, _callee3, this, [[4, 10]]);
    }));
}
function publish(user, repoName) {
    return __awaiter(this, void 0, _promise2.default, _regenerator2.default.mark(function _callee4() {
        var path, branchName, remoteName, gitUrl, commitMessage;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        path = process.cwd();
                        branchName = "gh-pages";
                        remoteName = "origin";
                        gitUrl = "git@github.com:" + user + "/" + repoName;
                        commitMessage = "Update profile (" + new Date().toISOString() + ")";
                        _context4.next = 7;
                        return checkoutGhPagesBranch(path, user);

                    case 7:
                        _context4.next = 9;
                        return addAllAndCommit(path, user, commitMessage, false);

                    case 9:
                        _context4.next = 11;
                        return push(path, branchName, remoteName, gitUrl);

                    case 11:
                    case "end":
                        return _context4.stop();
                }
            }
        }, _callee4, this);
    }));
}
//# sourceMappingURL=nodegit_util.js.map
