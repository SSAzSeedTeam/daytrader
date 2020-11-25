/**
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 */

package com.functions;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Properties;
import java.util.Set;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.apache.commons.fileupload.FileItem;
import org.apache.commons.fileupload.FileUploadException;

import com.functions.model.Attachments;
import com.functions.model.FileData;
import com.functions.model.MailData;
import com.functions.model.MultipartParser;
import com.microsoft.azure.functions.ExecutionContext;
import com.microsoft.azure.functions.HttpMethod;
import com.microsoft.azure.functions.HttpRequestMessage;
import com.microsoft.azure.functions.HttpResponseMessage;
//import com.microsoft.azure.functions.HttpResponseMessage;
import com.microsoft.azure.functions.HttpStatus;
import com.microsoft.azure.functions.annotation.AuthorizationLevel;
import com.microsoft.azure.functions.annotation.FunctionName;
import com.microsoft.azure.functions.annotation.HttpTrigger;
//import com.oreilly.servlet.multipart.MultipartParser;

/**
 * Azure Functions with HTTP Trigger.
 */
public class Function {

	Session mailSession;
	// public static String TO_ADDRESS = "arunima.saha@oracle.com";
	public static String USERNAME = "alphagx9@gmail.com";
	public static String PASSWORD = "gxenablement";

