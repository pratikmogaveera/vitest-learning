# vitest-learning — Plan

Learn testing from scratch using Vitest, starting from the simplest unit test and progressing to real-world patterns used in production NestJS and React codebases.

---

## 1. Setup & Basic Unit Tests

**Goal:** Get Vitest running and write your first passing tests.

**Tasks:**
- Init a Node.js + TypeScript project
- Install and configure Vitest
- Write tests for pure functions: add, subtract, multiply, isEven, capitalize, etc.
- Understand `describe`, `it`/`test`, `expect`

**Key Concepts:**
- What is a test runner?
- What does `expect(x).toBe(y)` actually do?
- Difference between `it` and `test`
- What is a pure function and why is it the easiest thing to test?

**Done when:** 5+ passing tests for simple utility functions, run with `pnpm vitest`.

---

## 2. Matchers Deep Dive

**Goal:** Know when and why to use different matchers beyond `toBe`.

**Tasks:**
- Practice: `toEqual`, `toBeTruthy`/`toBeFalsy`, `toBeNull`, `toBeUndefined`
- Practice: `toContain`, `toHaveLength`, `toMatchObject`
- Practice: `toThrow` — testing functions that throw errors
- Understand strict equality (`toBe`) vs deep equality (`toEqual`)

**Key Concepts:**
- Reference equality vs value equality
- When `toBe` fails but `toEqual` passes
- How to test error throwing correctly (wrap in function)

**Done when:** Tests covering each matcher category, all passing, and you can explain why you chose each one.

---

## 3. Async Testing

**Goal:** Test functions that return Promises or use async/await.

**Tasks:**
- Test a function that returns a resolved Promise
- Test a function that returns a rejected Promise
- Use `async/await` inside tests
- Use `.resolves` and `.rejects` matchers
- Understand what happens when you forget `await` in a test

**Key Concepts:**
- Why sync test assertions don't catch async failures
- `return` vs `await` in async tests
- Testing fetch wrappers or API call utilities

**Done when:** Async tests pass and you can demonstrate what breaks when `await` is missing.

---

## 4. Mocking Fundamentals

**Goal:** Control what functions do during tests using Vitest's mock system.

**Tasks:**
- Create spy functions with `vi.fn()`
- Assert calls: `toHaveBeenCalled`, `toHaveBeenCalledWith`, `toHaveBeenCalledTimes`
- Control return values: `mockReturnValue`, `mockResolvedValue`
- Use `vi.spyOn()` to spy on object methods without replacing them
- Reset/restore mocks between tests

**Key Concepts:**
- Why mocking exists — isolating the unit under test
- Difference between a spy and a mock
- `beforeEach` / `afterEach` for mock cleanup
- `vi.clearAllMocks()` vs `vi.resetAllMocks()` vs `vi.restoreAllMocks()`

**Done when:** A service function that calls a dependency is tested in isolation using mocks.

---

## 5. Module Mocking & Dependency Patterns

**Goal:** Mock entire modules and test code with external dependencies (DB, HTTP, file system).

**Tasks:**
- Mock an entire module with `vi.mock('module-name')`
- Mock a module that makes HTTP calls (e.g., axios or fetch)
- Test a function that reads/writes to a file — mock `fs`
- Test a class with injected dependencies by passing mock instances

**Key Concepts:**
- How `vi.mock` is hoisted to the top of the file
- Factory function pattern in `vi.mock`
- Partial mocks — mock only some exports
- Why dependency injection makes code easier to test

**Done when:** A function with an external dependency (HTTP or file) is tested without actually making the call.

---

## 6. Coverage, Edge Cases & Real-World Patterns

**Goal:** Write tests like a professional — think about coverage, edge cases, and test organization.

**Tasks:**
- Enable and run coverage reports with `@vitest/coverage-v8`
- Understand coverage metrics: statements, branches, functions, lines
- Write tests that cover edge cases: null, undefined, empty arrays, empty strings, negative numbers
- Use `test.each` for data-driven tests
- Organize tests with `describe` nesting
- Write tests for a small real module (e.g., a mini SIP calculator or URL builder)

**Key Concepts:**
- What 100% coverage does NOT guarantee
- Branch coverage — why it matters more than line coverage
- `test.each` — removing repetition from test files
- The Arrange–Act–Assert (AAA) pattern

**Done when:** Coverage report shows >80% on a real module. Tests use `test.each` for at least one parametrized case.

---

## 7. Integration Testing (Backend — Drizzle + Postgres)

**Goal:** Test real database interactions without mocking the DB layer.

**Tasks:**
- Understand the difference between unit tests and integration tests
- Create a dedicated `mintfolio_test` database on your running Postgres container
- Connect Drizzle to the test DB via environment variable override
- Write a migration runner that runs before the test suite
- Write integration tests for real CRUD operations (insert, select, update, delete)
- Truncate tables between tests to ensure isolation
- Seed test data using helper functions
- Teardown: drop test data or DB after suite completes

**Key Concepts:**
- Unit test vs integration test — what each catches that the other doesn't
- Test DB isolation — why tests must not share state
- `beforeAll` / `afterAll` for suite-level setup and teardown
- `beforeEach` for per-test table truncation
- Why mocking the DB in unit tests is not enough — schema bugs, query bugs, constraint violations
- Environment variable override for test config (`process.env.DATABASE_URL`)

**Done when:** A Drizzle query function is tested against a real Postgres DB. Tests are isolated — running them in any order produces the same result.

---

## 8. Frontend Component Testing (React + Testing Library)

**Goal:** Test React components the way users interact with them — not implementation details.

**Tasks:**
- Install `@testing-library/react` and `@testing-library/jest-dom` with Vitest
- Configure jsdom environment in `vitest.config.ts`
- Render a component and assert on what is visible in the DOM
- Query elements: `getByText`, `getByRole`, `getByLabelText`, `queryByText`
- Simulate user interactions: `userEvent.click`, `userEvent.type`
- Test a form: fill inputs, submit, assert on output
- Test conditional rendering (show/hide based on props or state)
- Mock an API call inside a component and test loading/success/error states
- Test a custom hook with `renderHook`

**Key Concepts:**
- Testing Library's guiding principle: test behavior, not implementation
- Query priority — why `getByRole` is preferred over `getByTestId`
- `getBy` vs `queryBy` vs `findBy` — when to use each
- Why you should not test internal state directly
- `userEvent` vs `fireEvent` — why `userEvent` is more realistic
- `waitFor` and async queries for components that update asynchronously

**Done when:** A React component with user interaction and an async API call is fully tested — loading state, success state, and error state all covered.

---

## Bridge — Migrating to Jest (NestJS Context)

**Goal:** Understand the differences between Vitest and Jest, and write tests using Jest in a NestJS project.

**Tasks:**
- Compare Jest and Vitest APIs side-by-side
- Set up Jest in a NestJS project (already configured by default)
- Use `Test.createTestingModule()` to test a NestJS service
- Mock a NestJS provider (repository, external service)
- Test a controller with a mock service

**Key Concepts:**
- What stays the same (matchers, spies, async patterns)
- What changes (`vi` → `jest`, module hoisting differences)
- NestJS DI container in tests
- `@nestjs/testing` utilities

**Done when:** A NestJS service and its controller are tested in isolation using Jest + `@nestjs/testing`.
