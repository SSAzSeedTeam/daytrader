    
## Create the Kubernetes Deployment for our Docker Image

### Write the Deployment Specification

The `deployment.yaml` is where you specify the Docker Image for your application along with other specs
    
```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: daytrader-quotes
  name: daytrader-quotes
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: daytrader-quotes
  template:
    metadata:
      labels:
        app: daytrader-quotes
    spec:
      containers:
      - name: daytrader-quotes
        image: dhvines/daytrader-quotes:4.0.18
        imagePullPolicy: Always
        ports:
        - containerPort: 4443
          protocol: TCP
        readinessProbe:  
          httpGet:
            path: /health
            scheme: HTTPS
            port: 4443
          initialDelaySeconds: 30
          periodSeconds: 30
          timeoutSeconds: 10
        livenessProbe:  
          httpGet:
            path: /health
            scheme: HTTPS
            port: 4443
          initialDelaySeconds: 30
          periodSeconds: 30
          timeoutSeconds: 10
          failureThreshold: 4
        env:
        - name: ACCOUNTS_SERVICE_ROUTE
          value: https://daytrader-accounts
        - name: GATEWAY_SERVICE_ROUTE
          value: https://daytrader-gateway
        - name: PORTFOLIOS_SERVICE_ROUTE
          value: https://daytrader-portfolios
        - name: QUOTES_SERVICE_ROUTE
          value: https://daytrader-quotes
        - name: GET_HOSTS_FROM
          value: dns
```
### Create the Deployment Resource

1.  `$ kubectl apply -f deployment.yaml`

    This command creates a Deployment resource, which creates the ReplicaSet, which then creates the Pods
    
2.  `$ kubectl get pods`
    
    NAME | READY | STATUS | RESTARTS | AGE
    ---- | ----- | ------ | -------- | ---
    daytrader-quotes-xxxxxxxxx-xxxxx | 1/1 | Running | 0 | 6m
    
    Wait until you see READY `1/1` and STATUS `Running`
              
3.  Review the pods (application) logs
        
    `$ kubectl logs daytrader-quotes-xxxxxxxxx-xxxxx -f`
    
    You should see `Tomcat started on port(s): 4443 (https)`
    
### Test the Deployment Connection
        
1.  `$ kubectl port-forward daytrader-quotes-xxxxxxxxx-xxxxx 8888:4443`
    
    This command forwards local port 8888 to port 4443 of your pod
       
    You should see `Forwarding from 127.0.0.1:8888 -> 4443`
       
2.  `$ curl -k https://127.0.0.1:8888/health`

    You should see `{"status":"UP"}` 

