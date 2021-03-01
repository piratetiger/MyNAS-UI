FROM node:12 AS build
WORKDIR /ui
COPY . .
RUN npm install && \
    npm run build:prod

FROM nginx:1.19.7
COPY --from=build /ui/dist/UI /usr/share/nginx/html
#COPY nginx.conf /etc/nginx/nginx.conf
