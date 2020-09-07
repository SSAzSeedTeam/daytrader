#These have the same commands as the readme/commands text file.
#It has been simplified and made into series of shell commands

#====================================================================================================
#Get list of existing API gateways
apiid=`aws apigatewayv2 --profile shibu_admin   get-apis --query "Items[].ApiId" --output text`
echo $apiid
aws apigatewayv2 --profile shibu_admin   delete-api --api-id $apiid
#====================================================================================================
#Create API gateway for Lambda function

aws apigatewayv2 --profile shibu_admin   create-api --name shibu_dddd --protocol-type HTTP     --target arn:aws:lambda:us-east-2:560773393352:function:sspoc_daytrader_kubernetes_deploy

apiid=`aws apigatewayv2 --profile shibu_admin   get-apis --query "Items[].ApiId" --output text`
echo $apiid

ApiId : ohxzpxhmzh
ApiEndpoint": "https://ohxzpxhmzh.execute-api.us-east-2.amazonaws.com"

#====================================================================================================
aws apigatewayv2 --profile shibu_admin get-integrations --api-id ohxzpxhmzh
#Note down Integration ID
"IntegrationId": "mfyhwo6",
"IntegrationMethod": "POST",
#====================================================================================================
#Update HTTP method to GET
aws apigatewayv2 --profile shibu_admin update-integration --api-id ohxzpxhmzh --integration-id mfyhwo6 --integration-method GET
#====================================================================================================
#Allow API gateway to invoke Lambda
#replace api-id below (and also stage name $default)

aws lambda add-permission \
  --profile shibu_admin
  --statement-id ab21abf9-c85b-54d8-9ae3-a7efa0538be2 \
  --action lambda:InvokeFunction \
  --function-name "arn:aws:lambda:us-east-2:560773393352:function:sspoc_daytrader_kubernetes_deploy" \
  --principal apigateway.amazonaws.com \
  --source-arn "arn:aws:execute-api:us-east-2:560773393352:ohxzpxhmzh/*/$default"
  
#above command in single line....
aws lambda add-permission  --profile shibu_admin --statement-id ab21abf9-c85b-54d8-9ae3-a7efa0538be2   --action lambda:InvokeFunction   --function-name "arn:aws:lambda:us-east-2:560773393352:function:sspoc_daytrader_kubernetes_deploy"   --principal apigateway.amazonaws.com   --source-arn "arn:aws:execute-api:us-east-2:560773393352:$apiid/*/$default"
output:
{
    "Statement": "{\"Sid\":\"ab21abf9-c85b-54d8-9ae3-a7efa0538be2\",\"Effect\":\"Allow\",\"Principal\":{\"Service\":\"apigateway.amazonaws.com\"},\"Action\":\"lambda:InvokeFunction\",\"Resource\":\"arn:aws:lambda:us-east-2:560773393352:function:sspoc_daytrader_kubernetes_deploy\",\"Condition\":{\"ArnLike\":{\"AWS:SourceArn\":\"arn:aws:execute-api:us-east-2:560773393352:ohxzpxhmzh/*/$default\"}}}"
}
#====================================================================================================
#invoke from command line
curl -H "X-Amz-Invocation-Type: Event" https://ohxzpxhmzh.execute-api.us-east-2.amazonaws.com/
#====================================================================================================

#====================================================================================================
