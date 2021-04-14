# Build TypeScript
FROM node:15.14-alpine3.10
WORKDIR .
COPY package*.json .
COPY tsconfig.json .
RUN npm install
COPY ./src ./src
RUN npm run build

#Copy built files
FROM node:15.14-alpine3.10
ENV DEVELOPMENT=production
WORKDIR /app
EXPOSE 1337
COPY --from=0 dist ./
COPY package*.json ./
RUN npm install --production
CMD ["node","server.js"]