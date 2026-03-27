# NT Green Market — Claude Code Rules

This file guides Claude Code when working in this repository, including Figma MCP integration.

---

## Project Overview

NT Green Market is an internal company marketplace platform. See [Requirements/Project Overview.md](Requirements/Project Overview.md) for full context.

**Roles:** Employee (Buyer), Employee (Seller), Admin
**Key flows:** Charity donations, shop creation, product listing, order placement, admin dashboard

---

## Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Language | TypeScript | End-to-end type safety |
| Framework | Next.js 14 (App Router) | Full-stack — UI + API routes in one deploy |
| Styling | Tailwind CSS + shadcn/ui | Utility-first, accessible components |
| ORM | Prisma | Type-safe, schema-first; Azure DB for PostgreSQL compatible |
| Database | Supabase (PostgreSQL) | Managed Postgres; Phase 2 → Azure DB for PostgreSQL |
| Auth | Supabase Auth (OIDC/JWT) | Phase 2 → Azure Active Directory / Entra ID (AAD SSO) |
| File Storage | Supabase Storage | S3-compatible; Phase 2 → Azure Blob Storage |
| Deployment | Vercel | Phase 2 → Azure Static Web Apps or App Service |

---

## Environments

| Environment | Frontend | Database | Purpose |
|---|---|---|---|
| Local | `localhost:3000` | Supabase local or `ntgreenmarket-uat` | Development |
| UAT | Vercel Preview URL (auto per PR) | Supabase project `ntgreenmarket-uat` | Testing / stakeholder review |
| Production | `ntgreenmarket.vercel.app` (TBD) | Supabase project `ntgreenmarket-prod` | Live event |

- Vercel Preview deployments are created automatically for every pull request — no extra setup needed for UAT
- Environment variables are scoped per environment in Vercel (Preview → UAT Supabase, Production → prod Supabase)
- **Phase 2 (Azure):** UAT → Azure staging slot; Production → Azure Static Web Apps main slot

---

## Design System Structure

> **Status: TBD** — No design system exists yet. Update each section as tokens/components are added.

### 1. Design Tokens

- **Location:** TBD (e.g., `src/tokens/`, `tailwind.config.ts`, CSS custom properties)
- **Format:** TBD (e.g., CSS variables, JS/TS object, design token JSON)
- **Transformation:** TBD (e.g., Style Dictionary, Theo)

When tokens are defined, map Figma variable names directly to token names. Prefer token references over raw hex values in all code.

### 2. Component Library

- **Location:** TBD (e.g., `src/components/`, `src/ui/`)
- **Architecture:** TBD (e.g., atomic design, feature-based)
- **Documentation:** TBD (e.g., Storybook at `/storybook`)

When implementing Figma designs, always check this location for existing components before generating new ones.

### 3. Styling Approach

- **Methodology:** TBD (e.g., Tailwind CSS, CSS Modules, Styled Components)
- **Global styles:** TBD (e.g., `src/styles/globals.css`)
- **Responsive breakpoints:** TBD

### 4. Icon System

- **Location:** TBD (e.g., `src/icons/`, `src/assets/icons/`)
- **Usage pattern:** TBD (e.g., `<Icon name="cart" />`, SVG imports, icon font)
- **Naming convention:** TBD (e.g., kebab-case matching Figma layer names)

### 5. Asset Management

- **Images/media:** TBD (e.g., `public/assets/`, CDN URL)
- **Optimization:** TBD (e.g., next/image, vite-imagetools)

### 6. Project Structure

> Fill in once scaffolding is created.

```
TBD
```

---

## Figma MCP Integration Rules

These rules apply whenever implementing designs from Figma using `get_design_context` or related MCP tools.

### General Principles

1. **Adapt, don't copy.** The Figma MCP output (React + Tailwind) is a reference. Always adapt to the actual project stack, tokens, and component patterns.
2. **Reuse first.** Before generating a new component, search the component library for an existing match.
3. **Use tokens.** Replace raw hex colors, hardcoded spacing, and font sizes with the project's token/variable system.
4. **Follow Code Connect.** If a Figma component has a Code Connect mapping, use the mapped codebase component directly.
5. **Check the screenshot.** For loosely structured designs (absolute positioning, raw values), rely on the screenshot to understand layout intent.

### Workflow

1. Call `get_design_context` with the `fileKey` and `nodeId` from the Figma URL.
2. Review Code Connect snippets, annotations, and design tokens in the response.
3. Identify matching components in the codebase.
4. Implement using project conventions — not the raw MCP output.

### Figma URL Parsing

- `figma.com/design/:fileKey/:name?node-id=:nodeId` — convert `-` to `:` in `nodeId`
- `figma.com/board/:fileKey/:name` — FigJam file, use `get_figjam`
- `figma.com/make/:makeFileKey/:name` — use `makeFileKey`

---

## Auth Rules

- **No self-registration** — Admin provisions all accounts
- **Event-scoped roles** — Seller role is active for one event only; store roles in the app DB (not in the JWT) so event-scoping logic lives in the application, not the auth provider
- **OIDC/JWT with standard claims only** — required for the Phase 2 swap to Azure AD SSO; do not use Supabase-specific auth extensions in business logic
- **Phase 2 migration path:** swap Supabase Auth OIDC config to AAD / Entra ID — no application code changes

## Development Guidelines

- Do not mock the database in integration tests (update with rationale once testing strategy is confirmed).
- Keep responses concise — no trailing summaries after completing a task.
- Always read a file before editing it.
- Do not add features, refactors, or improvements beyond what is explicitly asked.
