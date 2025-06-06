# Dockerfile for Next.js Application

# ---- Stage 1: Build Stage ----
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Consider removing --force by resolving peer dependency issues
RUN npm install --force
COPY . .
# Ensure .dockerignore is properly set up to exclude unnecessary files
RUN npm run build

# ---- Stage 2: Production Stage ----
FROM node:18-alpine AS runner

# Set a working directory for the app
WORKDIR /home/app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

# Create a non-root user and group
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone application files from the builder stage
# This includes server.js, minimal node_modules, and the .next folder (with server components etc.)
# Ownership is set to the nextjs user during the copy.
COPY --chown=nextjs:nodejs --from=builder /app/.next/standalone /home/app/

# Copy the public assets from the builder stage
COPY --chown=nextjs:nodejs --from=builder /app/public /home/app/public

# Copy the static build assets (.next/static) from the builder stage
# These are essential for CSS, JS chunks, fonts, etc.
COPY --chown=nextjs:nodejs --from=builder /app/.next/static /home/app/.next/static

# The Next.js server, when running as 'nextjs' user, will need to create/write to '.next/cache'.
# The '.next' directory (containing '.next/static') is now owned by 'nextjs'.
# The 'nextjs' user should have permission to create 'cache' inside its own '.next' directory.
# If '/home/app/.next' was created by COPY with correct ownership, this should be fine.
# As an extra measure, ensure the root of the app directory is owned by nextjs.
# This is somewhat redundant if --chown is used on all COPY, but doesn't hurt.
RUN chown -R nextjs:nodejs /home/app

# Switch to the non-root user
USER nextjs

# Start the Next.js server
# The server.js in standalone mode is designed to find assets relative to its location.
CMD ["node", "server.js"]
