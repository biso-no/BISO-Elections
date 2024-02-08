# Use Node.js version 16 as the base image
FROM node:16

# Install pnpm globally
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the root package.json and lockfile
COPY package.json ./
COPY pnpm-lock.yaml ./

# Copy the .env file into the container
COPY .env .env

# Install dependencies for all apps and packages
RUN pnpm install

# Expose port 8080 (or whatever port your app listens on)
EXPOSE 8080

# Command to start the application
CMD [ "node", "apps/nextjs/server.js" ]
