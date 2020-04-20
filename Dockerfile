FROM node:12.16-alpine

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile --non-interactive

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start:prod"]