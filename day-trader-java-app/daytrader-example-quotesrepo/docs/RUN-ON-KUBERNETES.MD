
## Run on Kubernetes

### Build the Quotes

1.  `$ cd daytrader-quotesapp`

2.  `$ mvn -Pkubernetes package`

    This command builds the Docker Image and pushes it to the DockerHub registry

### Start the Quotes

1.  `$ kubectl config use-context YOUR_CLUSTER_NAME`

    This command chooses the cluster; *run it if you haven't already done so*

2.  `$ env/external/kubernetes/bin/create_service.sh`

    This command creates the deployment; waits for it to start, creates the service, and starts kubectl proxy
        
    Note if the deployment (or service) exist and its specification has not changed then it is not re-created

### Test the Quotes

1.  `$ kubectl config use-context YOUR_CLUSTER_NAME`

    This command chooses the cluster; *run it if you haven't already done so*
                                   
2.  `$ mvn -Pkubernetes verify`

    This command creates the service (if it didn't exist), runs the integration tests, then deletes the service
    
    If the service existed, the command reuses the service, runs the integration tests, and deletes the service
    
### Stop the Quotes

1.  `$ kubectl config use-context YOUR_CLUSTER_NAME`

    This command chooses the cluster; *run it if you haven't already done so*

2.  `$ env/external/kubernetes/bin/delete_service.sh`

    This command creates the deployment; deletes the service; and stops the kubectl proxy

### Review the Swagger Documentation

1.  Start the Quotes; *if you haven't already done so*

2.  Point you browser to `http://localhost:8001/api/v1/namespaces/default/services/https:daytrader-quotes:/proxy/swagger-ui.html`

3.  Stop the Quotes after reviewing the APIs



