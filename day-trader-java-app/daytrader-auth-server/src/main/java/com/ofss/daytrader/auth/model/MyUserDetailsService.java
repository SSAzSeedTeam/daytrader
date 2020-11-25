package com.ofss.daytrader.auth.model;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.ofss.daytrader.entities.AccountProfileDataBean;

import org.apache.http.HttpResponse;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.security.core.userdetails.User;

import org.apache.commons.io.IOUtils;

@Service
@Transactional
public class MyUserDetailsService implements UserDetailsService{
	private final CloseableHttpClient httpClient = HttpClients.createDefault();
	@Autowired
	protected RestTemplate restTemplate; 

	 
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
				String result = "";
				String url = "http://localhost:8080/userdetails/"+username;
				 System.out.println(url);
				 
				 System.out.println("Auth servers url - " + url);
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
		return new User(username,result,new ArrayList<>());
	}

}
