/// <reference path="../../typings/jasmine/jasmine.d.ts" />

describe("Release Note Spec", () => {

  describe("1.6", () => {

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

    it("Tagged Template Strings for ES3, ES5", () => {
      function oddRawStrings(strs: TemplateStringsArray, n1: number, n2: number) {
        return strs.raw.filter((raw, index) => index % 2 === 1);

      }

      var a = oddRawStrings `Hello \n${123} \t ${456}\n world`;
      expect(a).toEqual([' \\t ']);
    });
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


