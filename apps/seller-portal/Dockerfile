# ─── Stage 1: Dependencies ───────────────────────────────────────────────────
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY packages/types/package.json        ./packages/types/package.json
COPY packages/utils/package.json        ./packages/utils/package.json
COPY packages/auth/package.json         ./packages/auth/package.json
COPY packages/ui/package.json           ./packages/ui/package.json
COPY packages/api-client/package.json   ./packages/api-client/package.json
COPY apps/seller-portal/package.json    ./apps/seller-portal/package.json

RUN pnpm install --frozen-lockfile

# ─── Stage 2: Builder ─────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./

COPY packages/types      ./packages/types
COPY packages/utils      ./packages/utils
COPY packages/auth       ./packages/auth
COPY packages/ui         ./packages/ui
COPY packages/api-client ./packages/api-client
COPY apps/seller-portal  ./apps/seller-portal

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm --filter @synergetics/seller-portal build

# ─── Stage 3: Runner ──────────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
    && adduser  --system --uid 1001 nextjs

COPY --from=builder /app/apps/seller-portal/public              ./apps/seller-portal/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/seller-portal/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/seller-portal/.next/static     ./apps/seller-portal/.next/static

USER nextjs
EXPOSE 3001
ENV PORT=3001
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/seller-portal/server.js"]
