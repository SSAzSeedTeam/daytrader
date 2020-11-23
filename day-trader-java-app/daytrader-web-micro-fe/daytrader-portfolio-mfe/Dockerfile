
FROM node:alpine
ENV CI=true
# ENV REACT_APP_DAYTRADER_GATEWAY_SERVICE=https://daytrader-gateway

ENV REACT_APP_DAYTRADER_GATEWAY_SERVICE=https://40.91.203.79:2443

WORKDIR /usr/app


COPY ./package.json ./
RUN npm install
COPY ./ ./
COPY ./set_env_and_start.sh ./

#CMD ["npm", "start"]
CMD  "/usr/app/set_env_and_start.sh" "$REACT_APP_DAYTRADER_GATEWAY_SERVICE" 
