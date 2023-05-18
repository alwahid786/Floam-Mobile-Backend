# builder steps
FROM node:16.0.0
WORKDIR /app
# copy files to container
COPY ./package.json ./
COPY ./yarn.lock ./
#COPY ./dist ./
#ENV NODE_ENV='production'
RUN yarn install --force
# run files
COPY . .
RUN yarn build
CMD ["yarn", "run", "start:dev"]