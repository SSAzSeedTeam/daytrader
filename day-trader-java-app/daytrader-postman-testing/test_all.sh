#put newman command shere
#newman run AdvanceAPIs.postman_collection.json --reporters cli,junit --reporter-junit-export Results\jadvanceAPIResult.xml
#newman run SimpleCURDAPIs.postman_collection.json --reporters cli,junit --reporter-junit-export Results\SimpleCURDAPIsResult.xml

newman run accounts.postman_collection.json  --insecure --reporters cli,junit --reporter-junit-export Results\accountsResult.xml
newman run portfolio.postman_collection.json --insecure --reporters cli,junit --reporter-junit-export Results\portfolioResult.xml
newman run quotes.postman_collection.json    --insecure --reporters cli,junit --reporter-junit-export Results\quotesResult.xml
