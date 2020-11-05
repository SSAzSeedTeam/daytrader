
FROM node:alpine
ENV CI=true
# ENV REACT_APP_DAYTRADER_GATEWAY_SERVICE=https://daytrader-gateway

ENV REACT_APP_DAYTRADER_GATEWAY_SERVICE=https://localhost:2443

WORKDIR /usr/app


COPY ./package.json ./
RUN npm install
COPY ./ ./


#CMD ["npm", "start"]
CMD ["set_env_and_start.sh" "$REACT_APP_DAYTRADER_GATEWAY_SERVICE"]
