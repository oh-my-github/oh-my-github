/// <reference path="../../typings/jasmine/jasmine.d.ts" />
"use strict";

import BasicCalculator from "./BasicCalculator"
import ScientificCalculator from "./ScientificCalculator"

describe("Release Note Spec", () => {
  describe("Collection", () => {
    describe("Array", () => {
      it("should return an empty array after filtering all elems", () => {
        let arr1 = new Array<string>();
        let arr2 = new Array<string>();
        arr2.push("elem1");
        arr2.push("elem2");
        
        expect(arr1.filter(e => e === null).length).toEqual(0);
        expect(arr2.filter(e => !e.startsWith("elem")).length).toEqual(0);
      });
    });
  });
  
  describe("1.7", () => {
    it("`this`", () => {
      let c1 = new BasicCalculator(2)
        .add(3)
        .multiply(2)
        .currentValue();

      expect(c1).toEqual(10);

      let c2 = new ScientificCalculator(2)
        .square()
        .add(3)
        .currentValue();

      expect(c2).toEqual(7);

      /**
       * The `this` type is also useful with intersection types in describing libraries
       * tht use mixin-style patterns to describe inheritence
       *
       * interfcae MyType {
       *   extend<T>(other: T): this & T;
       * }
       */

    });

    it("`async`, `await` support in ES6 targets (Node v4+)", callback => {

      /**
       * `await` suspends the execution until an asynchronous function return promise is
       * fulfilled and unwraps the value from the `Promise` returned
       */
      async function computeAsync(counts: number[]): Promise<number[]> {

        let result: number[] = [];

        for(const c of counts) {
          let computed = await delay(20, c);
          result.push(computed)
        }

        return result;
      }

      async function delay(millis: number, count: number): Promise<number> { /* promised computation */
        return new Promise<number>(resolve => {
          setTimeout(() => {
            resolve(count + 1)
          }, millis);
        })
      }

      /**
       * async function returns Promise<T>
       */
      computeAsync([1, 2, 3])
        .then(computed => {
          expect(computed).toEqual([2, 3, 4]);
          callback();
        }).catch(err => fail());
    });
  });
  
  describe("1.6", () => {

    it("Intersection types", () => {
      /** intersection type is the logical complement of union types: A & B */

      function extend<T, U>(first: T, second: U): T & U {
        let result = <T & U> {}

        for (let prop in first) {
          result[prop] = first[prop];
        }

        for (let prop in second) {
          if (!result.hasOwnProperty(prop)) {
            result[prop] = second[prop];
          }
        }

        return result;
      }

      let x = extend({ a: "HELLO" }, { b: 42 });

      let a = x.a;
      let b = x.b;

      expect(a).toEqual("HELLO");
      expect(b).toEqual(42);
    });

    it("Generic with intersection types", () => {
      type LinkedList<T> = T & { next: LinkedList<T> };

      class Person {
        public name: string;
        constructor(name: string) {
          this.name = name;
        }
      }

      let people: LinkedList<Person>;
      expect(() => people.next.name).toThrowError(TypeError);

      interface A { a: string }
      interface B { b: string }
      interface C { c: string }

      let abc: A & B & C = {
        a: "a", b: "b", c: "c"
      };
    });

    it("Local type declarations", () => {
      /**
       * local class, interface, enum and type alias can be declared inside function
       */

      if (true) {
        interface T { x: string }
        let v: T;
        expect(() =>  v.x = "hello").toThrowError(TypeError);
      } else {
        interface T { x: number }
        // let v: T; // unreached code compile error
        // v.x = 3;
      }

      interface Point { x: number; y: number; }
      function getPointFactory(x: number, y: number) {
        class P { x = x; y = y; }

        return P;
      }

      let PointZero = getPointFactory(0, 0);
      let PointOne  = getPointFactory(1, 1);

      /** the inferred type of a function may be a type declared locally with in the function */
      let p1 = new PointZero();
      let p2 = new PointOne();

      /**
       * local types may reference enclosing type params and local class and interfaces
       * may themselves be generic
       */
      function f3() {
        function f<X, Y>(x: X, y: Y) {
          class C { public x = x; public y = y; }
          return C;
        }

        let C = f(10, "hello");
        let v = new C();

        let k: number = v.x; // number
        let h: string = v.y; // string
      }
    });

    it("Class expressions", () => {
      /**
       * In a class expression, the class name is optional
       */

      let Point = class {
        constructor(public x: number, public y: number) {}

        public length() {
          return Math.sqrt(this.x * this.x + this.y * this.y);
        }
      }

      let p = new Point(3, 4); // p has anonymous class type
      expect(p.length()).toEqual(Math.sqrt(3 * 3 + 4 * 4));
    });

    it("Extending expressions", () => {
      /** TypeScript 1.6 adds support for classes extending arbitrary expression
       * that computes a constructor function.
       *
       * This means that built-in types can be extended inclass declarations.
       *
       */

      class MyArray extends Array<number> {}
      class MyError extends Error {}

      class ThingA {
        getGreeting() { return "Hello from A"; }
      }

      class ThingB {
        getGreeting() { return "Hello from B"; }
      }

      interface Greeter {
        getGreeting(): string;
      }

      interface GreeterConstructor {
        new (): Greeter;
      }

      function getGreeterBase(): GreeterConstructor {
        return Math.random() >= 0.5 ? ThingA : ThingB;
      }

      class GreeterTest extends getGreeterBase() {
        sayHello() { return this.getGreeting(); }
      }

      let arr = new MyArray();
      let e = new MyError();

      let g = new GreeterTest();
      let s = g.sayHello();
      expect(s.startsWith("Hello from")).toEqual(true);
    });

    it("`abstract` classes and methods", () => {
      // class Derived1 extends Base {} // compile error

      class Derived2 extends Base {
        getThing() { return 'world'; }
        foo() {
          return super.getOtherThing();
        }
      }


      let x = new Derived2();
      let y: Base = new Derived2();

      expect(x.foo()).toEqual(x.getOtherThing());
      expect(y.getThing()).toEqual("world");
      expect(y.getOtherThing()).toEqual("hello");
    });
    
    it("Generic type aliases", () => {
      type Lazy<T> = T | (() => T);
      let s: Lazy<string>;

      s = "eager";
      expect(s).toEqual("eager");
      let s2: Lazy<string> = () => "lazy";

      interface Tuple<A, B> {
        a: A;
        b: B;
      }

      type Pair<T> = Tuple<T, T>;
    });

    it("Stricter object literal assignment checks", () => {
      let x: { foo: number };
      // x = { foo: 1, baz: 2}; // compile error

      let y: { foo: number, bar?: number };
      // y = { foo: 1, baz: 2 }; // compile error

      let z: { foo: number, [x: string]: any };
      z = { foo: 1, baz: 2 }; // `baz` matched by index signature

      expect(z).hasOwnProperty("foo");
      expect(z).hasOwnProperty("baz");
    });

    it("Merging ambient class and interface declaration", () => {

      function bar(foo: Foo) {
        foo.x = 1;   // declared in the class `Foo`
        foo.y = "2"; // declared in the interface `Foo`
      }
    });

    it("User-defined type guard functions", () => {
      //function isCat(a: any): a is Cat {
      //  return a.name === "kitty";
      //};
      //
      //var x: Cat | Dog;
      //
      //if (isCat(x)) {
      //  x.meow();
      //}
    });
  });

  describe("1.5", () => {
    it("ES6 Modules", () => {

    });
    
    it("Desturcturing in declarations and assignments", () => {
      /** declarations */
      let xyzObj = {
        x: 3, y: 4, z: 5
      };

      let { x, y, z } = xyzObj;

      expect(x).toEqual(3);
      expect(y).toEqual(4);
      expect(z).toEqual(5);

      let hjkArr: number[] = [3, 4];
      let [ h, j, k = 10 ] = hjkArr;

      expect(h).toEqual(3);
      expect(j).toEqual(4);
      expect(k).toEqual(10);

      function drawText({ text = "", location: [x, y] = [0, 0], bold = false}) {
        return { text, location: [x, y], bold };
      }

      let {text, location, bold} = drawText({
        text: "someText", location: [1, 2, 3]
      });

      expect(text).toEqual("someText");
      expect(location).toEqual([1, 2]);
      expect(bold).toEqual(false);

      /** default parameters */
      function drawText2(text2: string = "",
                         location2: number[] = [1, 2],
                         bold2: boolean = false) {

        return { text, location, bold };
      }

      /** assignments */
      let a = 1;
      let b = 2;

      [a, b] = [b, a];
    });

    it("`namespace` keyword", () => {

    });
    
    it("Decorators", () => {
      /**
       * an expression
       * that evaluates to a function
       * that takes the target, name, and property descriptor as arguments
       * and optionally returns a property descriptor to install on the target obejct
       */
    });

    it("Computed Properties", () => {
      type NeighborMap = { [name: string]: Node };
      type Node = { name: string, neighbors: NeighborMap }

      // until typescript 1.4
      function makeNode1(name: string, initialNeighbor: Node): Node {
        let neighbors: NeighborMap = {};
        neighbors[initialNeighbor.name] = initialNeighbor;
        return { name: name, neighbors: neighbors };
      }

      function makeNode(name: string, initialNeighbor: Node): Node {
        return {
          name: name,
          neighbors: {
            [initialNeighbor.name]: initialNeighbor
          }
        };
      }
    });

    //it("Tagged Template Strings for ES3, ES5", () => {
    //  function oddRawStrings(strs: TemplateStringsArray, n1: number, n2: number) {
    //    return strs.raw.filter((raw, index) => index % 2 === 1);
    //
    //  }
    //
    //  var a = oddRawStrings `Hello \n${123} \t ${456}\n world`;
    //  expect(a).toEqual([' \\t ']);
    //});
  });

  describe("1.4", () => {
    it("Union Types", () => {

      var r = new RunOptions("git", ["commit", "-m", "message"]);
      expect(r.getOptionCount()).toEqual(3);
    });

    it("Stricter Generics", () => {
      function equal<T>(lhs: T, rhs: T): boolean {
        return lhs === rhs;
      }

      // equal(42, 'hello'); // doesn't compile

      function choose1<T>(a: T, b: T): T {
        return Math.random() > 0.5 ? a : b;
      }

      var b = choose1<string|number>('hello', 42);

      function choose2<T, U>(a: T, b: U): T|U {
        return Math.random() > 0.5 ? a : b;
      }

      var c: string = choose2('bar', 'foo');
      var d: string|number = choose2('bar', 32);
    });

    it("`let` declarations", () => {
      /**
       * In Javascript, `var` declarations are "hoisted" to the top of their enclosing scope.
       * This can result in confusing bugs
       *
       * A `let` variable can only be referred to after its declaration and is scoped to
       * the syntactic block where is is defined.
       */

      let x = 3;
    });

    it("`const` declarations", () => {
      const halfPi: number = Math.PI / 2;
    });

    it("Type Guard", () => {
      var x: any;

      if (typeof x === 'string') {
        // x.unknown(); // compiler error
      }

      expect(() => x.unknown()).toThrowError(TypeError);


      var pet: Dog|Cat = new Cat();

      if (pet instanceof Cat) pet.meow();
      else {
        // pet.meow; // compile error
      }
    });

    it("Type Alias", () => {
      type PrimitiveArray = Array<string|number|boolean>;
      type Callback = () => void;

      function takeCallback(cb: Callback): void {}
      takeCallback(() => {})
    });

    it("`const enum`: Completely inlined enums", () => {
      const enum Suit { Clubs, Diamonds, Hearts, Spades }
      var d: Suit = Suit.Diamonds; // compiles to exactly `var d = 1;`

      enum MyFlags {
        None = 0,
        Neat = 1,
        Cool = 2,
        Awesome = 4,
        Best = Neat | Cool | Awesome
      }

      var b = MyFlags.Best;
      expect(b).toEqual(7);
    });
  });

  describe("1.3", () => {
    it("Tuple Types", () => {
      var x: [string, number] = ['hello', 10];

      expect(x[0]).toBe('hello');
      expect(x[1]).toBe(10);

      x[3] = 'world';

      expect(x[3]).toBe('world');
      expect(x[3]).toBe('world');

      expect(() => x[5].toString()).toThrowError(TypeError);
    });

    it("Protected", () => {
      var t = new MyThing();
      // t.doSomething();
    });
  });
});

class Thing {
  protected doSomething() {}
}

class MyThing extends Thing {
  public myMethod() {
    this.doSomething();
  }
}

class RunOptions {
  constructor(public program: string, public options :string|string[]) {}
  public getOptionCount(): number {
    if (typeof this.options === 'string') return 1;
    else return this.options.length;
  }
}

class Dog { woof() {} }
class Cat { meow() {} }

class C {
 @readonly
 @enumerable(false)

  method() {}
}

function readonly(target, key, descriptor) {
  descriptor.writable = false;
}

function enumerable(value) {
  return function (target, key, descriptor) {
    descriptor.enumerable = value;
  }
}

namespace MyMath {
  export function add1(x, y) {}
}

module MyMath {
  export function add2(x, y) {}
}

declare class Foo {
  public x: number;
}

interface Foo {
  y: string;
}

abstract class Base {
  abstract getThing(): string;
  getOtherThing() { return 'hello'; }
}

