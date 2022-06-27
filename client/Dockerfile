FROM node:16-alpine

WORKDIR /app
COPY package.json .
RUN npm install \ 
  && printf "ls\nnpm run build\nnpm run start" > start.sh

COPY . .


CMD ["npm", "run", "dev"]