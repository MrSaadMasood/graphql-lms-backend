FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm ci


CMD [ "npm", "run", "prod" ]






