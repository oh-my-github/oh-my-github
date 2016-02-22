'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Log = exports.Util = undefined;

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _chalk = require('chalk');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _unionBy = require('lodash.unionby'); /// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/chalk/chalk.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />

var indent = '  ';

var Util = exports.Util = function () {
    function Util() {
        (0, _classCallCheck3.default)(this, Util);
    }

    (0, _createClass3.default)(Util, null, [{
        key: 'copyObject',
        value: function copyObject(object) {
            return JSON.parse((0, _stringify2.default)(object));
        }
    }, {
        key: 'unionBy',
        value: function unionBy(ts1, ts2, filter) {
            return _unionBy(ts1, ts2, filter);
        }
    }, {
        key: 'reportErrorAndExit',
        value: function reportErrorAndExit(error) {
            Log.red(indent + '[' + error.name + '] ', error.message);
            process.exit(-1);
        }
    }, {
        key: 'reportMessageAndExit',
        value: function reportMessageAndExit(message) {
            Log.red(indent + '[ERROR] ', message);
            process.exit(-1);
        }
    }, {
        key: 'exitProcess',
        value: function exitProcess() {
            process.exit(1);
        }
    }]);
    return Util;
}();

var Log = exports.Log = function () {
    function Log() {
        (0, _classCallCheck3.default)(this, Log);
    }

    (0, _createClass3.default)(Log, null, [{
        key: 'blue',
        value: function blue(tag, message) {
            console.log('' + (0, _chalk.blue)(tag) + message);
        }
    }, {
        key: 'red',
        value: function red(tag, message) {
            console.log('' + (0, _chalk.red)(tag) + message);
        }
    }, {
        key: 'green',
        value: function green(tag, message) {
            console.log('' + (0, _chalk.green)(tag) + message);
        }
    }, {
        key: 'yellow',
        value: function yellow(tag, message) {
            console.log('' + (0, _chalk.yellow)(tag) + message);
        }
    }, {
        key: 'magenta',
        value: function magenta(tag, message) {
            console.log('' + (0, _chalk.magenta)(tag) + message);
        }
    }, {
        key: 'blueReverse',
        value: function blueReverse(tag, message) {
            console.log('' + tag + (0, _chalk.blue)(message));
        }
    }, {
        key: 'redReverse',
        value: function redReverse(tag, message) {
            console.log('' + tag + (0, _chalk.red)(message));
        }
    }, {
        key: 'greenReverse',
        value: function greenReverse(tag, message) {
            console.log('' + tag + (0, _chalk.green)(message));
        }
    }, {
        key: 'yellowReverse',
        value: function yellowReverse(tag, message) {
            console.log('' + tag + (0, _chalk.yellow)(message));
        }
    }, {
        key: 'magentaReverse',
        value: function magentaReverse(tag, message) {
            console.log('' + tag + (0, _chalk.magenta)(message));
        }
    }, {
        key: 'info',
        value: function info(message) {
            Log.green(indent + '[INFO] ', message);
        }
    }, {
        key: 'warn',
        value: function warn(message) {
            Log.red(indent + '[WARN] ', message);
        }
    }]);
    return Log;
}();
//# sourceMappingURL=util.js.map
