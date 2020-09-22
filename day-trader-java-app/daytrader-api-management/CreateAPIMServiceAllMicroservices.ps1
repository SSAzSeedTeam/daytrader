$random = (New-Guid).ToString().Substring(0,8) 

$subscriptionId = "e8850995-7132-4e71-b8b6-83830937405c" 
$adminEmail = "puneetsingh.gx1@outlook.com" 
$location = "Central US" 
$organisation = "OFSS"

$apimServiceName = "alphagx-daytrader-apim-service2" 
$resourceGroupName = "alphagx-daytrader-apim-rg2" 



## your mail id of azure account...
Select-AzSubscription -SubscriptionId $subscriptionId 
Get-AzResourceGroup -Name $resourceGroupName -ErrorVariable notPresent -ErrorAction SilentlyContinue
if ($notPresent)
{
 New-AzResourceGroup -Name $resourceGroupName -Location $location 
}
New-AzApiManagement -ResourceGroupName $resourceGroupName -Name $apimServiceName -Location $location -Organization $organisation -AdminEmail $adminEmail


## replace your service name..
##$apimServiceName = "apim-5565a35f"  
## replace your resource group.. 
##$resourceGroupName = "apim-rg-5565a35f" 

$apiName = "daytrader-quotes-api-alphagx"
$apiId = "daytrader-qotes-api-id"

$accountApiName = "daytrader-account-api-alphagx"
$apiIdAccount = "daytrader-account-api-id"

$apiNamePortfolio = "daytrader-portfolio-api-alphagx"
$apiIdPortfolio = "daytrader-portfolio-api-id"

$path = "daytrader"
$pathAccountApi = "daytrader-account"
$pathPortfolioApi = "daytrader-portfolio"
$backendUrl = "https://daytrader-app.xyz/quotes"
$accountBackendUrl = "https://daytrader-app.xyz/accounts/"
$portfolioBackendUrl = "https://daytrader-app.xyz/portfolios/"

$apimContext = New-AzApiManagementContext -ResourceGroupName $resourceGroupName -ServiceName $apimServiceName 

## creating apim user group
$apimUserGroupId = "alphagx-apim-user-group-Id"
$apimUserGroupName = "alphagx-apim-user-group"
Remove-AzApiManagementGroup -Context $apimContext -GroupId $apimUserGroupId
New-AzApiManagementGroup -Context $apimContext -Description 'Create daytrader Apis' -GroupId $apimUserGroupId -Name $apimUserGroupName

## creating product..
$productId = "daytrader-product-alphagx"
$productName = "alphagx-daytrader-product"
$productDesc = "product for daytrader apis"
Remove-AzApiManagementProduct -Context $apimContext -ProductId $productId -DeleteSubscriptions
##New-AzApiManagementProduct -Context $apimContext -ProductId $productId -Title $productName -Description $productDesc -LegalTerms "Free for all" -SubscriptionRequired $False -State "Published"

New-AzApiManagementProduct -Context $apimContext -ProductId $productId -Title $productName -Description "Subscribers have completely unlimited access to the API. Administrator approval is required." -LegalTerms "Free for all" -ApprovalRequired $True -State "Published"


## adding product to user group..
Add-AzApiManagementProductToGroup -Context $apimContext -GroupId $apimUserGroupId -ProductId $productId 

## creating daytrader quotes api..
Remove-AzApiManagementApi -Context $apimContext -ApiId $apiId
$ApiMgmtContext = New-AzApiManagementContext -ResourceGroupName $resourceGroupName -ServiceName $apimServiceName 
New-AzApiManagementApi -Context $ApiMgmtContext -Name $apiName -ApiId $apiId -ServiceUrl $backendUrl -Protocols @("http", "https") -Path $path

## adding daytrader quotes api to the product
Add-AzApiManagementApiToProduct -Context $ApiMgmtContext -ProductId $productId -ApiId $apiId


## creating daytrader account api..
Remove-AzApiManagementApi -Context $apimContext -ApiId $apiIdAccount
New-AzApiManagementApi -Context $ApiMgmtContext -Name $accountApiName -ApiId $apiIdAccount -ServiceUrl $accountBackendUrl -Protocols @("http", "https") -Path $pathAccountApi


## adding daytrader account api to the product
Add-AzApiManagementApiToProduct -Context $ApiMgmtContext -ProductId $productId -ApiId $apiIdAccount


## creating daytrader portfolis api..
Remove-AzApiManagementApi -Context $apimContext -ApiId $apiIdPortfolio
New-AzApiManagementApi -Context $ApiMgmtContext -Name $apiNamePortfolio -ApiId $apiIdPortfolio -ServiceUrl $portfolioBackendUrl -Protocols @("http", "https") -Path $pathPortfolioApi

## adding daytrader portfolio api to the product
Add-AzApiManagementApiToProduct -Context $ApiMgmtContext -ProductId $productId -ApiId $apiIdPortfolio

$context = New-AzApiManagementContext -ResourceGroupName $resourceGroupName -ServiceName $apimServiceName 

