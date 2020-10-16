package com.ofss.daytrader.onprem.exchangerate.controller;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Async;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.google.gson.Gson;
import com.ofss.daytrader.onprem.exchangerate.model.ExchangeRate;
import com.ofss.daytrader.onprem.exchangerate.model.RequestData;

@CrossOrigin(origins = "*")
@RestController
public class ExchangeRateController {
	
	private Logger logger=LoggerFactory.getLogger(this.getClass());
	
	@Async
	@GetMapping("/exchangerate")
	public CompletableFuture<ResponseEntity> getExchangeRate(@RequestParam String currency) throws SQLException, JsonProcessingException{
		logger.info("Inside getExchangeRate() method currency: "+ currency);
		
		
	       ResponseEntity responseEntity = null;
	       ExchangeRate exchange = null;
	       
	       Gson gson = new Gson(); 
	       RequestData requestData = gson.fromJson(currency, RequestData.class);
	       currency = requestData.getCurrency();
	       
		Map<String, Double> exchangeRate = new HashMap<>();
		exchangeRate.put("USD", 01.000000);
		exchangeRate.put("EUR",  0.640983);
		exchangeRate.put("GBP",  0.730166);
		exchangeRate.put("CAD",  2.063377);
		exchangeRate.put("JPY",  0.698188);
		exchangeRate.put("CHF", 79.356235);
		exchangeRate.put("AUD", 06.798435);
		exchangeRate.put("NZD", 08.235853);
		exchangeRate.put("INR", 79.235853);
		exchangeRate.put("YEN",  7.235853);
		
		if(exchangeRate.containsKey(currency)) {
			exchange = new ExchangeRate();
			exchange.setCurrencyName(currency);
			exchange.setExchangeRate(exchangeRate.get(currency));
			 logger.info("Success: Exchange rate for "+currency+" is: "+exchangeRate.get(currency));
			 responseEntity = new ResponseEntity(exchange,HttpStatus.OK);
			 return CompletableFuture.completedFuture(responseEntity);
			 
		}
		else {
			responseEntity = new ResponseEntity("Content not found",HttpStatus.NO_CONTENT);
			return CompletableFuture.completedFuture(responseEntity);
		}
	
	}


}
