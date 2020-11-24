package com.ofss.daytrader.auth.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "userdatatable")
public class UserDataBean {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer userID; /* Id number */
	
	@Column(name="userName")
	private String userName; /* Username string */
	@Column(name="password")
	private String password; /* Password string */
	@Column(name="saltValue	")
	private String saltValue; /* Salt string */
	@Column(name="hashValue")
	private String hashValue; /* Hash string */

	
	public UserDataBean() {
		
	}
	
	public UserDataBean(Integer userID, String userName, String password, String saltValue, String hashValue) {
		super();
		this.userID = userID;
		this.userName = userName;
		this.password = password;
		this.saltValue = saltValue;
		this.hashValue = hashValue;
	}

	public Integer getUserID() {
		return userID;
	}

	public void setUserID(Integer userID) {
		this.userID = userID;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getSaltValue() {
		return saltValue;
	}

	public void setSaltValue(String saltValue) {
		this.saltValue = saltValue;
	}

	public String getHashValue() {
		return hashValue;
	}

	public void setHashValue(String hashValue) {
		this.hashValue = hashValue;
	}

}