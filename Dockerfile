# Build
FROM node:15.14-alpine3.10
WORKDIR .
COPY package*.json .
COPY tsconfig.json .
RUN npm install
COPY ./src ./src
RUN npm run build

#Run
FROM node:15.14-alpine3.10
WORKDIR .
EXPOSE 3000
COPY --from=0 dist .
COPY package*.json .
RUN npm install --only=production
CMD ["node","server.js"]