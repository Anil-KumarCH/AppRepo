# Dockerfile for Next.js Application

# ---- Stage 1: Build Stage ----
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --force
COPY . .
RUN npm run build

# ---- Stage 2: Production Stage ----
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy standalone output (server.js, minimal node_modules)
COPY --from=builder /app/.next/standalone ./

# Copy public assets
COPY --from=builder /app/public ./public

# Copy static build assets (.next/static)
COPY --from=builder /app/.next/static ./.next/static

# Create the .next/cache directory and set permissions
# This directory is needed by Next.js at runtime for image optimization and other caching.
# Ensure the nextjs user can write to it.
RUN mkdir -p ./.next/cache && \
    chown -R nextjs:nodejs ./.next

# Change ownership of other necessary copied assets to the nextjs user
# This is important if these directories/files are created by root during COPY
# and nextjs user needs to interact with them (though mostly read for public/static).
RUN chown -R nextjs:nodejs ./public && \
    chown -R nextjs:nodejs ./standalone_nodejs_modules || true # standalone_nodejs_modules may not exist if not using older next versions

# If you have a custom server or other files at the root of /app that need specific ownership:
# RUN chown nextjs:nodejs /app/your-custom-server.js

# Switch to the non-root user
USER nextjs

# Start the Next.js server
CMD ["node", "server.js"]
