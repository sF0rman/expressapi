# Build TypeScript
FROM node:12.22.4-alpine as build
WORKDIR /app
COPY package.json ./
COPY tsconfig.json ./
COPY ./src ./
RUN npm install --silent
RUN npm run build

#Copy built files
FROM node:12.22.4-alpine
ENV DEVELOPMENT=false
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install --only=production
EXPOSE 1337
COPY --from=build app/dist ./
COPY ./src/database/data ./database/data
COPY ./src/media ./media
CMD ["node","server.js"]