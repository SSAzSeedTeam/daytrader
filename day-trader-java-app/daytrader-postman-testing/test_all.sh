
#sleep for sometime to allow docker compose to start all servers....
sleep 90

#put newman command shere
#newman run AdvanceAPIs.postman_collection.json --reporters cli,junit --reporter-junit-export Results\jadvanceAPIResult.xml
#newman run SimpleCURDAPIs.postman_collection.json --reporters cli,junit --reporter-junit-export Results\SimpleCURDAPIsResult.xml

newman run accounts_tables.postman_collection.json  --insecure --reporters cli,junit --reporter-junit-export Results\tables_accountsResult.xml
newman run portfolio_tables.postman_collection.json --insecure --reporters cli,junit --reporter-junit-export Results\tables_portfolioResult.xml
newman run quotes_tables.postman_collection.json    --insecure --reporters cli,junit --reporter-junit-export Results\tables_quotesResult.xml

newman run accounts.postman_collection.json         --insecure --reporters cli,junit --reporter-junit-export Results\accountsResult.xml
newman run portfolio.postman_collection.json        --insecure --reporters cli,junit --reporter-junit-export Results\portfolioResult.xml
newman run quotes.postman_collection.json           --insecure --reporters cli,junit --reporter-junit-export Results\quotesResult.xml
