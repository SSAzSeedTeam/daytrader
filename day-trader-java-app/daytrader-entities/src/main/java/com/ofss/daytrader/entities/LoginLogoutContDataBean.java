package com.ofss.daytrader.entities;

import java.io.Serializable;

import javax.persistence.Entity;

import org.springframework.stereotype.Component;

@Component
public class LoginLogoutContDataBean implements Serializable{

	private int sumLoginCount;
	private int sumLogoutCount;
	
	public LoginLogoutContDataBean() {
		super();
	}

	public LoginLogoutContDataBean(int sumLoginCount, int sumLogoutCount) {
		super();
		this.sumLoginCount = sumLoginCount;
		this.sumLogoutCount = sumLogoutCount;
	}


	public int getSumLoginCount() {
		return sumLoginCount;
	}
	public void setSumLoginCount(int sumLoginCount) {
		this.sumLoginCount = sumLoginCount;
	}
	public int getSumLogoutCount() {
		return sumLogoutCount;
	}
	public void setSumLogoutCount(int sumLogoutCount) {
		this.sumLogoutCount = sumLogoutCount;
	}
	@Override
	public String toString() {
		return "LoginLogoutContDataBean [sumLoginCount=" + sumLoginCount + ", sumLogoutCount=" + sumLogoutCount + "]";
	}
	
	
	
}
