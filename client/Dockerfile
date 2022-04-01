FROM node:17-alpine

RUN mkdir -p /client
WORKDIR /client

COPY package.json /client

COPY . /client

RUN npm install

CMD ["npm", "start"]