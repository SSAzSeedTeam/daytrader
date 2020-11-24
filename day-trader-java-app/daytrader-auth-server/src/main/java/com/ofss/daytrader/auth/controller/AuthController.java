package com.ofss.daytrader.auth.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ofss.daytrader.auth.model.JwtRequest;
import com.ofss.daytrader.auth.model.JwtResponse;
import com.ofss.daytrader.auth.model.MyUserDetailsService;
import com.ofss.daytrader.auth.model.UserDataBean;
import com.ofss.daytrader.auth.repository.UserDataRepository;
import com.ofss.daytrader.auth.util.JwtTokenUtil;

/*import com.example.auth.model.JwtRequest;
import com.example.auth.model.JwtResponse;
import com.example.auth.model.MyUserDetailsService;
import com.example.auth.util.JwtTokenUtil;*/

@RestController
@CrossOrigin
//@Component

@EntityScan(basePackages = "com.ofss.daytrader.auth.repository")
public class AuthController {
	
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	@Autowired
	private MyUserDetailsService userDetailsService;
	@Autowired
	UserDataRepository userdatarepo;
	
	@PostMapping("/authenticate")
	public ResponseEntity<JwtResponse> getAuthentication(@RequestBody JwtRequest jwtRequest) throws Exception {
		System.out.println("inside getAuthentication");
		authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(jwtRequest.getUsername(), jwtRequest.getPassword()));
		UserDetails userDetails = userDetailsService.loadUserByUsername(jwtRequest.getUsername());
		
		System.out.println("jwtRequest.getPassword() is " + jwtRequest.getPassword());
		System.out.println("userDetails.getPassword() is " + userDetails.getPassword());
		System.out.println("equal or not - " + userDetails.getPassword().equals(jwtRequest.getPassword()));
		if (userDetails.getPassword().equals(jwtRequest.getPassword())) {
			System.out.println("in if condition");
			String jwt = jwtTokenUtil.generateToken(userDetails);
			System.out.println("Generated token is - " + jwt);
			return ResponseEntity.ok(new JwtResponse(jwt));
		}
		else {
			throw new Exception("User not found");
		}
	}
	//@PostMapping("/regsiteruser/{userName}/{password}")
	@RequestMapping(value = "/registeruser", method = RequestMethod.POST)
	public void regsiterUser(@RequestParam String userName, @RequestParam String password) {
		
		System.out.println(userName + "   " + password);
		UserDataBean userdatabean = new UserDataBean();
		userdatabean.setUserName(userName);
		userdatabean.setPassword(password);
		userdatabean = userdatarepo.save(userdatabean);
		
	}
	
	@GetMapping("/userdetails/{userName}")
	public String getUserDetails(@PathVariable("userName") String userName) {
		System.out.println("printing");
		return userdatarepo.getPwdByUserid(userName);
		
	}

}
