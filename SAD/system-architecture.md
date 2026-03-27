# NT Green Market — System Architecture Diagram

**Stack:** Next.js 14 · TypeScript · Tailwind CSS · Supabase · Prisma · Vercel
**Deployment:** Phase 1 — Free hosting (Vercel + Supabase) | Phase 2 — Azure (AAD SSO + Azure services)

```mermaid
graph TB
    subgraph Users["Employees (~1,500 NashTech internal users)"]
        BU[Buyer]
        SE[Seller]
        AD[Admin]
    end

    subgraph Frontend["Frontend
Next.js 14 · App Router · TypeScript · Tailwind CSS · shadcn/ui
Phase 1: Vercel  →  Phase 2: Azure Static Web Apps"]

        subgraph Pages["Pages / Routes"]
            PUB[Public\n/ · /shops · /charities]
            BUYER[Buyer\n/browse · /orders · /donate]
            SELLER[Seller\n/my-shop · /products · /orders]
            ADMIN[Admin\n/dashboard · /users · /event · /charities]
        end
    end

    subgraph Auth["Authentication · OIDC / JWT
Phase 1: Supabase Auth  →  Phase 2: Azure AD / Entra ID SSO
Admin-provisioned accounts · Event-scoped Seller roles"]
        OIDC[OIDC Provider\nIssues JWT · Standard claims only]
    end

    subgraph API["Next.js API Routes · Server Actions
Business logic · Role enforcement · Input validation"]
        R_AUTH[/api/auth]
        R_USERS[/api/users]
        R_SHOPS[/api/shops\n/api/products]
        R_ORDERS[/api/orders]
        R_DONATIONS[/api/donations]
        R_EVENT[/api/events]
        R_GAME[/api/game]
    end

    subgraph DB["Database · PostgreSQL · Prisma ORM
Phase 1: Supabase PostgreSQL  →  Phase 2: Azure Database for PostgreSQL Flexible Server"]
        PG[(PostgreSQL\n─────────────\nevents\nusers · user_roles\nshops · products\norders · order_items\ncharities · donations\ngame_scores)]
    end

    subgraph STORAGE["File Storage · S3-compatible API
Phase 1: Supabase Storage (1 GB free)  →  Phase 2: Azure Blob Storage
Product images · Shop banners · max 2 MB · JPEG / PNG / WebP"]
        OBJ[(Object Store\nURL reference\nsaved in DB)]
    end

    %% User navigation
    BU & SE & AD -->|HTTPS| Frontend

    %% Role-based routing
    BU --> BUYER
    SE --> SELLER
    AD --> ADMIN
    BU & SE & AD --> PUB

    %% Login flow
    Frontend -->|OIDC login redirect| OIDC
    OIDC -->|JWT token| Frontend

    %% Frontend → API
    Frontend -->|API calls · Bearer JWT| API

    %% JWT verification
    R_AUTH -->|Verify JWT via JWKS\nLoad event-scoped role from DB| OIDC

    %% API → DB
    R_USERS & R_SHOPS & R_ORDERS & R_DONATIONS & R_EVENT & R_GAME -->|Prisma ORM| PG

    %% API → Storage
    R_SHOPS -->|Upload product image\nValidate size + MIME type| OBJ

    %% Role notes
    style Auth fill:#fef9c3,stroke:#ca8a04
    style DB fill:#dbeafe,stroke:#2563eb
    style STORAGE fill:#dcfce7,stroke:#16a34a
```

## Component Responsibilities

| Component | Responsibility |
|---|---|
| **Next.js App Router** | Page rendering (SSR for public/browse pages, CSR for dashboard), routing, role-based layout |
| **Next.js API Routes** | REST endpoints, JWT validation, business logic, Prisma queries |
| **Supabase Auth → AAD** | Issues OIDC tokens; no role logic — roles stored in app DB |
| **PostgreSQL + Prisma** | All persistent data; event-scoped user roles; standard SQL only |
| **Supabase Storage → Azure Blob** | Product and shop images; URL stored in `products.image_url` |

## Phase 2 Migration Map

| Phase 1 | Phase 2 | Migration effort |
|---|---|---|
| Vercel | Azure Static Web Apps | Redeploy + update env vars |
| Supabase Auth | Azure AD / Entra ID (AAD SSO) | Swap OIDC provider config — no code changes |
| Supabase PostgreSQL | Azure DB for PostgreSQL Flexible Server | `pg_dump` / restore + update `DATABASE_URL` |
| Supabase Storage | Azure Blob Storage | Update storage endpoint env var + credentials |
