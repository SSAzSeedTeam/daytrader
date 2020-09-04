## Run on Kubernetes with Helm

### Instructions
    
1.  Start the local repo
        
    `$ helm serve`
            
2.  Add charts to the repo
        
    `$ helm repo add chartmuseum http://127.0.0.1:8879/charts`
    
3.  Install the charts
        
    a. `$ kubectl config use-context CLUSTER_NAME`
    
    Where CLUSTER_NAME is the name of your custer, e.g. minikube, daytrader-eks-cluster, daytrader-aks-cluster, daytrader-gke-cluster
    
    b.  `$ helm upgrade --values chartmuseum/CHART_NAME/values.yaml --install --force CHART_NAME chartmuseum/CHART_NAME`
    
    Where CHART_NAME is daytrader-accounts, daytrader-gateway, daytrader-portfolios, daytrader-quotes, or daytrader-web

### Troubleshooting

1.  Verify the chart follows best practices
        
    `$ helm lint CHART_NAME`
            
    Where CHART_NAME is daytrader-accounts, daytrader-gateway, daytrader-portfolios, daytrader-quotes, or daytrader-web
            
2.  Render the chart to see the manifest
        
    `$ helm install CHART_NAME --dry-run --debug`
            
3.  List the installed charts (releases) in the cluster
        
    `$ helm list`
            
NAME | REVISION | UPDATED | STATUS | CHART | APP VERSION | NAMESPACE
---- | -------- | ------- | ------ | ----- | ----------- | ---------
daytrader-quotes | 2 | Sat Dec 15 10:53:09 2018 | DEPLOYED | daytrader-quotes-4.0.18     | 1.0 | default
daytrader-web    | 3 | Sat Dec 15 11:02:13 2018 | DEPLOYED | daytrader-web-4.0.18        | 1.0 | default
elegant-lionfish | 1 | Sat Dec 15 10:18:05 2018 | DEPLOYED | daytrader-gateway-4.0.18    | 1.0 | default
famous-dingo     | 1 | Sat Dec 15 10:16:22 2018 | DEPLOYED | daytrader-accounts-4.0.18   | 1.0 | default
honorary-numbat  | 1 | Sat Dec 15 10:18:34 2018 | DEPLOYED | daytrader-portfolios-4.0.18 | 1.0 | default
vigilant-ferret  | 1 | Sat Dec 15 10:18:52 2018 | DEPLOYED | daytrader-quotes-4.0.18     | 1.0 | default
            
4.  Cleanup Kubernetes resources including failed deployments
            
    `$ helm delete --purge RELEASE_NAME`
            
    Where RELEASE_NAME is a NAME from the previous `helm list` command
            
5.  Get the manifest from an installed chart
        
    `$ helm get manifest RELEASE_NAME`
            
    Where RELEASE_NAME is a NAME from the previous `helm list` command
