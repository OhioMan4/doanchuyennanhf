# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
CMD ["npm", "run", "dev", "--", "--host"]

# Stage 2: Serve build with Nginx
FROM nginx:stable-alpine

# Copy built files to nginx's public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
