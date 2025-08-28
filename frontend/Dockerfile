# --- Build stage ---
FROM node:18-alpine AS build
WORKDIR /app

# Copy manifests first for better caching
COPY package*.json ./

# Install deps (works with or without package-lock.json)
RUN if [ -f package-lock.json ]; then \
      npm ci --no-audit --no-fund --legacy-peer-deps; \
    else \
      npm install --no-audit --no-fund --legacy-peer-deps; \
    fi

# Copy source and build
COPY . .
RUN npm run build

# --- Runtime stage (Nginx) ---
FROM nginx:1.25-alpine
# Copy build output to the default web root
COPY --from=build /app/dist /usr/share/nginx/html
# Replace the default server config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# (Optional) Health check file
RUN printf 'OK\n' > /usr/share/nginx/html/healthz.txt

EXPOSE 80

# Validate config on start; keep nginx in foreground
CMD ["/bin/sh", "-c", "nginx -t && exec nginx -g 'daemon off;'"]

