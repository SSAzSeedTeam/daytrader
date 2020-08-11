cd daytrader-example-accountsrepo/daytrader-accountsapp/daytrader-accounts
call ./env/external/springboot/bin/start_server.bat
cd ../../..

cd daytrader-example-gatewayrepo/daytrader-gatewayapp/daytrader-gateway
call ./env/external/springboot/bin/start_server.bat
cd ../../..

cd daytrader-example-portfoliosrepo/daytrader-portfoliosapp/daytrader-portfolios
call ./env/external/springboot/bin/start_server.bat
cd ../../..

cd daytrader-example-quotesrepo/daytrader-quotesapp/daytrader-quotes
call ./env/external/springboot/bin/start_server.bat
cd ../../..

cd daytrader-example-webrepo/daytrader-webapp/daytrader-web
call ./env/external/springboot/bin/start_server.bat
cd ../../..
