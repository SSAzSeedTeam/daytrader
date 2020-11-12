package com.ofss.daytrader.auth.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ControllerService {
	
	@GetMapping("/hello")
	public String getMsg() {
		return "Hello!!!";
	}

}
