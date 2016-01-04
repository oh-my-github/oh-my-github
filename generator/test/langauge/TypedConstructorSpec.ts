/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
/// <reference path="../../../typings/node/node.d.ts" />

interface BasicConstructor<T> {
  new (): T
}

class Factory {
  public static generate<T>(ctor: BasicConstructor<T>): T {
    return new ctor();
  }
}

class Car {
  public engine: string;
  public wheels: number;
}

describe("Factory", () => {
  describe("generate", () => {
    it("should create Car instance", () => {
      let car: Car = Factory.generate(Car);
      expect(car instanceof Car).toBeTruthy();
    }); 
  });
});



