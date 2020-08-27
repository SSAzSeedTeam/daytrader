
#sleep for sometime to allow docker compose to start all servers....
#sleep 90

#put newman command shere
#newman run AdvanceAPIs.postman_collection.json --reporters cli,junit --reporter-junit-export Results/jadvanceAPIResult.xml
#newman run SimpleCURDAPIs.postman_collection.json --reporters cli,junit --reporter-junit-export Results/SimpleCURDAPIsResult.xml

newman run accounts_tables.postman_collection.json  --insecure --reporters cli,junit --reporter-junit-export postman_results/tables_accountsResult.xml
newman run portfolio_tables.postman_collection.json --insecure --reporters cli,junit --reporter-junit-export postman_results/tables_portfolioResult.xml
newman run quotes_tables.postman_collection.json    --insecure --reporters cli,junit --reporter-junit-export postman_results/tables_quotesResult.xml

newman run accounts_data.postman_collection.json    --insecure --reporters cli,junit --reporter-junit-export postman_results/data_accountsResult.xml
newman run portfolio_data.postman_collection.json   --insecure --reporters cli,junit --reporter-junit-export postman_results/data_portfolioResult.xml
newman run quotes_data.postman_collection.json      --insecure --reporters cli,junit --reporter-junit-export postman_results/data_quotesResult.xml


newman run accounts.postman_collection.json         --insecure --reporters cli,junit --reporter-junit-export postman_results/accountsResult.xml
newman run portfolio.postman_collection.json        --insecure --reporters cli,junit --reporter-junit-export postman_results/portfolioResult.xml
newman run quotes.postman_collection.json           --insecure --reporters cli,junit --reporter-junit-export postman_results/quotesResult.xml
