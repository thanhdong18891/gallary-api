# stage 1 building the code
FROM node as builder
WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# stage 2
FROM node
WORKDIR /usr/app
COPY package*.json ./
RUN npm install 

COPY --from=builder /usr/app/dist ./dist

COPY ormconfig.json ./ormconfig.json

EXPOSE 8080
CMD [ "node", "dist/main" ]