# Multi-stage build for Next.js application
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat git
WORKDIR /app

# Сначала копируем только package.json
COPY package.json package-lock.json ./

# Устанавливаем зависимости с правильными правами
RUN npm install --unsafe-perm && \
    chown -R node:node /app/node_modules

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Создаем CommonJS конфиг из TypeScript
RUN echo "module.exports = $(cat next.config.ts | sed 's/export default //')" > next.config.js

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Устанавливаем остальные зависимости с правами
RUN npm install --unsafe-perm -D tailwindcss postcss autoprefixer @tailwindcss/postcss && \
    npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup -g 1001 -S nodejs && \
    adduser -S -u 1001 nextjs && \
    mkdir -p /app/.next/cache && \
    chown -R nextjs:nodejs /app

USER nextjs

COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
