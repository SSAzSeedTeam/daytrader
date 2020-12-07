docker network create daytrader_network

docker kill daytrader-auth-server
docker rm   daytrader-auth-server
docker run --network daytrader_network --name daytrader-auth-server -p 1555:1555 daytrader-auth-server:0
