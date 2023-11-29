FROM openjdk:8-jre-alpine
WORKDIR /home
COPY /target/zipkin-server-0.0.1-SNAPSHOT.jar /spring-zipkin-demo.jar
EXPOSE 1666
ENTRYPOINT ["sh", "-c", "java -jar /spring-zipkin-demo.jar"]

