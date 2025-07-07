# --- BUILD STAGE ---
  FROM node:20-alpine AS builder
  WORKDIR /app
  
  COPY package*.json ./
  RUN npm install
  
  COPY . .
  RUN npm run build
  
  # --- PRODUCTION STAGE ---
  FROM nginx:stable-alpine
  
  # Copy build output vào thư mục serve của nginx
  COPY --from=builder /app/dist /usr/share/nginx/html
  
  # Copy nginx.conf custom để override default
  COPY nginx.conf /etc/nginx/conf.d/default.conf
  
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]
  