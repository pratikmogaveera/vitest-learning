# vitest-learning

A hands-on project to learn testing in JavaScript/TypeScript using Vitest, progressing from fundamentals to advanced patterns.

## Purpose

Build a solid foundation in unit testing, mocking, async testing, and coverage — skills directly applicable to real-world NestJS and React/Next.js projects.

## Tech Stack

- Vitest — test runner and assertion library
- TypeScript — all test files written in TS
- Node.js — runtime

## How to Run

```bash
# Install dependencies
pnpm install

# Run tests
pnpm vitest

# Run tests with coverage
pnpm vitest --coverage

# Run tests in watch mode
pnpm vitest --watch
```

## File Structure

```
vitest-learning/
├── src/
│   ├── phase-1/            — basic unit tests (math, strings, booleans)
│   ├── phase-2/            — matchers deep dive
│   ├── phase-3/            — async testing
│   ├── phase-4/            — mocking (vi.fn, vi.spyOn, vi.mock)
│   ├── phase-5/            — modules and dependency injection testing
│   ├── phase-6/            — coverage, edge cases, real-world patterns
│   ├── phase-7/            — integration testing (Drizzle + real Postgres)
│   └── phase-8/            — React component testing (Testing Library)
├── package.json            — project config and vitest dependency
├── vitest.config.ts        — vitest configuration
├── PLAN.md                 — learning roadmap
└── NOTES.md                — concepts and Q&A
```

## Progress

- [ ] Phase 1 — Setup & Basic Unit Tests
- [ ] Phase 2 — Matchers Deep Dive
- [ ] Phase 3 — Async Testing
- [ ] Phase 4 — Mocking Fundamentals
- [ ] Phase 5 — Module Mocking & Dependency Patterns
- [ ] Phase 6 — Coverage, Edge Cases & Real-World Patterns
- [ ] Phase 7 — Integration Testing (Drizzle + Postgres)
- [ ] Phase 8 — Frontend Component Testing (React + Testing Library)
- [ ] Bridge — Migrating to Jest (NestJS context)

## Resources

- [Vitest Docs](https://vitest.dev/)
- [Vitest API Reference](https://vitest.dev/api/)
- [Testing Library Docs](https://testing-library.com/) ← for later (React)
- [NestJS Testing Guide](https://docs.nestjs.com/fundamentals/testing)
