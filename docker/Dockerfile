FROM node:alpine3.20

WORKDIR /srv

COPY package*.json ./

RUN npm i -g pnpm

RUN pnpm install nx --global

COPY nx.json nx.json
COPY Makefile Makefile

RUN pnpm install

COPY . .

EXPOSE 3021

CMD make serve 
