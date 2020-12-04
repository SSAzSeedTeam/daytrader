/**
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.ofss.daytrader.gateway.service;


import java.nio.charset.StandardCharsets;

import javax.servlet.http.HttpSession;
import javax.transaction.NotSupportedException;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.ForbiddenException;
import javax.ws.rs.InternalServerErrorException;
import javax.ws.rs.NotAcceptableException;
import javax.ws.rs.NotAllowedException;
import javax.ws.rs.NotAuthorizedException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.RedirectionException;
import javax.ws.rs.ServerErrorException;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.Response;

import org.glassfish.jersey.client.ClientProperties;
import org.glassfish.jersey.client.HttpUrlConnectorProvider;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import com.ofss.daytrader.gateway.utils.SessionHolder;
import com.ofss.daytrader.gateway.utils.SpringContext;



//
//Don't do any logging from the base remote call service unless you send it to its own logger;
//otherwise the log messages will be written to the integration test and to the server log and
//will cause server messages to be lost. For debugging, you will need the server log messages.

public class BaseRemoteCallService {
	
    public static String invokeEndpoint(String url, String method, String body,RestTemplate restTemplate) throws Exception
    {
    	return invokeEndpoint(url, method, body, -1,restTemplate);
    }
    
    public static String invokeEndpoint(String url, String method, String body, int connTimeOut,RestTemplate restTemplate) throws Exception
    {       	
   		ResponseEntity  response = sendRequest(url, method, body, connTimeOut,restTemplate);
   		int responseCode = response.getStatusCodeValue();
   		
   		// switch statement 
   		switch(responseCode)
   		{
   		   	case 400 :
   	   		   	// Malformed message 
   	   			throw new BadRequestException("Malformed message from : " + url);
   		   
   		   	case 401 :
   		   		// Authentication failure
   	   			throw new NotAuthorizedException("Authentication failure from : " + url);

      	   case 403 :
      		   // Not permitted to access
  	   			throw new ForbiddenException("Not permitted to access from : " + url);
      		   
   		  	case 404 :
   		  		// Couldn't find resource
   	   			throw new NotFoundException("Couldn't find resource from : " + url);
   		  		
   		  	case 405 :
       		    // HTTP method not supported
   		  		throw new NotAllowedException("HTTP method not supported from : " + url);

   		  	case 406 :
     		      // Client media type requested not supported
   	   			throw new NotAcceptableException("Client accepts media type not supported from : " + url);
     		      
   		  	case 415:
   		  		// Client posted media type not supported
   	   			throw new NotSupportedException("Client produces media type not supported from : " + url);
     		      
       		case 500 :
       		      // General server error
   	   			throw new InternalServerErrorException("General server error from : " + url);

       		case 503 :
     		      // Server is temporarily unavailable or busy
   	   			throw new NotAuthorizedException("Server is temporarily unavailable or busy from : " + url);
       		      
       		default :
       			if ( responseCode >= 300 && responseCode <= 399 )
       			{
       				throw new RedirectionException("A request redirection from : " + url, responseCode, null);
       			}
       			if ( responseCode >= 400 && responseCode <= 499 )
       			{
       				throw new ClientErrorException("A client request error from : " + url, responseCode);
       			}
       			if ( responseCode >=500 && responseCode <= 599 )
       			{
       				throw new ServerErrorException("A server error from : " + url, responseCode);
       			}
   		}
   		System.out.println(response.getBody().toString()+"response.getBody");
   		String responseEntity = new String((byte[]) response.getBody(), StandardCharsets.UTF_8);
   		System.out.println(responseEntity+"responseEntity1");
   		//String responseEntity = (String) response.getBody();
        return responseEntity;
    }

    public static ResponseEntity sendRequest(String url, String method, String body, int connTimeOut,RestTemplate restTemplate) 
    {
    	
    	String finalToken = "";
    	Response response = null;
    	ResponseEntity responseEntity=null;
        System.out.println("Gateway.sendRequest():url="+url);
    	// Jersey client doesn't support the Http PATCH method without this workaround
        Client client = ClientBuilder.newClient()
        		.property(HttpUrlConnectorProvider.SET_METHOD_WORKAROUND, true);
        
        if (connTimeOut > 0)
        {
        	client.property(ClientProperties.CONNECT_TIMEOUT, connTimeOut);
        }
        try {
			SessionHolder sh = SpringContext.getBean(SessionHolder.class);
			HttpSession httpSession = sh.getHttpSession();
	        System.out.println("In BaseRemoteCallService.sendrequest() : session="+httpSession);
			String accessToken = sh.getJwtToken();
	        sh.setJwtToken(accessToken);
	        System.out.println("In BaseRemoteCallService.sendrequest() : accessToken="+accessToken);
	    	if (accessToken != null) {
	    		finalToken = "Bearer "+accessToken;
	    	}
	    	else finalToken = "Bearer ";
	    	System.out.println("finaltoken: "+finalToken);
	        WebTarget target = client.target(url);
	        // response = target.request().header(HttpHeaders.AUTHORIZATION, finalToken).method(method, Entity.json(body));
	         
	     	HttpHeaders headers = new HttpHeaders();
			headers.set(HttpHeaders.AUTHORIZATION, finalToken);
			headers.set(HttpHeaders.CONTENT_TYPE,MediaType.APPLICATION_JSON_VALUE);
			HttpEntity<String> entity = new HttpEntity<String>(body,headers);
			if(HttpMethod.GET.matches(method)) {
				responseEntity = restTemplate.exchange(url, HttpMethod.GET, entity, byte[].class);
				System.out.println(HttpMethod.GET.toString()+"get toString");
			} 
			else if(HttpMethod.POST.matches(method)) {
				responseEntity = restTemplate.exchange(url, HttpMethod.POST, entity, byte[].class);
			}
			else if(HttpMethod.PUT.matches(method)) {
				responseEntity = restTemplate.exchange(url, HttpMethod.PUT, entity, byte[].class);
			}
			else if(HttpMethod.PATCH.matches(method)) {
				restTemplate = new RestTemplate(new HttpComponentsClientHttpRequestFactory());
				responseEntity = restTemplate.exchange(url, HttpMethod.PATCH, entity, byte[].class);
			}
			else if(HttpMethod.DELETE.matches(method)) {
				responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, entity, byte[].class);
			}
			System.out.println("responseEntity from account" + responseEntity);
		} catch(Exception e) {
			e.printStackTrace();
		}
		
        return responseEntity;
    }
}
