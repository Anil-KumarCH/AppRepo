# Dockerfile for Next.js Application

# ---- Stage 1: Build Stage ----
# Use an official Node.js image as a parent image.
# Alpine versions are lightweight. Choose a version compatible with your Next.js app.
FROM node:18-alpine AS builder

# Set the working directory in the container.
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) first.
# This leverages Docker's caching.
COPY package*.json ./

# Install dependencies. Consider fixing peer dependency issues to remove --force.
RUN npm install --force

# Copy the rest of your application's source code.
# Ensure you have a .dockerignore file to exclude node_modules, .next, .git, etc.
COPY . .

# Build the Next.js application for production.
RUN npm run build

# ---- Stage 2: Production Stage ----
# Use a lean Node.js Alpine image for the production environment.
FROM node:18-alpine AS runner

# Set the working directory.
WORKDIR /app

# Set environment to production for Next.js.
ENV NODE_ENV=production
# Set HOSTNAME for Next.js server to listen on all interfaces within Docker.
ENV HOSTNAME=0.0.0.0
# Standard Next.js port.
EXPOSE 3000

# Create a non-root user and group for better security.
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Change ownership of the app directory.
RUN chown nextjs:nodejs /app

# Switch to the non-root user.
USER nextjs

# Copy the standalone output, which includes server.js and minimal node_modules.
# Important: We copy this first.
COPY --from=builder /app/.next/standalone ./

# Copy the PUBLIC folder from the build stage to the final image.
# The standalone server.js needs this to serve images and other assets.
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Copy the STATIC assets from the build stage to the final image.
# The standalone server.js needs this to serve CSS, JS, and other build artifacts.
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Start the Next.js server.
CMD ["node", "server.js"]