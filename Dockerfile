FROM node:latest

MAINTAINER Ghaffour mina

RUN echo "Tryin to build my front application"

COPY . /var/www

WORKDIR /var/www

RUN npm install

EXPOSE 3000

ENTRYPOINT ["npm","start"]
