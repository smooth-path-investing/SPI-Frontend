# Smooth Path Investing Frontend

Frontend application for the Smooth Path Investing experience. This repository is a Vite + React + TypeScript single-page app that renders the marketing homepage, stock preview flow, gated portfolio flow, and ticker detail analytics views.

This README is intentionally detailed. It is meant to help future developers understand not only how to run the app, but also how to write code in this codebase, where new code should live, how branches should be named, and what “good” changes look like before they are merged.

## Table of Contents

- [What This App Does](#what-this-app-does)
- [Tech Stack](#tech-stack)
- [Release Modes](#release-modes)
- [Quick Start](#quick-start)
- [Available Scripts](#available-scripts)
- [Docker Support](#docker-support)
- [Environment Variables](#environment-variables)
- [Project Structure](#project-structure)
- [Folder Ownership Rules](#folder-ownership-rules)
- [Engineering Principles](#engineering-principles)
- [Code Writing Standards](#code-writing-standards)
- [Naming Conventions](#naming-conventions)
- [Comments and TODOs](#comments-and-todos)
- [Styling Standards](#styling-standards)
- [Accessibility and Semantics](#accessibility-and-semantics)
- [State and Data Fetching Guidelines](#state-and-data-fetching-guidelines)
- [Git Workflow](#git-workflow)
- [Branch Naming Standard](#branch-naming-standard)
- [Commit and PR Expectations](#commit-and-pr-expectations)
- [Runtime Architecture](#runtime-architecture)
- [Routing Model](#routing-model)
- [Data Flow](#data-flow)
- [Authentication and Access Model](#authentication-and-access-model)
- [Common Development Tasks](#common-development-tasks)
- [Definition of Done](#definition-of-done)
- [Deployment Notes](#deployment-notes)
- [Known Gaps and Follow-Ups](#known-gaps-and-follow-ups)
- [Troubleshooting](#troubleshooting)
- [Recommended First Read for New Developers](#recommended-first-read-for-new-developers)

## What This App Does

The current frontend supports four primary experiences:

1. A landing page that introduces the SPI value proposition.
2. A stock preview page that exposes one sample ticker and keeps the rest locked until the user logs in or purchases access.
3. A portfolio detail flow that displays unlocked stock picks after the mock purchase flow succeeds.
4. A stock detail page that mixes locally seeded data and backend chart data depending on the route.

Important product context:

- Authentication is currently mocked in the browser with `localStorage`.
- Purchases and entitlements are also mocked in the browser.
- Some stock detail screens use seeded frontend data while others call backend APIs.
- The AI stock chat UI exists as a placeholder shell, not a full feature.

Any developer onboarding into this repository should understand that some behaviors are intentionally temporary. Preserve those flows unless your task is explicitly to replace them.

## Tech Stack

Core stack:

- React 18
- TypeScript
- Vite 7
- React Router 6
- TanStack Query
- Tailwind CSS
- Sass (`.scss`) for theme tokens and global styles
- Radix UI primitives
- Recharts for analytics charts

Supporting libraries:

- `lucide-react` for icons
- `clsx` + `tailwind-merge` + local `cn()` utility for class composition
- `validator` for form validation helpers
- `axios` for one legacy API helper
- `gsap` for animation support

## Release Modes

The project uses two explicit Vite release modes:

| Mode | Purpose | Typical command | Env file |
| --- | --- | --- | --- |
| `dev` | Local development | `npm run dev` | `.env.dev` |
| `prod` | Live server deployment | `npm run build` | `.env.prod` |

Behavior differences:

- `dev` enables the Vite proxy for stock endpoints and is intended for local backend development.
- `prod` disables the Vite proxy and expects live API origins to come from production environment variables unless the deployed web tier proxies those routes.
- `npm run build` builds the app in `prod` mode by default because that is the mode the live server should use.

Mode-aware runtime configuration is centralized in `src/lib/runtimeConfig.ts`. New code should read runtime settings from there instead of scattering direct `import.meta.env` usage across the app.

## Quick Start

### Prerequisites

- Node.js 18+ is the safest baseline for Vite 7.
- `npm` is the expected package manager because the repo includes `package-lock.json`.

There is also a `bun.lockb` in the repo. Treat `npm` as the source of truth unless the team explicitly decides to standardize on Bun later.

### Install dependencies

```bash
npm install
```

### Start the app

```bash
npm run dev
```

This starts the app in `dev` mode on port `8080`.

### Local backend behavior

By default, the frontend expects the stock-related APIs to be available through the dev proxy defined in `vite.config.ts`:

- `/stock-assets/*` -> `http://127.0.0.1:3000`
- `/stock-factor-coefvec/*` -> `http://127.0.0.1:3000`
- `/stock-fundamental/*` -> `http://127.0.0.1:3000`

If you do not set the related `VITE_*` base URLs, the frontend falls back to those proxied relative paths automatically in `dev`.

### Environment setup

Mode-specific defaults live in:

- `.env.dev` for local development
- `.env.prod` for live deployment builds

You can use `.env.local` or `.env.<mode>.local` for machine-specific overrides that should not be committed.

## Available Scripts

```bash
npm run dev
```

Starts the local Vite development server in `dev` mode on port `8080`.

```bash
npm run build
```

Builds the live deployment bundle in `prod` mode into `dist/`.

```bash
npm run build:dev
```

Builds the app with the local `dev` configuration.

```bash
npm run build:prod
```

Builds the app with the live `prod` configuration explicitly.

```bash
npm run preview
```

Serves the current `dist/` build locally for smoke testing.

```bash
npm run lint
```

Runs ESLint against the project.

```bash
npm run docker:dev
```

Builds and starts the Docker-based local development environment.

```bash
npm run docker:prod
```

Builds and starts the production-style container locally using `.env.prod`.

## Docker Support

The project now supports both containerized local development and production deployment.

### Files

- `Dockerfile`
- `docker-compose.dev.yml`
- `docker-compose.prod.yml`
- `.dockerignore`
- `docker/nginx/default.conf`

### Local development container

Use:

```bash
npm run docker:dev
```

or:

```bash
docker compose -f docker-compose.dev.yml up --build
```

What this does:

- builds the development target from `Dockerfile`
- mounts the project into the container for live editing
- keeps `node_modules` inside a Docker volume
- exposes the Vite dev server on `http://localhost:8080`
- enables polling-based file watching for a more reliable Docker experience

Dev container backend behavior:

- regular host-based development uses `DEV_PROXY_TARGET=http://127.0.0.1:3000`
- Docker-based development overrides that target to `http://host.docker.internal:3000`

That means the frontend container can still proxy requests to a backend running on your host machine.

If your backend runs in another container instead of on the host, change `DEV_PROXY_TARGET` in `docker-compose.dev.yml` to the correct container hostname.

If port `8080` is already taken on your machine, override the published port:

```bash
FRONTEND_DEV_PORT=8081 docker compose -f docker-compose.dev.yml up --build
```

Then open `http://localhost:8081`.

To stop the dev stack:

```bash
npm run docker:dev:down
```

### Production container

Use:

```bash
npm run docker:prod
```

or:

```bash
docker compose --env-file .env.prod -f docker-compose.prod.yml up --build -d
```

What this does:

- builds the frontend in `prod` mode inside a Node build stage
- passes `VITE_*` values into the build as Docker build args
- copies the built `dist/` output into an Nginx runtime image
- serves the static app with SPA route fallback enabled
- exposes the production-style container on `http://localhost:4173`

If port `4173` is already taken on your machine, override it:

```bash
FRONTEND_PROD_PORT=4174 docker compose --env-file .env.prod -f docker-compose.prod.yml up --build -d
```

Important production note:

- Vite variables are build-time variables, not runtime variables.
- If you need different API origins for deployment, make sure the correct values are present when the production image is built.
- Right now, if the production backend is not hosted yet, leave the `VITE_*` API base URLs in `.env.prod` blank.
- Once the backend is deployed, update `.env.prod` or your deployment platform environment variables with the hosted backend origin and rebuild the production image.

To stop the production container:

```bash
npm run docker:prod:down
```

## Environment Variables

Mode-specific env files:

- `.env.dev` is loaded for local development mode
- `.env.prod` is loaded for live deployment mode
- `.env` is intentionally shared and currently empty
- `.env.local` or `.env.<mode>.local` can be used for machine-specific overrides

Supported variables:

| Variable | Purpose | Typical local value |
| --- | --- | --- |
| `FRONTEND_DEV_PORT` | Host port published by the dev frontend container. | `8080` |
| `FRONTEND_PROD_PORT` | Host port published by the production frontend container. | `4173` |
| `DEV_PROXY_TARGET` | Backend origin used by the Vite dev proxy. | `http://127.0.0.1:3000` outside Docker, `http://host.docker.internal:3000` in Docker dev. |
| `VITE_STOCK_ASSETS_API_BASE_URL` | Overrides the base URL for the price/benchmark chart API. | Leave blank to use the Vite proxy. |
| `VITE_STOCK_FACTOR_COEFVEC_API_BASE_URL` | Overrides the base URL for the indicator weights API. | Leave blank to use the Vite proxy. |
| `VITE_STOCK_FUNDAMENTAL_API_BASE_URL` | Overrides the base URL for the rebased fundamental series API. | Leave blank to use the Vite proxy. |
| `VITE_LOCAL_BACKEND_SERVER` | Legacy base URL used by `src/API/fetchPerformance.ts`. | `http://localhost:5050` if needed locally. |

Important rule:

- In `dev`, relative requests are preferred when the Vite proxy is active.
- `DEV_PROXY_TARGET` controls where that dev proxy sends requests.
- In `prod`, absolute origins should come from environment variables unless the live server proxies those routes.

Recommended workflow:

1. Keep `.env.dev` pointed at your local backend flow.
2. Leave `.env.prod` blank until the production backend is actually hosted.
3. Once the backend has a real hosted URL, update the `VITE_*` values in `.env.prod`.
4. Rebuild the production Docker image or production deployment after those values are updated.

## Project Structure

High-level structure:

```text
src/
  API/                  Network helpers for backend requests
  components/           Shared presentational building blocks
  constants/            Seeded content, portfolio metadata, mock stock data
  features/
    auth/               Auth modal, forms, provider, types
    stocks/             Stock-detail utilities, analytics types, shared components
  hooks/                Thin re-exports / local hooks
  lib/                  Utilities and runtime config
  pages/                Route-level page components
  styles/               Sass tokens, theme variables, global styles
  types/                Shared type exports used across older modules
```

Current folder map:

- `src/pages`
- `src/features/auth`
- `src/features/stocks`
- `src/components/home`
- `src/components/navigation`
- `src/components/stocks`
- `src/components/graph`
- `src/components/ui`
- `src/constants`
- `src/API`
- `src/lib`
- `src/styles`

## Folder Ownership Rules

Use these rules when deciding where code should live.

### `src/pages`

Use for route entry points only.

Good fit:

- route-specific orchestration
- page layout
- reading route params
- composing feature modules together

Avoid placing here:

- reusable UI primitives
- cross-route helpers
- generic formatting utilities

### `src/features`

Use for domain-specific logic that belongs to one business area.

Current examples:

- `src/features/auth`
- `src/features/stocks`

Good fit:

- feature-level types
- route helpers tied to a feature
- shared feature components
- feature state or providers

### `src/components`

Use for reusable presentational components.

Sub-guidance:

- `src/components/ui` is for low-level reusable UI building blocks.
- Other `src/components/*` folders are for app-specific sections or shared visual components.

If a component is generic enough to be reused across features, it belongs here. If it carries domain logic for one area only, it probably belongs under `src/features`.

### `src/constants`

Use for static data, seeded content, labels, and configuration-like arrays or objects.

Do not put logic-heavy transformations here.

### `src/API`

Use for typed backend request wrappers.

Rules for API helpers:

- one file per endpoint family or resource
- normalize request URLs in one place
- return typed data
- treat expected missing states consistently, for example `404 -> null`
- keep fetch/axios details out of pages when possible

### `src/lib`

Use for low-level utilities and shared runtime helpers.

Examples:

- `cn()` class helper
- runtime release mode helpers
- formatting helpers that are not feature-specific

### `src/types`

Use only for truly cross-feature or legacy shared types.

For new code, prefer colocating types with the feature or module that owns them.

## Engineering Principles

These are the default standards for writing code in this repository.

### 1. Match the existing architecture before inventing a new one

Before adding a new abstraction, read the nearby code and extend the pattern that already exists unless it is clearly harmful.

### 2. Prefer clarity over cleverness

Future developers should be able to understand a file quickly. Descriptive names, small helpers, and clear control flow are worth more than compact code.

### 3. Keep responsibilities separated

- Pages orchestrate.
- Feature modules encapsulate domain logic.
- Components render.
- API files fetch.
- Constants store static content.

When one file starts doing too many of those jobs at once, extract.

### 4. Preserve temporary product behavior unless the task says otherwise

The repo includes intentional mock behavior for auth, purchases, and seeded analytics. Do not “clean it up” into a different product flow unless that is the task.

### 5. Code as if TypeScript were strict, even though the compiler is not

The repo currently has relaxed TypeScript settings. New code should still aim for strict-style thinking:

- avoid `any`
- check nullable values
- type inputs and outputs explicitly when it improves safety

## Code Writing Standards

This section is the practical style guide for future contributors.

### General rules

- Prefer simple, readable functions over deeply nested logic.
- Use early returns to reduce indentation.
- Avoid “magic” string literals or numbers when a named constant would improve understanding.
- Keep data transformation logic close to the feature that owns it.
- Extract helpers when logic is reused or when a function is hard to scan in one pass.
- Do not leave dead code, commented-out branches, or unused imports behind.
- Do not introduce new dependencies unless the current stack clearly cannot solve the problem.

### TypeScript rules

- Type all function parameters that are not obvious from context.
- Prefer explicit return types on exported functions.
- Use interfaces or type aliases near the owning module.
- Prefer union types over loose string usage when a value has a fixed set of states.
- Avoid `any`; use `unknown` first if you truly need a flexible input.
- Treat optional values carefully. Use null checks and fallback values explicitly.

### React rules

- Use functional components only.
- Prefer a typed props interface for every exported component.
- For consistency with the current codebase, `React.FC<Props>` is acceptable.
- Keep route-level orchestration in page components and reusable rendering pieces in child components.
- Avoid overusing `useEffect`. Derive values directly during render when no side effect is needed.
- Keep transient UI state local to the component that owns it.
- Extract repeated UI into components before duplication spreads across pages.

### Export rules

- Prefer named exports for reusable components, hooks, and utilities.
- Default exports are acceptable for app entry files or compatibility-driven cases, but they should be the exception.

### Import rules

Prefer this import order:

1. React and external packages
2. `@/` alias imports from the app
3. Relative imports
4. Type-only imports where appropriate

Use blank lines between major groups when it improves readability.

Always prefer the `@/` alias for `src` imports instead of deep relative paths like `../../../`.

### Function design rules

- If a function builds a value, name it `buildX`.
- If it computes or derives a value, `getX` or a clearer domain-specific verb is fine.
- If it formats display data, use `formatX`.
- If it fetches remote data, use `fetchX`.
- If it validates, use `validateX` or `isX`.
- If it is an event handler, use `handleX`.

### File design rules

- Keep one main responsibility per file.
- If a file contains UI, data fetching, data transformation, and navigation logic all at once, consider extraction.
- Avoid giant “utils” dumping grounds. Create helpers with a clear domain.
- Put feature-specific helpers near the feature instead of in a global folder.

## Naming Conventions

Use names that communicate role and meaning, not implementation trivia.

### Variables

- Booleans should read like facts or permissions: `isOpen`, `hasAccess`, `canViewPortfolio`, `shouldLockTickers`
- Derived values should describe what they resolve to: `resolvedTicker`, `backPath`, `portfolioDisplayName`
- Collections should use plural names: `stocks`, `indicators`, `navigationItems`
- Avoid single-letter names except very small local loop indexes

### Functions

- Event handlers: `handleLogin`, `handleOfferSelection`
- Builders: `buildPortfolioStockDetailPath`
- Getters/resolvers: `getStockDetailBackPath`, `getTickerAnalytics`
- Formatters: `formatCoverageDate`
- Predicates: `isPortfolioStockDetailPath`, `hasPurchasedPortfolio`

### Components

- Use `PascalCase` for React component names.
- Components should be nouns or noun phrases: `StockCard`, `PortfolioMetricCard`, `AuthModal`

### Hooks

- Hooks must begin with `use`: `useAuth`, `use-toast`

### File names

Current repo conventions are mixed, so follow these rules moving forward:

- Feature or page React components: `PascalCase.tsx`
- Generic utilities and helpers: `camelCase.ts` or domain-specific descriptive names
- Generated or design-system style UI wrapper files may remain kebab-case when that matches the surrounding pattern

When editing an existing area, prefer consistency with nearby files over forcing a rename wave.

### Constants

- Top-level immutable constants can use `UPPER_SNAKE_CASE`
- Config objects with grouped labels can use `PascalCase` or `camelCase` object names depending on context
- Prefer descriptive names over abbreviations unless the abbreviation is domain-standard

## Comments and TODOs

Comments are allowed, but they should earn their place.

### Good comments explain:

- why a behavior exists
- why a special case is required
- why a fallback or workaround is temporary
- how two systems align when that is not obvious

### Weak comments usually explain:

- what the next line of code literally does
- information already obvious from a good function name
- stale implementation details

### TODO format

Use scoped TODOs instead of plain `TODO` when possible.

Preferred pattern:

```ts
// TODO(subscription-flow): replace direct navigation once backend entitlements exist.
```

Rules:

- include the owning area or feature in the tag
- make the future action clear
- remove the TODO when the work is done

## Styling Standards

This project uses a hybrid styling model:

1. Tailwind utility classes for most component styling
2. Sass files for theme tokens and global CSS variables

Important files:

- `src/styles/index.scss`
- `src/styles/_variables.scss`
- `src/styles/theme.scss`
- `tailwind.config.ts`

### Styling rules

- Prefer existing tokens such as `var(--accent)` and `var(--muted-text)` over hardcoded colors.
- Use semantic Tailwind classes like `bg-background` and `text-foreground` when possible.
- Reuse the current dark, glossy card language instead of introducing unrelated visual styles.
- Prefer `cn()` when conditional classes start to grow.
- Avoid inline styles unless values are genuinely dynamic or required by a library.
- Keep spacing, border radius, and visual treatment consistent with nearby components.

### When to use which styling tool

- Use Tailwind for layout, spacing, typography, borders, and most visual states.
- Use Sass/CSS variables for app-wide tokens and theme-level values.
- Use inline styles sparingly for runtime-driven geometry or positioning.

## Accessibility and Semantics

This is a frontend app. Code quality includes accessible markup.

### Rules to follow

- Use buttons for actions and links for navigation.
- Do not attach click handlers to non-interactive elements unless there is a strong reason and keyboard support is added.
- Provide `aria-label` text for icon-only interactive elements when the visible label is missing.
- Keep heading levels logical.
- Use `aria-hidden="true"` for decorative-only layers.
- Ensure keyboard interaction works for custom interactive surfaces.

If you create a clickable card, make sure it is actually keyboard operable. The current `StockCard` is a good reference.

## State and Data Fetching Guidelines

### State placement

- Local UI state belongs in the component that owns the interaction.
- Cross-route auth and entitlement state belongs in context.
- Feature-specific derived data should stay close to the feature that uses it.

### Remote data

Current code uses both manual `useEffect` fetching and TanStack Query.

Guideline moving forward:

- Prefer React Query for new fetch-heavy features that benefit from caching, retries, invalidation, or shared loading state.
- Do not refactor stable manual `useEffect` flows just for style consistency unless the task includes that cleanup.

### API wrapper rules

- Keep request-building logic inside `src/API`.
- Return predictable output shapes.
- Normalize edge cases consistently.
- Avoid direct `fetch()` calls from page components unless there is a very strong reason.

### Runtime configuration

Do not read `import.meta.env` directly in feature code unless there is no better alternative.

Preferred approach:

- read environment values in `src/lib/runtimeConfig.ts`
- consume normalized config from there

That keeps release-mode logic in one place.

## Git Workflow

The goal is to make branch history readable and predictable.

### Standard workflow

1. Pull the latest default branch.
2. Create a focused branch for one feature, fix, or cleanup task.
3. Make small, coherent commits.
4. Run the project checks before pushing.
5. Open a PR with a clear summary and testing notes.

### Scope rules

- One branch should represent one coherent piece of work.
- Avoid mixing refactors, styling changes, and feature behavior changes in the same branch unless they are inseparable.
- If you touch many files, the PR description should explain why.

## Branch Naming Standard

Branch names should make sense without opening the PR.

### Format

Preferred format:

```text
<type>/<short-kebab-description>
```

If you have a ticket id, use:

```text
<type>/<ticket>-<short-kebab-description>
```

Examples:

- `feature/portfolio-access-flow`
- `fix/stock-detail-empty-state`
- `refactor/runtime-config-centralization`
- `docs/readme-engineering-standards`
- `feature/SPI-142-stock-detail-rebased-chart`

### Allowed branch types

- `feature` for new user-facing or internal functionality
- `fix` for bug fixes
- `refactor` for structural changes without intended behavior changes
- `chore` for maintenance, tooling, or housekeeping
- `docs` for documentation-only work
- `perf` for performance improvements
- `release` for deployment preparation or release-specific work
- `hotfix` for urgent production fixes

### Branch naming rules

- use lowercase words
- use hyphens, not spaces or underscores
- keep names short but descriptive
- do not use personal names
- do not use vague names like `test`, `stuff`, `update`, `misc-fixes`

### AI or automation-created branches

If a branch is created by an agent or automation, prepend `codex/` to the normal branch name.

Examples:

- `codex/feature/portfolio-access-flow`
- `codex/fix/stock-detail-empty-state`
- `codex/docs/readme-engineering-standards`

This keeps automated work visible without changing the underlying branch taxonomy.

## Commit and PR Expectations

### Commit messages

Prefer short imperative commit messages.

Good examples:

- `Add runtime config helper for release modes`
- `Fix stock detail benchmark fallback`
- `Document branch naming standard`

If you use conventional-style prefixes, keep them readable:

- `feat: add portfolio access guard`
- `fix: handle missing stock asset response`
- `docs: expand contributor handbook`

### PR expectations

Every PR should answer:

- What changed?
- Why did it change?
- How was it verified?
- Are there follow-up tasks or known limitations?

### Before pushing

At minimum, run:

```bash
npm run lint
npm run build
```

If your task is dev-mode specific, also run:

```bash
npm run build:dev
```

Current reality:

- the repo does not yet have a real automated test suite
- `lint` and `build` are the minimum safety checks

## Runtime Architecture

### App entry

`src/main.tsx` mounts the React app and imports the global Sass entry file.

`src/App.tsx` wires together the main providers:

- `QueryClientProvider`
- `TooltipProvider`
- `AuthProvider`
- `Toaster`
- `Sonner`
- `BrowserRouter`

The `AppShell` inside `src/App.tsx` decides whether the global navigation should be shown for the active route.

### Why some pages hide the global nav

Portfolio stock detail pages use a tighter, full-screen layout. Because of that, `AppShell` hides the top navigation whenever the current route matches the portfolio stock detail pattern.

This behavior is driven by `isPortfolioStockDetailPath()` from `src/features/stocks/utils/routes.ts`.

### Data ownership model

The app currently mixes two kinds of data:

1. Seeded frontend constants for preview content and mocked portfolio data
2. Backend API data for richer stock analytics on the purchased stock-detail route

This mixed model is intentional and explains much of the branching logic in the stock pages.

## Routing Model

Defined in `src/App.tsx`.

### Current routes

| Route | Component | Notes |
| --- | --- | --- |
| `/` | `Home` | Landing page / marketing site |
| `/stock` | `Stocks` | Preview stock list page |
| `/stocks` | `Stocks` | Alias of `/stock` |
| `/stock/:ticker` | `StockDetail` | Preview stock detail route |
| `/portfolio` | `PortfolioDetail` | Default purchased portfolio route |
| `/portfolio/:portfolioId` | `PortfolioDetail` | Named portfolio route |
| `/portfolio/stock/:ticker` | `StockDetail` | Detail route for default portfolio |
| `/portfolio/:portfolioId/stock/:ticker` | `StockDetail` | Detail route for named portfolio |
| `*` | `NotFound` | Catch-all |

### Route conventions to know before editing

- `long-contrarian` is the default portfolio id.
- The default portfolio has both a short route (`/portfolio`) and a stock-detail shortcut (`/portfolio/stock/:ticker`).
- Preview routes under `/stock/:ticker` use seeded data and do not call the live stock APIs.
- Purchased portfolio routes use live chart and fundamental endpoints when available.

If you add or change stock-related routes, update the helpers in `src/features/stocks/utils/routes.ts` first so route rules stay centralized.

## Data Flow

### 1. Navigation and access state

`src/components/navigation/Navigation.tsx` reads the auth context and dynamically rewrites the “Stock Investing” nav item:

- if the user does not have access, it points to `/stock`
- if the user does have access, it points to `/portfolio`

### 2. Stock list page

`src/pages/Stocks.tsx`:

- reads auth and purchase state from `useAuth()`
- shows a single open sample ticker
- blurs the remaining seeded tickers
- opens auth or offer dialogs depending on user state
- currently grants immediate access after a mock purchase

### 3. Portfolio page

`src/pages/PortfolioDetail.tsx`:

- resolves a portfolio by route param
- redirects to `/stock` if the portfolio id is invalid
- shows a locked purchase screen for unauthorized users
- shows the stock grid when access is granted

### 4. Stock detail page

`src/pages/StockDetail.tsx` is the most important route for understanding the app’s orchestration.

It does four things:

1. Resolves whether the route is a preview route or a purchased portfolio route.
2. Loads or derives chart data depending on that route mode.
3. Aligns multiple time-series datasets into chart-friendly structures.
4. Renders the summary, chart cards, and the placeholder AI chat sidebar.

### Stock detail chart sources

| UI block | Data source |
| --- | --- |
| Price chart | Preview constants or `fetchStockAssetChartSeries()` |
| Cumulative returns vs IVV | Preview analytics or derived from stock-assets API data |
| Indicator weights | Preview analytics or `fetchStockIndicatorWeights()` |
| Rebased indicator series | Preview analytics or `fetchStockFundamentalChartSeries()` plus merged price series |

## Authentication and Access Model

The auth system is intentionally mocked.

### Source of truth

`src/features/auth/context/AuthContext.tsx`

### What it does today

- creates demo users from login or signup input
- infers the user plan from the email address
- persists the current user in `localStorage`
- persists purchases by normalized user email
- exposes entitlement helpers to the rest of the app

### Plan resolution rules

Current mock logic:

- emails containing `pro` create a `pro` user
- emails containing `elite` create an `elite` user
- everything else becomes `free`

### Dev/testing shortcut

`canAccessPremiumStocks()` also checks `localStorage.getItem('showPremiumStocks') === 'true'`.

That means you can manually unlock premium routing in the browser console during development:

```js
localStorage.setItem('showPremiumStocks', 'true');
```

To remove it:

```js
localStorage.removeItem('showPremiumStocks');
```

## Common Development Tasks

### Add a new page

1. Create the page component in `src/pages`.
2. Add the route in `src/App.tsx`.
3. Update `src/constants/index.ts` if the page belongs in top-level navigation.
4. Update route helpers if the new route changes stock or portfolio path behavior.

### Add a new stock to a portfolio

1. Update the relevant list in `src/constants/stockData.ts`.
2. Update `src/constants/portfolios.ts` if portfolio metadata changes.
3. Update preview constants if the sample flow depends on the new data.

### Add a new API endpoint

1. Create or extend a file in `src/API`.
2. Return a typed response shape.
3. Normalize empty or missing states consistently.
4. Consume the helper from the owning feature or page.
5. If environment-specific behavior is needed, wire it through `src/lib/runtimeConfig.ts`.

### Replace mocked auth with real auth

Start in:

- `src/features/auth/context/AuthContext.tsx`
- `src/pages/Stocks.tsx`
- `src/pages/PortfolioDetail.tsx`

### Change chart behavior

Start in this order:

1. `src/pages/StockDetail.tsx`
2. `src/API/*`
3. `src/features/stocks/analytics/types.ts`
4. `src/components/graph/*`

## Definition of Done

A change is not done just because it compiles.

Before considering work complete, confirm:

- the code lives in the right folder
- names are descriptive
- comments explain why, not what
- no unused imports or dead branches remain
- temporary product behavior was preserved unless intentionally changed
- lint passes
- build passes
- the README or docs were updated if the workflow or architecture changed

For larger changes, also confirm:

- routes still make sense after reload
- access gating still behaves correctly
- dev and prod mode assumptions are still correct

## Deployment Notes

This repo is configured for SPA hosting.

### Vercel

`vercel.json` rewrites every route to `index.html`.

### Static hosts such as Netlify

`public/_redirects` includes:

```text
/* /index.html 200
```

That preserves client-side routing on refresh for nested routes like `/portfolio/:portfolioId/stock/:ticker`.

### Vite base path

`vite.config.ts` sets `base: '/'` so deep route reloads can resolve assets correctly.

## Known Gaps and Follow-Ups

These are useful realities for future developers:

- Auth is mocked and does not talk to a backend.
- Purchase flow is mocked and partially represented by `TODO(subscription-flow)` comments.
- `src/features/stocks/components/StockChatSidebar.tsx` is a UI shell only.
- `src/API/fetchPerformance.ts` appears to be legacy and may not be actively used by visible routes.
- TypeScript strictness is currently relaxed in `tsconfig.app.json`.
- The repo still contains some legacy structure and naming inconsistencies.
- There is not yet a real automated test suite.

Because of those realities, small focused PRs are preferred over sweeping rewrites.

## Troubleshooting

### The stock detail charts are empty

Check:

1. whether the route is a preview route or a purchased route
2. whether the local backend is running if you are in `dev`
3. whether production API origins are configured correctly if you are in `prod`

### Refreshing a deep link gives a 404 in production

Confirm your hosting environment is honoring SPA rewrites:

- `vercel.json` for Vercel
- `public/_redirects` for Netlify-like hosts

### The app builds but a route behaves strangely

Check the route helper utilities in `src/features/stocks/utils/routes.ts` before changing duplicated conditionals in multiple files.

### Login works but access looks inconsistent between users

Remember that purchases are keyed by normalized email in `localStorage`. Different demo accounts can intentionally have different purchase states.

## Recommended First Read for New Developers

If you are brand new to the repo, read these files in this order:

1. `src/App.tsx`
2. `src/pages/Stocks.tsx`
3. `src/pages/PortfolioDetail.tsx`
4. `src/pages/StockDetail.tsx`
5. `src/features/auth/context/AuthContext.tsx`
6. `src/features/stocks/utils/routes.ts`
7. `src/lib/runtimeConfig.ts`
8. `src/constants/stockData.ts`

That path gives the fastest understanding of how the app behaves today and how future code should fit into it.
