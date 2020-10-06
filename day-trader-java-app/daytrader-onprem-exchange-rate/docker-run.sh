docker network create daytrader_network

docker kill daytrader-onprem-exchange-rate
docker rm   daytrader-onprem-exchange-rate
docker run --network daytrader_network --name daytrader-onprem-exchange-rate -p 7443:7443 daytrader-onprem-exchange-rate:0
