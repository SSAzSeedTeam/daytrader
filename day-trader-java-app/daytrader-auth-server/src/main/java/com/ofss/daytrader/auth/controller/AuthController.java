package com.ofss.daytrader.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ofss.daytrader.auth.model.JwtResponse;
import com.ofss.daytrader.auth.model.MyUserDetailsService;
import com.ofss.daytrader.auth.model.UserDataBean;
import com.ofss.daytrader.auth.repository.UserDataRepository;
import com.ofss.daytrader.auth.util.JwtTokenUtil;
import com.ofss.daytrader.auth.util.Log;

@RestController
@CrossOrigin

@EntityScan(basePackages = "com.ofss.daytrader.auth.repository")
public class AuthController {
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private MyUserDetailsService userDetailsService;
	@Autowired
	UserDataRepository userdatarepo;
	@Value("${DAYTRADER_AUTH_PRIVATE_KEY_BASE64}")
	private String privateKeyBase64;
	

	@PostMapping("/authenticate")
	public ResponseEntity<JwtResponse> getAuthentication(
			@RequestParam String username,
			@RequestParam String password) throws Exception {

		Log.debug("inside getAuthentication");
		UserDetails userDetails = userDetailsService.loadUserByUsername(username);
		if (userDetails.getPassword().equals(password)) {
			System.out.println("in if condition");
			String jwtFinal = jwtTokenUtil.generateToken(userDetails);
			System.out.println("jwtfinal: "+jwtFinal);
			return ResponseEntity.ok(new JwtResponse(jwtFinal));
		} else {
			throw new Exception("User not found");
		}
	}
	
	@PostMapping("/registeruser")
	public ResponseEntity<String> registerUser(@RequestParam String username, @RequestParam String password) {
		System.out.println("inside register user: "+username + ":" + password);
		UserDataBean userdatabean = new UserDataBean();
		userdatabean.setUsername(username);
		userdatabean.setPassword(password);
		userdatabean = userdatarepo.save(userdatabean);
		System.out.println(username +" saved to database");
		return ResponseEntity.ok("OK");
	}

}
