FROM node:14 AS build
WORKDIR /ui
COPY . .
RUN npm install && \
    npm run build:prod

FROM nginx:1.19
COPY ./nginx.conf /etc/nginx/conf.d/mynas-ui.conf
COPY --from=build /ui/dist/UI /html

EXPOSE 5001