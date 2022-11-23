FROM node:16.14-alpine

WORKDIR /back-end

COPY package* .

RUN npm install

COPY . .

EXPOSE 3001

RUN npx -y tsc

CMD ["npm", "run", "dev"]