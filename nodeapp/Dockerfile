FROM node:14.18.1

WORKDIR /app

COPY package*.json .

RUN ls
RUN npm install
RUN npm install


COPY . .

EXPOSE 3001

CMD ["npm","start"]
