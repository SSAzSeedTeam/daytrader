
## Create the Kubernetes Service for our Deployment

The Service load balances requests across the Pods. Remember that the pods are ephemeral. So if one of them stops, the ReplicaSet will 
create a replacement, but that Pod will have a different IP address. For that reason, clients should not communicate directly with the 
application in a Pod. Instead clients should talk to applications via their service. 

### Write the Service Specification

The `service.yaml` is where you specify the selector for the backend pods along with other specifications

```yaml
apiVersion: v1
kind: Service
metadata:
  labels:
    app: daytrader-web
  name: daytrader-web
  namespace: default
spec:
  ports:
  - port: 443
    protocol: TCP
    targetPort: 5443
  selector:
    app: daytrader-web
  sessionAffinity: None
  type: ClusterIP
```

### Create the Service Resource

1.  `$ kubectl apply -f service.yaml`
           
2.  `$ kubectl get services`
        
    NAME | TYPE | CLUSTER-IP | EXTERNAL-IP | PORT(S) | AGE
    ---- | ---- | ---------- | ----------- | ------- | ---
    daytrader-web | ClusterIP | 10.7.254.225| `<none>` | 443/TCP | 23s
       
    The above command creates a service resource. This resource listens on the CLUSTER IP and PORT. It is backed by endpoints 
    to one or more pods. You can see the enpoints buy doing `kubectl get endpoints`. When the service receives an HTTPS request,
    it selects one of the endpoints (pods) and forwards the HTTPS request to the pod. The application running inside the pod 
    handles the request and returns an HTTPS response.
            
    See also [Kubernetes Concepts - Services, Load Balancing, and Networking](https://kubernetes.io/docs/concepts/services-networking/service)

### Test the Service Connection
                        
1.  Start the proxy to locate and authenticate to the API Server.
    
    `$ kubectl proxy`
        
    You should see `Starting to serve on 127.0.0.1:8001`
            
    If you see a port binding error, start the proxy on a different port, e.g.

    `$ kubectl proxy --port=8002`

2.  Test the connection using the `curl` command

    `$ curl -k http://localhost:8001/api/v1/namespaces/default/services/https:daytrader-web:/proxy/health`
    
    You should see `{"status":"UP"}`
    
    The above curl command sends the HTTP request (without any authentication headers) to the proxy that is running on your local machine.
    The proxy, then, sends an HTTPS request with appropriate authentication headers to the API server. This is the easiest way to connect 
    to the API server. 
    
3.  See also [Access Clusters Using the Kubernetes API](https://kubernetes.io/docs/tasks/administer-cluster/access-cluster-api/) 
