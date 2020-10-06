docker network create daytrader_network

docker kill daytrader-portfolios
docker rm   daytrader-portfolios
docker run --network daytrader_network --name daytrader-portfolios -p 3443:3443 daytrader-portfolios:0
