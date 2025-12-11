# Use specific version of Node.js
FROM node:18.20.2-alpine3.19 AS builder
WORKDIR /app

# Set node environment
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install --prefer-offline --audit --legacy-peer-deps

# Copy source and build
COPY . .
RUN npm run build

# Production image
FROM node:18.20.2-alpine3.19
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001 -G nodejs

# Copy necessary files
COPY --from=builder --chown=nextjs:nodejs /app/package.json /app/package-lock.json ./
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/src ./src

# Clean up
RUN npm cache clean --force && \
    rm -rf /tmp/*

# Switch to non-root user
USER nextjs

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

EXPOSE 3000

CMD ["npm", "start"]
