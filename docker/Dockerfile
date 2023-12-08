FROM fedora:38 AS base

WORKDIR /usr/local/app

# Build Frontend

ADD . / ./

RUN dnf install -y nodejs
RUN curl -fsSL https://get.pnpm.io/install.sh | sh -
RUN source /root/.bashrc && pnpm install && pnpm run build

# Setup Nginx

FROM nginx:latest

COPY --from=base /usr/local/app/dist/BankingSoftwareFrontEnd /usr/share/nginx/html
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
