# ─── Stage 1: Dependencies ───────────────────────────────────────────────────
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY packages/types/package.json   ./packages/types/package.json
COPY packages/utils/package.json   ./packages/utils/package.json
COPY packages/auth/package.json    ./packages/auth/package.json
COPY packages/db/package.json      ./packages/db/package.json
COPY packages/wallet/package.json  ./packages/wallet/package.json
COPY packages/x402/package.json    ./packages/x402/package.json
COPY apps/api/package.json         ./apps/api/package.json

RUN pnpm install --frozen-lockfile

# ─── Stage 2: Builder ─────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./

COPY packages/types   ./packages/types
COPY packages/utils   ./packages/utils
COPY packages/auth    ./packages/auth
COPY packages/db      ./packages/db
COPY packages/wallet  ./packages/wallet
COPY packages/x402    ./packages/x402
COPY apps/api         ./apps/api

RUN pnpm --filter @synergetics/api build

# ─── Stage 3: Runner ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs \
    && adduser  --system --uid 1001 apiuser

COPY --from=builder --chown=apiuser:nodejs /app/apps/api/dist ./dist
COPY --from=deps    --chown=apiuser:nodejs /app/node_modules  ./node_modules

USER apiuser
EXPOSE 4000

CMD ["node", "dist/index.js"]
