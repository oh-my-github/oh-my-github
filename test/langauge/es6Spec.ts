/// <reference path="../../typings/jasmine/jasmine.d.ts" />

/**
 * ref
 *
 * - http://alexperry.io/javascript/2015/09/17/es6-generators-and-asynchronous-javascript.html
 * - https://gist.github.com/jakearchibald/31b89cba627924972ad6
 * - http://devsmash.com/blog/whats-the-big-deal-with-generators
 * - http://www.2ality.com/2015/03/no-promises.html
 * - http://code.runnable.com/VEB6sjQbwKQKL43K/hello-world-for-promises-for-node-js
 */

describe("ES6", () => {
  describe("Generator", () => {

    it("next()", () => {
      function* sayHiAndBye() {
        yield 'hi';
        yield 'bye';
        return 'end';
      }

      let g1 = sayHiAndBye();

      expect(g1.next()).toEqual({value: 'hi', done: false});
      expect(g1.next()).toEqual({value: 'bye', done: false});
      expect(g1.next()).toEqual({value: 'end', done: true});

    });

    it("for of", () => {
      function* foo() {
        yield 1;
        yield 2;
        yield 3;
        return 4;
      }

      let arr: number[] = [];

      for (var value of foo()) {
        arr.push(value);
      }

      expect(arr).toEqual([1, 2, 3]);
      expect(value).toEqual(3); /** important */
    });

    it("Lazy Evaluation", () => {

      function* power2(maxExp: number) {
        let exp = 0;
        while (exp <= maxExp) {
          yield Math.pow(2, exp);
          exp++;
        }
      }

      let g1 = power2(10);
      let result = g1.next();

      while(!g1.next().done) {
        result = g1.next();
      }

      expect(result.value).toEqual(1024);

      let g2 = power2(5);

      for (var value of g2) {}

      expect(value).toEqual(32);
    });

    it("setTimeout", () => {
    });

    it("yield", () => {
      // We need spawn function since we can call Generator.next() infinitely.
      function getResult(url, callback) {
        setTimeout(() => {
          callback("result");
        }, 50);
      }

      function async1(url) {
        return new Promise((resolve, reject) => {
          getResult(url, (result) => resolve(result));
        });
      }

      function* async2(url) {
        const caller = yield;
        getResult(url, result => caller.success(result));
      }
    });
  });

  describe("Promise", () => {
    it("reject", callback => {
      function getPromise() {
        return new Promise<string>((resolve, reject) => {
          reject(new Error("Rejected error"))
        });
      }

      getPromise()
        .then(result => {
          fail();
        })
        .catch(e => {
          callback();
        })
    });

    it("resolve", callback => {
      function getPromise(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
          resolve("resolve");
        }).then((result: string) => {
            return result + "!";
          });
      }

      getPromise()
      .then((result: string) => {
          expect(result).toEqual("resolve!");
          callback();
        })
      .catch(e => fail());
    });

    it("error", callback => {
      function getPromise(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
          throw new Error("error");
        })
      }

      getPromise()
      .then((result: string) => {
          fail();
        })
      .catch((e: Error) => {
          expect(e.message).toEqual("error");
          callback();
        });
    });
  });

  describe("co", () => {
    // https://github.com/tj/co

  });
});
