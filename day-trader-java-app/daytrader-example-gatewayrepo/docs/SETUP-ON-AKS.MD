## Setup on AKS


### Prerequisites

1.  [Create Azure Account](https://azure.microsoft.com/free/)


### Install the Cluster

1.  [Install the Azure CLI](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest)

**Notes** if you are installing to Debian or Ubuntu then don't use the `copy` button to copy and paste the installation commands into a bash shell. If you do, the last command may not be executed. In my case, the `AZ_REPO` wasn't set, and I was getting this error: `Unable to locate package azure-cli`. If you get such an error, then copy and paste individual commands into bash instead of using the `copy` button.
    
2.  Create the AKS Resoure Group

    `$ az group create --name daytrader-aks-cluster --location eastus`

    Location | Name
    -------- | ----
    eastus | daytrader-aks-cluster
    
    This command creates a resource group which is a logical grouping of resources. You will create the cluster in that resource group.

3.  Create the AKS Cluster

    `$ az aks create --resource-group daytrader-aks-cluster --name daytrader-aks-cluster --node-count 1 --enable-addons monitoring --generate-ssh-keys`

    DnsPrefix | EnableRbac | Fqdn | KubernetesVersion | Location | Name | NodeResourceGroup | ProvisioningState | ResourceGroup
    --------- | ---------- | ---- | ----------------- | -------- | ---- | ----------------- | ----------------- | -------------
    daytrader--daytrader-aks-cl-26fd96 | True | daytrader--daytrader-aks-cl-26fd96-bde0f3d2.hcp.eastus.azmk8s.io | 1.9.11 | eastus | daytrader-aks-cluster | MC_daytrader-aks-cluster_daytrader-aks-cluster_eastus | Succeeded | daytrader-aks-cluster

    This command creates a one-node cluster named daytrader-eks-cluster. You can also use it to create multi-node clusters, but to do so with a trial account you will need to increase quota limits
        
3.  Install and configure kubectl

    a.  `$ sudo az aks install-cli`

    This command will install kubectl to : /usr/local/bin/kubectl
    
    b.  `$ az aks get-credentials --resource-group daytrader-aks-cluster --name daytrader-aks-cluster`

    You should see `Merged daytrader-aks-cluster as current context in ...`

    This command downloads the credentials to connect to your cluster and configures kubectl to use them.

    c.  `kubectl config use-context daytrader-aks-cluster`
    
    You should see `Switched to context "daytrader-aks-cluster"`
        
5.  Verify that the cluster is running

    `$ kubectl cluster-info`
                
    You should see `Kubernetes master is running at https://daytrader--daytrader-aks-cl-26fd96-bde0f3d2.hcp.eastus.azmk8s.io:443`

6.  Verify that the worker nodes are running
     
    `$ kubectl get nodes`
            
    NAME | STATUS | ROLES | AGE | VERSION
    ---- | ------ | ----- | --- | -------
    aks-nodepool1-41518254-0 | Ready | agent | 14m | v1.9.11

### Install the Ingres Controller

1.  Create the namespace and configmaps; otherwise cloud-generic.yaml and ingress controller will have errors
        
    a.  `$ cd daytrader-webapp/daytrader-gateway/env/external/kubernetes/conf`
            
    b.  `$ kubectl apply -f ingress-nginx-namespace.yaml`
    
    c.  `$ kubectl apply -f ingress-nginx-configmap.yaml`

2.  Deploy the NGINX Load Balancer

    a.  `$ kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/cloud-generic.yaml`
    
    b.  `$ kubectl -n ingress-nginx get services`
                    
    NAME | TYPE | CLUSTER-IP | EXTERNAL-IP | PORT(S) | AGE
    ---- | ---- | ---------- | ----------- | ------- | ---
    ingress-nginx | LoadBalancer | 10.0.108.207 | xx.xx.xx.xx | 80:31638/TCP,443:31741/TCP | 7m8s
    
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

To install `tiller` into the aks cluster

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

The Kubernetes Dashboard can be useful for managing and troubleshooting your cluster.

1.  Create the ClusterRoleBinding.

    `$ kubectl create clusterrolebinding kubernetes-dashboard --clusterrole=cluster-admin --serviceaccount=kube-system:kubernetes-dashboard`

    This command grants those in the cluster admin role the permissions necessary to access the dashboard.

2.  Start the Kubernetes Dashboard
       
    `$ az aks browse --resource-group daytrader-aks-cluster --name daytrader-aks-cluster`

    This command opens the Kubernetes Dashboard in a browser

## Resources

1.  [Azure Kubernetes Service](https://azure.microsoft.com/services/container-service/)

2.  [NGINX Ingress Controller Installation Guide](https://kubernetes.github.io/ingress-nginx/deploy/)

