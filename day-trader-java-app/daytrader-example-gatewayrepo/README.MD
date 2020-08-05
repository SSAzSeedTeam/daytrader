
# Gateway Microservice

The Gateway to the DayTrader business operations



## Monolithic Architecture

DayTrader is multi-tier application is built around the paradigm of an online stock trading system. Example business operations include
login, register, view portfolio, lookup stock quotes, and buy or sell stock. DayTrader was originally developed by IBM and donated 
to the Apache Geronimo community in the 2005 timeframe. The DayTrader architecture is representitive of monolithic applications that 
many businesses are still using. For that reason, we selected it to clarify the techniques for refactoring a monolith to microservices. 
For the monolithic architecture, see [daytrader - a more complex application](http://geronimo.apache.org/GMOxDOC30/daytrader-a-more-complex-application.html). 



## Microservices Architecture

Consider the following microservices architecture diagram. In this architecture, the Web is responsible for the UI to the DayTrader business operations. It accepts 
incoming HTTPS requests from the browser and delegates them to the [Gateway Microservice](https://github.com/jpmorganchase/daytrader-example-gatewayrepo/). The 
Gateway in turn redirects the request to the ([Accounts Microservice](https://github.com/jpmorganchase/daytrader-example-accountsrepo/), 
[Portfolios Microservice](https://github.com/jpmorganchase/daytrader-example-portfoliosrepo/), or 
[Quotes Microservice](https://github.com/jpmorganchase/daytrader-example-quotesrepo/); which implements that business operation. All of these components are Spring Boot applications.

![Target-State-Architecture](images/Target-State-Architecture.JPG)



## Prerequisites

1.  [Install Java 8](http://www.oracle.com/technetwork/java/javase/downloads/index.html)

2.  [Install Maven 3.3.9+](https://maven.apache.org/download.cgi)

3.  [Install Docker](https://www.docker.com/get-docker)
    
4.  [Install Helm Client](https://github.com/helm/helm/blob/master/docs/install.md)
    
5.  [Create DockerHub Account](https://hub.docker.com/)



## Configuration

Maven must be able to authenticate to your DockerHub account so it can push Docker images

1.  In `daytrader-gateway/pom.xml` change the ${user.name} to your DockerHub user name:

    ```xml
    <docker.image.prefix>${user.name}</docker.image.prefix>
    ``` 

2.  In `daytrader-gateway/env/external/k8s/gateway-deployment.yaml`, change the image to your DockerHub username

    ```yaml
    image: YOUR_DOCKERHUB_USERNAME/daytrader-gateway:4.0.18
    ```

3.  In `daytrader-gateway/pom.xml`, you don't have to change the `<tag>`, but if you do, change the above version too.
        
    ```xml
    <tag>4.0.18</tag>
    ```

4.  In `~/.m2/settings.xml`, add the following so Maven can push images to your DockerHub account

    ```xml
    <servers>
        <server>
            <id>docker.io</id>
            <username>YOUR_DOCKERHUB_USERNAME</username>
            <password>YOUR_DOCKERHUB_PASSWORD</password>
        </server>
    </servers> 
    ```



## Setup

You will need a cluster to run the application. If you already have a cluster with the NGINX Ingress Controller installed then feel free to use it. If not, we have provided instructions to help you setup a cluster on Minikube, Amazon EKS, Google Kubernetes Engine, and Azure Kubernetes Service. We have also tested the application on those platforms. For other platforms, see [Picking the right Solution](https://kubernetes.io/docs/setup/pick-right-solution/).

1.  [Setup on Minikube](docs/SETUP-ON-MINIKUBE.MD)

2.  [Setup on Amazon EKS](docs/SETUP-ON-EKS.MD)

3.  [Setup on Google GKE](docs/SETUP-ON-GKE.MD)

4.  [Setup on Azure AKS](docs/SETUP-ON-AKS.MD)



## Build, Release, and Run

You can run the application on Spring Boot or on the Kubernetes Cluser.

1.  [Run on Spring Boot](docs/RUN-ON-SPRING-BOOT.MD)

2.  [Run on Kubernetes](docs/RUN-ON-KUBERNETES.MD)

**Notes** 

1.  The application code and build scripts were 100% portable across the Kubernetes platforms we tested.

2.  This means you can write the code once and run it on any platform. This is great news for developers!



## Migration Approach

In this section we will take a look at how we migrated the Gateway Spring Boot Application to Kubernetes. 

1.  [Generate the Docker Image](docs/GENERATE-DOCKER-IMAGE.MD)

2.  [Create the Kubernetes Deployment](docs/CREATE-KUBERNETES-DEPLOYMENT.MD)

3.  [Create the Kubernetes Service](docs/CREATE-KUBERNETES-SERVICE.MD)

**Notes** 

1.  The application deployment scripts and commands were 100% portable across the Kubernetes platforms we tested. 

2.  This means you can write the scripts once and deploy to any Kubernetes platform. This is great news for DevOps!




