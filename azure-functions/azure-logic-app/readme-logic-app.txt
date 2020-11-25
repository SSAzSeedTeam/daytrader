
PFA-Contains the logic app json definition file. Below is the command to create a workflow:

#May be required first time
az extension add --name logic

az group create --name shibu_azure_function_res_grp --location westeurope

az logic workflow create --resource-group "shibu_azure_function_res_grp" --location "westeurope" --name "logic_app_name” --definition "RecurrenceTrigger-LA-Defination.json"

Note: In line 8, you have to provide the proper "id" string
      "id": "/subscriptions/YOUR_SUBSCRIPTION_ID/resourceGroups/YOUR_RESOURCCE_GROUP/providers/Microsoft.Web/sites/YOUR_AZURE_FUNCTION_APP_NAME/functions/YOUR_AZURE_FUNCTION_NAME"
      provide corect values for the UPPER_CASE parts of the above 
      
      
#delete everything
az group delete --name shibu_azure_function_res_grp --yes
