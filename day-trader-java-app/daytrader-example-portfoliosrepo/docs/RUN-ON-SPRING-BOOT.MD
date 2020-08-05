
## Run on Spring Boot


### Build the Portfolios

1.  `$ cd daytrader-portfoliosapp`

2.  `$ mvn package`

    This command builds the Spring Boot executable WAR

### Start the Portfolios

1.  `$ cd daytrader-portfolios`

2.  `$ ./env/external/springboot/bin/start_server.sh`

    This command runs the Spring Boot executable WAR
    
### Test the Portfolios
                                
1.  `$ cd daytrader-portfolios`
    
2.  `$ mvn verify`

    This command starts the application, runs the integration tests, then stops the application
    
### Stop the Portfolios

1.  `$ cd daytrader-portfolios`

2.  `$ ./env/external/springboot/bin/stop_server.sh`

    This command stops the Spring Boot executable WAR
    
### Review the Swagger Documentation

1.  Start the Portfolios

2.  Point you browser to https://localhost:3443/swagger-ui.html

3.  Stop the Portfolios after reviewing the APIs
