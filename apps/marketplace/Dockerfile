# ─── Stage 1: Dependencies ───────────────────────────────────────────────────
FROM node:22-alpine AS deps
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

# Copy workspace manifests
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml turbo.json ./
COPY packages/types/package.json        ./packages/types/package.json
COPY packages/utils/package.json        ./packages/utils/package.json
COPY packages/auth/package.json         ./packages/auth/package.json
COPY packages/ui/package.json           ./packages/ui/package.json
COPY packages/api-client/package.json   ./packages/api-client/package.json
COPY apps/marketplace/package.json      ./apps/marketplace/package.json

RUN pnpm install --frozen-lockfile

# ─── Stage 2: Builder ─────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
RUN corepack enable && corepack prepare pnpm@latest --activate
WORKDIR /app

COPY --from=deps /app/node_modules      ./node_modules
COPY --from=deps /app/packages          ./packages
COPY package.json pnpm-workspace.yaml turbo.json tsconfig.base.json ./

# Copy source for this app and its local packages
COPY packages/types      ./packages/types
COPY packages/utils      ./packages/utils
COPY packages/auth       ./packages/auth
COPY packages/ui         ./packages/ui
COPY packages/api-client ./packages/api-client
COPY apps/marketplace    ./apps/marketplace

ENV NEXT_TELEMETRY_DISABLED=1

RUN pnpm --filter @synergetics/marketplace build

# ─── Stage 3: Production runner ───────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

COPY --from=builder /app/apps/marketplace/public         ./apps/marketplace/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/marketplace/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/apps/marketplace/.next/static     ./apps/marketplace/.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "apps/marketplace/server.js"]
