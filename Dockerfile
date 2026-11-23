# syntax=docker/dockerfile:1
# Menuiserie Estivale — site vitrine Next.js, image de production minimale (sortie standalone).

FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

# --- dépendances (dev incluses : le build en a besoin)
FROM base AS deps
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# --- build
FROM base AS builder
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Les photos sont versionnées dans public/realisations ; le script ne les
# retélécharge que si elles manquent (PHOTOS_REFRESH=1 pour forcer).
RUN pnpm build

# --- image finale
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001
# sharp (optimiseur d'images de next/image) est déjà tracé dans la sortie standalone.
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
USER nextjs
EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
