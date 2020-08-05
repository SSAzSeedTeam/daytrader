
            
## Create the Kubernetes Secret for our Certificates and Private Keys

We are going to use an Ingress for routing incoming requests to our Service but first we need to create a Secret which holds certificates and private keys for securing that connection with HTTPS.

### Generate the Secret Specification

The `secret.yaml` contains certificates and private keys that are used by our Ingress resource. 

Instead of creating the `secret.yaml` from scratch, which involved cutting and pasting certificates, run

`$ kubectl create secret tls daytrader-web --key tls.key --cert tls.crt --dry-run > secret.yaml`

It is simply less error prone to use `kubectl` to generate the `secret.yaml` than to create it from scratch.

```yaml
apiVersion: v1
data:
  tls.crt: ""
  tls.key: ""
kind: Secret
metadata:
  creationTimestamp: null
  name: daytrader-web
  selfLink: /api/v1/namespaces/default/secrets/daytrader-web
type: kubernetes.io/tls
```



### Create the Secret Resource

1.  `$ kubectl apply -f secret.yaml`
            
2.  `$ kubectl get secrets`
            
    NAME | TYPE | DATA | AGE
    ---- | ---- | ---- | ---
    daytrader-web | kubernetes.io/tls | 2 | 8s
    
