# 10-133? Production multi-container deployments - copy over content of Dockerfile.dev ? (already has 'start' not 'dev' script)
# 9-119 Dockerising a React app - again! (see diagram for steps) - for the 'client' React app 
FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
# copied from https://raw.githubusercontent.com/StephenGrider/multi-docker/master/client/Dockerfile