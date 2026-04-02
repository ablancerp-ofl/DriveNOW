# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "start"]