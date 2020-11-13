package com.ofss.daytrader.core.beans;

public class JwtResponse {

	private final String token;
	public JwtResponse(String jwttoken) {
	this.token = jwttoken;
	}
	public String getToken() {
	return this.token;
	}
}
