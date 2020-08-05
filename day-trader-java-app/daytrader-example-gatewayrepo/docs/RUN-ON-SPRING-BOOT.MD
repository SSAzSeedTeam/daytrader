
## Run on Spring Boot


### Build the Gateway

1.  `$ cd daytrader-gatewayapp`

2.  `$ mvn package`

    This command builds the Spring Boot executable WAR

### Start the Gateway

1.  `$ cd daytrader-gateway`

2.  `$ ./env/external/springboot/bin/start_server.sh`

    This command runs the Spring Boot executable WAR
    
### Test the Gateway

1.  Start the Accounts, Portfolios, and Quotes

2.  `$ cd daytrader-gateway`

3.  `$ mvn verify`

    This command starts the application, runs the integration tests, then stops the application 

4.  Stop the Accounts, Portfolios, and Quotes
    
### Stop the Gateway

1.  `$ cd daytrader-gateway`

2.  `$ ./env/external/springboot/bin/stop_server.sh`

    This command stops the Spring Boot executable WAR
    
### Review the Swagger Documentation

1.  Start the Gateway

2.  Point you browser to https://localhost:2443/swagger-ui.html

3.  Stop the Gateway after reviewing the APIs
