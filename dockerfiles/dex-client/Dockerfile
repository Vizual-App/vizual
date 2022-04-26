FROM node:14.16.0-alpine3.13

RUN mkdir app
WORKDIR /app
COPY dex-client/* .
RUN npm i
EXPOSE 5557
CMD ["npm", "run", "start"]

