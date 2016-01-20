/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/fs-extra/fs-extra.d.ts" />
/// <reference path="../../typings/commander/commander.d.ts" />
/// <reference path="../../typings/circular-json/circular-json.d.ts" />
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.CommandFactory = exports.ParsedCommand = exports.ParsedOption = exports.CommandSetting = exports.GenerateOptions = exports.OptionSetting = undefined;

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _defineProperty = require("babel-runtime/core-js/object/define-property");

var _defineProperty2 = _interopRequireDefault(_defineProperty);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _getOwnPropertyDescriptor = require("babel-runtime/core-js/object/get-own-property-descriptor");

var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);

var _circularJson = require("circular-json");

var CircularJSON = _interopRequireWildcard(_circularJson);

var _file_util = require("./file_util");

var _nodegit_util = require("./nodegit_util");

var _serialize = require("./serialize");

var _profile = require("./profile");

var _util = require("./util");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var path = require("path");
var browserSync = require("browser-sync");
var bs = browserSync.create();

var OptionSetting = exports.OptionSetting = function OptionSetting(specifiers, description) {
    (0, _classCallCheck3.default)(this, OptionSetting);

    this.specifiers = specifiers;
    this.description = description;
};

var GenerateOptions = exports.GenerateOptions = function GenerateOptions() {
    (0, _classCallCheck3.default)(this, GenerateOptions);
};

GenerateOptions.GENERATE_OPTION_SPECIFIER_IGNORE_REPOS = "-i, --ignore [repository]";
GenerateOptions.GENERATE_OPTION_IGNORE_REPOS = new OptionSetting(GenerateOptions.GENERATE_OPTION_SPECIFIER_IGNORE_REPOS, "ignore specified repositories");

var CommandSetting = exports.CommandSetting = function CommandSetting(specifiers, description, action, alias) {
    (0, _classCallCheck3.default)(this, CommandSetting);

    this.specifiers = specifiers;
    this.description = description;
    this.action = action;
    this.alias = alias;
};

CommandSetting.COMMAND_INIT = new CommandSetting("init <user> <repo>", "initialize `oh-my-github.json`", function (user, repo) {
    try {
        var profPath = _file_util.FileUtil.getProfilePath();
        var prof = _profile.Profile.deserialize(_profile.Profile, _file_util.FileUtil.readFileIfExist(_file_util.FILE_PATH_PROFILE_TEMPLATE_JSON));
        prof._$meta.github_repository = repo;
        prof._$meta.github_user = user;
        _file_util.FileUtil.writeFileIfNotExist(profPath, prof);
        _util.Util.exitProcess();
    } catch (error) {
        _util.Util.reportErrorAndExit(error);
    }
});
CommandSetting.COMMAND_GENERATE = new CommandSetting("generate <token>", "fill `oh-my-github.json` using github API", function (token, options) {
    var profPath = null;
    var prevProf = null;
    try {
        profPath = _file_util.FileUtil.getProfilePath();
        prevProf = _file_util.FileUtil.readFileIfExist(profPath);
    } catch (error) {
        _util.Util.reportErrorAndExit(error);
    }
    (0, _profile.createProfile)(token, prevProf, options.ignore).then(function (currentProf) {
        _file_util.FileUtil.overwriteFile(profPath, currentProf);
        _util.Util.exitProcess();
    }).catch(function (error) {
        _util.Util.reportErrorAndExit(error);
    });
});
CommandSetting.COMMAND_PREVIEW = new CommandSetting("preview", "preview your github profile", function () {
    /** assert if a profile json exists */
    try {
        _file_util.FileUtil.readFileIfExist(_file_util.FileUtil.getProfilePath());
        bs.init(_file_util.BS_OPTION);
    } catch (error) {
        _util.Util.reportErrorAndExit(error);
    }
});
CommandSetting.COMMAND_PUBLISH = new CommandSetting("publish", "publish gh-pages using the generated profile", function () {
    try {
        var profPath = _file_util.FileUtil.getProfilePath();
        var profile = _file_util.FileUtil.readFileIfExist(profPath);
        var user = profile._$meta.github_user;
        var repo = profile._$meta.github_repository;
        if (!user || user === "") _util.Util.reportMessageAndExit("invalid user name `" + user + "`");
        if (!repo || repo === "") _util.Util.reportMessageAndExit("invalid repo name `" + repo + "`");
        (0, _nodegit_util.publish)(user, repo).then(function () {
            return _util.Util.exitProcess();
        }).catch(function (error) {
            return console.log(error);
        });
    } catch (error) {
        _util.Util.reportErrorAndExit(error);
    }
});

