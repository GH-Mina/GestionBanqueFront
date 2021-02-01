FROM node:latest AS build

MAINTAINER Ghaffour mina

RUN echo "Tryin to build my front application"

COPY . /var/www

WORKDIR /var/www

RUN npm install

RUN npm run build

FROM nginx:1.19.0-alpine AS prod-stage
COPY --from=build /var/www/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx","-g","daemond off;"]
