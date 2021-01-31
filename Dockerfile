FROM node: 6.14.5
WORKDIR /app
ADD . /app
RUN npm install
EXPOSE 3000
CMD npm start