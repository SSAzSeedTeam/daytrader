docker network create daytrader_network

docker kill daytrader-accounts
docker rm   daytrader-accounts
docker run --network daytrader_network --name daytrader-accounts -p 1443:1443 daytrader-accounts:0
