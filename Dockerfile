FROM node:22-alpine
WORKDIR /app

RUN npm install -g serve

COPY package.json package-lock.json astro.config.mjs tsconfig.json ./
COPY public ./public
COPY src ./src

RUN npm ci

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
