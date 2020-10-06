#!/bin/sh
echo "in delete_service.sh"

#
# Set the current directory
#
echo "set the current directory $(pwd)"
export CURRENT_DIRECTORY=$(pwd)

#
# Delete the deployment
#
kubectl delete deployments daytrader-accounts

#
# Delete the service
#
kubectl delete services daytrader-accounts

#
# Stop kubectl proxy
#
kill -9 $(pgrep -f "create_service.sh")  
kill -9 $(pgrep -f "kubectl proxy") 

echo "end of delete_service.sh"
#
# exit 0
