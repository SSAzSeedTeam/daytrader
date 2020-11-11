package com.functions;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.CompletableFuture;
//import org.springframework.http.ResponseEntity;

import org.json.JSONObject;
import org.json.XML;

import com.functions.model.Schema;
//import com.functions.model.EventSchema;
import com.functions.model.ValidationResponse;
import com.google.gson.Gson;
import com.microsoft.azure.eventgrid.customization.EventGridSubscriber;
import com.microsoft.azure.eventgrid.models.EventGridEvent;
import com.microsoft.azure.eventgrid.models.SubscriptionValidationEventData;
import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;
import com.microsoft.azure.functions.OutputBinding;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.BindingName;
import com.microsoft.azure.functions.annotation.BlobInput;
import com.microsoft.azure.functions.annotation.BlobOutput;
import com.microsoft.azure.functions.annotation.EventGridTrigger;
import com.microsoft.azure.functions.annotation.EventHubOutput;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
import com.microsoft.azure.functions.annotation.StorageAccount;

public class EventGridFunction {
	
	/*@FunctionName("eventGridMonitor")
	@EventHubOutput(name = "event", eventHubName = "demo-event", connection = "AzureEventHubConnection")
	  public String logEvent(
	    @EventGridTrigger(
	      name = "event"
	    ) 
	    EventSchema event, 
	    final ExecutionContext context) {
	      context.getLogger().info("Event content: ");
	      context.getLogger().info("Subject: " + event.subject);
	      context.getLogger().info("Time: " + event.eventTime); // automatically converted to Date by the runtime
	      context.getLogger().info("Id: " + event.id);
	      context.getLogger().info("Data: " + event.data);
	      String repository = null;
	      String tag = null;
	      
	      Map<String, Object> data = event.data;
	      if(data.containsKey("repository")) {
	    	  repository = (String) data.get("repository");
	      }
	      if(data.containsKey("tag")) {
	    	  tag = (String) data.get("tag");
	      }
    	  String finalResult = null;
    	  finalResult= repository+tag;
	      return finalResult;
	  }
	
	public static class EventSchema {
		
		public String topic;
		  public String subject;
		  public String eventType;
		  public Date eventTime;
		  public String id;
		  public String dataVersion;
		  public String metadataVersion;
		  public Map<String, Object> data;*/
	
	
	/*@FunctionName("delayForResponse")
	public HttpResponseMessage copyBlobHttp(
		    @HttpTrigger(name = "req", 
		      methods = {HttpMethod.GET, HttpMethod.POST}, 
		      authLevel = AuthorizationLevel.ANONYMOUS) 
	
		    HttpRequestMessage<Optional<String>> request,
	    final ExecutionContext context) throws IOException {
		context.getLogger().info("inside function");
		String eventTime = request.getBody().get();
		context.getLogger().info("eventTime: "+eventTime);
		//ResponseEntity responseEntity = null
		EventGridSubscriber eventGridSubscriber = new EventGridSubscriber();
		Schema obj = null;
		
		EventGridEvent[] eventGridEvents = eventGridSubscriber.deserializeEventGridEvents(eventTime);
		context.getLogger().info("sizee--"+eventGridEvents.length);
			for(EventGridEvent schema: eventGridEvents) {
				String subject = schema.subject();
				context.getLogger().info("subject: "+subject);
				String name = subject.substring(subject.lastIndexOf("/") + 1, subject.length());
				context.getLogger().info("vm name: "+name);
				String topic = schema.topic();
				String resourceGp = topic.substring(topic.lastIndexOf("/") + 1, topic.length());
				
				obj = new Schema();
				obj.setVmName(name);
				obj.setResourceGp(resourceGp);
				
				try {
				    Thread.sleep(120 * 1000);
				} catch (InterruptedException ie) {
				    Thread.currentThread().interrupt();
				}
			}
		 
		
			context.getLogger().info("before response");
		 return request.createResponseBuilder(HttpStatus.OK).body(obj).build();
	  }*/

}
