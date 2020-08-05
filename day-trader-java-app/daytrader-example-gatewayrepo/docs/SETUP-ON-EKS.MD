                
## Setup on EKS

### Prerequisites

1.  [Create AWS Account](https://aws.amazon.com/premiumsupport/knowledge-center/create-and-activate-aws-account/)

### Install the Cluster

1.  Follow [EKS getting started guide](https://docs.aws.amazon.com/eks/latest/userguide/getting-started.html) from `Amazon EKS Prerequisites` to `Step 4: Launch a Guest Book` exclusive.

2.  Configure kubeconfig

At this point you should have a cluster and `~/.kube/config` file created. That file has information about the cluster(s) you created. The `kubectl` command line interface uses that information to locate and authenticate to a cluster. If you have multiple clusters, then you can use `kubectl config use-context CONTEXT_NAME` command to point kubectl to a specific cluster. To make it easier for you to work with multiple clusters, edit the context name in the config file. For example,

**Original ~/.kube/config**

```yaml
- context:
    cluster: arn:aws:eks:us-east-1:xxxxxxxxxxxx:cluster/daytrader-eks-cluster
    user: arn:aws:eks:us-east-1:xxxxxxxxxxxx:cluster/daytrader-eks-cluster
  name: arn:aws:eks:us-east-1:xxxxxxxxxxxx:cluster/daytrader-eks-cluster
```

**Modified ~/.kube/config**

```yaml
- context:
    cluster: arn:aws:eks:us-east-1:xxxxxxxxxxxx:cluster/daytrader-eks-cluster
    user: arn:aws:eks:us-east-1:xxxxxxxxxxxx:cluster/daytrader-eks-cluster
  name: daytrader-eks-cluster
```

3.  Verify the EKS Cluster
     
    a.  `$ kubectl config use-context daytrader-eks-cluster`
                    
    You should see `Switched to context daytrader-eks-cluster`
                
    b.  `$ kubectl kubectl cluster-info`
                    
    You should see `Kubernetes master is running at https://8D36DB7CBD2E3394FF0843CEA0C0A266.sk1.us-east-1.eks.amazonaws.com`
                    
    c.  `$ kubectl get nodes`
                
    NAME | STATUS | ROLES | AGE | VERSION
    ---- | ------ | ----- | --- | -------
    ip-172-31-19-232.ec2.internal | Ready | `<none>` | 3h | v1.10.3
    ip-172-31-2-133.ec2.internal  | Ready | `<none>` | 3h | v1.10.3
    ip-172-31-30-11.ec2.internal  | Ready | `<none>` | 3h | v1.10.3

### Install the Ingres Controller

1.  Create the namespace and configmap; otherwise cloud-generic.yaml will have errors
        
    a.  `$ cd daytrader-webapp/daytrader-gateway/env/external/kubernetes/conf`
            
    b.  `$ kubectl apply -f ingress-nginx-namespace.yaml`
    
    c.  `$ kubectl apply -f ingress-nginx-configmap.yaml`
    
2.  Deploy the NGINX Load Balancer

    a.  `$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/cloud-generic.yaml`
    
    b.  `$ kubectl -n ingress-nginx get services`
                    
    NAME | TYPE | CLUSTER-IP | EXTERNAL-IP | PORT(S) | AGE
    ---- | ---- | ---------- | ----------- | ------- | ---
    ingress-nginx | LoadBalancer | 10.100.124.7 | xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx-xxxxxxxxxx.us-east-1.elb.amazonaws.com | 80:31878/TCP,443:31822/TCP | 16s
    
    Wait for the load balancer to be assigned an EXTERNAL-IP. It may take a few minutes
                
3.  Deploy the NGINX Ingress Controller

    a.  `kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/mandatory.yaml`
    
    b.  `$ kubectl -n ingress-nginx get pods`
                    
    NAME | READY | STATUS | RESTARTS | AGE
    ---- | ----- | ------ | -------- | --- 
    nginx-ingress-controller-xxxxxxxxx-xxxxx | 1/1 | Running | 0 | 39s
    
    Wait for the controller start. It may take a few minutes
    
4.  Review the logs to verify the installation. This is also useful for troubleshooting ingress resources.
                
    `$ kubectl -n ingress-nginx logs nginx-ingress-controller-xxxxxxxxx-xxxxx`
                   
    You should see `successfully acquired lease ingress-nginx/ingress-controller-leader-nginx`
                    
### Install the Helm Server (Tiller)

To install `tiller` into the eks cluster

1.  `$ kubectl use-context CLUSTER_NAME`

2.  Create a service account for tiller

    `$ kubectl -n kube-system create serviceaccount tiller`
    
3.  Create a cluster role binding for tiller

    `$ kubectl create clusterrolebinding tiller --clusterrole cluster-admin --serviceaccount=kube-system:tiller`
            
4.  Install helm within the cluster

    `$ helm init --service-account tiller`
    
5.  Verify the installation

    `$ kubectl -n kube-system get deployments,services tiller-deploy`
    
    NAME | DESIRED | CURRENT | UP-TO-DATE | AVAILABLE | AGE
    ---- | ------- | ------- | ---------- | --------- | ---
    deployment.extensions/tiller-deploy | 1 | 1 | 1 | 1| 39s
   
    NAME | TYPE | CLUSTER-IP | EXTERNAL-IP | PORT(S) | AGE
    ---- | ---- | ---------- | ----------- | ------- | --- 
    service/tiller-deploy | ClusterIP | xx.xx.xx.xx | none | xxxxx/TCP | 39s
    
**Notes:** in this installation, Tiller is deployed with an insecure `allow unauthenticted users` policy. This is completely appropriate for local development or for single tenant clusters within 
a private network. To apply security configurations for multi-tenant clusters in uncontrolled environments, or for clusters with access to high valued data, see [Securing your Helm Installation](https://docs.helm.sh/using_helm/#securing-your-helm-installation)
    
### Install the Kubernetes Dashboard
    
The Kubernetes Dashboard can be useful for managing and troubleshooting the cluster. To install the dashboard, follow these instructions [Tutorial: Deploy the Kubernetes Dashboard](https://docs.aws.amazon.com/eks/latest/userguide/dashboard-tutorial.html). **Note:** If you get a port conflict when starting the proxy, then specify a different port using this command: `kubectl proxy --port=8002`
    
## Resources 

1.  [Amazon Elastic Container Service for Kubernetes](https://aws.amazon.com/eks/)

2.  [NGINX Ingress Controller Installation Guide](https://kubernetes.github.io/ingress-nginx/deploy/)

3.  [Troubleshooting Authentication to the Kubernetes Dashboard](https://github.com/AcalephStorage/kubernetes-dashboard/blob/master/docs/user-guide/troubleshooting.md)



