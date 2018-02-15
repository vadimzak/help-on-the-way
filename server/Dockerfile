FROM node:9
COPY package*.json ./

RUN npm install
COPY . .
CMD [ "npm", "start" ]
