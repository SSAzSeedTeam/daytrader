


## Create the Kubernetes Ingress for Routing to our Service


### Write the Ingress Specification

The `ingress.yaml` defines the custom domain name for accesing the application through the Ingress and the matching secret for incoming TLS/SSL requests

```yaml
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: daytrader-web
  annotations:
    kubernetes.io/ingress.allow-http: "false"
    nginx.ingress.kubernetes.io/ssl-passthrough: "true"
spec:
  tls:
  - hosts:
    - web.daytrader.geronimo.apache.org
    secretName: daytrader-web
  rules:
    - host: web.daytrader.geronimo.apache.org
      http: 
        paths:
        - path: /
          backend:
            serviceName: daytrader-web
            servicePort: 443 
```


### Create the Ingress Resource

1.  `$ kubectl apply -f ingress.yaml`
            
2.  `$ kubectl get ingress`

    NAME | HOSTS | ADDRESS | PORTS | AGE
    ---- | ----- | ------- | ----- | ---
    daytrader-web | web.daytrader.geronimo.apache.org | xx.xx.xx.xx | 80, 443 | 23h
                
    Wait for the Ingress service to run; then record the HOSTS and ADDRESS

    a.  The HOSTS was specified in the ingress.yaml and must match the Secrets (tls.crt CN)
                    
    b.  The ADDRESS is the DNS Name or IP Address to the Ingress resource's load balancer
        
3.  If the Ingress resource failed to start then check the logs on the nginx-ingress-controller-xxxxxxxxx-xxxxx
    
    `$ kubectl -n ingress-nginx get pods`
            
    NAME | READY | STATUS | RESTARTS | AGE
    ---- | ----- | ------ | -------- | ---
    nginx-ingress-controller-xxxxxxxxx-xxxxx | 1/1 | Running - 0 | 1h
        
    `$ kubectl -n ingress-nginx logs nginx-ingress-controller-xxxxxxxxx-xxxxx`
    
    If there are errors in the logs then they should give you a good indication of what went wrong
        

