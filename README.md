# ⬡ Synergetics.ai — AI Marketplace Platform

A full-stack, multi-portal marketplace platform for buying and selling AI tools, datasets, APIs, and digital assets. Built as a Turborepo monorepo with Next.js 15, Fastify, Drizzle ORM, and support for Stripe, crypto (ETH/SOL/USDC), and the [x402 protocol](https://x402.org).

---

## ✨ Feature Highlights

| Portal | Description |
|---|---|
| **Marketplace** `:3000` | Buyer-facing storefront — search, product pages, cart, checkout, profile |
| **Seller Portal** `:3001` | Seller dashboard — listings, orders, analytics, payouts, KYB onboarding |
| **Platform HQ** `:3002` | Admin headquarters — merchant management, finance, maintenance, geo-restrictions, feature flags |
| **API Server** `:4000` | Fastify REST API — 35+ endpoints with Swagger docs at `/api/v1/docs` |

### Core Features
- 🔐 **OAuth Authentication** — Google & GitHub sign-in for all portals via NextAuth.js, with MFA enforcement for admin portal
- 💳 **Multi-method Payments** — Stripe, ETH, SOL, USDC, and x402 micropayment protocol
- 🌍 **Geo-Restrictions** — Country-level access control for regulatory compliance (OFAC sanctions etc.)
- 🔧 **Maintenance Mode** — Per-portal toggle with custom messages and scheduled windows
- 📊 **Analytics** — Revenue charts, geographic breakdown, top products, order funnels
- 🚩 **Feature Flags** — Runtime feature toggles with risk-level classifications
- 📣 **Communications** — Platform-wide announcements with audience/channel targeting
- ⚙️ **Workflows** — Automated action pipelines (onboarding, payouts, disputes, moderation)

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 15, React 19, Tailwind CSS v4 |
| API | Fastify 5, Zod, `@fastify/jwt`, `@fastify/swagger` |
| Database | PostgreSQL via Neon + Drizzle ORM |
| Auth | NextAuth.js v5 (Auth.js) with per-portal secrets |
| Payments | Stripe SDK, ethers.js (Web3), x402 protocol |
| Monorepo | Turborepo + pnpm workspaces |
| Language | TypeScript (strict) throughout |

---

## 📁 Repository Structure

```
synergy-marketplace/
├── apps/
│   ├── marketplace/        # Buyer-facing Next.js app (port 3000)
│   ├── seller-portal/      # Seller dashboard Next.js app (port 3001)
│   ├── platform-mgmt/      # Platform HQ admin Next.js app (port 3002)
│   └── api/                # Fastify REST API server (port 4000)
├── packages/
│   ├── auth/               # NextAuth config factory + JWT helpers + RBAC
│   ├── db/                 # Drizzle ORM schema + migrations + seed
│   ├── types/              # Shared Zod schemas + TypeScript types
│   ├── utils/              # Shared utilities (slugify, dates, currency, etc.)
│   ├── ui/                 # Shared React component library (growing)
│   ├── wallet/             # Web3 utilities (SIWE, balances, transactions)
│   ├── x402/               # x402 payment protocol client + facilitator
│   └── api-client/         # Typed HTTP client for the API server
├── .env.example            # All required environment variables documented
├── turbo.json              # Turborepo pipeline config
└── pnpm-workspace.yaml     # pnpm workspace definition
```

---

## ⚡ Quick Start

### Prerequisites

| Requirement | Version |
|---|---|
| Node.js | ≥ 20 |
| pnpm | ≥ 9 |
| Git | Any recent version |

Install pnpm if you don't have it:

```bash
npm install -g pnpm
```

### 1. Clone the Repository

```bash
git clone https://github.com/yuthav/synergy-marketplace.git
cd synergy-marketplace
```

### 2. Install Dependencies

```bash
pnpm install
```

This installs all dependencies for all 4 apps and 8 packages in the monorepo.

### 3. Configure Environment Variables

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and configure the required variables (see the [Environment Variables](#-environment-variables) section below for details).

**Minimum required for local development:**

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/synergy_dev"

# Auth secrets (one per portal — generate with: openssl rand -base64 32)
NEXTAUTH_SECRET_MARKETPLACE="your-secret-here"
NEXTAUTH_SECRET_SELLER="your-secret-here"
NEXTAUTH_SECRET_PLATFORM="your-secret-here"

# OAuth (get from Google Cloud Console & GitHub Developer Settings)
GOOGLE_CLIENT_ID="..."
GOOGLE_CLIENT_SECRET="..."
GITHUB_CLIENT_ID="..."
GITHUB_CLIENT_SECRET="..."
```

### 4. Run Database Migrations

```bash
pnpm --filter @synergetics/db db:push
```

### 5. Start All Applications

**All portals + API simultaneously (recommended):**

```bash
pnpm dev
```

This uses Turborepo to start all apps in parallel.

**Or start each individually:**

```bash
# Marketplace (buyer storefront)
pnpm --filter @synergetics/marketplace dev        # → http://localhost:3000

# Seller Portal
pnpm --filter @synergetics/seller-portal dev      # → http://localhost:3001

# Platform HQ (admin)
pnpm --filter @synergetics/platform-mgmt dev      # → http://localhost:3002

# API Server
pnpm --filter @synergetics/api dev                # → http://localhost:4000
```

**API Swagger Docs** are available at: `http://localhost:4000/api/v1/docs`

---

## 🔑 Environment Variables

All variables are documented in [`.env.example`](.env.example). Key groups:

| Group | Variables |
|---|---|
| Database | `DATABASE_URL` |
| Auth | `NEXTAUTH_SECRET_MARKETPLACE`, `NEXTAUTH_SECRET_SELLER`, `NEXTAUTH_SECRET_PLATFORM` |
| OAuth | `GOOGLE_CLIENT_ID/SECRET`, `GITHUB_CLIENT_ID/SECRET` |
| Stripe | `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `STRIPE_PUBLISHABLE_KEY` |
| Blockchain | `ETHEREUM_RPC_URL`, `SOLANA_RPC_URL`, `USDC_CONTRACT_ADDRESS` |
| x402 | `X402_FACILITATOR_URL`, `X402_MERCHANT_ADDRESS` |
| API Server | `API_PORT` (default: 4000), `API_HOST` (default: 0.0.0.0) |

---

## 🛠️ Development Commands

```bash
# Start all apps in dev mode
pnpm dev

# Type-check all packages
pnpm type-check

# Lint all packages
pnpm lint

# Build all apps for production
pnpm build

# Run database migrations
pnpm --filter @synergetics/db db:push

# Generate Drizzle migration files
pnpm --filter @synergetics/db db:generate

# Seed the database
pnpm --filter @synergetics/db db:seed
```

---

## 🌐 API Endpoints Overview

The Fastify API runs at `http://localhost:4000/api/v1`. Full interactive docs at `/api/v1/docs`.

| Prefix | Description |
|---|---|
| `POST /api/v1/auth/token` | Issue portal-specific JWTs |
| `GET /api/v1/listings` | Paginated listing search |
| `GET /api/v1/listings/:slug` | Product detail page data |
| `GET /api/v1/cart` | Current cart contents |
| `POST /api/v1/cart/checkout` | Initiate checkout (Stripe / crypto / x402) |
| `GET /api/v1/orders` | Buyer order history |
| `GET /api/v1/me` | Authenticated user profile |
| `GET /api/v1/seller/*` | Seller dashboard endpoints |
| `GET /api/v1/platform/*` | Platform HQ admin endpoints |
| `POST /api/v1/payments/stripe/checkout` | Create Stripe checkout session |
| `POST /api/v1/payments/x402/facilitate` | x402 payment facilitation |

---

## 🔐 Authentication

Each portal has **separate NextAuth.js configuration** with isolated secrets:

- **Marketplace** — Google, GitHub, Email/Password (role: `buyer`)
- **Seller Portal** — Google, GitHub, Business Email (role: `seller`, includes `kybStatus` claim)
- **Platform HQ** — Google + credentials with **MFA required** (role: `admin`, 8-hour sessions)

Cross-portal navigation links are provided on each sign-in page for convenience.

---

## 🐳 Docker

The entire platform runs as a containerised stack. Six services are orchestrated via Docker Compose:

| Service | Image | Port |
|---|---|---|
| `postgres` | `postgres:17-alpine` | 5432 |
| `redis` | `redis:7-alpine` | 6379 |
| `api` | Built from `apps/api/Dockerfile` | 4000 |
| `marketplace` | Built from `apps/marketplace/Dockerfile` | 3000 |
| `seller-portal` | Built from `apps/seller-portal/Dockerfile` | 3001 |
| `platform-mgmt` | Built from `apps/platform-mgmt/Dockerfile` | 3002 |
| `nginx` | `nginx:alpine` | 80, 443 |

### Prerequisites

| Requirement | Version |
|---|---|
| Docker | ≥ 26 |
| Docker Compose | ≥ v2.24 (bundled with Docker Desktop) |

### 1. Clone and Configure

```bash
git clone https://github.com/yuthav/synergy-marketplace.git
cd synergy-marketplace
cp .env.example .env
```

Edit `.env` with your secrets. The minimum required keys:

```env
# Postgres (used by docker-compose automatically)
POSTGRES_USER=synergy
POSTGRES_PASSWORD=changeme_strong_password
POSTGRES_DB=synergy_db

# Redis
REDIS_PASSWORD=changeme_redis_password

# Auth secrets — generate each with: openssl rand -base64 32
NEXTAUTH_SECRET_MARKETPLACE=your-marketplace-secret
NEXTAUTH_SECRET_SELLER=your-seller-secret
NEXTAUTH_SECRET_PLATFORM=your-platform-secret

# OAuth providers
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...

# Stripe
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### 2. Build and Start the Full Stack

```bash
# Build all images and start all services in detached mode
docker compose up --build -d
```

First build takes ~3–5 minutes (downloads base images, installs deps, compiles Next.js). Subsequent builds are faster due to Docker layer caching.

### 3. Run Database Migrations

Once the containers are running, apply the schema:

```bash
docker compose exec api node -e "require('./dist/db/migrate').migrate()"
```

Or connect directly to Postgres:

```bash
docker compose exec postgres psql -U synergy -d synergy_db
```

### 4. Access the Applications

| Portal | URL |
|---|---|
| 🛒 Marketplace | [http://localhost:3000](http://localhost:3000) |
| 🏪 Seller Portal | [http://localhost:3001](http://localhost:3001) |
| 🎛️ Platform HQ | [http://localhost:3002](http://localhost:3002) |
| ⚡ API Server | [http://localhost:4000](http://localhost:4000) |
| 📖 API Swagger Docs | [http://localhost:4000/api/v1/docs](http://localhost:4000/api/v1/docs) |
| 🌐 Nginx Proxy | [http://localhost:80](http://localhost) (routes to marketplace by default) |

### 5. Useful Docker Commands

```bash
# View running containers and their status
docker compose ps

# Stream logs from all services
docker compose logs -f

# Stream logs from a specific service
docker compose logs -f api
docker compose logs -f marketplace

# Restart a single service (e.g. after a config change)
docker compose restart api

# Rebuild a single service without restarting others
docker compose build marketplace
docker compose up -d --no-deps marketplace

# Stop all services (preserves volumes)
docker compose stop

# Stop and remove containers + networks (keeps volumes)
docker compose down

# ⚠️ Stop and DELETE all data (removes volumes)
docker compose down -v

# Open a shell inside a container
docker compose exec api sh
docker compose exec postgres sh
```

### Building Individual Images

Each app can be built and run independently:

```bash
# Build the API image
docker build -f apps/api/Dockerfile -t synergy-api:latest .

# Build the marketplace image
docker build -f apps/marketplace/Dockerfile -t synergy-marketplace:latest .

# Run a standalone container
docker run -p 4000:4000 --env-file .env synergy-api:latest
```

### Docker File Structure

```
synergy-marketplace/
├── docker-compose.yml          # Orchestrates all 7 services
├── .dockerignore               # Excludes node_modules, .next, .env from build context
├── nginx/
│   └── nginx.conf              # Reverse proxy routing for all portals
└── apps/
    ├── api/Dockerfile          # 3-stage: deps → tsc build → alpine runner
    ├── marketplace/Dockerfile  # 3-stage: deps → next build → alpine runner
    ├── seller-portal/Dockerfile
    └── platform-mgmt/Dockerfile
```

> **Note:** All Next.js apps use `output: 'standalone'` in `next.config.ts` which generates a self-contained `server.js` — this produces minimal Docker images without requiring a full `node_modules` installation in the final stage.

### Health Checks

Docker Compose health checks are configured for all stateful services:

| Service | Health Check |
|---|---|
| `postgres` | `pg_isready` every 10s |
| `redis` | `redis-cli ping` every 10s |
| `api` | `GET /health` every 30s |

Next.js apps start after the API health check passes.

---

## 📄 License

MIT — see [LICENSE](LICENSE) for details.

---

## 🤝 Contributing

Pull requests are welcome. Please open an issue first to discuss what you'd like to change.
