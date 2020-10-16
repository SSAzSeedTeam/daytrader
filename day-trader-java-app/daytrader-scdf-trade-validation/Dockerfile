FROM openjdk:8 
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} trade-validation-1.0.jar/
ENTRYPOINT ["java","-jar","/trade-validation-1.0.jar"]