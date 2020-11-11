az group create --name shibu_az_function_email_res_grp --location westeurope


mvn clean install
az login
mvn azure-functions:deploy

Note: Resource group is "shibu_az_function_email_res_grp".  It is found in pom.xml -- <functionResourceGroup> tag
Note: Function app name is "BugTrackerFunctionApp". It is found in pom.xml - <functionAppName> tag
Note: Function name is "EmailSender". It is found in @FunctionName annotation in src\main\java\com\functions\Function.java
Note: Region is "westeurope".  Its is found in pom.xml -- <functionAppRegion> tag
Note: Function app end point url is https://BugTrackerFunctionApp.azurewebsites.net
Note: Function     end point url is https://bugtrackerfunctionapp.azurewebsites.net/api/EmailSender



#delete everything
az group delete --name shibu_az_function_email_res_grp --yes
