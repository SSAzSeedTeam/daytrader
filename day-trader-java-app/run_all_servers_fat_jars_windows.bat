REM  DO NOT USE this script
REM  Go to individual project and run application start script from there

cd daytrader-auth-server
start run_server_with_fat_jars_windows.bat
cd ..
sleep 2

cd daytrader-accounts
start run_server_with_fat_jars_windows.bat
cd ..
sleep 2

cd daytrader-gateway
start run_server_with_fat_jars_windows.bat
cd ..
sleep 2

cd daytrader-portfolios
start run_server_with_fat_jars_windows.bat
cd ..
sleep 2

cd daytrader-quotes
start run_server_with_fat_jars_windows.bat
cd ..
sleep 2

cd daytrader-web
start run_server_with_fat_jars_windows.bat
cd ..