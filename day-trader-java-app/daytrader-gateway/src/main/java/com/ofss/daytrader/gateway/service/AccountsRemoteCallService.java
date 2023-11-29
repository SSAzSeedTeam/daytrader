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

//Jackson
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ofss.daytrader.core.beans.*;
import com.ofss.daytrader.entities.*;
import com.ofss.daytrader.gateway.utils.Log;

import java.math.BigDecimal;

// Daytrader
import com.ofss.daytrader.core.beans.RunStatsDataBean;
// Spring
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;

/**
 * The remote call service to the accounts microservice.
 * 
 * @author
 *
 */

@Service
public class AccountsRemoteCallService extends BaseRemoteCallService
{
	@Autowired
	RestTemplate restTemplate;
	protected static ObjectMapper mapper = null;
	
	static 
	{
		mapper = new ObjectMapper(); // create once, reuse
		mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false); // ignore properties that are not declared
	}

//
    @Value("${DAYTRADER_ACCOUNTS_SERVICE}")
    private String accountsServiceRoute;

	   /**
		*
		* @see AccountsServices#tradeBuildDB(int,int)
		*
		*/
		public boolean tradeBuildDB(int limit, int offset) throws Exception 
		{ 
	    	String url = accountsServiceRoute + "/admin/tradeBuildDB?limit="+limit+ "&offset=" + offset;
			Log.debug("AccountsRemoteCallService.tradeBuildDB() - " + url);
	    	String responseEntity = invokeEndpoint(url, "POST", "",restTemplate);
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
    	String url = accountsServiceRoute + "/admin/resetTrade?deleteAll=" + deleteAll;
		Log.debug("AccountsRemoteCallService.resetTrade() - " + url);
    	String responseEntity = invokeEndpoint(url, "GET", null,restTemplate); // Entity must be null for http method GET.
    	RunStatsDataBean runStatsData = mapper.readValue(responseEntity,RunStatsDataBean.class);
    	return runStatsData; 
	}

	public boolean recreateDBTables() throws Exception 
	{
    	String url = accountsServiceRoute + "/admin/recreateDBTables";
		Log.debug("AccountsRemoteCallService.recreateDBTables() - " + url);
    	String responseEntity = invokeEndpoint(url, "POST", "",restTemplate);
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
    	String url = accountsServiceRoute + "/accounts/" + userID;
		Log.debug("AccountsRemoteCallService.getAccountData() - " + url);
    	String responseEntity = invokeEndpoint(url, "GET", null,restTemplate); // Entity must be null for http method GET.
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
    	String url = accountsServiceRoute + "/accounts/" + userID + "/profiles";
		Log.debug("AccountsRemoteCallService.getAccountProfileData() - " + url);
    	String responseEntity = invokeEndpoint(url, "GET", null,restTemplate); // Entity must be null for http method GET.
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
		String url = accountsServiceRoute + "/accounts/" + profileData.getUserID() + "/profiles";
		Log.debug("AccountsRemoteCallService.updateAccountProfile() - " + url);
		String profileDataInString = mapper.writeValueAsString(profileData);
	   	String responseEntity = invokeEndpoint(url, "PUT", profileDataInString,restTemplate);
        profileData = mapper.readValue(responseEntity, AccountProfileDataBean.class);
        return profileData;
    }

   /**
	*
	* @see TradeServices#login(String,String)	
	*
	*/
    public AccountDataBean login(String userID, String password) throws Exception 
    {    System.out.println("inside login in accountsremotecallservice");
    	String url = accountsServiceRoute + "/login/" + userID;
		Log.debug("AccountsRemoteCallService.login() - " + url);
    	String responseEntity = invokeEndpoint(url, "PATCH", password,restTemplate);
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
    	String url = accountsServiceRoute + "/logout/" + userID;
		Log.debug("AccountsRemoteCallService.logout() - " + url);
    	String responseEntity = invokeEndpoint(url, "PATCH", "",restTemplate);
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
    	String url = accountsServiceRoute + "/accounts";
		Log.debug("AccountsRemoteCallService.register() - " + url);

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
    	String responseEntity = invokeEndpoint(url, "POST", accountDataInString,restTemplate);
    	accountData = mapper.readValue(responseEntity,AccountDataBean.class);
    	return accountData;
    }
}