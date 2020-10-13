package com.ofss.daytrader.trade.consumer;

import org.springframework.kafka.support.serializer.JsonDeserializer;

import com.ofss.daytrader.trade.common.Trade;


public class ConsumerDeserializer extends JsonDeserializer<Trade> {
  
}