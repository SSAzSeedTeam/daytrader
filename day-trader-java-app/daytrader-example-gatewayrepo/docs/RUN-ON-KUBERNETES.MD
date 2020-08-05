
## Run on Kubernetes

### Build the Gateway

1.  `$ cd daytrader-gatewayapp`

2.  `$ mvn -Pkubernetes package`

    This command builds the Docker Image and pushes it to the DockerHub registry

### Start the Gateway

1.  `$ kubectl config use-context YOUR_CLUSTER_NAME`

    This command chooses the cluster; *run it if you haven't already done so*

2.  `$ env/external/kubernetes/bin/create_service.sh`

    This command creates the deployment; waits for it to start, creates the service, and starts kubectl proxy
        
    Note if the deployment (or service) exist and its specification has not changed then it is not re-created

### Test the Gateway

1.  `$ kubectl config use-context YOUR_CLUSTER_NAME`

    This command chooses the cluster; *run it if you haven't already done so*
 
2.  Start the Accounts, Portfoios, and Quotes; *if you haven't already done so*
                                   
3.  `$ mvn -Pkubernetes verify`

    This command starts the gateway; runs the integration tests; and then stops the gateway
    
4.  Stop the Accounts, Portfoios, and Quotes
    
### Stop the Gateway

1.  `$ kubectl config use-context YOUR_CLUSTER_NAME`

    This command chooses the cluster; *run it if you haven't already done so*

2.  `$ env/external/kubernetes/bin/delete_service.sh`

    This command creates the deployment; deletes the service; and stops the kubectl proxy

### Review the Swagger Documentation

1.  Start the Gateway; *if you haven't alreay done so*

2.  Point you browser to `http://localhost:8001/api/v1/namespaces/default/services/https:daytrader-gateway:/proxy/swagger-ui.html`

3.  Stop the Gateway after reviewing the APIs




