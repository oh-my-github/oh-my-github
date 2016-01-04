/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />
/// <reference path="../../../typings/lodash/lodash.d.ts" />

"use strict";

import * as _ from "lodash";

describe("lodash", () => {
  describe("isEmpty", () => {
    it("should return given arg is empty", () => {
      expect(_.isEmpty({})).toEqual(true);
      expect(_.isEmpty(undefined)).toEqual(true);
      expect(_.isEmpty(null)).toEqual(true);
      expect(_.isEmpty(3)).toEqual(true);
      expect(_.isEmpty(34567)).toEqual(true);
    });
  });
});