## adding policies to quotes api..
$apiPolicy = '<policies>
    <inbound>
        <quota-by-key calls="10" bandwidth="7000" renewal-period="3600" counter-key="@(context.Request.IpAddress)" />
        <rate-limit-by-key calls="4" renewal-period="10" counter-key="@(context.Subscription?.Id)" 
		  increment-condition="@(context.Response.StatusCode >= 200)" />
        <base />
    </inbound>
    <backend>
        <base />
    </backend>
    <outbound>
        <base />
    </outbound>
    <on-error>
        <base />
    </on-error>
</policies>' 

Set-AzApiManagementPolicy -Context $apimContext -ApiId $apiId -Policy $apiPolicy

## adding create quotes api..
$apiOperationId = "post-quotes-api-id" 
$apiOperationName = "Create Quotes"
$apiOperationTemplateUrl = "/"
$Request = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementRequest
$Request.Description = "Create Quotes Request"
$RequestRepresentation = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementRepresentation
$RequestRepresentation.ContentType = 'application/json'
$RequestRepresentation.Sample = '{
  "change": 0,
  "companyName": "string",
  "high": 0,
  "low": 0,
  "open": 0,
  "price": 0,
  "symbol": "string",
  "volume": 0
}'
$Request.Representations = @($requestRepresentation)
$Response = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementResponse
$Response.StatusCode = 204
New-AzApiManagementOperation -Context $apimContext -ApiId $apiId -OperationId $apiOperationId -Name $apiOperationName -Method 'POST' -UrlTemplate $apiOperationTemplateUrl -Description "Use this operation to create new quotes" -Request $Request -Responses @($response)

## adding get all quote operation to the api..
$apiOperationId = "quotes-operation-getall"
$apiOperationName = "Get All Quotes"
$apiOperationTemplateUrl = "/"
$operationDescription = "use this operation to get all quotes"
$apimContext = New-AzApiManagementContext -ResourceGroupName $resourceGroupName -ServiceName $apimServiceName 
New-AzApiManagementOperation -Context $apimContext -ApiId $apiId -OperationId $apiOperationId -Name $apiOperationName -Method GET -UrlTemplate $apiOperationTemplateUrl -Description $operationDescription


## adding get quote by id operation to the api..
$apiOperationId = "quotes-operation-get"
$apiOperationName = "Get Quotes By Id"
$apiOperationTemplateUrl = "/{qid}"
$operationDescription = "use this operation to get quotes by id"
$qid = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementParameter
$qid.Name = "qid"
$qid.Description = "quotes identifire"
$qid.Type = "string"
New-AzApiManagementOperation -Context $apimContext -ApiId $apiId -OperationId $apiOperationId -Name $apiOperationName -Method GET -UrlTemplate $apiOperationTemplateUrl -Description $operationDescription -TemplateParameters @($qid)

## adding post account api..
$apiOperationId = "post-account-api-id" 
$apiOperationName = "Create Account"
$apiOperationTemplateUrl = "/"
$Request = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementRequest
$Request.Description = "Create Account Request"
$RequestRepresentation = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementRepresentation
$RequestRepresentation.ContentType = 'application/json'
$RequestRepresentation.Sample = '{
  "accountID": 0,
  "balance": 0,
  "loginCount": 0,
  "logoutCount": 0,
  "openBalance": 0,
   "creationDate": "",
  "profile": {
    "address": "",
    "creditCard": "",
    "email": "singhavinash857@gmail.com",
    "fullName": "Avinash Singh",
    "password": "12345",
    "userID": "1234"
  },
  "profileID": "singhavi"
}'
$Request.Representations = @($requestRepresentation)
$Response = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementResponse
$Response.StatusCode = 204
New-AzApiManagementOperation -Context $apimContext -ApiId $apiIdAccount -OperationId $apiOperationId -Name $apiOperationName -Method 'POST' -UrlTemplate $apiOperationTemplateUrl -Description "Use this operation to create new or update existing resource" -Request $Request -Responses @($response)

## updating account api..
$apiOperationId = "update-account-api-id" 
$apiOperationName = "Update Account By User Id"
$apiOperationTemplateUrl = "/{userId}/profiles"
$Request = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementRequest
$Request.Description = "Update Account By User Id Request"
$userId = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementParameter
$userId.Name = "userId"
$userId.Description = "user identifire"
$userId.Type = "string"
$RequestRepresentation = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementRepresentation
$RequestRepresentation.ContentType = 'application/json'
$RequestRepresentation.Sample = '{
  "address": "string",
  "creditCard": "string",
  "email": "string",
  "fullName": "string",
  "password": "string",
  "userID": "string"
}'
$Request.Representations = @($requestRepresentation)
$Response = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementResponse
$Response.StatusCode = 204
New-AzApiManagementOperation -Context $apimContext -ApiId $apiIdAccount -OperationId $apiOperationId -Name $apiOperationName -Method PUT -UrlTemplate $apiOperationTemplateUrl -Description $operationDescription -TemplateParameters @($userId)

