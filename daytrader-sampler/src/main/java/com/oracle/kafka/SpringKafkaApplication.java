package com.oracle.kafka;

import java.security.cert.X509Certificate;

import javax.net.ssl.SSLContext;

import org.apache.http.conn.ssl.SSLConnectionSocketFactory;
import org.apache.http.conn.ssl.TrustStrategy;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import com.oracle.kafka.entity.OrderBean;
import com.oracle.kafka.producer.FooSender;

@SpringBootApplication
public class SpringKafkaApplication implements CommandLineRunner {

	public static void main(String[] args) {
		SpringApplication.run(SpringKafkaApplication.class, args);
	}

	@Autowired
	private FooSender sender;

	@Override
	public void run(String... strings) throws Exception {
		OrderBean orderBean = new OrderBean();
	
		/*orderBean.setOrderType("buy");
		orderBean.setQuantity(10);
		orderBean.setOrderStatus("open");
		orderBean.setSymbol("s:0");
		//orderBean.setHoldingID(123);
		orderBean.setMode(0);
		orderBean.setUid("uid:0"); */
		
		orderBean.setOrderType("sell");
		orderBean.setQuantity(10);
		orderBean.setOrderStatus("open");
		orderBean.setSymbol("s:0");
		orderBean.setHoldingID(1005);
		orderBean.setMode(0);
		orderBean.setUid("uid:0");
		
		sender.send(orderBean);
	}

	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate(clientHttpRequestFactory());
	}

	private ClientHttpRequestFactory clientHttpRequestFactory() {

		try {
			HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
			TrustStrategy acceptingTrustStrategy = (X509Certificate[] chain, String authType) -> true;

			SSLContext sslContext = org.apache.http.ssl.SSLContexts.custom()
					.loadTrustMaterial(null, acceptingTrustStrategy).build();

			SSLConnectionSocketFactory csf = new SSLConnectionSocketFactory(sslContext);

			CloseableHttpClient httpClient = HttpClients.custom().setSSLSocketFactory(csf).build();

			HttpComponentsClientHttpRequestFactory requestFactory = new HttpComponentsClientHttpRequestFactory();
			requestFactory.setHttpClient(httpClient);
			requestFactory.setReadTimeout(3000);
			requestFactory.setConnectTimeout(3000);
			return requestFactory;
		} catch (Exception e) {
			e.printStackTrace();

			return null;
		}
	}
}