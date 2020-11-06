az group create --name arunima_email_sender_rg --location westeurope


mvn clean install
az login
mvn azure-functions:deploy

Note: Resource group is "arunima_email_sender_rg ".  It is found in pom.xml -- <functionResourceGroup> tag
Note: Function app name is "BugTrackerFunction". It is found in pom.xml - <functionAppName> tag
Note: Function name is "EmailSender". It is found in @FunctionName annotation in src\main\java\com\functions\Function.java
Note: Region is "centralus".  Its is found in pom.xml -- <functionAppRegion> tag
Note: Function app end point url is https://BugTrackerFunction.azurewebsites.net
Note: Function     end point url is https://bugtrackerfunction.azurewebsites.net/api/EmailSender



#delete everything
az group delete --name arunima_email_sender_rg --yes
