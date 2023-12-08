# 🏦 Banking Demo Frontend

This repository hosts the source code for the frontend of our demo banking application.

## 🏗️ Build

``` bash
$ pnpm install
$ pnpm run build && pnpm run start
```

## 🐋 Docker Setup

To build the docker image, simply build the dockerfile present in the root directory.

```bash
$ docker buildx build -t banking-frontend -f docker/Dockerfile .
$ docker run -p 4200:80 banking-frontend
```
