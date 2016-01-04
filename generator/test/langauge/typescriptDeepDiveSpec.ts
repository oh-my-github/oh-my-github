/// <reference path="../../../typings/jasmine/jasmine.d.ts" />
"use strict";

/**
 * ref - https://basarat.gitbooks.io/typescript/
 */
describe("TypeScript Deep Dive", () => {
  describe("4.5 Type Assertions", () => {
    it("type assertions", () => {
      interface Foo {
        bar: string;
        baz: number;
      }

      /**
       * type assertions are purely a compile time construct and a way for you to
       * provide hints to the compiler on how you want your code to be analyzed
       */
      var foo = {} as Foo;
      foo.bar = "bar";
      foo.baz = 3;

      expect(foo.bar).toEqual("bar");
      expect(foo.baz).toEqual(3);

      /** valid use case
       *
       * function handler(event: Event) {
       *  // Error : Neither 'Event' not type 'HTMLElement' is assignable to the other
       *  let element = event as HTMLElement;
       * }
       */
    });
  });
});
