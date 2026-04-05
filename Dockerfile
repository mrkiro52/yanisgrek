FROM node:22-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json astro.config.mjs tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm ci
RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
