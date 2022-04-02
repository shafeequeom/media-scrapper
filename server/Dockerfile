FROM node:17

RUN mkdir -p /server
WORKDIR /server

COPY package.json /server

COPY . /server

RUN npm install
RUN npm uninstall bcrypt
RUN npm i bcrypt

CMD ["npm", "start"]