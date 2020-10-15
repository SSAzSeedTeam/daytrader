
FROM node:alpine
ENV CI=true
ENV REACT_APP_DAYTRADER_GATEWAY_SERVICE=https://daytrader-gateway

WORKDIR /usr/app


COPY ./package.json ./
RUN npm install
COPY ./ ./


CMD ["npm", "start"]
