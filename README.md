# @mylib/ui — TypeScript React Component Library

A strongly typed React component library built with TypeScript, documented with Storybook, tested with React Testing Library, and shipped with a GitHub Actions CI pipeline.

---

## What This Project Does

This is a reusable UI component library — the kind you'd publish to npm and import into multiple React projects. It has six components (Button, Input, Badge, Card, Spinner, Modal), a custom hook (useDisclosure), a full test suite, and a Storybook documentation site that shows every variant of every component interactively.

---

## How to Run It

**Install dependencies first:**
```bash
npm install
```

**Start Storybook (component docs and demos):**
```bash
npm run dev
```
Opens at `http://localhost:6006` — every component has a dedicated page with live controls.

**Run the tests:**
```bash
npm test
```

**Run tests with coverage report:**
```bash
npm run test:coverage
```

**TypeScript type check (no compile output):**
```bash
npm run typecheck
```

**Lint the code:**
```bash
npm run lint
```

**Build the library for distribution:**
```bash
npm run build
```
Outputs to `dist/` — CommonJS, ES Module, and `.d.ts` type declarations.

---

## Project Structure

```
ts-component-lib/
│
├── .github/
│   └── workflows/
│       └── ci.yml              ← GitHub Actions: lint → typecheck → test → build
│
├── .storybook/
│   ├── main.ts                 ← Storybook config (addons, framework, story paths)
│   └── preview.ts              ← Global decorators, backgrounds, viewport presets
│
├── src/
│   ├── index.ts                ← Library entry point — everything exported from here
│   │
│   ├── types/
│   │   └── common.ts           ← Shared types: Size, Variant, ColorToken, BaseProps
│   │
│   ├── utils/
│   │   └── cn.ts               ← Class name merger utility
│   │
│   ├── hooks/
│   │   ├── useDisclosure.ts    ← Open/close state hook used by Modal, etc.
│   │   └── useDisclosure.test.ts
│   │
│   └── components/
│       ├── Button/
│       │   ├── Button.tsx        ← Component (forwardRef, all variants)
│       │   ├── Button.module.css ← Scoped CSS
│       │   ├── Button.test.tsx   ← 20+ tests
│       │   ├── Button.stories.tsx← Storybook stories
│       │   └── index.ts          ← Barrel export
│       ├── Input/              ← Same structure × 5 more components
│       ├── Badge/
│       ├── Card/
│       ├── Spinner/
│       └── Modal/
│
├── tsconfig.json               ← TypeScript strict mode config
├── rollup.config.mjs           ← Builds CJS + ESM + .d.ts
├── babel.config.cjs            ← Transpile TS/JSX for Jest
├── jest.config.cjs             ← Jest with jsdom environment
├── .eslintrc.cjs               ← ESLint with TypeScript + React rules
└── package.json
```

---

## What I Learned Building This

**TypeScript prop typing** — Every component has a typed props interface. Buttons extend `React.ButtonHTMLAttributes<HTMLButtonElement>` so all native HTML button props still work. The `BaseProps` interface gives every component a consistent `className`, `style`, and `data-testid`.

**forwardRef** — The Button and Input components use `forwardRef` so that parent components can attach a `ref` to the underlying DOM element. This is essential for things like auto-focus, form libraries (React Hook Form), and programmatic focus management.

**CSS Modules** — Styles are scoped to each component file using `.module.css`. No class name collisions possible, and the styles tree-shake with the component.

**Storybook** — Every component has a `.stories.tsx` file with individual stories for each variant and state. The `autodocs` tag auto-generates a full documentation page from the TypeScript props and JSDoc comments.

**React Testing Library** — Tests simulate real user behaviour (`userEvent.click`, `userEvent.type`) rather than testing implementation details. The `@testing-library/jest-dom` matchers make assertions readable (`toBeInTheDocument`, `toHaveAttribute`, `toBeDisabled`).

**Accessibility in tests** — All queries use semantic roles (`getByRole('button')`, `getByRole('dialog')`) rather than class names or test IDs. This means if a component breaks its semantic structure, the test catches it.

**CI Pipeline** — The GitHub Actions workflow in `.github/workflows/ci.yml` runs on every push: installs dependencies, lints, typechecks, runs tests with coverage, then builds the library. If any step fails, the PR is blocked.

---

## Requirements Coverage

| Requirement | Implementation |
|---|---|
| Strongly typed components and hooks | TypeScript interfaces, `forwardRef<HTMLElement, Props>`, shared type tokens |
| Storybook for docs and demos | `.storybook/` config + `.stories.tsx` per component, `autodocs` tag |
| Unit tests with React Testing Library | `*.test.tsx` per component, `renderHook` for hooks, 60+ tests total |
| CI lint/test workflow | `.github/workflows/ci.yml` — lint, typecheck, test, build on every push |
| Publish to npm (optional) | `package.json` has `main`, `module`, `types`, `files` fields ready; run `npm publish` |

---

## Technologies

- React 18
- TypeScript 5 (strict mode)
- Storybook 8
- React Testing Library + Jest
- Rollup (library bundler)
- GitHub Actions (CI)
- CSS Modules
