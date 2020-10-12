package com.oracle.kafka.consumer;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.MessageHeaders;
import org.springframework.messaging.handler.annotation.Headers;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import com.oracle.kafka.entity.OrderBean;
import com.oracle.kafka.entity.OrderDataBean;

@Service
public class FooListener {

	private static final Logger LOG = LoggerFactory.getLogger(FooListener.class);
	@Autowired
	RestTemplate rs;
	@Value("${url}")
	String Url;

	@KafkaListener(topics = "${app.topic.example}")
	public void receive(@Payload OrderBean data, @Headers MessageHeaders headers) {
		LOG.info("received data='{}'", data);
		String url = Url + data.getMode();
		
		LOG.info("URL is" +url);

		Map<String, String> map = new HashMap<>();
		map.put("uid", data.getUid());

		// "${DAYTRADER-GATEWAY:https://localhost}:2443/portfolios/uid%3A0/orders?mode=0";

		OrderDataBean request = new OrderDataBean();
		request.setOrderType(data.getOrderType());
		request.setQuantity(data.getQuantity());
		request.setOrderStatus(data.getOrderStatus());
		request.setSymbol(data.getSymbol());
		request.setHoldingID(data.getHoldingID());

		rs.postForEntity(url, request, OrderDataBean.class, map);

		headers.keySet().forEach(key -> {
			LOG.info("{}: {}", key, headers.get(key));
		});
	}

}
