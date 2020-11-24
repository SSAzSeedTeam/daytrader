package com.ofss.daytrader.quotes.service;

import java.io.IOException;
import java.util.ArrayList;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;

@Service
@Transactional
public class MyUserDetailsService implements UserDetailsService{
	@Autowired
	protected RestTemplate restTemplate; 
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		//UserDataBean result = null;
		String result = "";
		String url = "http://localhost:8080/userdetails/"+username;
		 System.out.println("calling auth servers url - " + url);
		 HttpResponse res = null;
		 HttpClient httpclient = HttpClients.createDefault();
		 HttpGet get = new HttpGet(url);
		 try {
			res   = httpclient.execute(get);
			result = IOUtils.toString(res.getEntity().getContent(), "UTF-8");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 // Bala - End
		 
	    System.out.println("password is " + result);
		//HttpEntity entity = (HttpEntity) response.getEntity();
		return new User(username,result,new ArrayList<>());
		//return new User(username,pwd,new ArrayList<>());
	}

}
