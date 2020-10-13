FROM openjdk:8 
ARG JAR_FILE=target/*.jar
ENV URL=https://daytrader-gateway
COPY ${JAR_FILE} daytrader-trade-consumer-1.0.jar
ENTRYPOINT ["java","-jar","/daytrader-trade-consumer-1.0.jar"]