
FROM node:alpine
ENV CI=true
ENV REACT_APP_DAYTRADER_GATEWAY_SERVICE=https://daytrader-gateway

ENV REACT_APP_DAYTRADER_ACCOUNT_MFE_URL=http://localhost:3002
ENV REACT_APP_DAYTRADER_QUOTES_MFE_URL=http://localhost:3004
ENV REACT_APP_DAYTRADER_PORTFOLIO_MFE_URL=http://localhost:3003


WORKDIR /usr/app


COPY ./package.json ./
RUN npm install
COPY ./ ./


CMD ["npm", "start"]
