/**
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.ofss.daytrader.gateway.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
//Jackson
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.ofss.daytrader.core.beans.*;
import com.ofss.daytrader.entities.*;
import com.ofss.daytrader.gateway.utils.Log;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collection;

import javax.ws.rs.core.Response;

// Daytrader
import com.ofss.daytrader.core.beans.MarketSummaryDataBean;
import com.ofss.daytrader.core.beans.RunStatsDataBean;
// Spring
import org.springframework.stereotype.Service;

/**
 * The remote call service to the accounts microservice.
 * 
 * @author
 *
 */

@Service
public class QuotesRemoteCallService extends BaseRemoteCallService
{
	protected static ObjectMapper mapper = null;
	
	static 
	{
		mapper = new ObjectMapper(); // create once, reuse
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); // ignore properties that are not declared
	}

//
//  - Naming convention based service discovery 
	private static String quotesServiceRoute = System.getenv("DAYTRADER_QUOTES_SERVICE");	

	
	   /**
		*
		* @see QuotesServices#tradeBuildDB(int,int)
		*
		*/
		public boolean tradeBuildDB(int limit, int offset) throws Exception 
		{ 
	    	String url = quotesServiceRoute + "/admin/tradeBuildDB?limit="+limit+ "&offset=" + offset;
			Log.debug("QuotesRemoteCallService.quotesBuildDB() - " + url);
	    	String responseEntity = invokeEndpoint(url, "POST", "");
	    	Boolean success = mapper.readValue(responseEntity,Boolean.class);
	    	return success;
		}
	  
	   /**
		*
		* @see TradeServices#resetTrade(boolean)
		*
		*/
		public RunStatsDataBean resetTrade(boolean deleteAll) throws Exception
		{
	    	String url = quotesServiceRoute + "/admin/resetTrade?deleteAll=" + deleteAll;
			Log.debug("QuotesRemoteCallService.resetTrade() - " + url);
	    	String responseEntity = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
	    	RunStatsDataBean runStatsData = mapper.readValue(responseEntity,RunStatsDataBean.class);
	    	return runStatsData; 
		}

	   /**
		*
		* @see TradeDBServices#recreateDBTables(Object[],PrintWriter)
		*
		*/
		public boolean recreateDBTables() throws Exception 
		{
	    	String url = quotesServiceRoute + "/admin/recreateDBTables";
			Log.debug("QuotesRemoteCallService.recreateDBTables() - " + url);
	    	String responseEntity = invokeEndpoint(url, "POST", "");
	    	Boolean success = mapper.readValue(responseEntity,Boolean.class);
	    	return success;
		}
    
	/**
	 * 
	 * @see TradeServices#getMarketSummary()
	 *
	 */
		
	
	@HystrixCommand(fallbackMethod = "getMarketSummaryFallback")
    public MarketSummaryDataBean getMarketSummary() throws Exception 
    {
    	// Added exchange on 7-10-2018 (03); it is ignored for now.
    	// Later you can select the exchange, e.g. NYSE, NASDAQ, AMEX to get
    	// the top gainers and losers in that exchange
    	String exchange = "TSIA"; /* Trade Stock Index Average */
    	String url = quotesServiceRoute + "/markets/" + exchange;   
		Log.debug("QuotesRemoteCallService.getMarketSummary() - " + url);
		String responseString = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
		MarketSummaryDataBean marketSummaryData = mapper.readValue(responseString,MarketSummaryDataBean.class);
	    System.out.println("in gateway service" + marketSummaryData);
	
        return marketSummaryData;
    }
    
	/**
	 * 
  	 * @see TradeServices#createQuote(String, String, BigDecimal)
	 *
	 */
    public QuoteDataBean createQuote(String symbol, String companyName, BigDecimal price) throws Exception 
    {
    	String url = quotesServiceRoute + "/quotes";
		Log.debug("QuotesRemoteCallService.createQuote() - " + url);
		
    	// Consruct the quote data from the given params
    	QuoteDataBean quoteData = new QuoteDataBean();
		quoteData.setSymbol(symbol);
		quoteData.setCompanyName(companyName);
		quoteData.setPrice(price);
	
    	String quoteDataInString = mapper.writeValueAsString(quoteData);
    	String responseEntity = invokeEndpoint(url, "POST", quoteDataInString);
    	quoteData = mapper.readValue(responseEntity,QuoteDataBean.class);
    	return quoteData;
    }

	/**
	 * 
	 * @see TradeServices#getQuote(String)
	 *
	 */
    public QuoteDataBean getQuote(String symbol) throws Exception 
    {
    	String url = quotesServiceRoute + "/quotes/" + symbol;  
		Log.debug("QuotesRemoteCallService.getQuote() - " + url);
	   	String responseString = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
        QuoteDataBean quoteData = mapper.readValue(responseString,QuoteDataBean.class);
        return quoteData;
    }

	/**
	 * 
	 * @see TradeServices#getAllQuotes()
	 *
	 */
    public Collection<QuoteDataBean> getAllQuotes(int limit, int offset) throws Exception 
    {
    	//
    	// 	- TODO: Its never a good idea to return all resources. We arbitrarily limited this call
    	//    to return the first 100. The web application should be modified so use the pagination
    	//    capabilities (limit and offset parameters) of this URI
    	String url = quotesServiceRoute + "/quotes?limit=" + limit + "&offset=" + offset;  
		Log.debug("QuotesRemoteCallService.getAllQuotes() - " + url);
	   	String responseString = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
        Collection<QuoteDataBean> quoteCollection = mapper.readValue(responseString,new TypeReference<Collection<QuoteDataBean>>(){ });
        return quoteCollection;
    }

	/**
	 * 
	 * @see TradeServices#updateQuotePriceVolume(String,BigDecimal,double)
	 *
	 */
    public QuoteDataBean updateQuotePriceVolume(String symbol, BigDecimal price, double volume) throws Exception 
    {
    	String url = quotesServiceRoute + "/quotes/" + symbol + "?price=" + price + "&volume=" + volume;
		Log.debug("QuotesRemoteCallService.updateQuotePriceVolume() - " + url);
    	String responseEntity = invokeEndpoint(url, "PATCH", "");
    	QuoteDataBean quoteData = mapper.readValue(responseEntity,QuoteDataBean.class);
    	return quoteData;
    }

	/**
	 * 
	 * @see TradeServices#updateQuotePriceVolumeInt(String,BigDecimal,double,boolean)
	 *
	 */	
    public QuoteDataBean updateQuotePriceVolumeInt(
    		String symbol, BigDecimal changeFactor, double sharesTraded, boolean publishQuotePriceChange) throws Exception
    {
    	// The parameter publishQuotePriceChange isn't required; it was always false
        return updateQuotePriceVolume(symbol, changeFactor, sharesTraded);
    }
    
    public MarketSummaryDataBean getMarketSummaryFallback() throws Exception {
    	
    	System.out.println("in fallback method of market summary");
    	Collection<QuoteDataBean> topGainersData = new ArrayList<QuoteDataBean>(5);
        Collection<QuoteDataBean> topLosersData = new ArrayList<QuoteDataBean>(5);
        BigDecimal TSIA = new BigDecimal(-1);
        BigDecimal openTSIA = new BigDecimal(-1);
        double volume = 7.0;
        
        topGainersData.add(new QuoteDataBean("s:701","Company701",10.00,new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),1.0));
        topGainersData.add(new QuoteDataBean("s:7012","Company702",20.00,new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),1.0));
        topGainersData.add(new QuoteDataBean("s:703","Company703",30.00,new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),1.0));
        topGainersData.add(new QuoteDataBean("s:704","Company704",40.00,new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),1.0));
        topGainersData.add(new QuoteDataBean("s:705","Company705",50.00,new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),1.0));
        
        topLosersData.add(new QuoteDataBean("s:706","Company706",9.00,new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),1.0));
        topLosersData.add(new QuoteDataBean("s:707","Company707",8.00,new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),1.0));
        topLosersData.add(new QuoteDataBean("s:708","Company708",7.00,new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),1.0));
        topLosersData.add(new QuoteDataBean("s:709","Company709",6.00,new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),1.0));
        topLosersData.add(new QuoteDataBean("s:710","Company710",5.00,new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),new BigDecimal(-1),1.0));
        
        
        MarketSummaryDataBean marketSummaryData = new MarketSummaryDataBean(TSIA, openTSIA, volume, topGainersData, topLosersData);
        
        System.out.println("marketSummaryData from fall back method" + marketSummaryData);
        return marketSummaryData;
        
    }
        
}