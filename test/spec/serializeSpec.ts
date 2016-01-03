/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/lodash/lodash.d.ts" />
/// <reference path="../../typings/jasmine/jasmine.d.ts" />

import {deserialize, Deserializable} from "../../src/serialize";
import {SampleResources} from "./sampleResponse";

class Car extends Deserializable {
  @deserialize public engine: string;
  @deserialize public wheels: number;
}

describe("serialize", () => {
  describe("deserialize", () => {
    it("should parse Car", () => {
      let json = {engine: "M5", wheels: 4};
      let c1 = Car.deserialize(Car, json);

      expect(c1.engine).toEqual(json.engine);
      expect(c1.wheels).toEqual(json.wheels);
    });
  });
});