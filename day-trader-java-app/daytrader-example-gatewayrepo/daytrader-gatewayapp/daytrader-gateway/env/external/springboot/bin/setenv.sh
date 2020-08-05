#!/bin/bash
echo "in setenv.sh"
#
# set the current directory
#
echo "set the current directory $(pwd)"
export CURRENT_DIRECTORY=$(pwd)
echo "CURRENT_DIRECTORY=$CURRENT_DIRECTORY"
#
# set ssl variables
#
export DAYTRADER_KEYSTORE_FILENAME=$CURRENT_DIRECTORY/src/main/resources/external/ssl/keystore.jks
export DAYTRADER_KEYSTORE_PASSWORD=password
export DAYTRADER_TRUSTSTORE_LOCATION=$CURRENT_DIRECTORY/src/main/resources/external/ssl/truststore.jks
export DAYTRADER_TRUSTSTORE_PASSWORD=password
echo "DAYTRADER_KEYSTORE_FILENAME=$DAYTRADER_KEYSTORE_FILENAME"
echo "DAYTRADER_KEYSTORE_PASSWORD=$DAYTRADER_KEYSTORE_PASSWORD"
echo "DAYTRADER_TRUSTSTORE_LOCATION=$DAYTRADER_TRUSTSTORE_LOCATION"
echo "DAYTRADER_TRUSTSTORE_FILENAME=$DAYTRADER_TRUSTSTORE_PASSWORD"
#
# set app name
#
export DAYTRADER_APP_VERSION=4.0.0
export DAYTRADER_APP_ARTIFACTID=daytrader-gatewayapp
export DAYTRADER_WAR_ARTIFACTID=daytrader-gateway
#
# set db variables 
#
export DAYTRADER_DATABASE_DRIVER=
export DAYTRADER_DATABASE_URL=
export DAYTRADER_DATABASE_USERNAME=
export DAYTRADER_DATABASE_PASSWORD=
#
# set tomcat variables
#
export SERVER_PORT=2443
export SERVER_PORT_HTTPS=2443
#
# set service routes
#
export DAYTRADER_ACCOUNTS_SERVICE=https://localhost:1443
export DAYTRADER_GATEWAY_SERVICE=https://localhost:2443
export DAYTRADER_PORTFOLIOS_SERVICE=https://localhost:3443
export DAYTRADER_QUOTES_SERVICE=https://localhost:4443
#
# set log variables
#
export DAYTRADER_LOG_FILENAME=/var/log/daytrader/$DAYTRADER_APP_ARTIFACTID-$DAYTRADER_APP_VERSION.log
export DAYTRADER_LOG_LEVEL=TRACE
export DAYTRADER_LOG_APPENDER=ConsoleAppender
#
echo "end of setenv.sh"
