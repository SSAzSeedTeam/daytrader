package com.ofss.daytrader.trade.consumer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TradeConsumerApplication {

	static final String TOPIC_NAME = "daytrader_trade";

	public static void main(String[] args) {
		SpringApplication.run(TradeConsumerApplication.class, args);
	}

}
