/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/fs-extra/fs-extra.d.ts" />
/// <reference path="../../typings/commander/commander.d.ts" />
/// <reference path="../../typings/circular-json/circular-json.d.ts" />
"use strict";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var __decorate = undefined && undefined.__decorate || function (decorators, target, key, desc) {
    var c = arguments.length,
        r = c < 3 ? target : desc === null ? desc = (0, _getOwnPropertyDescriptor2.default)(target, key) : desc,
        d;
    if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof3.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
        if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    }return c > 3 && r && (0, _defineProperty2.default)(target, key, r), r;
};
var CircularJSON = require("circular-json");
var path = require("path");
var browserSync = require("browser-sync");
var bs = browserSync.create();
var file_util_1 = require("./file_util");
var nodegit_util_1 = require("./nodegit_util");
var file_util_2 = require("./file_util");
var serialize_1 = require("./serialize");
var profile_1 = require("./profile");
var util_1 = require("./util");

var OptionSetting = function OptionSetting(specifiers, description) {
    (0, _classCallCheck3.default)(this, OptionSetting);

    this.specifiers = specifiers;
    this.description = description;
};

exports.OptionSetting = OptionSetting;

var GenerateOptions = function GenerateOptions() {
    (0, _classCallCheck3.default)(this, GenerateOptions);
};

GenerateOptions.GENERATE_OPTION_SPECIFIER_IGNORE_REPOS = "-i, --ignore [repository]";
GenerateOptions.GENERATE_OPTION_IGNORE_REPOS = new OptionSetting(GenerateOptions.GENERATE_OPTION_SPECIFIER_IGNORE_REPOS, "ignore specified repositories");
exports.GenerateOptions = GenerateOptions;

var CommandSetting = function CommandSetting(specifiers, description, action, alias) {
    (0, _classCallCheck3.default)(this, CommandSetting);

    this.specifiers = specifiers;
    this.description = description;
    this.action = action;
    this.alias = alias;
};

CommandSetting.COMMAND_INIT = new CommandSetting("init <user> <repo>", "initialize `oh-my-github.json`", function (user, repo) {
    try {
        console.log("\n");
        util_1.Log.info("Initializing `oh-my-github.json`");
        console.log("\n");
        var profPath = file_util_2.FileUtil.getProfilePath();
        var prof = profile_1.Profile.deserialize(profile_1.Profile, file_util_2.FileUtil.readFileIfExist(file_util_2.FILE_PATH_PROFILE_TEMPLATE_JSON));
        prof._$meta.github_repository = repo;
        prof._$meta.github_user = user;
        file_util_2.FileUtil.writeFileIfNotExist(profPath, prof);
        util_1.Util.exitProcess();
    } catch (error) {
        util_1.Util.reportErrorAndExit(error);
    }
});
CommandSetting.COMMAND_GENERATE = new CommandSetting("generate <token>", "fill `oh-my-github.json` using github API", function (token, options) {
    console.log("\n");
    util_1.Log.info("Collecting Github Info...");
    var profPath = null;
    var prevProf = null;
    try {
        profPath = file_util_2.FileUtil.getProfilePath();
        prevProf = file_util_2.FileUtil.readFileIfExist(profPath);
    } catch (error) {
        util_1.Util.reportErrorAndExit(error);
    }
    profile_1.createProfile(token, prevProf, options.ignore).then(function (currentProf) {
        file_util_2.FileUtil.overwriteFile(profPath, currentProf);
        util_1.Log.info("`oh-my-github.json` was created");
        console.log("\n");
        util_1.Util.exitProcess();
    }).catch(function (error) {
        util_1.Util.reportErrorAndExit(error);
    });
});
CommandSetting.COMMAND_PREVIEW = new CommandSetting("preview", "preview your github profile", function () {
    /** assert if a profile json exists */
    try {
        file_util_2.FileUtil.readFileIfExist(file_util_2.FileUtil.getProfilePath());
        bs.init(file_util_1.BS_OPTION);
    } catch (error) {
        util_1.Util.reportErrorAndExit(error);
    }
});
CommandSetting.COMMAND_PUBLISH = new CommandSetting("publish", "publish gh-pages using the generated profile", function () {
    try {
        var profPath = file_util_2.FileUtil.getProfilePath();
        var profile = file_util_2.FileUtil.readFileIfExist(profPath);
        var user = profile._$meta.github_user;
        var repo = profile._$meta.github_repository;
        if (!user || user === "") util_1.Util.reportMessageAndExit("invalid user name `" + user + "`");
        if (!repo || repo === "") util_1.Util.reportMessageAndExit("invalid repo name `" + repo + "`");
        nodegit_util_1.publish(user, repo).then(function () {
            return util_1.Util.exitProcess();
        }).catch(function (error) {
            return console.log(error);
        });
    } catch (error) {
        util_1.Util.reportErrorAndExit(error);
    }
});
exports.CommandSetting = CommandSetting;

var ParsedOption = function ParsedOption() {
    (0, _classCallCheck3.default)(this, ParsedOption);
};

__decorate([serialize_1.deserialize], ParsedOption.prototype, "flags", void 0);
__decorate([serialize_1.deserialize], ParsedOption.prototype, "required", void 0);
__decorate([serialize_1.deserialize], ParsedOption.prototype, "optional", void 0);
__decorate([serialize_1.deserialize], ParsedOption.prototype, "bool", void 0);
__decorate([serialize_1.deserialize], ParsedOption.prototype, "short", void 0);
__decorate([serialize_1.deserialize], ParsedOption.prototype, "long", void 0);
__decorate([serialize_1.deserialize], ParsedOption.prototype, "description", void 0);
exports.ParsedOption = ParsedOption;

var ParsedCommand = function (_serialize_1$Deserial) {
    (0, _inherits3.default)(ParsedCommand, _serialize_1$Deserial);

    function ParsedCommand() {
        (0, _classCallCheck3.default)(this, ParsedCommand);
        return (0, _possibleConstructorReturn3.default)(this, (0, _getPrototypeOf2.default)(ParsedCommand).apply(this, arguments));
    }

    return ParsedCommand;
}(serialize_1.Deserializable);

__decorate([serialize_1.deserializeAs("_name")], ParsedCommand.prototype, "name", void 0);
__decorate([serialize_1.deserializeAs("_description")], ParsedCommand.prototype, "description", void 0);
__decorate([serialize_1.deserializeAs(ParsedCommand)], ParsedCommand.prototype, "commands", void 0);
__decorate([serialize_1.deserializeAs(ParsedOption)], ParsedCommand.prototype, "options", void 0);
exports.ParsedCommand = ParsedCommand;

var CommandFactory = function () {
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
            parser.version(file_util_2.GENERATOR_VERSION);
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
                util_1.Util.reportMessageAndExit("unknown command: " + command + "\n");
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

exports.CommandFactory = CommandFactory;
//# sourceMappingURL=command.js.map
