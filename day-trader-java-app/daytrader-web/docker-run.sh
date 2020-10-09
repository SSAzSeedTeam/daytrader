docker network create daytrader_network

docker kill daytrader-web
docker rm   daytrader-web

docker run --network daytrader_network --name daytrader-web -p 5443:5443 daytrader-web:0
