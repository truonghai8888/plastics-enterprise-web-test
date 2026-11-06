# Multi-stage Dockerfile cho website Plastics Enterprise (React + Vite + Tailwind)

# ---------------------------------------------------
# Stage 1: Build mã nguồn React
# ---------------------------------------------------
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json và cài đặt dependencies
COPY package*.json ./
RUN npm install

# Copy toàn bộ mã nguồn
COPY . .

# Build phiên bản production
RUN npm run build

# ---------------------------------------------------
# Stage 2: Serve bằng Nginx gọn nhẹ và tối ưu
# ---------------------------------------------------
FROM nginx:alpine

# Copy kết quả build từ stage 1 vào thư mục html của Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy cấu hình Nginx tối ưu cho SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose cổng 80
EXPOSE 80

# Chạy Nginx ở foreground
CMD ["nginx", "-g", "daemon off;"]
