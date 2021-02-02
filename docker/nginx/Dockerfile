FROM nginx:mainline-alpine

RUN apk update && apk add --update --no-cache \
    nginx-mod-http-image-filter \
    sudo \
    nano \
    bash

COPY ./docker/nginx/nginx_conf/nginx.conf /etc/nginx/conf.d/default.conf
