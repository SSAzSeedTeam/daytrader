package com.ofss.daytrader.trade.producer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ofss.daytrader.trade.common.Trade;

import lombok.extern.slf4j.Slf4j;


@CrossOrigin(origins = "*")
@Slf4j
@Component
@RestController
public class TradeProducer {

  @Autowired
  private KafkaTemplate<String, Trade> kafkaTemplate;

  public TradeProducer(KafkaTemplate<String, Trade> kafkaTemplate) {
    this.kafkaTemplate = kafkaTemplate;
  }

  @RequestMapping(value = "/sendMessage/complexType", method = RequestMethod.POST)
	public String publishMessageComplextType(@RequestBody Trade payload) {

	  
	  
		 kafkaTemplate.send(TradeProducerApplication.TOPIC_NAME, payload);
		return "success";
	}
  
	/*
	 * public void produce(StockTick stockTick) { //
	 * log.info("Produce stock tick: {}, {} {}", stockTick.getSymbol(),
	 * stockTick.getCurrency(), stockTick.getTradeValue());
	 * System.out.println("[In Producer] ==> Stock Symbol = "+stockTick.getSymbol()
	 * +", Currency = "+stockTick.getCurrency()+" , Traded value = "+stockTick.
	 * getTradeValue());
	 * kafkaTemplate.send(TradeProducerApplication.TOPIC_NAME,
	 * stockTick.getSymbol(), stockTick); }
	 */
}