	@FunctionName("EmailSender")
	public HttpResponseMessage run(@HttpTrigger(name = "req", methods = { HttpMethod.GET,
			HttpMethod.POST }, authLevel = AuthorizationLevel.ANONYMOUS) HttpRequestMessage<Optional<String>> request,
			final ExecutionContext context)
			throws FileUploadException, AddressException, MessagingException, IOException {
		context.getLogger().info("Java HTTP trigger processed a request.");

		// Parse query parameter
		// context.getLogger().info("requestBody--"+request.getBody().get());
		byte[] body = request.getBody().get().getBytes();
		String contentTypeHeader = request.getHeaders().get("content-type");
		context.getLogger().info("type----: " + contentTypeHeader);

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
		for (String key : keySet) {
			context.getLogger().info("Key -value--: " + key + " :::" + multipart.get(key).toString());
			List<FileItem> fileItems = multipart.get(key);
			try {
				for (FileItem item : fileItems) {
					context.getLogger().info("inside for: " + key);
					byte[] fileBytes = item.get();
					if (null != item.getName()) {

						context.getLogger().info("fileName::fileBytes: " + item.getName() + ":::" + fileBytes);
						String fileName = item.getName();
						File downloadedFile = new File(item.getName());
						Writer output;

						output = new BufferedWriter(new FileWriter(downloadedFile));
						output.write(new String(fileBytes, StandardCharsets.UTF_8));
						output.close();
						fileData = new FileData();
						fileData.setFileName(fileName);
						fileData.setFile(downloadedFile);
						files.add(fileData);

					}
					if (key.equalsIgnoreCase("msgbody")) {
						String mailBody = new String(fileBytes, StandardCharsets.UTF_8);
						context.getLogger().info("mailBody :" + mailBody );
						attachment.setText(mailBody);
					}
					if (key.equalsIgnoreCase("recepients")) {
						String recepient = new String(fileBytes, StandardCharsets.UTF_8);
						context.getLogger().info("recepient :" + recepient );
						attachment.setRecepients(recepient);
					}
					if (key.equalsIgnoreCase("subject")) {
						String subject = new String(fileBytes, StandardCharsets.UTF_8);
						context.getLogger().info("subject :" + subject );
						attachment.setSubject(subject);
					}
				}
				attachment.setAttachment(files);

			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		Function gmail = new Function();
		gmail.setMailServerProperties(context);
		// gmail.draftEmailMessage(attachment);
		gmail.sendEmail(attachment, context);

		// }
		// attachments.forEach(List<FileItem>);
		// com.oreilly.servlet.multipart.MultipartParser parser = new
		// com.oreilly.servlet.multipart.MultipartParser(null, 0);

		// return request.createResponseBuilder(HttpStatus.OK).body((data)).build();
		// MailData requestBody = gson.fromJson(request.getBody().get(),
		// MailData.class);

		/*
		 * String url = request.getBody().get(); String container =
		 * url.substring(url.indexOf(".net") + 4, url.length());
		 * System.out.println("container =="+container); String fileName =
		 * url.substring(url.lastIndexOf("/")+ 1, url.length());
		 * 
		 * ContainerData data = new ContainerData(); data.setBlobPath(container);
		 * data.setBlobName(fileName); context.getLogger().info("name--"+name); final
		 * String email = requestBody.getEmail();
		 * context.getLogger().info("email--"+email);
		 */

		if (attachment == null) {
			return request.createResponseBuilder(HttpStatus.BAD_REQUEST).body("Mail Details is empty").build();
		} else {
			return request.createResponseBuilder(HttpStatus.OK).body(attachment).build();
		}
	}

	private void setMailServerProperties(ExecutionContext context) {
		context.getLogger().info("inside setMailServerProperties");
		Properties emailProperties = System.getProperties();
		emailProperties.put("mail.smtp.port", "587");
		emailProperties.put("mail.smtp.auth", "true");
		//emailProperties.put("mail.smtp.ssl.enable", "true");
		emailProperties.put("mail.smtp.starttls.enable", "true");
		//emailProperties.put("mail.smtp.starttls.required", "true");
		mailSession = Session.getDefaultInstance(emailProperties, null);
	}

	private MimeMessage draftEmailMessage(Attachments attachment, ExecutionContext context) throws AddressException, MessagingException, IOException {
		context.getLogger().info("inside draftEmailMessage");
		// String[] toEmails = { TO_ADDRESS };
		String emails = attachment.getRecepients();
		context.getLogger().info("to address---: " + emails);
		String[] toEmails = emails.split(";");
		String emailSubject = attachment.getSubject();
		// "Test email subject";
		String emailBody = attachment.getText();
		// "This is an email sent by <b>//howtodoinjava.com</b>.";
		MimeMessage emailMessage = new MimeMessage(mailSession);
		/**
		 * Set the mail recipients
		 */
		for (int i = 0; i < toEmails.length; i++) {
			emailMessage.addRecipient(Message.RecipientType.TO, new InternetAddress(toEmails[i]));
		}
		emailMessage.setSubject(emailSubject);
		/**
		 * If sending HTML mail
		 */
		MimeMultipart multipart = new MimeMultipart();
		MimeBodyPart messageBodyPart1 = new MimeBodyPart();
		messageBodyPart1.setContent(emailBody, "text/html");
		multipart.addBodyPart(messageBodyPart1);
		// emailMessage.setContent(emailBody, "text/html");

		// Attachment
		MimeBodyPart messageBodyPart2 = null;
		for (FileData fileData : attachment.getAttachment()) {
			messageBodyPart2 = new MimeBodyPart();
			DataSource source1 = new FileDataSource(fileData.getFileName());
			messageBodyPart2.setDataHandler(new DataHandler(source1));
			messageBodyPart2.setFileName(fileData.getFileName());
			messageBodyPart2.attachFile(fileData.getFile());
			multipart.addBodyPart(messageBodyPart2);

		}
		/**
		 * If sending only text mail
		 */
		// emailMessage.setText(emailBody);// for a text email
		// 6) set the multiplart object to the message object
		emailMessage.setContent(multipart);
		return emailMessage;
	}

	private void sendEmail(Attachments attachment, ExecutionContext context) throws AddressException, MessagingException, IOException {
		String fromUser = USERNAME;
		String fromUserEmailPassword = PASSWORD;

		String emailHost = "smtp.gmail.com";
		Transport transport = mailSession.getTransport("smtp");
		transport.connect(emailHost, fromUser, fromUserEmailPassword);

		MimeMessage emailMessage = draftEmailMessage(attachment, context);
		transport.sendMessage(emailMessage, emailMessage.getAllRecipients());
		transport.close();
		System.out.println("Email sent successfully.");
		context.getLogger().info("Email sent successfully");
	}

}
