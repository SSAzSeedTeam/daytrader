package com.ofss.daytrader.core.beans;

import java.io.Serializable;

public class OauthResponseBean implements Serializable{
	
	public String access_token;
	public String token_type;
	public String expires_in;
	public String scope;
	public String jti;
	
	
	public OauthResponseBean() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	
	public OauthResponseBean(String accessToken, String tokenType, String expiresIn, String scope, String jti) {
		super();
		this.access_token = accessToken;
		this.token_type = tokenType;
		this.expires_in = expiresIn;
		this.scope = scope;
		this.jti = jti;
	}


	
	public String getAccess_token() {
		return access_token;
	}


	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}


	public String getToken_type() {
		return token_type;
	}


	public void setToken_type(String token_type) {
		this.token_type = token_type;
	}


	public String getExpires_in() {
		return expires_in;
	}


	public void setExpires_in(String expires_in) {
		this.expires_in = expires_in;
	}


	public String getScope() {
		return scope;
	}
	public void setScope(String scope) {
		this.scope = scope;
	}
	public String getJti() {
		return jti;
	}
	public void setJti(String jti) {
		this.jti = jti;
	}


	@Override
	public String toString() {
		return "OauthResponseBean [access_token=" + access_token + ", token_type=" + token_type + ", expires_in="
				+ expires_in + ", scope=" + scope + ", jti=" + jti + "]";
	}
	
	
	
	
	

}
