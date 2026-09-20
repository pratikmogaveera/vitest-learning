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


---

## 4. Mocking Fundamentals

### Key Concepts

- **Why mocking exists** — isolate the unit under test. You test what your code *does* with a dependency, not whether the dependency itself works.
- **`vi.fn()`** — creates a standalone fake function from nothing. Use when the dependency is injected (passed as a parameter). No original exists — you built it.
- **`vi.spyOn(obj, 'method')`** — wraps a function that already exists on an object. The original is preserved and callable unless you override with `.mockReturnValue()`. Use when the code under test reaches into an object/module directly.
- **`.mockReturnValue(val)`** — overrides what the mock returns. The original function body never runs. The spy still records the call.
- **`.mockResolvedValue(val)`** — same as `mockReturnValue` but wraps the value in a resolved Promise. Use for async functions.
- **Default return value** — `vi.fn()` returns `undefined` by default. Always set a return value if your code uses the result.
- **Where to set `mockReturnValue`** — set it inside the test that needs it, not at definition level. Keeps tests self-contained and avoids relying on mock state surviving cleanup.
- **`vi.clearAllMocks()`** — resets call history only (calls, args, results). Mock implementations set via `mockReturnValue` survive. Use when you want call records wiped but return values to persist.
- **`vi.resetAllMocks()`** — resets call history AND removes mock implementations (`mockReturnValue`, `mockImplementation`, etc.). Use when you don't want any return value leaking between tests.
- **`vi.restoreAllMocks()`** — everything `resetAllMocks` does, plus restores `vi.spyOn` mocks to their original implementation.

### `vi.fn()` vs `vi.spyOn()` — when to use which

| How code accesses the function | Tool |
|---|---|
| Injected as a parameter | `vi.fn()` |
| Pulled from an object/module directly | `vi.spyOn()` |

### APIs Learned

| API | What it does |
|---|---|
| `vi.fn()` | Creates a standalone mock function |
| `vi.spyOn(obj, 'method')` | Wraps an existing method with a spy |
| `mockReturnValue(val)` | Sets return value for all future calls |
| `mockReturnValueOnce(val)` | Sets return value for the next call only |
| `mockResolvedValue(val)` | Sets resolved Promise return value |
| `toHaveBeenCalled()` | Assert mock was called at least once |
| `toHaveBeenCalledOnce()` | Assert mock was called exactly once |
| `toHaveBeenCalledWith(...args)` | Assert mock was called with specific args |
| `toHaveReturnedWith(val)` | Assert mock returned a specific value |
| `vi.clearAllMocks()` | Clears call history (and implementations in v4) |
| `vi.resetAllMocks()` | Clears call history + implementations |
| `vi.restoreAllMocks()` | Resets + restores spyOn originals |

---

## Q&A

### What's the difference between `vi.fn()` and `vi.spyOn()`?

`vi.fn()` creates a fake from nothing — no original exists. You inject it. `vi.spyOn()` wraps something that already exists on an object, intercepting calls to it. The key difference is where the function lives: if it's injected, use `vi.fn()`. If it lives on an object the code imports directly, use `vi.spyOn()`.

### Does `.mockReturnValue()` stop the original function from running?

Yes. Once you attach `.mockReturnValue()`, the original body never executes. The mock intercepts the call and returns your value. The spy still records that the call happened.

### What's the difference between `clearAllMocks`, `resetAllMocks`, and `restoreAllMocks`?

`clearAllMocks` wipes call history only — `mockReturnValue` implementations survive. `resetAllMocks` wipes call history AND removes mock implementations. `restoreAllMocks` does both and additionally puts `vi.spyOn` mocks back to their original implementation.

### Why set `mockReturnValue` inside the test rather than at definition level?

Because `resetAllMocks` (or `clearAllMocks` in v4) in `beforeEach` will wipe it before the test runs. Setting it inside the test means it's applied after cleanup — guaranteed to be in effect. It also keeps the test self-contained: you understand it without looking elsewhere.
