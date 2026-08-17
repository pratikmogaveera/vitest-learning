# vitest-learning — Learning Notes

Notes grow after each completed phase. Don't edit past sections — append only.

---

## 1. Setup & Basic Unit Tests

### Key Concepts

- **Test runner** — finds `*.test.ts` files, executes each `it`/`test` block, reports pass/fail. Vitest is built on Vite so it understands TypeScript and ESM natively.
- **Pure function** — no side effects, same input always gives same output. Easiest thing to test.
- **`it` vs `test`** — identical, two aliases. `it` reads like English, `test` is more explicit.
- **`expect(x).toBe(y)`** — wraps actual value, checks strict equality (`===`). Fails with a diff if they don't match.
- **`toBe` vs `toEqual`** — `toBe` uses `===` (reference equality for objects). `toEqual` does deep value comparison. Primitives (string, number, boolean) work with `toBe`. Objects and arrays need `toEqual`.
- **`globals: true` in vitest.config** — injects `describe`, `it`, `expect`, `vi` at runtime without imports.
- **`"types": ["vitest/globals"]` in tsconfig** — gives TypeScript the type definitions for those globals. Both must be set — runtime and type-checking are independent.

### APIs Learned

| API                               | What it does                      |
| --------------------------------- | --------------------------------- |
| `describe(name, fn)`              | Groups related tests              |
| `it(name, fn)` / `test(name, fn)` | Defines a single test case        |
| `expect(value).toBe(expected)`    | Strict equality assertion (`===`) |

---

## Q&A

### Why does `toBe` work for strings but fail for objects with the same content?

`toBe` uses `===`. Primitives are compared by value — `"John Doe" === "John Doe"` is `true`. Objects are compared by reference (memory address) — two objects with identical content are still two different objects in memory, so `===` returns `false`. Use `toEqual` for deep value comparison of objects and arrays.

---

## 2. Matchers Deep Dive

### Key Concepts

- **`toEqual`** — deep value equality. Ignores `undefined` properties and object class.
- **`toStrictEqual`** — like `toEqual` but also checks class and treats sparse `undefined` as present.
- **`toBeTruthy` / `toBeFalsy`** — checks JavaScript truthiness, not strict `true`/`false`. `toBe(true)` fails if the value is `1` or `"hello"`; `toBeTruthy` passes.
- **`toBeNull`** — checks `=== null` specifically. Not interchangeable with `toBeUndefined`.
- **`toBeUndefined` / `toBeDefined`** — checks `=== undefined` and the opposite.
- **`toContain`** — array contains a primitive value, or string contains a substring. Does not do deep equality on objects inside arrays (use `toContainEqual` for that).
- **`toHaveLength`** — checks `.length` property on arrays or strings.
- **`toMatchObject`** — partial object match. Passes if required keys/values are present, ignores extra keys.
- **`toThrow`** — must wrap the call in an arrow function. `expect(() => fn()).toThrow()`. Direct call `expect(fn())` crashes the test because the throw happens before `expect` receives anything.
- **Randomness in tests** — avoid random values in test data. Tests should be deterministic — same input, same output, every run.
- **Dividing by zero in JS** — returns `Infinity`, does not throw. Must explicitly guard with `if (y === 0) throw new Error(...)`.

### APIs Learned

| API                    | What it does                                             |
| ---------------------- | -------------------------------------------------------- |
| `toEqual(value)`       | Deep value equality, ignores `undefined` and class       |
| `toStrictEqual(value)` | Deep value equality, checks class and sparse `undefined` |
| `toBeTruthy()`         | Passes for any truthy value                              |
| `toBeFalsy()`          | Passes for any falsy value                               |
| `toBeNull()`           | Passes only for `null`                                   |
| `toBeUndefined()`      | Passes only for `undefined`                              |
| `toBeDefined()`        | Passes for anything that is not `undefined`              |
| `toContain(item)`      | Array contains primitive, or string contains substring   |
| `toHaveLength(n)`      | `.length` equals `n`                                     |
| `toMatchObject(obj)`   | Object contains at least the given keys/values           |
| `toThrow(message?)`    | Function throws, optionally matching error message       |

---

## Q&A

### Why must `toThrow` be wrapped in an arrow function?

`expect(fn())` evaluates `fn()` immediately — if it throws, the error propagates before `expect` is called and the test crashes. Wrapping in `() => fn()` passes a reference; Vitest calls it inside a try/catch and checks the result.

### What's the difference between `toContain` and `toMatchObject`?

`toContain` checks if an array includes a primitive value or a string includes a substring. `toMatchObject` checks if an object has at least the specified keys and values — extra keys are ignored. For checking if an array of objects contains one matching a shape, use `toContainEqual`.

---

## 3. Async Testing

### Key Concepts

- **False green** — a test that passes but isn't actually testing anything. The most dangerous failure mode. Missing `await` is the most common cause.
- **Three patterns for async tests:**
  1. `async/await` — most readable, use for complex tests with multiple assertions
  2. `.resolves` / `.rejects` — cleaner for simple single-assertion cases, still needs `await`
  3. `return promise` — legacy pattern, still valid. Forgetting `return` causes false green.
- **`Promise{}` is truthy** — `expect(promise).toBeTruthy()` always passes, even if the promise is pending or rejects. Never test async values without awaiting.
- **`.rejects` with older pattern** — use `.catch()` not `.then()`. `.then()` only runs on resolution, not rejection.
- **Timing as a signal** — a properly awaited test takes as long as the async operation. A 0ms async test is a red flag.

### APIs Learned

| API                     | What it does                                        |
| ----------------------- | --------------------------------------------------- |
| `async/await` in test   | Pauses test execution until Promise settles         |
| `.resolves.toBe(val)`   | Asserts Promise resolves with value — needs `await` |
| `.rejects.toThrow(msg)` | Asserts Promise rejects with error — needs `await`  |
| `return promise`        | Older pattern — Vitest waits for returned Promise   |

---

## Q&A

### What happens if you forget `await` on `.resolves`?

The assertion is never evaluated — Vitest considers the test done after the synchronous lines run. The test passes vacuously (false green).

### Why does `expect(promise).toBeTruthy()` always pass?

A `Promise` object is truthy regardless of its state. The assertion runs synchronously against the Promise object itself, not its resolved value. Always `await` before asserting.
