## Configure the DNS Service for our Custom Domain Name

To access you application via the Kubernetes ingress resource, the incoming request must be coming from the custom domain name (HOSTS) that you specified in the ingress.yaml (which is also the the CN that you specified for the `tls.cert` in the secrets.yaml). Otherwise you will get an invalid hosts exception during SSL/TLS handshake. This means that you must setup DNS to resolve the HOSTS (custom domain name) to the ingress, ADDRESS. 
    

### Add a Host Name to /etc/hosts

This is a good solution for local development servers

1.  Add an entry to your /etc/hosts in the following format
    
    `<ADDRESS>   <web.daytrader.geronimo.apache.org>`
        
2.  **Note** The `<ADDRESS>` must be an External IP Address. 
        
    a.  If it is a DNS name, then `ping <ADDRESS>` to get the External IP Address.
         
    b.  If it is an Internal IP Address, then `kubectl cluster-info` to get the External IP Address


### Add a CNAME Record to DNS

This is a good solution for controlled environments; like UAT and PROD
    
A CNAME record maps one domain name to another domain name. In this instance, it maps from your custom domain name `<HOSTS>` to the domain name  of the Ingress load balancer `<ADDRESS>`. The CNAME should match the CN provided in the Secret's TLS certificate. The steps to create the CNAME record varies depending on the DNS provider. For additional information, see

1.  [How do I create a simple resource record set in Amazon Riyte 53 using the AWS CLI?](https://aws.amazon.com/premiumsupport/knowledge-center/simple-resourcehttps://aws.amazon.com/premiumsupport/knowledge-center/simple-resource-record-route53-cli/)


2.  [Manage DNS records and recordsets on Azure DNS using the Azure CLI?](https://docs.microsoft.com/en-us/azure/dns/dns-operations-recordsets-cli/)

3.  [Google Cloud SDK (gcloud) dns](https://cloud.google.com/sdk/gcloud/reference/dns/)


### Test the DNS Resolution
    
1.  Using the curl command
                
    `$ curl -k https://web.daytrader.geronimo.apache.org/health`

    You should see `{"status":"UP"}` 

2.  Using the browser
       
    Point you browser to `https://web.daytrader.geronimo.apache.org/health`

    You should see `{"status":"UP"}` 

3.  If the connection timed out then double check your DNS configuration

