 Multi-stage build for Next.js application
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat git
WORKDIR /app

# Копируем только файлы зависимостей
COPY package.json package-lock.json ./
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules

# 1. Копируем только package.json для установки TypeScript
COPY package.json .
RUN npm install -D typescript @types/node
# 2. Копируем все остальные файлы
COPY . .

# 3. Явно создаем CommonJS конфиг из TypeScript
RUN echo "const nextConfig = $(cat next.config.ts | grep -v 'import' | sed 's/e>
    echo "module.exports = nextConfig;" >> next.config.js

# 4. Устанавливаем остальные devDependencies
RUN npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]

