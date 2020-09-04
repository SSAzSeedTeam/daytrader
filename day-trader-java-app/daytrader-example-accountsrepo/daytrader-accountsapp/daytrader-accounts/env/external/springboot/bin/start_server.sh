#!/bin/bash
echo "in start_server.sh"
#
# Set the current directory
#
echo "set the current directory $(pwd)"
export CURRENT_DIRECTORY=$(pwd)
#
# Set the environment
#
. "$CURRENT_DIRECTORY/env/external/springboot/bin/setenv.sh"
#
# Launch the application
#
echo "launch $CURRENT_DIRECTORY/target/$DAYTRADER_WAR_ARTIFACTID-$DAYTRADER_APP_VERSION.war"
java -Djavax.net.ssl.trustStore=$DAYTRADER_TRUSTSTORE_LOCATION -Djavax.net.ssl.trustStorePassword=$DAYTRADER_TRUSTSTORE_PASSWORD -jar "$CURRENT_DIRECTORY/target/$DAYTRADER_WAR_ARTIFACTID-$DAYTRADER_APP_VERSION.war"
#
echo "end of start_server.bat"
#
# exit 0
