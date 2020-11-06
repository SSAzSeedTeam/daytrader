package com.functions.model;

import java.io.File;
import java.util.List;

public class Attachments {
	
	public List<FileData> attachment;
	public String text;
	public String recepients;
	public String subject;
	
	
	public List<FileData> getAttachment() {
		return attachment;
	}
	public void setAttachment(List<FileData> attachment) {
		this.attachment = attachment;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public String getRecepients() {
		return recepients;
	}
	public void setRecepients(String recepients) {
		this.recepients = recepients;
	}
	public String getSubject() {
		return subject;
	}
	public void setSubject(String subject) {
		this.subject = subject;
	}
	
	

}
