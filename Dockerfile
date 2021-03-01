FROM node:12 AS build
COPY . .

RUN npm install && \
    npm run build:prod

FROM nginx:1.19.7

COPY --from=build /dist/UI /webroot
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 5001
