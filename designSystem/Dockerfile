FROM node:12-slim

WORKDIR /app

COPY ./package.json ./

RUN npm install

RUN npm audit fix

COPY . .

CMD [ "npm", "start" ]

EXPOSE 9001

