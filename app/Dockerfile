# Multi-stage build for Next.js application
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Install необходимые системные зависимости
RUN apk add --no-cache libc6-compat git
WORKDIR /app

# Копируем файлы зависимостей
COPY package.json package-lock.json* ./
# Устанавливаем ВСЕ зависимости (включая devDependencies) для сборки
RUN npm install

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Устанавливаем переменные окружения для сборки
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production

# Устанавливаем Tailwind CSS и PostCSS явно
RUN npm install -D tailwindcss postcss autoprefixer @tailwindcss/postcss

# Запускаем сборку
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Копируем нужные файлы конфигурации
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/tailwind.config.js ./
COPY --from=builder /app/postcss.config.js ./

# Устанавливаем правильные права
RUN mkdir -p .next/cache
RUN chown -R nextjs:nodejs .next

# Копируем собранное приложение
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]