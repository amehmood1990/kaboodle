FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY /seeders ./
RUN yarn install


COPY . .
#CMD ["yarn", "seed"]
ENTRYPOINT ["./seeders/entrypoint.sh"]
