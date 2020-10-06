docker network create daytrader_network

accounts_container=`docker ps | grep daytrader-accounts | awk '{print $1}'`
accounts_ip=`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $accounts_container`

gateway_container=`docker ps | grep daytrader-gateway | awk '{print $1}'`
gateway_ip=`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $gateway_container`

portfolios_container=`docker ps | grep daytrader-portfolios | awk '{print $1}'`
portfolios_ip=`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $portfolios_container`

quotes_container=`docker ps | grep daytrader-quotes | awk '{print $1}'`
quotes_ip=`docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $quotes_container`

echo $accounts_ip
echo $gateway_ip
echo $portfolios_ip
echo $quotes_ip

docker kill daytrader-web
docker rm   daytrader-web

docker run --network daytrader_network --name daytrader-web -p 5443:5443 -e DAYTRADER_ACCOUNTS_SERVICE=https://daytrader-accounts:1443 -e DAYTRADER_GATEWAY_SERVICE=https://daytrader-gateway:2443 -e DAYTRADER_PORTFOLIOS_SERVICE=https://daytrader-portfolios:3443 -e DAYTRADER_QUOTES_SERVICE=https://daytrader-quotes:4443 daytrader-web:1.0
#docker run --network daytrader_network --name daytrader-web -p 5443:5443  daytrader-web:1.0
