package com.ofss.daytrader.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ofss.daytrader.auth.model.JwtRequest;
import com.ofss.daytrader.auth.model.JwtResponse;
import com.ofss.daytrader.auth.model.MyUserDetailsService;
import com.ofss.daytrader.auth.util.JwtTokenUtil;

/*import com.example.auth.model.JwtRequest;
import com.example.auth.model.JwtResponse;
import com.example.auth.model.MyUserDetailsService;
import com.example.auth.util.JwtTokenUtil;*/

@RestController
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private MyUserDetailsService userDetailsService;
	
	
	@PostMapping("/authenticate")
	public ResponseEntity<JwtResponse> getAuthentication(@RequestBody JwtRequest jwtRequest) {
		System.out.println("inside getAuthentication");
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
		UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
		
		String jwt = jwtTokenUtil.generateToken(userDetails);
		
		
		return ResponseEntity.ok(new JwtResponse(jwt));
		
		
		
	}

}
