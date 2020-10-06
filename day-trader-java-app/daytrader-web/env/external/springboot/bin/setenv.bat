@echo off
echo "in setenv.bat"

rem
rem Set the current directory
rem
@ECHO OFF
echo "set current directory %cd%"
set CURRENT_DIRECTORY=%cd%

@ECHO OFF
echo "set SSL variables"
set DAYTRADER_KEYSTORE_FILENAME=%CURRENT_DIRECTORY%\src\main\resources\external\ssl\keystore.jks
set DAYTRADER_KEYSTORE_PASSWORD=password
set DAYTRADER_TRUSTSTORE_LOCATION=%CURRENT_DIRECTORY%\src\main\resources\external\ssl\truststore.jks
set DAYTRADER_TRUSTSTORE_PASSWORD=password

@echo off
echo "set maven variables"
set DAYTRADER_APP_VERSION=4.0.0
set DAYTRADER_APP_ARTIFACTID=daytrader-webapp
set DAYTRADER_WAR_ARTIFACTID=daytrader-web

@ECHO OFF
echo "set database variables"
set DAYTRADER_DATABASE_DRIVER=
set DAYTRADER_DATABASE_URL=
set DAYTRADER_DATABASE_USERNAME=
set DAYTRADER_DATABASE_PASSWORD=

@ECHO OFF
echo "set spring variables"
set SERVER_PORT=5443
set SERVER_PORT_HTTPS=5443

@ECHO OFF
echo set service routes
set DAYTRADER_ACCOUNTS_SERVICE=https://localhost:1443
set DAYTRADER_GATEWAY_SERVICE=https://localhost:2443
set DAYTRADER_PORTFOLIOS_SERVICE=https://localhost:3443
set DAYTRADER_QUOTES_SERVICE=https://localhost:4443

@ECHO OFF
echo set logging variables
set DAYTRADER_LOG_FILENAME=/var/log/daytrader/%DAYTRADER_APP_ARTIFACTID%-%DAYTRADER_APP_VERSION%.log
set DAYTRADER_LOG_LEVEL=TRACE
set DAYTRADER_LOG_APPENDER=ConsoleAppender

@echo off
echo "end of setenv.bat"

