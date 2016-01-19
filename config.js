"use strict";

/**
 * since config.js are `require`d at runtime, we can't use ES6 string interpolation
 */
var ALL_SPEC_TS   = "**/*.spec.ts";
var ALL_SPEC_D_TS = "**/*.spec.d.ts";
var ALL_TS        = "**/*.ts";
var ALL_D_TS      = "**/*.d.ts";
var ALL_JS        = "**/*.js";
var ALL_JS_MAP    = "**/*.js.map";
var ALL_JSX       = "**/*.jsx";
var ALL_SPEC_JS   = "**/*.spec.js";

var DIR_GENERATOR = "generator";
var DIR_VIEWER = "viewer";
var DIR_BUILD = "build";
var DIR_DIST = "dist";
var DIR_RESOURCE = "resource";
var DIR_BOWER = "bower_components";
var DIR_SRC = "src";
var DIR_TEST = "test";
var DIR_SPEC = "__spec__";
var DIR_APP = "app";
var DIR_STYLE = "style";

/** composed dir */

var DIR_BUILD_VIEWER    = DIR_BUILD + "/" + DIR_VIEWER;
var DIR_BUILD_GENERATOR = DIR_BUILD + "/" + DIR_GENERATOR;
var DIR_GENERATOR_SRC   = DIR_GENERATOR + "/" + DIR_SRC;
var DIR_GENERATOR_TEST  = DIR_GENERATOR + "/" + DIR_TEST;
var DIR_VIEWER_APP = DIR_VIEWER + "/" + DIR_APP;
var DIR_VIEWER_STYLE = DIR_VIEWER + "/" + DIR_STYLE;

module.exports = {
  "FILE": {
    "GENERATOR": {
      "SRC_TS": DIR_GENERATOR_SRC + "/" + ALL_TS,
      "SRC_D_TS": DIR_GENERATOR_SRC + "/" + ALL_D_TS,
      "SRC_JS":  DIR_GENERATOR_SRC + "/" + ALL_JS,
      "SRC_JS_MAP": DIR_GENERATOR_SRC + "/" + ALL_JS_MAP,

      "TEST_TS": DIR_GENERATOR_TEST + "/" + ALL_TS,
      "TEST_D_TS": DIR_GENERATOR_TEST + "/" + ALL_D_TS,
      "TEST_JS":  DIR_GENERATOR_TEST + "/" + ALL_JS,
      "TEST_JS_MAP": DIR_GENERATOR_TEST + "/" + ALL_JS_MAP,

      "BUILD_SRC_JS":  DIR_BUILD + "/" + DIR_GENERATOR_SRC + "/" + ALL_JS,
      "BUILD_TEST_JS": DIR_BUILD + "/" + DIR_GENERATOR_TEST + "/" + ALL_JS
    },

    "VIEWER": {
      "ALL_FILES": DIR_VIEWER + "/**/*.*",
      "ALL_FILES_JSX": DIR_VIEWER_APP + "/" + ALL_JSX,
      "ALL_FILES_SPEC": DIR_VIEWER_APP + "/" + ALL_SPEC_JS,

      "ENTRY_JSX": DIR_VIEWER_APP + "/index.jsx",
      "ENTRY_HTML": DIR_VIEWER + "/index.html",
      "ENTRY_CSS": DIR_VIEWER_STYLE + "/app.css",

      "BUILD_ENTRY_JS": DIR_BUILD_VIEWER + "/app/index.js",
      "BUILD_ENTRY_CSS": DIR_BUILD_VIEWER + "/style/app.css",
      "BUILD_TEST_JS": DIR_BUILD_VIEWER + "/app/**/*.spec.js"
    },

    "IGNORED_ALL_D_TS": "!" + ALL_D_TS,

    "PACKAGE_JSON": "package.json",
    "PROFILE_JSON": "oh-my-github.json",
    "PROFILE_TEMPLATE_JSON": DIR_RESOURCE + "/oh-my-github.template.json"
  },

  "DIR": {
    "BOWER_COMPONENTS": DIR_BOWER,
    "GENERATOR": DIR_GENERATOR,
    "VIEWER": DIR_VIEWER,

    "BUILD_GENERATOR": DIR_BUILD_GENERATOR,
    "BUILD_GENERATOR_SRC": DIR_BUILD_GENERATOR + "/" + DIR_SRC,
    "BUILD_VIEWER": DIR_BUILD_VIEWER,

    "BUILD": DIR_BUILD,
    "RESOURCE": DIR_RESOURCE,

    "DIST_GENERATOR": DIR_DIST + "/" + DIR_GENERATOR,
    "DIST_VIEWER": DIR_DIST + "/" + DIR_VIEWER,
    "SPEC": DIR_SPEC
  },

  "ASSERTED_ENV": [
    "GITHUB_TOKEN"
  ]
};
