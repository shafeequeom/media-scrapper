FROM node:17

RUN mkdir -p /server
WORKDIR /server

COPY package.json /server

COPY . /server

RUN npm install

CMD ["npm", "start"]