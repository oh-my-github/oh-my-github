/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/jasmine/jasmine.d.ts" />

import {deserializeAs, Deserializable} from "../../src/serialize"

class Car extends Deserializable {
  @deserializeAs("engine") public engine: string;
  @deserializeAs("wheels") public wheels: number;
}

describe("serialize", () => {
  describe("deserialize2", () => {
    it("should parse Car", () => {
      let json = {engine: "M5", wheels: 4};
      let c1 = Car.deserialize(Car, json);

      expect(c1.engine).toEqual(json.engine);
      expect(c1.wheels).toEqual(json.wheels);
    });
  });
});

