/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../node_modules/cerialize/dist/serialize.d.ts" />
"use strict";

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cerialize = require("cerialize");
exports.serialize = cerialize.serialize;
exports.serializeAs = cerialize.serializeAs;
exports.deserialize = cerialize.deserialize;
exports.deserializeAs = cerialize.deserializeAs;
exports.inheritSerialization = cerialize.inheritSerialization;

var Deserializable = function () {
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

exports.Deserializable = Deserializable;
//# sourceMappingURL=serialize.js.map
