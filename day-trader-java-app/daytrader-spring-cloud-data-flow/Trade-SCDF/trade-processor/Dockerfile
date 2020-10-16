FROM openjdk:8 
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} trade-processor-1.0.jar/
ENTRYPOINT ["java","-jar","/trade-processor-1.0.jar"]