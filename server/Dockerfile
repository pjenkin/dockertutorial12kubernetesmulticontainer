# 10-133 Production Dockerfile - copied & slightly amended Dockerfile.dev
# 9-120 Dockerising Generic Node Apps - (see diagram 9-118/119 for the steps) - for the 'server' (API) Express node.js app
FROM node:alpine
WORKDIR "/app"
COPY ./package.json ./
RUN npm install
COPY . .
# CMD ["npm", "run", "dev"]
CMD ["npm", "run", "start"]
# 'start' not 'dev' as start command in production environment 10-33
# - 'start' and 'dev' are scripts defined in package.json (qv)

# slightly different default command, in dev environment, for server and for worker, viz for client app
# i.e. to use nodemon ("dev" in package.json), for when the volume is changed ...
# ... because of a host source code change, the container app will be restarted by nodemon

# 'server' and 'worker' Dockerfile.dev are the same in this case