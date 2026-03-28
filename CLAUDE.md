# NT Green Market — Claude Code Rules

This file guides Claude Code when working in this repository, including Figma MCP integration.

---

## Project Overview

NT Green Market is an internal charity fundraising platform masked as a marketplace. All profits and donations go to charities. See [Requirements/Project Overview.md](Requirements/Project Overview.md) for full context.

**Core mission:** Raise money for charity through employee participation
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

> **Status: DEFINED** — Design system is complete. Reference [Requirements/Designs/design-system.md](Requirements/Designs/design-system.md), [Requirements/Designs/tokens.css](Requirements/Designs/tokens.css), and [Requirements/Designs/tailwind.config.ts](Requirements/Designs/tailwind.config.ts) for all UI decisions.

### 1. Design Tokens

- **Location:** `src/styles/tokens.css` (CSS custom properties)
- **Format:** CSS custom properties (`:root` variables)
- **Tailwind Config:** `tailwind.config.ts` extends Tailwind with brand colors and typography

Use token variables in all code: `var(--color-primary)`, `var(--text-base)`, etc. Avoid raw hex values and hardcoded spacing.

### 2. Component Library

- **Location:** `src/components/` (feature-based organization)
- **UI Components:** Use shadcn/ui for base components (buttons, forms, modals, tables)
- **Custom Components:** Build feature-specific components on top of shadcn/ui
- **Documentation:** Reference [Requirements/Designs/design-system.md](Requirements/Designs/design-system.md) for component specs (buttons, cards, badges, forms, navigation)

Always check existing components before creating new ones. Reuse shadcn/ui components.

### 3. Styling Approach

- **Methodology:** Tailwind CSS + CSS custom properties (tokens)
- **Global styles:** `src/styles/globals.css` + `src/styles/tokens.css`
- **Responsive breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px), 2xl (1536px)
- **Mobile-first:** Design for mobile first, enhance for larger screens

### 4. Icon System

- **Library:** Lucide React (ships with shadcn/ui)
- **Usage pattern:** `import { IconName } from 'lucide-react'` → `<IconName size={24} />`
- **Sizes:** 16px (inline), 20px (buttons), 24px (standalone)
- **No emojis as UI icons** — SVG only

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
- Follow Next.js best practices — use `.claude/skills/next-best-practices/SKILL.md` for guidance on routing, data fetching, error handling, and performance optimization.
