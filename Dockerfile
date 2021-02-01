FROM node: latest

MAINTAINER Ghaffour mina 

RUN echo "Tryin to build my first application"

COPY  . /app

WORKDIR  /app

RUN npm install

EXPOSE 3000

CMD npm start

ENTRYPOINT ["npm","start"]
