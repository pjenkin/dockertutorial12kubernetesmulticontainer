# 10-135 Altering Nginx's Listen Port (setting up Nginx-2 to serve React app's assets)
# first phase (multi-stage build, get node/npm first, will acquire nginx infrastructure in second stage)
FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

# second phase (multi-stage build, jettisoning most of first phase drekly)
FROM nginx      
# from nginx Docker Hub image
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# copy Nginx-2's setup from host system to container
COPY --from=builder /app/build /usr/share/nginx/html
# multi-stage build - copy from first stage all of the npm &c goodies (only) to nginx path on resultant container
# cf Nginx docs for config https://hub.docker.com/_/nginx

