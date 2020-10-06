docker network create daytrader_network

docker kill daytrader-gateway
docker rm   daytrader-gateway
docker run --network daytrader_network --name daytrader-gateway -p 2443:2443 daytrader-gateway:0
