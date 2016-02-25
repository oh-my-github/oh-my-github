/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/fs-extra/fs-extra.d.ts" />
"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fse = require("fs-extra");
var path = require("path");
var projectDir = require('app-root-path').path;
/** since globally installed version runs on `oh-my-github/bin` we should remove `/bin` */
if (projectDir.endsWith("/bin")) projectDir = projectDir.substring(0, projectDir.length - 4);
exports.PROJECT_DIR = projectDir;
exports.CONFIG = require(path.join(exports.PROJECT_DIR, "config.js"));
exports.GENERATOR_VERSION = require(path.join(exports.PROJECT_DIR, exports.CONFIG.FILE.PACKAGE_JSON)).version;
exports.FILE_PATH_PROFILE_TEMPLATE_JSON = path.join(exports.PROJECT_DIR, exports.CONFIG.FILE.PROFILE_TEMPLATE_JSON);
exports.FILE_NAME_PROFILE_JSON = exports.CONFIG.FILE.PROFILE_JSON;
exports.BS_OPTION = { server: {
        baseDir: [exports.PROJECT_DIR + "/" + exports.CONFIG.DIR.DIST_VIEWER],
        routes: { "/oh-my-github": process.cwd() }
    } };

var FileUtil = function () {
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
            return FileUtil.combinePathWithCwd(exports.FILE_NAME_PROFILE_JSON);
        }
    }, {
        key: "combinePathWithCwd",
        value: function combinePathWithCwd(filePath) {
            return path.join(process.cwd(), filePath);
        }
    }]);
    return FileUtil;
}();

exports.FileUtil = FileUtil;
//# sourceMappingURL=file_util.js.map
