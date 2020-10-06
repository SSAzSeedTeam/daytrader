FROM openjdk:8-jre 
MAINTAINER Shibu Narayanan <tnshibu@yahoo.com>

##  1.  App/WAR Name & Version
ARG WAR_ARTIFACTID=daytrader-onprem-exchange-rate
ARG APP_VERSION=1.0

##  2.  Exposed Port
ARG EXPOSE_PORT=7443

##
##  Set Docker ENV Values that are not only available when building the image, but also to the running container
##
##  1. SSL Variables
ENV DAYTRADER_KEYSTORE_FILENAME=/var/ssl/daytrader/keystore.jks
ENV DAYTRADER_KEYSTORE_PASSWORD=password
ENV DAYTRADER_TRUSTSTORE_LOCATION=/var/ssl/daytrader/truststore.jks
ENV DAYTRADER_TRUSTSTORE_PASSWORD=password

##  3.  Tomcat Variables
ENV SERVER_PORT=${EXPOSE_PORT}
ENV SERVER_PORT_HTTPS=${EXPOSE_PORT}

##
##  Setup the environment for the running container
##
##  1.  Create Database Folder 
RUN mkdir -p -m 0777 /var/dat/daytrader
##  2.  Create Logging Folder, Logging File, & Set Permissions
#RUN mkdir -p -m 0777 /var/log/daytrader
#RUN touch $DAYTRADER_LOG_FILENAME
#RUN chmod 666 $DAYTRADER_LOG_FILENAME
##  3.  Create SSL Folder, Add Truststore, & Set Permissions
#RUN mkdir -p -m 0777 /var/ssl/daytrader
#ARG JKS_FILE=target/classes/truststore.jks
#ADD ${JKS_FILE} $DAYTRADER_TRUSTSTORE_LOCATION
#RUN chmod 666 $DAYTRADER_TRUSTSTORE_LOCATION
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