var ParsedOption = exports.ParsedOption = function ParsedOption() {
    (0, _classCallCheck3.default)(this, ParsedOption);
};

__decorate([_serialize.deserialize], ParsedOption.prototype, "flags", void 0);
__decorate([_serialize.deserialize], ParsedOption.prototype, "required", void 0);
__decorate([_serialize.deserialize], ParsedOption.prototype, "optional", void 0);
__decorate([_serialize.deserialize], ParsedOption.prototype, "bool", void 0);
__decorate([_serialize.deserialize], ParsedOption.prototype, "short", void 0);
__decorate([_serialize.deserialize], ParsedOption.prototype, "long", void 0);
__decorate([_serialize.deserialize], ParsedOption.prototype, "description", void 0);

var ParsedCommand = exports.ParsedCommand = function (_Deserializable) {
    (0, _inherits3.default)(ParsedCommand, _Deserializable);

    function ParsedCommand() {
        (0, _classCallCheck3.default)(this, ParsedCommand);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ParsedCommand).apply(this, arguments));
    }

    return ParsedCommand;
}(_serialize.Deserializable);

__decorate([(0, _serialize.deserializeAs)("_name")], ParsedCommand.prototype, "name", void 0);
__decorate([(0, _serialize.deserializeAs)("_description")], ParsedCommand.prototype, "description", void 0);
__decorate([(0, _serialize.deserializeAs)(ParsedCommand)], ParsedCommand.prototype, "commands", void 0);
__decorate([(0, _serialize.deserializeAs)(ParsedOption)], ParsedCommand.prototype, "options", void 0);

var CommandFactory = exports.CommandFactory = function () {
    function CommandFactory() {
        (0, _classCallCheck3.default)(this, CommandFactory);
    }

    (0, _createClass3.default)(CommandFactory, null, [{
        key: "create",
        value: function create(argv) {
            var parser = require("commander");
            var PROGRAM_NAME = "omg";
            process.title = PROGRAM_NAME;
            parser._name = PROGRAM_NAME;
            parser.version(_file_util.GENERATOR_VERSION);
            parser.command(CommandSetting.COMMAND_INIT.specifiers).description(CommandSetting.COMMAND_INIT.description).action(CommandSetting.COMMAND_INIT.action);
            parser.command(CommandSetting.COMMAND_GENERATE.specifiers).description(CommandSetting.COMMAND_GENERATE.description).option(GenerateOptions.GENERATE_OPTION_IGNORE_REPOS.specifiers, GenerateOptions.GENERATE_OPTION_IGNORE_REPOS.description, function (val, memo) {
                memo.push(val);return memo;
            }, []).action(CommandSetting.COMMAND_GENERATE.action);
            parser.command(CommandSetting.COMMAND_PREVIEW.specifiers).description(CommandSetting.COMMAND_PREVIEW.description).action(CommandSetting.COMMAND_PREVIEW.action);
            parser.command(CommandSetting.COMMAND_PUBLISH.specifiers).description(CommandSetting.COMMAND_PUBLISH.description).action(CommandSetting.COMMAND_PUBLISH.action);
            parser.on("--help", function () {
                console.log("  Examples:");
                console.log("");
                console.log("    $ omg init 1ambda oh-my-github");
                console.log("    $ omg generate 1b94910adb394014939fal1bfd193bfd762c4191");
                console.log("    $ omg preview");
                console.log("    $ omg publish");
                console.log("");
            });
            parser.command("*").action(function (command) {
                console.log("");
                _util.Util.reportMessageAndExit("unknown command: " + command + "\n");
            });
            /** use circular-json to avoid cyclic references */
            var serialized = CircularJSON.stringify(parser.parse(argv));
            var circularDeserialized = CircularJSON.parse(serialized);
            var deserialized = ParsedCommand.deserialize(ParsedCommand, circularDeserialized);
            return deserialized;
        }
    }]);
    return CommandFactory;
}();
//# sourceMappingURL=command.js.map
