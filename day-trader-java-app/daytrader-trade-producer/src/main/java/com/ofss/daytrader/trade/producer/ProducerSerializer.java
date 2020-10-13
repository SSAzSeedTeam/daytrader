package com.ofss.daytrader.trade.producer;

import org.springframework.kafka.support.serializer.JsonSerializer;

import com.ofss.daytrader.trade.common.Trade;

public class ProducerSerializer extends JsonSerializer<Trade> {
  
}