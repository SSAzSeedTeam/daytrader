# Command to deploy azure function
# az login needs to be run before every deploy command

mvn clean install
az login
mvn azure-functions:deploy

Note: Resource group is in pom.xml -- <functionResourceGroup> tag
Note: Function app name is "azure-functions-Recurrence-LA". It is found in pom.xml - <functionAppName> tag
Note: Function name is "createBlob". It is fuound in @FunctionName annotation in src\main\java\com\functions\EventGridFunction.java
Note: Function app end point url is https://azure-functions-Recurrence-LA.azurewebsites.net/api/createBlob
