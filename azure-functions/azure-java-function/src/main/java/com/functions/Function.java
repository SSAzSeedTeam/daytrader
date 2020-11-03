/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *//*

package com.functions;

import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
//import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

//import com.google.gson.Gson;
import com.fasterxml.jackson.databind.*;
import com.functions.model.*;
import com.google.gson.Gson;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

*//**
 * Azure Functions with HTTP Trigger.
 *//*
public class Function {
    *//**
     * This function listens at endpoint "/api/HttpExample". Two ways to invoke it using "curl" command in bash:
     * 1. curl -d "HTTP Body" {your host}/api/HttpExample
     * 2. curl "{your host}/api/HttpExample?name=HTTP%20Query"
     * 
     * 
     *//*
    @FunctionName("HttpTriggerFunctionUserData")
    public HttpResponseMessage run(
            @HttpTrigger(
                name = "req",
                methods = {HttpMethod.GET, HttpMethod.POST},
                authLevel = AuthorizationLevel.ANONYMOUS)
                HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) {
        context.getLogger().info("Java HTTP trigger processed a request.");

        // Parse query parameter
        context.getLogger().info("requestBody--"+request.getBody().get());
        Gson gson = new Gson(); 
        Data requestBody = gson.fromJson(request.getBody().get(), Data.class);
   
        String url = request.getBody().get();
        String container = url.substring(url.indexOf(".net") + 4, url.length());
    	System.out.println("container =="+container);
    	String fileName = url.substring(url.lastIndexOf("/")+ 1, url.length());
    	
    	ContainerData data = new ContainerData();
    	data.setBlobPath(container);
    	data.setBlobName(fileName);
        context.getLogger().info("name--"+name);
        final String email = requestBody.getEmail();
        context.getLogger().info("email--"+email);
        
        if (requestBody == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST).body("User Name is empty").build();
        } else {
        	return request.createResponseBuilder(HttpStatus.OK).body(requestBody).build();
        }
    }
}
*/