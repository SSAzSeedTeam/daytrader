#These have the same commands as the readme/commands text file.
#It has been simplified and made into series of shell commands

#====================================================================================================
#Get list of existing API gateways
apiid=`aws apigatewayv2 --profile shibu_admin   get-apis --query "Items[].ApiId" --output text`
echo $apiid
aws apigatewayv2 --profile shibu_admin   delete-api --api-id $apiid
#====================================================================================================
#Create API gateway for Lambda function

aws apigatewayv2 --profile shibu_admin   create-api --name shibu_eeeee --protocol-type HTTP     --target arn:aws:lambda:us-east-2:560773393352:function:sspoc_daytrader_kubernetes_deploy

apiid=`aws apigatewayv2 --profile shibu_admin   get-apis --query "Items[].ApiId" --output text`
echo $apiid

#====================================================================================================
aws apigatewayv2 --profile shibu_admin get-integrations --api-id $apiid

#Note down Integration ID
integrationId=`aws apigatewayv2 --profile shibu_admin get-integrations --api-id $apiid --query "Items[].IntegrationId" --output text`
echo $integrationId

#====================================================================================================
#Update HTTP method to GET
aws apigatewayv2 --profile shibu_admin update-integration --api-id $apiid --integration-id $integrationId --integration-method GET
#====================================================================================================
#Allow API gateway to invoke Lambda
#replace api-id below (and also stage name $default)

# bash generate random 32 character alphanumeric string (lowercase only)
randomId=`hexdump -n 16 -e '4/4 "%08X" 1 "\n"' /dev/urandom`

aws lambda add-permission \
  --profile shibu_admin \
  --statement-id $randomId \
  --action lambda:InvokeFunction \
  --function-name "arn:aws:lambda:us-east-2:560773393352:function:sspoc_daytrader_kubernetes_deploy" \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-2:560773393352:$apiid/*/$default"
  
#====================================================================================================
#invoke from command line
curl -H "X-Amz-Invocation-Type: Event" https://$apiid.execute-api.us-east-2.amazonaws.com/
#====================================================================================================

#====================================================================================================
