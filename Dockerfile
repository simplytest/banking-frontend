FROM node:20-slim AS base

WORKDIR /usr/local/app

# Build Frontend

ADD . / ./

RUN npm install
RUN npm run build

# Setup Nginx

FROM nginx:latest

COPY --from=base /usr/local/app/dist/BankingSoftwareFrontEnd /usr/share/nginx/html

EXPOSE 80
