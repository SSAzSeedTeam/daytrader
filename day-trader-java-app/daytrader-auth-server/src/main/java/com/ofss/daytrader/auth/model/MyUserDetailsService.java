package com.ofss.daytrader.auth.model;

import java.util.ArrayList;
import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ofss.daytrader.auth.repository.AccountsProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;

@Service
@Transactional
public class MyUserDetailsService implements UserDetailsService{

	@Autowired
	private AccountsProfileRepository accountsProfileRepository;
	/*
	 * PasswordEncoder encoder =
	 * PasswordEncoderFactories.createDelegatingPasswordEncoder();
	 */
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		System.out.println("inside loadUserByUsername(): "+username);
		String pwd = accountsProfileRepository.getPwdByUserid(username);
		System.out.println("password---"+ pwd);
		return new User(username,"A@1234567893",new ArrayList<>());
	}

	
}
