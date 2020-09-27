FROM openjdk:8-jre
MAINTAINER Shibu Narayanan <tnshibu@yahoo.com>

RUN mkdir -p -m 0777 /var/dat/daytrader
ENV DESTINATION_FOLDER=/var/dat/daytrader

ADD target/daytrader-report-generator-1.0-jar-with-dependencies.jar app.jar
ENTRYPOINT exec java -cp app.jar -DDESTINATION_FOLDER=$DESTINATION_FOLDER com.ofss.daytrader.reports.DayTraderReportGenerator
