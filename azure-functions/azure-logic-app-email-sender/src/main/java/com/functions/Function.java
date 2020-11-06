/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

package com.functions;

import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;

import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.activation.*;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.StandardOpenOption;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.Set;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.*;
import com.functions.model.*;
import com.google.gson.Gson;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;
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
import org.synchronoss.cloud.nio.multipart.Multipart;

/**
 * Azure Functions with HTTP Trigger.
 */
public class Function {
    /**
     * This function listens at endpoint "/api/HttpExample". Two ways to invoke it using "curl" command in bash:
     * 1. curl -d "HTTP Body" {your host}/api/HttpExample
     * 2. curl "{your host}/api/HttpExample?name=HTTP%20Query"
     * @throws JsonProcessingException 
     * @throws JsonMappingException 
     * @throws FileUploadException 
     * 
     * 
     */
	

	@FunctionName("EmailSender")
    public HttpResponseMessage run(
            @HttpTrigger(
                name = "req",
                methods = {HttpMethod.GET, HttpMethod.POST},
                authLevel = AuthorizationLevel.ANONYMOUS)
                HttpRequestMessage<Optional<String>> request,
            final ExecutionContext context) throws FileUploadException, AddressException, MessagingException, IOException {
        context.getLogger().info("Java HTTP trigger processed a request.");

     
        
        // Parse query parameter
        byte[] body = request.getBody().get().getBytes();
        String contentTypeHeader = request.getHeaders().get("content-type");
        context.getLogger().info("content-type----: "+contentTypeHeader);
       
        Map<String, List<FileItem>> multipart = MultipartParser.parseRequest(body, contentTypeHeader);
        
     
        
        Attachments attachment = new Attachments();
        List<Attachments> listAttchment = null;
        listAttchment = new ArrayList<>();
       MailData mailData = null;
        byte[] text = null;
        List<FileData> files = null;
    	FileData fileData = null;
    	
    	files = new ArrayList<>();
        Set<String> keySet = multipart.keySet();
        for(String key: keySet) {
        	context.getLogger().info("Key -value--: "+key + " :::"+multipart.get(key).toString());
        	List<FileItem> fileItems = multipart.get(key);
        	try {
        	for(FileItem item : fileItems) {
        		context.getLogger().info("inside for: "+key);
        		byte[] fileBytes = item.get();
        		if(null!=item.getName()) {
        			String content = item.getString();
        			
        		context.getLogger().info("fileName::fileBytes: "+item.getName()+":::"+fileBytes);
        		String fileName = item.getName();
        		File downloadedFile = new File(item.getName());
        		String contentType = item.getContentType();
        		context.getLogger().info("fileName::fileBytes: "+contentType);
        		//FileOutputStream outputStream = new FileOutputStream(item.getName());
        	   // byte[] strToBytes = str.getBytes();
        	    //outputStream.write(fileBytes);
        	 
        	    //outputStream.close();
        		Files.write(downloadedFile.toPath(), content.getBytes(), StandardOpenOption.CREATE);
        		
        		/*Writer output;
			
				output = new BufferedWriter(new FileWriter(downloadedFile));
				  output.write(content);
		   	      output.close();*/
		   	   fileData = new FileData();
		   	   fileData.setFileName(fileName);
		   	   fileData.setFile(downloadedFile);
		   	   fileData.setContentType(contentType);
		   	   files.add(fileData);
		   
        		}
        		if(key.equalsIgnoreCase("msgbody")) {
    			String mailBody = new String(fileBytes, StandardCharsets.UTF_8);
    			attachment.setText(mailBody);
        		}
        		if(key.equalsIgnoreCase("recepients")) {
    			String recepient = new String(fileBytes, StandardCharsets.UTF_8);

    			attachment.setRecepients(recepient);
        		}
        		if(key.equalsIgnoreCase("subject")) {
        			String subject =new String(fileBytes, StandardCharsets.UTF_8);
        			attachment.setSubject(subject);
        		}
        	}
        	attachment.setAttachment(files);
			
	    	
        	} catch (IOException e) {
				e.printStackTrace();
			}
        }
        
        if (attachment == null) {
            return request.createResponseBuilder(HttpStatus.BAD_REQUEST).body("Mail Details is empty").build();
        } else {
        	return request.createResponseBuilder(HttpStatus.OK).body(attachment).build();
        }
    }

}
