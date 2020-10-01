docker build --build-arg EXPOSE_PORT=5443 --build-arg DATABASE_DRIVER=org.apache.derby.jdbc.EmbeddedDriver --build-arg DATABASE_URL='jdbc:derby:tradesdb;create=true' -t daytrader-web:0 .
