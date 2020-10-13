package com.ofss.daytrader.trade.producer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class TradeProducerApplication {

	public static final String TOPIC_NAME = "daytrader_trade";

	public static void main(String[] args) {
		SpringApplication.run(TradeProducerApplication.class, args);
	}

}
