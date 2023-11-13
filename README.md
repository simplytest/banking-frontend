# 🏦 Banking Demo Frontend

This repository hosts the source code for the frontend of our demo banking application.

## 🏗️ Build

``` bash
$ npm install
$ npm run build && npm run start
```

## 🐋 Docker Setup

To build the docker image, simply build the dockerfile present in the root directory.

```bash
$ docker buildx build -t banking-frontend .
$ docker run -p 4200:4200 banking-frontend
```
