
## Run on Spring Boot


### Build the Quotes

1.  `$ cd daytrader-quotesapp`

2.  `$ mvn package`

    This command builds the Spring Boot executable WAR

### Start the Quotes

1.  `$ cd daytrader-quotes`

2.  `$ ./env/external/springboot/bin/start_server.sh`

    This command runs the Spring Boot executable WAR
    
### Test the Quotes
                               
1.  `$ cd daytrader-quotes`
    
2.  `$ mvn verify`

    This command starts the application, runs the integration tests, then stops the application
    
### Stop the Quotes

1.  `$ cd daytrader-quotes`

2.  `$ ./env/external/springboot/bin/stop_server.sh`

    This command stops the Spring Boot executable WAR
    
### Review the Swagger Documentation

1.  Start the Quotes

2.  Point you browser to https://localhost:4443/swagger-ui.html

3.  Stop the Quotes after reviewing the APIs
