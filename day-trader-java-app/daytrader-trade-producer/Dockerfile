FROM openjdk:8 
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} daytrader-trade-producer-1.0.jar
ENTRYPOINT ["java","-jar","/daytrader-trade-producer-1.0.jar"]