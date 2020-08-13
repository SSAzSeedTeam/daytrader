#put newman command shere
newman run AdvanceAPIs.postman_collecon.json --reporters cli,junit --reporter-junit-export Results\jadvanceAPIResult.xml

newman run SimpleCURDAPIs.postman_collection.json --reporters cli,junit --reporter-junit-export Results\SimpleCURDAPIsResult.xml