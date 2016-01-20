"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FileUtil = exports.BS_OPTION = exports.FILE_NAME_PROFILE_JSON = exports.FILE_PATH_PROFILE_TEMPLATE_JSON = exports.GENERATOR_VERSION = exports.CONFIG = exports.PROJECT_DIR = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _fsExtra = require("fs-extra");

var fse = _interopRequireWildcard(_fsExtra);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var path = require("path"); /// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/fs-extra/fs-extra.d.ts" />

var PROJECT_DIR = exports.PROJECT_DIR = require('app-root-path').path;
var CONFIG = exports.CONFIG = require(path.join(PROJECT_DIR, "config.js"));
var GENERATOR_VERSION = exports.GENERATOR_VERSION = require(path.join(PROJECT_DIR, CONFIG.FILE.PACKAGE_JSON)).version;
var FILE_PATH_PROFILE_TEMPLATE_JSON = exports.FILE_PATH_PROFILE_TEMPLATE_JSON = path.join(PROJECT_DIR, CONFIG.FILE.PROFILE_TEMPLATE_JSON);
var FILE_NAME_PROFILE_JSON = exports.FILE_NAME_PROFILE_JSON = CONFIG.FILE.PROFILE_JSON;
var BS_OPTION = exports.BS_OPTION = { server: {
        baseDir: [PROJECT_DIR + "/" + CONFIG.DIR.DIST_VIEWER],
        routes: {
            "/bower_components": PROJECT_DIR + "/" + CONFIG.DIR.BOWER_COMPONENTS + "/",
            "/resource": process.cwd()
        }
    } };

var FileUtil = exports.FileUtil = function () {
    function FileUtil() {
        (0, _classCallCheck3.default)(this, FileUtil);
    }

    (0, _createClass3.default)(FileUtil, null, [{
        key: "writeFileIfNotExist",

        /**
         * write file iff the file does not exist otherwise throw an error
         */
        value: function writeFileIfNotExist(path, json) {
            fse.writeJsonSync(path, json, { flag: "wx" });
        }
        /**
         * overwrite file
         */

    }, {
        key: "overwriteFile",
        value: function overwriteFile(path, json) {
            fse.writeJsonSync(path, json, { flag: "w+" });
        }
        /**
         * read file iff the file exists otherwise throw an error
         */

    }, {
        key: "readFileIfExist",
        value: function readFileIfExist(path) {
            return fse.readJsonSync(path, { flag: "r" });
        }
    }, {
        key: "getProfilePath",
        value: function getProfilePath() {
            return FileUtil.combinePathWithCwd(FILE_NAME_PROFILE_JSON);
        }
    }, {
        key: "combinePathWithCwd",
        value: function combinePathWithCwd(filePath) {
            return path.join(process.cwd(), filePath);
        }
    }]);
    return FileUtil;
}();
//# sourceMappingURL=file_util.js.map
