
            
## Create the Certificate and Private Key

To encrypt the SSL/TLS connection between the browser and the Ingress resource, you need to attach a certificate and a private key 
to the Ingress resource. To do that, the certificate and private key must be stored in a Kubernetes resource called a secret so it 
can be referenced by the Ingress resource. 
    
1.  Create the certificate and key

    a.  `$ openssl genrsa -out tls.key 2048`
    
    b.  `$ openssl req -new -x509 -key tls.key -out tls.crt -days 360 -subj /CN=web.daytrader.geronimo.apache.org`
    
2.  Check the certificate and key before applying them to the secret. 

    a.  `$ openssl x509 -in tls.crt -text`
    
        Use this command to check the certificate and its information (signing authority, expiration date, etc.)
    
    b.  `$ openssl rsa -in tls.key -check`
    
        Use this command to check the SSL key and verifies its consistency

3.  Verify the certificate's checksum and the key's checksum match 

    a.  `$ openssl x509 -noout -modulus -in tls.crt | openssl md5`
    
    b.  `$ openssl rsa -noout -modulus -in tls.key | openssl md5`
            

