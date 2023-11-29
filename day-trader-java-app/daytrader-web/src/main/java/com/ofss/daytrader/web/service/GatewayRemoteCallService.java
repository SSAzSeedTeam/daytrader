
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

package com.ofss.daytrader.web.service;

import java.io.IOException;
// java
import java.math.BigDecimal;
import java.rmi.RemoteException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Collection;
import java.util.List;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationContext;

import javax.servlet.http.HttpSession;

import org.apache.commons.io.IOUtils;
import org.apache.http.HttpResponse;
import org.apache.http.NameValuePair;
import org.apache.http.client.HttpClient;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
// spring
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.ofss.daytrader.core.api.*;
import com.ofss.daytrader.core.beans.*;
import com.ofss.daytrader.entities.*;
import com.ofss.daytrader.utils.TradeConfig;
import com.ofss.daytrader.web.utils.Log;

/**
 * The remote call service to the trader gateway service.
 * 
 * @author
 * 
 * Implement a remote call service if you want to host the gateway in its own microservice.
 * For now, the gateway is architected to be pulled out into its own microservice, but it
 * did not seem to warrant its own separate process. For that reason, the web tier calls a
 * local gateway. It can easily be hosted in its own microservice later if warranted.
 *
 */

@Service
public class GatewayRemoteCallService extends BaseRemoteCallService
{
    
	protected static ObjectMapper mapper = null;
	
	static 
	{
		mapper = new ObjectMapper(); // create once, reuse
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); // ignore properties that are not declared
	}

