docker network create daytrader_network

docker kill daytrader-quotes
docker rm   daytrader-quotes
docker run --network daytrader_network --name daytrader-quotes  -p 4443:4443 daytrader-quotes:0
