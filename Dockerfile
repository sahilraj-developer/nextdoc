# Use the official Node.js image.
FROM node:18-alpine AS builder

# Set the working directory.
WORKDIR /app

# Copy package.json and package-lock.json.
COPY package*.json ./

# Install dependencies.
RUN npm install

# Copy the rest of the application.
COPY . .

# Build the application.
RUN npm run build

# Use a smaller image for production.
FROM node:18-alpine

WORKDIR /app

# Copy only the built application and node_modules from the builder stage.
COPY --from=builder /app .

# Expose the port your app runs on.
EXPOSE 3000

# Start the application.
CMD ["npm", "start"]
