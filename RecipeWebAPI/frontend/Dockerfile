FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ENV HOST=0.0.0.0
ENV PORT=3001

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
