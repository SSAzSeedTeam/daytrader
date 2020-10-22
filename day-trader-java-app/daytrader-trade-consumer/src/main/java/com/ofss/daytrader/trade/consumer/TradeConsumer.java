package com.ofss.daytrader.trade.consumer;

import lombok.extern.slf4j.Slf4j;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.ofss.daytrader.trade.common.Trade;

import static com.ofss.daytrader.trade.consumer.TradeConsumerApplication.TOPIC_NAME;
import static org.springframework.kafka.support.KafkaHeaders.RECEIVED_PARTITION_ID;

import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class TradeConsumer {

	private static final Logger logger = LoggerFactory.getLogger(TradeConsumer.class);
	
	@Autowired
	private RestTemplate rs;
	
	@Value("${url}")
	private String Url;
	
  @KafkaListener(topics = TOPIC_NAME)
  public void listen(Trade message) {
  //  log.info("Consumed: {}, {} {} from partition: {}", stockTick.getSymbol(), stockTick.getCurrency(),
    //System.out.println("[In Consumer] ==> Stock Symbol = "+stockTick.getSymbol()+", Currency = "+stockTick.getCurrency()+" , Traded value = "+stockTick.getTradeValue()+" and partition Id = "+partitionId);
    
	  System.out.println("Message is ===>"+message.getOrderType()+" ,"+message.getQuantity()+" ,"+message.getSymbol()+" ,"+message.getOrderStatus()+" ,"+message.getHoldingID() );
	  
    String url = Url + message.getMode();
	logger.info("Url is : {}",url);
	
	
	
	
	Map<String, String> map = new HashMap<>();
	map.put("uid", message.getUid());
	
	OrderDataBean request = new OrderDataBean();
	request.setOrderType(message.getOrderType());
	request.setQuantity(message.getQuantity());
	request.setOrderStatus(message.getOrderStatus());
	request.setSymbol(message.getSymbol());
	request.setHoldingID(message.getHoldingID());

	rs.postForEntity(url, request, OrderDataBean.class, map);
	
	
	
	logger.info("recieved a complex message : {}", message.getOrderType());
    
  }

}
