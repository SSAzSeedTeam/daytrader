
## Run on Spring Boot


### Build the Accounts

1.  `$ cd daytrader-accountsapp`

2.  `$ mvn package`

    This command builds the Spring Boot executable WAR

### Start the Accounts

1.  `$ cd daytrader-accounts`

2.  `$ ./env/external/springboot/bin/start_server.sh`

    This command runs the Spring Boot executable WAR
    
### Test the Accounts
                                
1.  `$ cd daytrader-accounts`
    
2.  `$ mvn verify`

    This command starts the application, runs the integration tests, then stops the application
    
### Stop the Accounts

1.  `$ cd daytrader-accounts`

2.  `$ ./env/external/springboot/bin/stop_server.sh`

    This command stops the Spring Boot executable WAR
    
### Review the Swagger Documentation

1.  Start the Accounts

2.  Point you browser to https://localhost:1443/swagger-ui.html

3.  Stop the Accounts after reviewing the APIs

