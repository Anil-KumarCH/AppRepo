# Node image with Alpine Linux for a smaller footprint
# Using the official Node.js image as a base image
FROM node:18-alpine AS builder

# Set the working directory in the container
WORKDIR /app
#Copy package.json and package-lock.json to the working directory. This allows Docker to cache the npm install step, so it doesn't have to run every time you build the image.
COPY package*.json ./
#Installing the dependencies defined in package.json. The --frozen-lockfile flag ensures that the exact versions in package-lock.json are installed, preventing any changes to the lock file.
RUN npm install -force
# Copying the rest of the application code to the working directory. This should be done after npm install to take advantage of Docker's caching mechanism.
COPY . .
# Building the application. The build command will create a .next directory with the production build of the application.
#RUN npm run build

#Production environment#
#Node image with Alpine Linux for a smaller footprint
FROM node:18-alpine AS runner
# Set the working directory in the container
WORKDIR /app
#Setting the environment variable to production. This is important for Next.js to optimize the build for production.
ENV NODE_ENV=production
#Setting the HOSTNAME env to 0.0.0.0 so that the server can be accessed from any IP address. This is useful when running the container in a cloud environment or on a server.
ENV HOSTNAME=0.0.0.0
#Exposing port 3000, which is the default port for Next.js applications. This allows external access to the application running inside the container.
EXPOSE 3000
#Copying standalone server from the builder stage. The standalone server is a self-contained version of the Next.js application that can be run without any additional dependencies.
COPY --from=builder /app/ .next/standalone ./
#Copying the Next.js static files from the builder stage. These files are necessary for serving the application.
COPY --from=builder /app/ .next/static ./.next/static/
#Copying the public directory from the builder stage. This directory typically contains static assets like images, fonts, etc.
COPY --from=builder /app/public ./public/
#Running the commands at the time of container startup. This command starts the Next.js server using the standalone build.
CMD [ "node", "server.js" ]

