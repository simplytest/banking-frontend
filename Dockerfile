FROM node:20-slim AS base

WORKDIR /usr/local/app

# Build Frontend

ADD . / ./

RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN source /root/.bashrc

RUN pnpm install
RUN pnpm run build

# Setup Nginx

FROM nginx:latest

COPY --from=base /usr/local/app/dist/BankingSoftwareFrontEnd /usr/share/nginx/html

EXPOSE 80
