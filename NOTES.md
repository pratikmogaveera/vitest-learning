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

| API | What it does |
|-----|-------------|
| `describe(name, fn)` | Groups related tests |
| `it(name, fn)` / `test(name, fn)` | Defines a single test case |
| `expect(value).toBe(expected)` | Strict equality assertion (`===`) |

---

## Q&A

### Why does `toBe` work for strings but fail for objects with the same content?
`toBe` uses `===`. Primitives are compared by value — `"Pratik" === "Pratik"` is `true`. Objects are compared by reference (memory address) — two objects with identical content are still two different objects in memory, so `===` returns `false`. Use `toEqual` for deep value comparison of objects and arrays.
