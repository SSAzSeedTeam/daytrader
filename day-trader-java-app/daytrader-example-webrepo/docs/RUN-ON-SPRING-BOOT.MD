
## Run on Spring Boot


### Build the Web UI

1.  `$ cd daytrader-webapp`

2.  `$ mvn package`

    This command build the Spring Boot executable WAR

### Start the Web UI

1.  `$ cd daytrader-web`

2.  `$ ./env/external/springboot/bin/start_server.sh`

    This command runs the Spring Boot executable WAR
    
### Test the Web UI

1.  Start the Accounts, Gateway, Portfolios, and Quotes

2.  Open your browser and navigate to: `https://localhost:5443`

3.  Under the Configuration Tab

    a.  Press(Re)-create DayTrader Database Tables and Indexes
    
    b.  Press (Re)-populate DayTrader Database

    c.  Press Test Daytrader Scenario

4.  Keep refreshing the browser until you are satisfied that DayTrader is working. 

    Note that each time you refresh the browser, it runs a random functional test. 
   
    That's it! You have now tested the DayTader
    
5.  Stop the Accounts, Gateway, Portfolios, and Quotes
    
### Stop the Web UI

1.  `$ cd daytrader-web`

2.  `$ ./env/external/springboot/bin/stop_server.sh`

    This command stops the Spring Boot executable

### Review the Swagger Documentation

1.  Start the Web UI

2.  Point you browser to https://localhost:5443/swagger-ui.html

3.  Stop the Web UI after reviewing the APIs

