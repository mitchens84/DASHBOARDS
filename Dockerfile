# Build stage
FROM node:18-alpine as builder

# Set working directory
WORKDIR /app

# Debug: List files to verify copy
RUN ls -la

# Copy all files
COPY . .

# Debug: List files after copy
RUN ls -la

# Install dependencies
RUN npm install

# Build the project
RUN npm run build

# Serve stage
FROM node:18-alpine

WORKDIR /app

# Install serve
RUN npm install -g serve

# Copy built files
COPY --from=builder /app/dist ./dist

# Expose port
EXPOSE 3000

# Start server
CMD ["serve", "-s", "dist", "-l", "3000"]
