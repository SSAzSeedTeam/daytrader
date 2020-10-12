package com.oracle.kafka.producer;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.Message;
import org.springframework.messaging.support.MessageBuilder;
import org.springframework.stereotype.Service;

import com.oracle.kafka.entity.OrderBean;

@Service
public class FooSender {

    private static final Logger LOG = LoggerFactory.getLogger(FooSender.class);

    @Autowired
    private KafkaTemplate<String, OrderBean> kafkaTemplate;

    @Value("${app.topic.example}")
    private String topic;

    public void send(OrderBean data){
        LOG.info("sending data='{}' to topic='{}'", data, topic);

        Message<OrderBean> message = MessageBuilder
                .withPayload(data)
                .setHeader(KafkaHeaders.TOPIC, topic)
                .build();

        kafkaTemplate.send(message);
    }
}
