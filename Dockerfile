###
FROM node:20-alpine AS lint
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY .eslintrc.json .eslintignore ./
COPY app ./app

RUN npx next lint

### 
FROM node:20-alpine AS deps
WORKDIR /app
RUN apk add --no-cache openssl

COPY package.json package-lock.json ./
RUN npm ci --omit=dev

###
FROM node:20-alpine AS builder
WORKDIR /app
RUN apk add --no-cache openssl

COPY . .
COPY --from=deps /app/node_modules ./node_modules

RUN npx prisma generate
RUN npm run build

###
FROM node:20-alpine AS runner
WORKDIR /app
RUN apk add --no-cache openssl

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

EXPOSE 3000
CMD ["sh", "-c", "npx prisma db push && node server.js"]
