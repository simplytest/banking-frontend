# 🏦 Banking Demo Frontend

This repository hosts the source code for the frontend of our demo banking application.

## 🏗️ Build

``` bash
$ pnpm install
$ pnpm run build && pnpm run start
```

or

``` bash 
$ npm install
$ ng serve
```

The `ng serve` needs the angular CLI installed

``` bash
$ npm install -g @angular/cli
```


## 🐋 Docker Setup

To build the docker image, simply build the dockerfile present in the root directory.

```bash
$ docker buildx build -t banking-frontend -f docker/Dockerfile .
$ docker run -p 4200:80 banking-frontend
```

To start frontend from docker contaienr which interacts with localhost backend, use following command:

```bash
$ docker run -e VARIANT=DEV -p 4200:80 banking-frontend
```
