/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../node_modules/cerialize/dist/serialize.d.ts" />
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Deserializable = exports.inheritSerialization = exports.deserializeAs = exports.deserialize = exports.serializeAs = exports.serialize = undefined;

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
var cerialize = require("cerialize");
var serialize = exports.serialize = cerialize.serialize;
var serializeAs = exports.serializeAs = cerialize.serializeAs;
var deserialize = exports.deserialize = cerialize.deserialize;
var deserializeAs = exports.deserializeAs = cerialize.deserializeAs;
var inheritSerialization = exports.inheritSerialization = cerialize.inheritSerialization;

var Deserializable = exports.Deserializable = function () {
    function Deserializable() {
        (0, _classCallCheck3.default)(this, Deserializable);
    }

    (0, _createClass3.default)(Deserializable, null, [{
        key: "deserialize",
        value: function deserialize(ctor, json) {
            return cerialize.Deserialize(json, ctor);
        }
    }, {
        key: "deserializeArray",
        value: function deserializeArray(ctor, json) {
            return cerialize.Deserialize(json, ctor);
        }
    }]);
    return Deserializable;
}();
//# sourceMappingURL=serialize.js.map
