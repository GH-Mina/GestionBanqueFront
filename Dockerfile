FROM node:10

MAINTAINER Ghaffour mina 

RUN echo "Tryin to build my first application"

COPY . /temp

WORKDIR /temp

RUN npm install

EXPOSE 3000
CMD npm start

ENTRYPOINT ["npm","start"]
