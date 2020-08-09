docker network create daytrader_network

docker kill daytrader-quotes
docker rm   daytrader-quotes
docker run --network daytrader_network --name daytrader-quotes -e DAYTRADER_ACCOUNTS_SERVICE=https://daytrader-accounts:1443 -e DAYTRADER_GATEWAY_SERVICE=https://daytrader-gateway:2443 -e DAYTRADER_PORTFOLIOS_SERVICE=https://daytrader-portfolios:3443 -e DAYTRADER_QUOTES_SERVICE=https://daytrader-quotes:4443 -p 4443:4443 daytrader-quotes:1.0
