docker network create daytrader_network

docker kill daytrader-portfolios
docker rm   daytrader-portfolios
docker run --network daytrader_network --name daytrader-portfolios -e DAYTRADER_ACCOUNTS_SERVICE=https://daytrader-accounts:1443 -e DAYTRADER_GATEWAY_SERVICE=https://daytrader-gateway:2443 -e DAYTRADER_PORTFOLIOS_SERVICE=https://daytrader-portfolios:3443 -e DAYTRADER_QUOTES_SERVICE=https://daytrader-quotes:4443 -p 3443:3443 daytrader-portfolios:1.0
