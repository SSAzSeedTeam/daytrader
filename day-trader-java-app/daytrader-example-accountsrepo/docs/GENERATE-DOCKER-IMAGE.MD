

## Generate the Docker Image for our Application

 
### Write the Dockerfile
    
The `Dockerfile` is where you define all the commands to setup the environment and start the Accounts in the container.

```yaml
##
##  Use debian base image; instead of alpine linux -- it includes bash
##
FROM openjdk:8-jre
##
##  Sets the author field of the generated image
##
MAINTAINER Donald Vines <donald_vines@hotmail.com>
##
##  Declare Docker ARGs whose values are set when building the image; but they are not available to the container
##
##  1.  App/WAR Name & Version
ARG APP_ARTIFACTID
ARG WAR_ARTIFACTID
ARG APP_VERSION
##  2.  Exposed Port
ARG EXPOSE_PORT
##  3.  Database's URL
ARG DATABASE_DRIVER
ARG DATABASE_URL
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
##
##  Set Docker ENV Values that are not only available when building the image, but also to the running container
##
##  1. SSL Variables
ENV DAYTRADER_KEYSTORE_FILENAME=/var/ssl/daytrader/keystore.jks
ENV DAYTRADER_KEYSTORE_PASSWORD=password
ENV DAYTRADER_TRUSTSTORE_LOCATION=/var/ssl/daytrader/truststore.jks
ENV DAYTRADER_TRUSTSTORE_PASSWORD=password
##  2.  Database Variables
ENV DAYTRADER_DATABASE_DRIVER=${DATABASE_DRIVER}
ENV DAYTRADER_DATABASE_URL=${DATABASE_URL}
ENV DAYTRADER_DATABASE_USERNAME=${DATABASE_USERNAME}
ENV DAYTRADER_DATABASE_PASSWORD=${DATABASE_PASSWORD}
##  3.  Tomcat Variables
ENV SERVER_PORT=${EXPOSE_PORT}
ENV SERVER_PORT_HTTPS=${EXPOSE_PORT}
##  4.  Routing Variables
ENV DAYTRADER_ACCOUNTS_SERVICE=https://daytrader-accounts
ENV DAYTRADER_GATEWAY_SERVICE=https://daytrader-gateway
ENV DAYTRADER_PORTFOLIOS_SERVICE=https://daytrader-portfolios
ENV DAYTRADER_QUOTES_SERVICE=https://daytrader-quotes
##  5.  Logging Variables
ENV DAYTRADER_LOG_FILENAME=/var/log/daytrader/${APP_ARTIFACTID}-${APP_VERSION}.log
ENV DAYTRADER_LOG_LEVEL=TRACE
ENV DAYTRADER_LOG_APPENDER=ConsoleAppender
##
##  Setup the environment for the running container
##
##  1.  Create Database Folder 
RUN mkdir -p -m 0777 /var/dat/daytrader
##  2.  Create Logging Folder, Logging File, & Set Permissions
RUN mkdir -p -m 0777 /var/log/daytrader
RUN touch $DAYTRADER_LOG_FILENAME
RUN chmod 666 $DAYTRADER_LOG_FILENAME
##  3.  Create SSL Folder, Add Truststore, & Set Permissions
RUN mkdir -p -m 0777 /var/ssl/daytrader
ARG JKS_FILE=target/${WAR_ARTIFACTID}-${APP_VERSION}/WEB-INF/classes/truststore.jks
ADD ${JKS_FILE} $DAYTRADER_TRUSTSTORE_LOCATION
RUN chmod 666 $DAYTRADER_TRUSTSTORE_LOCATION
##  4.  Inform Docker that the container listens on the specified port
EXPOSE ${EXPOSE_PORT}
##
##  Run the application in the container
##
##  1.  Setup the JAVA_OPTS for the application
ENV JAVA_OPTS="-Djavax.net.ssl.trustStore=/var/ssl/daytrader/truststore.jks -Djavax.net.ssl.trustStorePassword=password"
##  2.  Add the WAR to the container 
ARG WAR_FILE=target/${WAR_ARTIFACTID}-${APP_VERSION}.war
ADD ${WAR_FILE} app.war
##  3.  Start the executable WAR
ENTRYPOINT exec java $JAVA_OPTS -jar app.war
```

### Add the Dockerfile Plugin

In `daytrader-accountsapp/daytrader-accounts/pom.xml`, add the [Dockerfile Plugin](https://github.com/spotify/dockerfile-maven) and specify the DockerHub account. 
        
```xml
<!--  Build the docker image and push it to docker hub -->
<plugin>
    <groupId>com.spotify</groupId>
    <artifactId>dockerfile-maven-plugin</artifactId>
    <version>${dockerfile-maven-version}</version>
    <executions>
        <execution>
            <phase>package</phase>
            <goals>
                <goal>build</goal>
                <goal>push</goal>
            </goals>
        </execution>
    </executions>
    <configuration>
        <repository>${docker.image.prefix}/${project.artifactId}</repository>
        <tag>4.0.18</tag>
        <buildArgs>
            <WAR_ARTIFACTID>${project.artifactId}</WAR_ARTIFACTID>
            <APP_VERSION>${project.parent.version}</APP_VERSION>
            <APP_ARTIFACTID>${project.parent.artifactId}</APP_ARTIFACTID>
            <EXPOSE_PORT>1443</EXPOSE_PORT>
            <DATABASE_DRIVER>org.apache.derby.jdbc.EmbeddedDriver</DATABASE_DRIVER>
            <DATABASE_URL>jdbc:derby:tradesdb;create=true</DATABASE_URL>
            <DATABASE_USERNAME></DATABASE_USERNAME>
            <DATABASE_PASSWORD></DATABASE_PASSWORD>
        </buildArgs>
        <useMavenSettingsForAuth>true</useMavenSettingsForAuth>
    </configuration>
</plugin>
```

### Build and Push the Docker Image

With the `Dockerfile` and the `Dockerfile Plugin` in place, we can use Maven to build and push the Docker image to DockerHub.

1.  `$ cd daytrader-accountsapp`

2.  `$ mvn -Pkubernetes package`

This command creates an image with the version `<tag>` you specified in the plugin. You must update this `<tag>` for a rolling update.
    


