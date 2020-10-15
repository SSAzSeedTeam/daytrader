FROM openjdk:8 
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} daytrader-trade-consumer-1.0.jar
ENTRYPOINT ["java","-jar","/daytrader-trade-consumer-1.0.jar"]