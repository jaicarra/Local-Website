# Builder Stage
FROM node:20-slim as builder

WORKDIR /app

# Copy package.json and package-lock.json to leverage Docker cache
COPY package*.json ./

# Install all dependencies, including devDependencies needed for building Tailwind CSS
RUN npm install

# Copy all project files into the builder stage
COPY . .

# Build the Tailwind CSS
RUN npm run build:css

# Production Stage
FROM node:20-slim

# Install live-server globally
RUN npm install -g live-server

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/dist ./dist
COPY index.html ./
COPY images/ ./images/
COPY js/ ./js/

# Expose the default port for live-server
EXPOSE 8080

# Command to run when the container starts
CMD [ "live-server", "--host=0.0.0.0" ]
