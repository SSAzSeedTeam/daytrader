
## Run on Kubernetes


### Build the Web UI

1.  `$ cd daytrader-webapp`

2.  `$ mvn -Pkubernetes package`

    This command builds the Docker Image and pushes it to the DockerHub registry

### Start the Web UI

1.  `$ kubectl config use-context YOUR_CLUSTER_NAME`

    This command chooses the cluster; *run it if you haven't already done so*

2.  `$ env/external/kubernetes/bin/create_service.sh`

    This command creates the deployment; waits for it to start, creates the service, and starts kubectl proxy
        
    Note if the deployment (or service) exist and its specification has not changed then it is not re-created
    
### Test the Web UI

1.  Start the Accounts, Gateway, Portfolios, and Quotes; *if you haven't already done so*
                                   
2.  Start the proxy to locate and authenticate to the API Server.
    
    `$ kubectl proxy`
        
    You should see `Starting to serve on 127.0.0.1:8001`
            
    If you see a port binding error, start the proxy on a different port, e.g.

    `$ kubectl proxy --port=8002`
    
3.  Open your browser and navigate to: `http://localhost:8001/api/v1/namespaces/default/services/https:daytrader-web:/proxy`
    
4.  Under The Configuration Tab

    a.  Press(Re)-create DayTrader Database Tables and Indexes
    
    b.  Press (Re)-populate DayTrader Database

    c.  Press Test Daytrader Scenario

5.  Keep refreshing the browser until you are satisfied that DayTrader is working.

    Note that each time you refresh the browser, it runs a random functional test. 
   
    That's it! You have now tested the DayTrader
    
6.  Stop the Accounts, Gateway, Portfolios, and Quotes
    
### Stop the Web UI

1.  `$ kubectl config use-context YOUR_CLUSTER_NAME`

    This command chooses the cluster; *run it if you haven't already done so*

2.  `$ env/external/kubernetes/bin/delete_service.sh`

    This command creates the deployment; deletes the service; and stops the kubectl proxy

### Review the Swagger Documentation

1.  Start the Web UI; *if you haven't already done so*

2.  Point you browser to `http://localhost:8001/api/v1/namespaces/default/services/https:daytrader-web:/proxy/swagger-ui.html`

3.  Stop the Web UI after reviewing the APIs




