# 10-133? Production multi-container deployments - copy over content of Dockerfile.dev ? (already has 'start' not 'dev' script)
# 9-119 Dockerising a React app - again! (see diagram for steps) - for the 'client' React app 
FROM node:alpine
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
CMD ["npm", "run", "start"]