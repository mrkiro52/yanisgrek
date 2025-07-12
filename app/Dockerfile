# Используем официальный образ Node.js
FROM node:18-alpine AS builder

# Устанавливаем зависимости
RUN apk add --no-cache libc6-compat git

# Рабочая директория
WORKDIR /app

# Копируем только package.json сначала
COPY package.json package-lock.json ./

# Устанавливаем зависимости с правильными правами
RUN npm install --unsafe-perm

# Копируем остальные файлы
COPY . .

# Создаем CommonJS конфиг из TypeScript
RUN echo "module.exports = $(cat next.config.ts | sed 's/export default //')" > next.config.js

# Сборка приложения
ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
RUN npm run build

# Финальный образ
FROM node:18-alpine
WORKDIR /app

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
