cd daytrader-accounts
call .\env\external\springboot\bin\start_server.bat
cd ..\..\..

cd daytrader-gateway
call .\env\external\springboot\bin\start_server.bat
cd ..\..\..

cd daytrader-portfolios
call .\env\external\springboot\bin\start_server.bat
cd ..\..\..

cd daytrader-quotes
call .\env\external\springboot\bin\start_server.bat
cd ..\..\..

cd daytrader-web
call .\env\external\springboot\bin\start_server.bat
cd ..\..\..
