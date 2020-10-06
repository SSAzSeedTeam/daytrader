docker network create daytrader_network

docker kill daytrader-report-generator
docker rm   daytrader-report-generator
docker run -v ${PWD}/report:/var/dat/daytrader  daytrader-report-generator:1.0
