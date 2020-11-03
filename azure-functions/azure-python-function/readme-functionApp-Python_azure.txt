
az group create --name shibu_azure_funcion_res_grp --location westeurope

=====================================================================================================================
#create storage account
az storage account create --name shibuazfuncstoracc --resource-group shibu_azure_funcion_res_grp --location westeurope
=====================================================================================================================
#create function app
az functionapp create --name azfuncpython1 --resource-group shibu_azure_funcion_res_grp --os-type Linux --consumption-plan-location centralus  --runtime python --storage-account shibuazfuncstoracc
============================================================================================================================================
#Create a python project
func init MyProject --python
#this will auto-generate some files
cd MyProject 
====================================================================================================================================================================
#create new function by name HttpExample

func new --name HttpExample --template "HTTP trigger"
#this will auto-generate some files
Modify your python application logic inside the "__init__.py" file.

=============================================================================================================================================
#deploy the pyhthon function to function app
func azure functionapp publish azfuncpython1 --python

#This will print the trigger URL something like below
Invoke url: https://azfuncpython1.azurewebsites.net/api/httpexample?code=0T1QaRIAnQ1l2ucWnAYAD5EMW4oV5XxIR91LLb7o8dCsmqKPzr3Mfw==
=============================================================================================================================================
//To run function locally
=============================================================================================================
func start

NOTE: requires the python runtime to be present in local system
===================================================================================
IF FACE ANY ERROR LIKE: "MODULE NOT FOUND" DO THE FOLLOWING:

1) delete npm and npm-cache from /appdata/roaming  folder
2)//re-install these two
npm install http-server
npm i -g azure-functions-core-tools@3 --unsafe-perm true