## adding account profile by id operation to the api..
$apiOperationId = "account-operation-get-profile"
$apiOperationName = "Get Profile By Id"
$userId = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementParameter
$userId.Name = "userId"
$userId.Description = "user identifire"
$userId.Type = "string"
$apiOperationTemplateUrl = "/{userId}/profiles"
$operationDescription = "use this operation to get profile by id"
$apimContext = New-AzApiManagementContext -ResourceGroupName $resourceGroupName -ServiceName $apimServiceName 
New-AzApiManagementOperation -Context $apimContext -ApiId $apiIdAccount -OperationId $apiOperationId -Name $apiOperationName -Method GET -UrlTemplate $apiOperationTemplateUrl -Description $operationDescription -TemplateParameters @($userId)

## adding get account by id operation to the api..
$apiOperationId = "account-operation-get"
$apiOperationName = "Get Account By Id"
$apiOperationTemplateUrl = "/{userId}"
$operationDescription = "use this operation to get account by id"
$userId = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementParameter
$userId.Name = "userId"
$userId.Description = "user identifire"
$userId.Type = "string"
New-AzApiManagementOperation -Context $apimContext -ApiId $apiIdAccount -OperationId $apiOperationId -Name $apiOperationName -Method GET -UrlTemplate $apiOperationTemplateUrl -Description $operationDescription -TemplateParameters @($userId)

## adding post portfolio orders api..
$apiOperationId = "post-portfolio-order-api-id" 
$apiOperationName = "Process Order"
$apiOperationTemplateUrl = "/{userid}/orders?mode={mode}"
$userid = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementParameter
$userid.Name = "userid"
$userid.Description = "Resource identifier"
$userid.Type = "string"
$Query = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementParameter
$Query.Name = "mode"
$Query.Description = "Query string"
$Query.Type = 'string'
$Request = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementRequest
$Request.Description = "Create Account Request"
$RequestRepresentation = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementRepresentation
$RequestRepresentation.ContentType = 'application/json'
$RequestRepresentation.Sample = '{
  "accountID": 0,
  "buy": true,
  "cancelled": true,
  "completed": true,
  "completionDate": "2020-08-27T06:53:41.584Z",
  "holdingID": 0,
  "open": true,
  "openDate": "2020-08-27T06:53:41.584Z",
  "orderFee": 0,
  "orderID": 0,
  "orderStatus": "string",
  "orderType": "string",
  "price": 0,
  "quantity": 0,
  "sell": true,
  "symbol": "string"
}'
$Request.Representations = @($requestRepresentation)
$Response = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementResponse
$Response.StatusCode = 204
New-AzApiManagementOperation -Context $apimContext -ApiId $apiIdPortfolio -OperationId $apiOperationId -Name $apiOperationName -Method 'POST' -UrlTemplate $apiOperationTemplateUrl -Description "Use this operation to create new or update existing resource" -TemplateParameters @($userid, $query) -Request $Request -Responses @($response)


## adding get portfolio by id operation to the api..
$apiOperationId = "portfolio-operation-get"
$apiOperationName = "Get Portfolio By Id"
$apiOperationTemplateUrl = "/{userId}"
$operationDescription = "use this operation to get portfolio by id"
$userId = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementParameter
$userId.Name = "userId"
$userId.Description = "user identifire"
$userId.Type = "string"
New-AzApiManagementOperation -Context $apimContext -ApiId $apiIdPortfolio -OperationId $apiOperationId -Name $apiOperationName -Method GET -UrlTemplate $apiOperationTemplateUrl -Description $operationDescription -TemplateParameters @($userId)

## adding get holdings by id operation to the api..
$apiOperationId = "holding-operation-get"
$apiOperationName = "Get Holding By Id"
$apiOperationTemplateUrl = "/{userId}/holdings"
$operationDescription = "use this operation to get portfolio by id"
$userId = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementParameter
$userId.Name = "userId"
$userId.Description = "user identifire"
$userId.Type = "string"
New-AzApiManagementOperation -Context $apimContext -ApiId $apiIdPortfolio -OperationId $apiOperationId -Name $apiOperationName -Method GET -UrlTemplate $apiOperationTemplateUrl -Description $operationDescription -TemplateParameters @($userId)

## adding get orders portfolio by id operation to the api..
$apiOperationId = "order-operation-get"
$apiOperationName = "Get Order By Id"
$apiOperationTemplateUrl = "/{userId}/orders"
$operationDescription = "use this operation to get portfolio orders by id"
$userId = New-Object -TypeName Microsoft.Azure.Commands.ApiManagement.ServiceManagement.Models.PsApiManagementParameter
$userId.Name = "userId"
$userId.Description = "user identifire"
$userId.Type = "string"
New-AzApiManagementOperation -Context $apimContext -ApiId $apiIdPortfolio -OperationId $apiOperationId -Name $apiOperationName -Method GET -UrlTemplate $apiOperationTemplateUrl -Description $operationDescription -TemplateParameters @($userId)



## adding policies to product
$productPolicy = '<policies><inbound><rate-limit calls="5" renewal-period="60" /><base /></inbound><outbound><base /></outbound></policies>'
Set-AzApiManagementPolicy -Context $context  -Policy $productPolicy -ProductId $productId -PassThru