//
//  - Naming convention based service discovery 
	@Value("${DAYTRADER_GATEWAY_SERVICE}")
	private String gatewayServiceRoute;
	@Value("${DAYTRADER_AUTH_SERVICE}")
	private String daytraderAuthService;
	@Value("${DAYTRADER_OAUTH_ENABLE}")
	private boolean oauthEnabled;
	   
	   /**
		*
		* @see TradeServices#resetTrade(boolean)
		*
		*/
		public RunStatsDataBean resetTrade(boolean deleteAll) throws Exception
		{
	    	String url = gatewayServiceRoute + "/admin/resetTrade?deleteAll=" + deleteAll;
			Log.debug("GatewayRemoteCallService.resetTrade() - " + url);
	    	String responseEntity = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
	    	RunStatsDataBean runStatsData = mapper.readValue(responseEntity,RunStatsDataBean.class);
	    	return runStatsData; 
		}
		
		/**
		 * 
		 * @see TradeBuildDB#TradeBuildDB((java.io.PrintWriter, String)
		 *
		 */
		public boolean tradeBuildDB(int limit, int offset) throws Exception 
		{
	    	String url = gatewayServiceRoute + "/admin/tradeBuildDB?limit=" + limit + "&offset=" + offset;
			Log.debug("GatewayRemoteCallService.tradeBuildDB() - " + url);
	    	String responseEntity = invokeEndpoint(url, "POST", "");
	    	Boolean success = mapper.readValue(responseEntity,Boolean.class);
	    	return success;
		}
		
		
		/**
		 * 
		 * @see TradeBuildDB#TradeBuildDB((java.io.PrintWriter, String)
		 *
		 */
		public boolean quotesBuildDB(int limit, int offset) throws Exception 
		{
	    	String url = gatewayServiceRoute + "/admin/quotesBuildDB?limit=" + limit + "&offset=" + offset;
			Log.debug("GatewayRemoteCallService.quotesBuildDB() - " + url);
	    	String responseEntity = invokeEndpoint(url, "POST", "");
	    	Boolean success = mapper.readValue(responseEntity,Boolean.class);
	    	return success;
		}

	/**
	 * 
	 * @see TradeDBServices#recreateDBTables(Object[],PrintWriter)
	 *
	 */
		public boolean recreateDBTables() throws Exception 
		{
	    	String url = gatewayServiceRoute + "/admin/recreateDBTables";
			Log.debug("GatewayRemoteCallService.recreateDBTables() - " + url);
	    	String responseEntity = invokeEndpoint(url, "POST", "");
	    	Boolean success = mapper.readValue(responseEntity,Boolean.class);
	    	return success;
		}
		
	   /**
		*
		* @see TradeServices#getAccountData(String)
		*
		*/
	    public AccountDataBean getAccountData(String userID) throws Exception 
	    {
	    	String url = gatewayServiceRoute + "/accounts/" + userID;
			Log.debug("GatewayRemoteCallService.getAccountData() - " + url);
	    	String responseEntity = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
	    	AccountDataBean accountData = mapper.readValue(responseEntity,AccountDataBean.class);
	    	return accountData;
	    }

	   /**
		*
		* @see TradeServices#getAccountProfileData(String)
		*
		*/
		public AccountProfileDataBean getAccountProfileData(String userID) throws Exception 
		{
	    	String url = gatewayServiceRoute + "/accounts/" + userID + "/profiles";
			Log.debug("GatewayRemoteCallService.getAccountProfileData() - " + url);
	    	String responseEntity = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
	    	AccountProfileDataBean profileData = mapper.readValue(responseEntity,AccountProfileDataBean.class);
	    	return profileData;     	
		}

	   /**
		*
		* @see TradeServices#updateAccountProfile(AccountProfileDataBean)
		*
		*/
		public AccountProfileDataBean updateAccountProfile(AccountProfileDataBean profileData) throws Exception
	    {
			String url = gatewayServiceRoute + "/accounts/" + profileData.getUserID() + "/profiles";
			Log.debug("GatewayRemoteCallService#updateAccountProfile() - " + url);
			String profileDataInString = mapper.writeValueAsString(profileData);
		   	String responseEntity = invokeEndpoint(url, "PUT", profileDataInString);
	        profileData = mapper.readValue(responseEntity, AccountProfileDataBean.class);
	        return profileData;
	    }

		   /**
		*
		* @see TradeServices#login(String,String)	
		*
		*/
	    public AccountDataBean login(String userID, String password) throws Exception 
	    {    
			System.out.println("inside we ui gate way remote call login : " + daytraderAuthService);
			
			if (oauthEnabled==true) {
			String authUrl = daytraderAuthService + "/authenticate";

			 HttpPost post = new HttpPost(authUrl);
     		 // add request parameter, form parameters
			 HttpClient httpclient = HttpClients.createDefault();
			 List<NameValuePair> params = new ArrayList<NameValuePair>();
			 params.add(new BasicNameValuePair("username", userID));
			 params.add(new BasicNameValuePair("password", password));
			 post.setEntity(new UrlEncodedFormEntity(params));
			
			HttpResponse response = null;
			String result = null;
			try {
				response = httpclient.execute(post);
				result = IOUtils.toString(response.getEntity().getContent(), "UTF-8");
			} catch (IOException e) {
				e.printStackTrace();
			}
			System.out.println("result:---- " + result);
			Gson gson = new Gson();

			JwtResponse jwtResponse = gson.fromJson(result, JwtResponse.class);

			String accessToken = jwtResponse.getToken();
			System.out.println("accessToken--: " + accessToken);
			
	    	

//			RequestAttributes requestAttributes = RequestContextHolder.currentRequestAttributes();
//	    	//RequestAttributes requestAttributes = RequestContextHolder.getRequestAttributes();
//	        ServletRequestAttributes attributes = (ServletRequestAttributes) requestAttributes;
//	        HttpServletRequest httprequest = attributes.getRequest();
//	        HttpSession httpSession = httprequest.getSession(true);
//	        System.out.println("session - " + httpSession);
//	        httpSession.setAttribute("token",accessToken);
//	        System.out.println("accesstoken value in login() - " + accessToken);
//	        

			try {
				SessionHolder sh = SpringContext.getBean(SessionHolder.class);
				HttpSession httpSession = sh.getHttpSession();
		        System.out.println("In GatewayRemoteCallService.login() : session="+httpSession);
		        sh.setJwtToken(accessToken);
		        System.out.println("In GatewayRemoteCallService.login() : accessToken="+accessToken);
			} catch(Exception e) {
				e.printStackTrace();
			}
			
			}
			String url = gatewayServiceRoute + "/login/" + userID;
			Log.debug("GatewayRemoteCallService.login() - " + url);
	    	String responseEntity = invokeEndpoint(url, "PATCH", password);
	    	AccountDataBean accountData = mapper.readValue(responseEntity,AccountDataBean.class);	    
	    	return accountData;
	    }

	   /**
		*
		* @see TradeServices#logout(String)
		*
		*/
	    public void logout(String userID) throws Exception 
	    {
	    	String url = gatewayServiceRoute + "/logout/" + userID;
			Log.debug("GatewayRemoteCallService.logout() - " + url);
	    	String responseEntity = invokeEndpoint(url, "PATCH", "");
	    	mapper.readValue(responseEntity,Boolean.class);
	    }
		
	   /**
		*
		* @see TradeServices#register(String,String,String,String,String,String,BigDecimal)
		*
		*/
	    public AccountDataBean register(String userID, String password, String fullname, 
	    		String address, String email, String creditCard, BigDecimal openBalance) throws Exception 
	    {

	    	
	    	//first register in auth server
	    	if (oauthEnabled==true) {
			 String userurl = daytraderAuthService + "/registeruser";
			 
			 System.out.println("Calling auth servers url while register - " + userurl);
			 HttpClient httpclient = HttpClients.createDefault();
			 HttpPost post = new HttpPost(userurl);
			 List<NameValuePair> params = new ArrayList<NameValuePair>();
			 params.add(new BasicNameValuePair("username", userID));
			 params.add(new BasicNameValuePair("password", password));
			 post.setEntity(new UrlEncodedFormEntity(params));
			 
			 
			 httpclient.execute(post);
			 System.out.println("Completed - Calling auth servers url while register");
			 // Bala - End
	    	}
	    	
	    	String url = gatewayServiceRoute + "/accounts";
			Log.debug("GatewayRemoteCallService.register() - " + url);

	    	// Consruct the account data from that given params
	    	AccountDataBean accountData = new AccountDataBean();
			accountData.setProfileID(userID);
			accountData.setOpenBalance(openBalance);
			accountData.setProfile(new AccountProfileDataBean());
			accountData.getProfile().setUserID(userID);
			accountData.getProfile().setPassword(password);
			accountData.getProfile().setFullName(fullname);
			accountData.getProfile().setAddress(address);
			accountData.getProfile().setEmail(email);
			accountData.getProfile().setCreditCard(creditCard);
			
	    	String accountDataInString = mapper.writeValueAsString(accountData);
	    	String responseEntity = invokeEndpoint(url, "POST", accountDataInString);
	    	accountData = mapper.readValue(responseEntity,AccountDataBean.class);
	    	
	    	return accountData;
	    }
	
		/**
		 * 
		 * @see TradeServices#buy(String, String, double, int)
		 *
		 * 	- Endpoint: POST /portfolios/{userId}/orders?mode
		 */
		public OrderDataBean buy(String userID, String symbol, double quantity, int orderProcessingMode) throws Exception 
		{
	    	// Construct the order data from the given params
			OrderDataBean orderData = new OrderDataBean();
			orderData.setSymbol(symbol);
			orderData.setQuantity(quantity);
			orderData.setOrderType("buy");
			orderData.setOrderStatus("open");
	    	String orderDataInString = mapper.writeValueAsString(orderData);
	    	String url = gatewayServiceRoute + "/portfolios/" + userID + "/orders?mode=" + orderProcessingMode;
			Log.debug("GatewayRemoteCallService.buy() - " + url);
	    	String responseEntity = invokeEndpoint(url, "POST", orderDataInString);
	    	orderData = mapper.readValue(responseEntity,OrderDataBean.class);
	    	return orderData;
	    }

		/**
		 * 
		 * @see TradeServices#sell(String, Integer)
		 *
		 * 	- Endpoint: DELETE /portfolios/{userId}/holdings/{holdingId}?mode
		 */
		public OrderDataBean sell(String userID, Integer holdingID, int orderProcessingMode) throws Exception 
		{
	    	// Construct the order data from the given params
			OrderDataBean orderData = new OrderDataBean();
			orderData.setHoldingID(holdingID);
			orderData.setOrderType("sell");
			orderData.setOrderStatus("open");
	    	String orderDataInString = mapper.writeValueAsString(orderData);
	    	String url = gatewayServiceRoute + "/portfolios/" + userID + "/orders?mode=" + orderProcessingMode;
			Log.debug("GatewayRemoteCallService.sell() - " + url);
	    	String responseEntity = invokeEndpoint(url, "POST", orderDataInString);
	    	orderData = mapper.readValue(responseEntity,OrderDataBean.class);
	    	return orderData;
	    }
	      
		/**
		 * 
		 * @see TradeServices#getOrders(String)
		 *
		 */
		public Collection<OrderDataBean> getOrders(String userID) throws Exception 
	    {
			// Returns the orders for the given user
	    	String url = gatewayServiceRoute + "/portfolios/" + userID + "/orders";
			Log.debug("GatewayRemoteCallService.getOrders() - " + url);
		   	String responseString = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
		   	Collection<OrderDataBean> orderCollection = mapper.readValue(responseString,new TypeReference<ArrayList<OrderDataBean>>(){ });
	        return orderCollection;
	    }

		/**
		 * 
		 * @see TradeServices#getClosedOrders(String)
		 *
		 * REST call to change resources to the given state and return those resources.
		 * 
		 * Note: the original name getClosedOrders() is a bit misleading, it actually changes 
		 * the user's closed orders to complete and then returns them to the caller. Thus, it 
		 * is defined as an Http PATCH method; not an Http GET
		 *  
		 * 	- Endpoint:  PATCH /portfolios/{userId}/orders?event
		 */
		public Collection<OrderDataBean> getClosedOrders(String userID) throws Exception
	    {
			// REST call transitions closed orders to completed state and returns them.
	    	String url = gatewayServiceRoute + "/portfolios/" + userID + "/orders?status=closed";
			Log.debug("GatewayRemoteCallService.getClosedOrders() - " + url);
		   	String responseString = invokeEndpoint(url, "PATCH", ""); // must pass a request body to the patch method 
		   	Collection<OrderDataBean> orderCollection = mapper.readValue(responseString,new TypeReference<ArrayList<OrderDataBean>>(){ });
	        return orderCollection;
	    }

		/**
		 * 
		 * @see TradeServices#getHoldings(String)
		 *
		 */
		public Collection<HoldingDataBean> getHoldings(String userID) throws Exception 
		{		
			// Returns the holdings for the give user
	    	String url = gatewayServiceRoute + "/portfolios/" + userID + "/holdings";
			Log.debug("GatewayRemoteCallService.getHoldings() - " + url);
		   	String responseString = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
		   	Collection<HoldingDataBean> holdings = mapper.readValue(responseString,new TypeReference<ArrayList<HoldingDataBean>>(){ });
			return holdings;
	    }    
        
		/**
		 * 
		 * @see TradeServices#getMarketSummary()
		 *
		 */
	    public MarketSummaryDataBean getMarketSummary() throws Exception 
	    {
	    	// Added exchange on 7-10-2018 (03); it is ignored for now.
	    	// Later you can select the exchange, e.g. NYSE, NASDAQ, AMEX to get
	    	// the top gainers and losers in that exchange
	    	String exchange = "TSIA"; /* Trade Stock Index Average */
	    	String url = gatewayServiceRoute + "/markets/" + exchange;   
			Log.debug("GatewayRemoteCallService.getMarketSummary() - " + url);
		   	String responseString = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
	        MarketSummaryDataBean marketSummaryData = mapper.readValue(responseString,MarketSummaryDataBean.class);
	        return marketSummaryData;
	    }
	    
		/**
		 * 
	  	 * @see TradeServices#createQuote(String, String, BigDecimal)
		 *
		 */
	    public QuoteDataBean createQuote(String symbol, String companyName, BigDecimal price) throws Exception 
	    {
	    	String url = gatewayServiceRoute + "/quotes";
			Log.debug("GatewayRemoteCallService.createQuote() - " + url);

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
	    	String url = gatewayServiceRoute + "/quotes/" + symbol;  
			Log.debug("GatewayRemoteCallService.getQuote() - " + url);
		   	String responseString = invokeEndpoint(url, "GET", null); // Entity must be null for http method GET.
	        QuoteDataBean quoteData = mapper.readValue(responseString,QuoteDataBean.class);
	        return quoteData;
	    }

		/**
		 * 
		 * @see TradeServices#getAllQuotes(String)
		 *
		 */
	    public Collection<QuoteDataBean> getAllQuotes() throws Exception 
	    {
	    	//
	    	// 	- TODO: Its never a good idea to return all resources. Thus we defined an API to
	    	//    to support the retrieval of quotes in increments. The web app would need to be
	    	//    changed to use this API instread of getAllQuotes. So for now, we pull them all.
	    	
        	int limit = TradeConfig.getMAX_QUOTES();
        	int offset = 0;
	    	
	    	String url = gatewayServiceRoute + "/quotes?limit=" + limit + "&offset=" + offset;
			Log.debug("GatewayRemoteCallService.getAllQuotes() - " + url);
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
	    	String url = gatewayServiceRoute + "/quotes/" + symbol + "?price=" + price + "&volume=" + volume;
			Log.debug("GatewayRemoteCallService.updateQuotePriceValume() - " + url);
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
	    
}