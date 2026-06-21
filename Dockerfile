# Stage 1: Build the React Application
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency files first to leverage Docker layer caching
COPY package*.json ./
RUN npm install

# Copy the rest of the application and build
COPY . .
RUN npm run build

# Stage 2: Serve with Node 'serve'
FROM node:20-alpine
WORKDIR /app

# Install the 'serve' package globally
RUN npm install -g serve

# Copy the compiled Vite output from the builder stage
COPY --from=builder /app/dist ./dist

# Expose the non-root port
EXPOSE 3000

# Run 'serve' in single-page application mode (-s) on port 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
