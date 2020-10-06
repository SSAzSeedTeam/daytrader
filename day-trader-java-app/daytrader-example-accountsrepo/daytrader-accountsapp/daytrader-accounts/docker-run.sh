docker network create daytrader_network

docker kill daytrader-accounts
docker rm   daytrader-accounts
docker run --network daytrader_network --name daytrader-accounts -e DAYTRADER_ACCOUNTS_SERVICE=https://daytrader-accounts:1443 -e DAYTRADER_GATEWAY_SERVICE=https://daytrader-gateway:2443 -e DAYTRADER_PORTFOLIOS_SERVICE=https://daytrader-portfolios:3443 -e DAYTRADER_QUOTES_SERVICE=https://daytrader-quotes:4443 -p 1443:1443 daytrader-accounts:1.0
