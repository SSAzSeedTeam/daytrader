#!/bin/sh
echo "in stop_server.sh"
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
# Stop the application
#
echo "stop the application $DAYTRADER_WAR_ARTIFACTID-$DAYTRADER_APP_VERSION.war"
kill -9 $(pgrep -f $DAYTRADER_WAR_ARTIFACTID-$DAYTRADER_APP_VERSION.war)
#
echo "end of stop_server.sh"
#
# exit 0
