# datrader-kafka-buy-and-sell

The following are the steps to  test the buy and sell scenario with day trader application

1.	Down load apache Kafka for windows  https://www.geeksforgeeks.org/how-to-install-and-run-apache-kafka-on-windows/

2.	Navigate to  C:\kafka_2.13-2.6.0\bin\windows or to the folder where you have downloaded kafka

3.	Issue the bellow command in order to start zookeeper and kafka server

zookeeper-server-stop.bat ../../config/zookeeper.properties
kafka-server-start.bat ../../config/server.properties


4.	Run the docker-compose file in the root application by navigating to the root of the application
5.	Build the project by navigating to the root of the application i.e mvn clean package
6.	Execute the project  i.e mvn spring-boot:run  

Note :  The SpringKafkaApplication.java file has 

 OrderBean orderBean = new OrderBean();
	
		orderBean.setOrderType("buy");
		orderBean.setQuantity(10);
		orderBean.setOrderStatus("open");
		orderBean.setSymbol("s:0");
		//orderBean.setHoldingID(123);
		orderBean.setMode(0);
		orderBean.setUid("uid:0");

To buy stock of type s:0 ,  to sell the same we need to change type to sell and the holdingId of the item should be noted and set in the code as commented in the above line.

When you now refresh the page of portfolio or quotes you must the updates



         





