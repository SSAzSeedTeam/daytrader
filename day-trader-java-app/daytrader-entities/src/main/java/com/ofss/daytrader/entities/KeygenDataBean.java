package com.ofss.daytrader.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.stereotype.Component;

@Component
public class KeygenDataBean {

	private Integer keyval;
	@Id
	private String keyname;
	
	public Integer getKeyval() {
		return keyval;
	}
	public void setKeyval(Integer keyval) {
		this.keyval = keyval;
	}
	public String getKeyname() {
		return keyname;
	}
	public void setKeyname(String keyname) {
		this.keyname = keyname;
	}
	
	
}
