FROM node:20-slim AS build

WORKDIR /banking-demo
ADD . / ./

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN pnpm install && pnpm run build
RUN mv dist dist-prod

RUN pnpm install && pnpm run build:dev
RUN mv dist dist-dev

# Setup nginx

FROM nginx:latest

EXPOSE 80
WORKDIR /nginx

COPY --from=build /banking-demo/dist-prod/BankingSoftwareFrontEnd frontend-prod
COPY --from=build /banking-demo/dist-dev/BankingSoftwareFrontEnd frontend-dev

COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html

ENV VARIANT=PROD

CMD if [ "$VARIANT" = "DEV" ]; \
    then echo "Running development build" && ln -sf /nginx/frontend-dev /usr/share/nginx/html; \
    else echo "Running production build" && ln -sf /nginx/frontend-prod /usr/share/nginx/html; \
    fi; \
    nginx -g "daemon off;"
