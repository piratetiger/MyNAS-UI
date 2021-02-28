FROM node:12 AS build
COPY . .

RUN npm config set registry https://registry.npm.taobao.org
RUN npm install && \
    npm run update \
    npm run build:prod

FROM nginx:1.19.7

COPY --from=build /dist/UI /webroot
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 5001
