package com.example.ServiceBusTopicMessagesConsumer;

import com.microsoft.azure.servicebus.ExceptionPhase;
import com.microsoft.azure.servicebus.IMessage;
import com.microsoft.azure.servicebus.IMessageHandler;
import com.microsoft.azure.servicebus.IQueueClient;
import com.microsoft.azure.servicebus.ISubscriptionClient;
import com.microsoft.azure.servicebus.ITopicClient;
import com.microsoft.azure.servicebus.ReceiveMode;
import com.microsoft.azure.servicebus.SubscriptionClient;
import com.microsoft.azure.servicebus.primitives.ConnectionStringBuilder;
import com.microsoft.azure.servicebus.primitives.ServiceBusException;

import lombok.extern.log4j.Log4j2;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.core.Ordered;
import org.springframework.stereotype.Component;

import java.util.concurrent.CompletableFuture;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.symphonyoss.symphony.jcurl.*;

@Log4j2
@Component
class ServiceBusConsumer implements Ordered {

    //private ISubscriptionClient iSubscriptionClient1 ;
    //@Autowired
    private IQueueClient iqueue;
	
	  //private ISubscriptionClient iSubscriptionClient2 ; private
	  //ISubscriptionClient iSubscriptionClient3 ; 
    private final Logger log = LoggerFactory.getLogger(ServiceBusConsumer.class); 
   // private String connectionString ="Endpoint=sb://topicsinservicebus.servicebus.windows.net/;SharedAccessKeyName=RootManageSharedAccessKey;SharedAccessKey=ny3fKCHs2eFllaAkmT4VUDw5F+r815o1P2ftwOhZLhI=";
	 
    ServiceBusConsumer(IQueueClient iq) {
		this.iqueue = iq;
	}
    
   
    
    
	@EventListener(ApplicationReadyEvent.class)
    public void consume() throws Exception {

    	recievingmessages(iqueue);
    	//recievingmessages(iSubscriptionClient2);
    	//recievingmessages(iSubscriptionClient3);
    	    	
    }

    @SuppressWarnings("deprecation")
	public void recievingmessages(IQueueClient iqueueclient) throws InterruptedException, ServiceBusException {


    	iqueueclient.registerMessageHandler(new IMessageHandler() {

            @Override
            public CompletableFuture<Void> onMessageAsync(IMessage message) {
                log.info("received message " + new String(message.getBody()) + " with body ID " + message.getMessageId());
                
                try {
                    Object obj = new JSONParser().parse(new String(message.getBody()));
                    
                    JSONObject jo = (JSONObject) obj;
                    //orderDataBean = new OrderDataBean();
                    
                    String userId = (String) jo.get("userId");
                    String symbol = (String) jo.get("symbol");
                    //double quantity = Double.parseDouble((String) jo.get("quantity"));
                    double quantity = 100;
                    //double price = new Double.parseDouble((String)jo.get("price"));
                    double price = 25;
                    String orderType = (String) jo.get("buySell");
                    String orderStatus = "open";

                    //orderDataBean.setSymbol((String) jo.get("symbol"));
                    //orderDataBean.setQuantity(value );
                    //orderDataBean.setPrice(new BigDecimal((String)jo.get("price")));
                    //orderDataBean.setOrderType((String)jo.get("buySell"));
                    //orderDataBean.setOrderStatus("open");
                    
                    log.info("Symbol is-->"+symbol);
                    //log.info("Quantity is-->"+quantity);
                    //log.info("Price is-->"+price);
                 
                    StringBuilder jsonData = new StringBuilder("{")
                                            .append("\"userId\":\""+userId+"\"")
                                            .append("\",symbol\":\""+symbol+"\"")
                                            .append("\",quantity\":\""+quantity+"\"")
                                            .append("\",price\":\""+price+"\"")
                                            .append("}");
                    System.out.println("jsonData = "+jsonData.toString());

                    JCurl jcurl = JCurl.builder()
                                    .method(JCurl.HttpMethod.POST)
                                    .insecure(true)
                                    .data(jsonData.toString())
                                    .build();
                    //TODO  the url should come from ENVIRONMENT VARIABLE.
                    //TODO also fix the rest of the URL
                    java.net.HttpURLConnection connection = jcurl.connect("https://daytrader-gateway:2443/????/"+userId+"/orders");
                    
                    JCurl.Response response = jcurl.processResponse(connection);
                    //Print the output of the call
                    System.out.println(response.getOutput());       
                                    
                                  
                } catch(Exception e) {
                    e.printStackTrace();
                }
                return CompletableFuture.completedFuture(null);
            }
            
            @Override
            public void notifyException(Throwable exception, ExceptionPhase phase) {
                log.error("eeks!", exception);
            }
        });
        
    
    	
    }
    @Override
    public int getOrder() {
        return Ordered.HIGHEST_PRECEDENCE;
    }
}
