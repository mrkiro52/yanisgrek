FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json astro.config.mjs tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm ci
RUN npm run build

FROM node:22-alpine
WORKDIR /app

RUN npm install -g sirv-cli

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["sirv", "dist", "--host", "0.0.0.0", "--port", "3000"]
