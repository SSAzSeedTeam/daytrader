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

package com.ofss.daytrader.gateway.controller;

// Java
import java.util.ArrayList;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Collection;

// Javax
import javax.ws.rs.BadRequestException;
import javax.ws.rs.ClientErrorException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.NotAuthorizedException;

// Spring
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.netflix.hystrix.contrib.javanica.annotation.HystrixCommand;
import com.netflix.hystrix.contrib.javanica.annotation.HystrixProperty;
import com.ofss.daytrader.core.beans.MarketSummaryDataBean;
import com.ofss.daytrader.core.beans.RunStatsDataBean;
import com.ofss.daytrader.entities.AccountDataBean;
import com.ofss.daytrader.entities.AccountProfileDataBean;
import com.ofss.daytrader.entities.HoldingDataBean;
import com.ofss.daytrader.entities.OrderDataBean;
import com.ofss.daytrader.entities.QuoteDataBean;
import com.ofss.daytrader.gateway.cache.CachedObjectBean;
import com.ofss.daytrader.gateway.service.GatewayService;
import com.ofss.daytrader.gateway.utils.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.data.redis.core.HashOperations;
import org.springframework.data.redis.core.RedisTemplate;

/**
 * API endpoints are documented using Swagger UI.
 * 
 * @see https://{serviceHost}:{servicePort}/swagger-ui.html
 * 
 *      HTTP Methods. There is no official and enforced standard for designing
 *      HTTP & RESTful APIs. There are many ways for designing them. These notes
 *      cover the guidelines used for designing the aforementioned HTTP &
 *      RESTful API.
 * 
 *      - GET is used for reading objects; no cache headers is used if the
 *      object should not be cached
 * 
 *      - POST is used for creating objects or for operations that change the
 *      server side state. In the case where an object is created, the created
 *      object is returned; instead of it'd URI. This is in keeping with the
 *      existing services. A better practice is to return the URI to the created
 *      object, but we elected to keep the REST APIs consistent with the
 *      existing services. New APIs that return the URI can be added during
 *      Stage 04: Microservices if required.
 * 
 *      - PUT is used for full updates
 * 
 *      - PATCH is used for partial updates
 * 
 *      TODO: 1. Access Control The controller provides a centralized location
 *      for access control. Currently, the application does not check to see is
 *      a user is logged in before invoking a method. So access control checks
 *      should be added in Stage 04: Microservices
 */

@CrossOrigin(origins = "*")
@RestController
@EnableCaching
public class GatewayController {
	@Autowired
	private GatewayService gatewayService;
	// Redis chache
	private RedisTemplate<String, AccountProfileDataBean> redisTemplate;
	private HashOperations<String, String, Object> hashOperations;

	public GatewayController(RedisTemplate<String, AccountProfileDataBean> redisTemplate) {
		this.redisTemplate = redisTemplate;
		hashOperations = redisTemplate.opsForHash();
	}
//	private static GatewayService gatewayService = new GatewayService();

	//
	// Account Related Endpoints
	//

	/**
	 * REST call to register an user provided in the request body.
	 * 
	 */
	@RequestMapping(value = "/accounts", method = RequestMethod.POST)
	public ResponseEntity<AccountDataBean> register(@RequestBody AccountDataBean accountData) {
		Log.traceEnter("GatewayController.register()");
		// Get the registration data
		String userID = accountData.getProfileID();
		String password = accountData.getProfile().getPassword();
		String fullname = accountData.getProfile().getFullName();
		String address = accountData.getProfile().getAddress();
		String email = accountData.getProfile().getEmail();
		String creditCard = accountData.getProfile().getCreditCard();
		BigDecimal openBalance = accountData.getOpenBalance();

		try {
			// Register the user
			accountData = gatewayService.register(userID, password, fullname, address, email, creditCard, openBalance);
			Log.traceExit("GatewayController.register()");
			return new ResponseEntity<AccountDataBean>(accountData, getNoCacheHeaders(), HttpStatus.CREATED);
		} catch (Throwable t) {
			Log.error("GatewayController.register()", t);
			return new ResponseEntity<AccountDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to update the account profile for given the user id.
	 * 
	 */
	@RequestMapping(value = "/accounts/{userId}/profiles", method = RequestMethod.PUT)
	public ResponseEntity<AccountProfileDataBean> updateAccountProfile(@PathVariable("userId") String userId,
			@RequestBody AccountProfileDataBean profileData) {
		Log.traceEnter("GatewayController.updateAccountProfile()");

		try {
			profileData = gatewayService.updateAccountProfile(profileData);
			if (profileData != null) {
				Log.traceExit("GatewayController.updateAccountProfile()");
				return new ResponseEntity<AccountProfileDataBean>(profileData, getNoCacheHeaders(), HttpStatus.OK);
			} else {
				Log.traceExit("GatewayController.updateAccountProfile()");
				return new ResponseEntity<AccountProfileDataBean>(profileData, getNoCacheHeaders(),
						HttpStatus.NO_CONTENT);
			}
		} catch (Throwable t) {
			Log.error("GatewayController.updateAccountProfile()", t);
			return new ResponseEntity<AccountProfileDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	/**
	 * REST call to get the user's profile
	 * 
	 */
	// redis cache changes
	@Cacheable(cacheNames = "getAccountProfileData", key = "#userId")
	@HystrixCommand(fallbackMethod = "getAccountProfileDataFallback")
	@RequestMapping(value = "/accounts/{userId}/profiles", method = RequestMethod.GET)
	public ResponseEntity<AccountProfileDataBean> getAccountProfileData(@PathVariable("userId") String userId) {
		System.out.println("XXXXXXXXXXXXXXXX");
		Log.traceEnter("GatewayController.getAccountProfileData()");
		AccountProfileDataBean profileData = null;
		String profileDataKey = "AccountProfileData" + userId;
		try {
			profileData = gatewayService.getAccountProfileData(userId);
			if (profileData != null) {
				Log.traceExit("GatewayController.getAccountProfileData()");
				// redis cache changes
				hashOperations.put("ProfileData", profileDataKey, profileData);
				/*
				 * CachedObjectBean.getInstance().addObjectToCache(profileDataKey, profileData);
				 * System.out.println("CachedObjectBean.getInstance()" +
				 * CachedObjectBean.getInstance());
				 */
				return new ResponseEntity<AccountProfileDataBean>(profileData, getNoCacheHeaders(), HttpStatus.OK);
			} else {
				Log.traceExit("GatewayController.getAccountProfileData()");
				return new ResponseEntity<AccountProfileDataBean>(profileData, getNoCacheHeaders(),
						HttpStatus.NO_CONTENT);
			}
		} catch (Throwable t) {
			Log.error("GatewayController.getAccountProfileData()", t);
			return new ResponseEntity<AccountProfileDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to get the user's account
	 * 
	 */
	// redis cache changes
	@Cacheable(key = "#userId", value = "getAccountData")
	@HystrixCommand(fallbackMethod = "getAccountDataFallback")
	@RequestMapping(value = "/accounts/{userId}", method = RequestMethod.GET)
	public ResponseEntity<AccountDataBean> getAccountData(@PathVariable("userId") String userId) {
		Log.traceEnter("GatewayController.getAccountData()");
		AccountDataBean accountData = null;
		String DataKey = "AccountData" + userId;
		try {
			accountData = gatewayService.getAccountData(userId);
			System.out.println("accountData=" + accountData);
			if (accountData != null) {
				Log.traceExit("GatewayController.getAccountData()");
				// redis cache changes
				hashOperations.put("accountData", DataKey, accountData);
				/*
				 * CachedObjectBean.getInstance().addObjectToCache(DataKey, accountData);
				 * System.out.println("CachedObjectBean.getInstance()" +
				 * CachedObjectBean.getInstance());
				 */
				return new ResponseEntity<AccountDataBean>(accountData, getNoCacheHeaders(), HttpStatus.OK);
			} else {
				Log.traceExit("GatewayController.getAccountData()");
				return new ResponseEntity<AccountDataBean>(accountData, getNoCacheHeaders(), HttpStatus.NO_CONTENT);
			}
		} catch (Throwable t) {
			Log.error("GatewayController.getAccountData()", t);
			return new ResponseEntity<AccountDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	//
	// Authentication Related Endpoints
	//

	/**
	 * REST call to login the user from the authentication data passed in the body.
	 * 
	 */
	@RequestMapping(value = "/login/{userId}", method = RequestMethod.PATCH)
	public ResponseEntity<AccountDataBean> login(@PathVariable("userId") String userId, @RequestBody String password) {
		System.out.println("inside login in gateway controller");
		Log.traceEnter("GatewayController.login()");
		AccountDataBean accountData = null;
		try {
			accountData = gatewayService.login(userId, password);
			Log.traceExit("GatewayController.login()");
			return new ResponseEntity<AccountDataBean>(accountData, getNoCacheHeaders(), HttpStatus.OK);
		} catch (NotAuthorizedException nae) {
			Log.error("AccountsController.login()", nae);
			return new ResponseEntity<AccountDataBean>(HttpStatus.UNAUTHORIZED);
		} catch (Throwable t) {
			Log.error("AccountsController.login()", t);
			return new ResponseEntity<AccountDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to logout the user with the given userid.
	 * 
	 */
	@RequestMapping(value = "/logout/{userId}", method = RequestMethod.PATCH)
	public ResponseEntity<Boolean> logout(@PathVariable("userId") String userId) {
		Log.traceEnter("GatewayController.logout()");
		try {
			gatewayService.logout(userId);
			Log.traceExit("GatewayController.logout()");
			return new ResponseEntity<Boolean>(true, HttpStatus.OK);
		} catch (Throwable t) {
			Log.error("GatewayController.logout()", t);
			return new ResponseEntity<Boolean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//
	// Admin Related Endpoints
	//

	/**
	 * REST call to populate the database with the specified users and quotes
	 * 
	 */
	@RequestMapping(value = "/admin/tradeBuildDB", method = RequestMethod.POST)
	public ResponseEntity<Boolean> tradeBuildDB(@RequestParam(value = "limit") int limit,
			@RequestParam(value = "offset") int offset) {
		Log.traceEnter("GatewayController.tradeBuildDB()");

		Boolean success = false;

		try {
			// Register the user
			success = gatewayService.tradeBuildDB(limit, offset);
			Log.traceExit("GatewayController.tradeBuildDB()");
			return new ResponseEntity<Boolean>(success, getNoCacheHeaders(), HttpStatus.CREATED);
		} catch (Throwable t) {
			Log.error("GatewayController.tradeBuildDB()", t);
			return new ResponseEntity<Boolean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to populate the database with the specified users and quotes
	 * 
	 */
	@RequestMapping(value = "/admin/quotesBuildDB", method = RequestMethod.POST)
	public ResponseEntity<Boolean> quotesBuildDB(@RequestParam(value = "limit") int limit,
			@RequestParam(value = "offset") int offset) {
		Log.traceEnter("GatewayController.quotesBuildDB()");

		Boolean success = false;

		try {
			// Create the quotes
			success = gatewayService.quotesBuildDB(limit, offset);
			Log.traceExit("GatewayController.quotesBuildDB()");
			return new ResponseEntity<Boolean>(success, getNoCacheHeaders(), HttpStatus.CREATED);
		} catch (Throwable t) {
			Log.error("GatewayController.quotesBuildDB()", t);
			return new ResponseEntity<Boolean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to recreate dbtables
	 * 
	 */
	@RequestMapping(value = "/admin/recreateDBTables", method = RequestMethod.POST)
	public ResponseEntity<Boolean> recreateDBTables() {
		Log.traceEnter("GatewayController.recreateDBTables()");

		Boolean result = false;

		try {
			result = gatewayService.recreateDBTables();
			Log.traceExit("GatewayController.recreateDBTables()");
			return new ResponseEntity<Boolean>(result, getNoCacheHeaders(), HttpStatus.CREATED);
		} catch (Throwable t) {
			Log.error("GatewayContoller.recreateDBTables()", t);
			return new ResponseEntity<Boolean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to reset trades and return the usage statistics
	 * 
	 */
	@RequestMapping(value = "/admin/resetTrade", method = RequestMethod.GET)
	public ResponseEntity<RunStatsDataBean> resetTrade(@RequestParam(value = "deleteAll") Boolean deleteAll) {
		Log.traceEnter("GatewayController.resetData()");

		RunStatsDataBean runStatsData = null;

		try {
			runStatsData = gatewayService.resetTrade(deleteAll);
			if (runStatsData != null) {
				Log.traceExit("GatewayController.resetTrade()");
				return new ResponseEntity<RunStatsDataBean>(runStatsData, getNoCacheHeaders(), HttpStatus.OK);
			} else {
				Log.traceExit("GatewayController.resetTrade()");
				return new ResponseEntity<RunStatsDataBean>(runStatsData, getNoCacheHeaders(), HttpStatus.NO_CONTENT);
			}
		} catch (Throwable t) {
			Log.error("GatewayController.resetTrade()", t);
			return new ResponseEntity<RunStatsDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//
	// Portfolio related endpoints
	//

	/**
	 * REST call to get the portfolio's holdings.
	 * 
	 */
	// redis cache changes
	@Cacheable(cacheNames = "getHoldings", key = "#userId")
	@HystrixCommand(fallbackMethod = "getHoldingsFallback")
	@RequestMapping(value = "/portfolios/{userId}/holdings", method = RequestMethod.GET)
	public ResponseEntity<Collection<HoldingDataBean>> getHoldings(@PathVariable("userId") String userId) {
		Log.traceEnter("GatewayController.getHoldings()");

		Collection<HoldingDataBean> holdings = null;
		String userKey = "holdings_" + userId;
		try {
			System.out.println("gatewayService in getHoldings");
			holdings = gatewayService.getHoldings(userId);
			if (holdings != null) {
				Log.traceExit("GatewayController.getHoldings()");
				// redis cache changes
				hashOperations.put("getHolidins", userId, holdings);
				// CachedObjectBean.getInstance().addObjectToCache(userKey, holdings);
				return new ResponseEntity<Collection<HoldingDataBean>>(holdings, getNoCacheHeaders(), HttpStatus.OK);
			} else {
				Log.traceExit("GatewayController.getHoldings()");
				return new ResponseEntity<Collection<HoldingDataBean>>(holdings, getNoCacheHeaders(),
						HttpStatus.NO_CONTENT);
			}
		} catch (Throwable t) {
			Log.error("GatewayController.getHoldings()", t);
			return new ResponseEntity<Collection<HoldingDataBean>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to get the portfolio's orders.
	 * 
	 */
	// redis cache changes
	@Cacheable(cacheNames = "getOrders", key = "#userId")
	@HystrixCommand(fallbackMethod = "getOrdersFallback")
	@RequestMapping(value = "/portfolios/{userId}/orders", method = RequestMethod.GET)
	public ResponseEntity<Collection<OrderDataBean>> getOrders(@PathVariable("userId") String userId) {
		Log.traceEnter("GatewayController.getOrders()");

		Collection<OrderDataBean> orders = null;

		try {
			orders = gatewayService.getOrders(userId);
			if (orders != null) {
				Log.traceExit("GatewayController.getOrders()");
				// redis cache changes
				hashOperations.put("getOrders", userId, orders);
				System.out.println("orders data from get orders:" + orders);
				/*
				 * CachedObjectBean.getInstance().addObjectToCache(userId, orders);
				 * System.out.println("orders data from get orders:" + orders);
				 * System.out.println("CachedObjectBean.getInstance()" +
				 * CachedObjectBean.getInstance());
				 */
				return new ResponseEntity<Collection<OrderDataBean>>(orders, getNoCacheHeaders(), HttpStatus.OK);
			} else {
				Log.traceExit("GatewayController.getOrders()");
				return new ResponseEntity<Collection<OrderDataBean>>(orders, getNoCacheHeaders(),
						HttpStatus.NO_CONTENT);
			}
		} catch (Throwable t) {
			Log.error("GatewayController.getOrders()", t);
			return new ResponseEntity<Collection<OrderDataBean>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to get orders by their status.
	 * 
	 * At present, the only status that is recognizes is closed. It transitions the
	 * closed orders to the completed state and returns them. If it doesn't receive
	 * the closed status then it returns HttpStatus.BAD_REQUEST
	 * 
	 */
	// redis cache changes
	@Cacheable(cacheNames = "getOrdersByStatus", key = "#userId")
	@HystrixCommand(fallbackMethod = "getOrdersByStatusFallback")
	@RequestMapping(value = "/portfolios/{userId}/orders", method = RequestMethod.PATCH)
	public ResponseEntity<Collection<OrderDataBean>> getOrdersByStatus(@PathVariable("userId") String userId,
			@RequestParam(value = "status") String status) {
		Log.traceEnter("GatewayController.getOrdersByStatus()");

		Collection<OrderDataBean> orders = new ArrayList<OrderDataBean>();
		String OrdersByStatus = "OrdersByStatus_" + userId;
		try {
			if (status.equals("closed")) {
				orders = gatewayService.getClosedOrders(userId);
				if (orders != null) {
					Log.traceExit("GatewayController.getOrdersByStatus()");
					// redis cache changes
					hashOperations.put("getOrdersByStatus", userId, orders);
					/*
					 * CachedObjectBean.getInstance().addObjectToCache(OrdersByStatus, orders);
					 * System.out.println("orders from getOrdersByStatus" + orders);
					 */
					return new ResponseEntity<Collection<OrderDataBean>>(orders, getNoCacheHeaders(), HttpStatus.OK);
				} else {
					Log.traceExit("GatewayController.getOrdersByStatus()");
					return new ResponseEntity<Collection<OrderDataBean>>(orders, getNoCacheHeaders(),
							HttpStatus.NO_CONTENT);
				}
			} else {
				Throwable t = new Throwable("GatewayController.getOrdersByStatus: invalid status=" + status
						+ " valid statuses are 'closed'");
				Log.error("GatewayController.getOrdersByStatus()", t);
				return new ResponseEntity<Collection<OrderDataBean>>(orders, getNoCacheHeaders(),
						HttpStatus.BAD_REQUEST);
			}
		} catch (Throwable t) {
			Log.error("GatewayController.getOrdersByStatus()", t);
			System.out.println("in catch block of getOrdersByStatus" + orders);
			return new ResponseEntity<Collection<OrderDataBean>>(orders, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to buy/sell a stock and add it to the user's portfolio.
	 * 
	 * TODO: - Improved choreography and error handling. The group of actions to
	 * purchase a stock must be considered as a single entity even though it crosses
	 * multiple microservices.
	 */
	@RequestMapping(value = "/portfolios/{userId}/orders", method = RequestMethod.POST)
	public ResponseEntity<OrderDataBean> processOrder(@PathVariable("userId") String userId,
			@RequestBody OrderDataBean orderData, @RequestParam(value = "mode") Integer mode) {
		Log.traceEnter("GatewayController.processOrder()");
		try // buy()
		{
			if (orderData.getOrderType().equals("buy")) {
				// Buy the specified quantity of stock and add a holding to the portfolio
				orderData = gatewayService.buy(userId, orderData.getSymbol(), orderData.getQuantity(), mode);
				Log.traceExit("GatewayController.processOrder()");
				return new ResponseEntity<OrderDataBean>(orderData, getNoCacheHeaders(), HttpStatus.CREATED);
			}
		} catch (NotFoundException nfe) {
			Log.error("PortfoliosController.processOrder()", nfe);
			return new ResponseEntity<OrderDataBean>(HttpStatus.NOT_FOUND);
		} catch (ClientErrorException cee) {
			Log.error("PortfoliosController.processOrder()", cee);
			return new ResponseEntity<OrderDataBean>(HttpStatus.CONFLICT);
		} catch (Throwable t) {
			Log.error("GatewayController.processOrder()", t);
			return new ResponseEntity<OrderDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		try // sell()
		{
			if (orderData.getOrderType().equals("sell")) {
				// Sell the specified holding and remove it from the portfolio
				orderData = gatewayService.sell(userId, orderData.getHoldingID(), mode);
				Log.traceExit("GatewayController.processOrder()");
				return new ResponseEntity<OrderDataBean>(orderData, getNoCacheHeaders(), HttpStatus.CREATED);
			}
		} catch (NotFoundException nfe) {
			Log.error("PortfoliosController.processOrder()", nfe);
			return new ResponseEntity<OrderDataBean>(HttpStatus.NOT_FOUND);
		} catch (ClientErrorException cee) {
			Log.error("PortfoliosController.processOrder()", cee);
			return new ResponseEntity<OrderDataBean>(HttpStatus.CONFLICT);
		} catch (Throwable t) {
			Log.error("GatewayController.processOrder()", t);
			return new ResponseEntity<OrderDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

		// other
		Throwable t = new BadRequestException(
				"Invalid order type=" + orderData.getOrderType() + " valid types are 'buy' and 'sell'");
		Log.error("GatewayController.processOrder()", t);
		return new ResponseEntity<OrderDataBean>(orderData, getNoCacheHeaders(), HttpStatus.BAD_REQUEST);
	}

	/**
	 * REST call to get the quote given the symbol.
	 * 
	 */
	// redis cache changes
	@Cacheable(cacheNames = "getQuote", key = "#userId")
	@HystrixCommand(fallbackMethod = "getQuoteFallback")
	@RequestMapping(value = "/quotes/{symbol}", method = RequestMethod.GET)
	public ResponseEntity<QuoteDataBean> getQuote(@PathVariable("symbol") String symbol) {
		Log.traceEnter("GatewayController.getQuote()");

		QuoteDataBean quoteData = null;
		String quotekey = "getQuote_" + symbol;

		try {
			quoteData = gatewayService.getQuote(symbol);
			if (quoteData != null) {
				Log.traceExit("GatewayController.getQuote()");
				// redis cache changes
				hashOperations.put("getQuote", quotekey, quoteData);
				/*
				 * CachedObjectBean.getInstance().addObjectToCache(quotekey, quoteData);
				 * System.out.println("CachedObjectBean.getInstance()" +
				 * CachedObjectBean.getInstance());
				 */
				return new ResponseEntity<QuoteDataBean>(quoteData, getNoCacheHeaders(), HttpStatus.OK);
			} else {
				Log.traceExit("GatewayController.getQuote()");
				return new ResponseEntity<QuoteDataBean>(quoteData, getNoCacheHeaders(), HttpStatus.NO_CONTENT);
			}
		} catch (Throwable t) {
			Log.error("GatewayController.getQuote()", t);
			return new ResponseEntity<QuoteDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to get all quotes.
	 * 
	 */
	@RequestMapping(value = "/quotes", method = RequestMethod.GET)
	public ResponseEntity<Collection<QuoteDataBean>> getAllQuotes(@RequestParam(value = "limit") Integer limit,
			@RequestParam(value = "offset") Integer offset) {
		Log.traceEnter("GatewayController.getAllQuotes()");

		Collection<QuoteDataBean> quotes = null;

		try {
			//
			// - TODO: Currently get all quotes returns all resources. It is never a good
			// idea to
			// return all resources. So, refactor this method to take in the parameters
			// limit &
			// offset change the SQL query to use those values, e.g.
			//
			// SELECT * FROM quoteejb
			// ORDER BY symbol
			// LIMIT limit OFFSET offset;
			//
			// Note this offset pagination mechanism uses well known keywords from SQL
			// databases
			quotes = gatewayService.getAllQuotes(limit, offset);
			if (quotes != null) {
				Log.traceExit("GatewayController.getAllQuotes()");
				return new ResponseEntity<Collection<QuoteDataBean>>(quotes, getNoCacheHeaders(), HttpStatus.OK);
			} else {
				Log.traceExit("GatewayController.getAllQuotes()");
				return new ResponseEntity<Collection<QuoteDataBean>>(quotes, getNoCacheHeaders(),
						HttpStatus.NO_CONTENT);
			}
		} catch (Throwable t) {
			Log.error("GatewayController.getAllQuotes()", t);
			return new ResponseEntity<Collection<QuoteDataBean>>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to create a quote provided in the request body.
	 * 
	 */
	@RequestMapping(value = "/quotes", method = RequestMethod.POST)
	public ResponseEntity<QuoteDataBean> createQuote(@RequestBody QuoteDataBean quoteData) {
		Log.traceEnter("GatewayController.createQuote()");

		// Get the quote data
		String symbol = quoteData.getSymbol();
		String companyName = quoteData.getCompanyName();
		BigDecimal price = quoteData.getPrice();

		try {
			// Create the quote
			quoteData = gatewayService.createQuote(symbol, companyName, price);
			Log.traceExit("GatewayController.createQuote()");
			return new ResponseEntity<QuoteDataBean>(quoteData, getNoCacheHeaders(), HttpStatus.CREATED);
		} catch (Throwable t) {
			Log.error("GatewayController.createQuote()", t);
			return new ResponseEntity<QuoteDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	/**
	 * REST call to update the quote price and volume using data provided in the
	 * request body.
	 * 
	 */
	@RequestMapping(value = "/quotes/{symbol}", method = RequestMethod.PATCH)
	public ResponseEntity<QuoteDataBean> updateQuotePriceVolume(@PathVariable("symbol") String symbol,
			@RequestParam(value = "price") BigDecimal price, @RequestParam(value = "volume") double volume) {
		Log.trace("GatewayController.updateQuotePriceVolume()");

		QuoteDataBean quoteData = null;

		try {
			// Update the quote price volume
			quoteData = gatewayService.updateQuotePriceVolume(symbol, price, volume);
			if (quoteData != null) {
				Log.traceExit("GatewayController.updateQuotePriceVolume()");
				return new ResponseEntity<QuoteDataBean>(quoteData, getNoCacheHeaders(), HttpStatus.OK);
			} else {
				Log.traceExit("GatewayController.updateQuotePriceVolume()");
				return new ResponseEntity<QuoteDataBean>(quoteData, getNoCacheHeaders(), HttpStatus.NO_CONTENT);
			}
		} catch (Throwable t) {
			Log.error("GatewayController.updateQuotePriceVolume()", t);
			return new ResponseEntity<QuoteDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	//
	// Markets Related Endpoints
	//
	// redis cache changes
	@Cacheable(cacheNames = "getMarketSummary", key = "#exchange")
	@HystrixCommand(fallbackMethod = "getMarketSummaryFallback")
	@RequestMapping(value = "/markets/{exchange}", method = RequestMethod.GET)
	public ResponseEntity<MarketSummaryDataBean> getMarketSummary(@PathVariable("exchange") String exchange) {
		Log.traceEnter("GatewayController.getMarketSummary()");

		MarketSummaryDataBean marketSummary = new MarketSummaryDataBean();

		try {
			marketSummary = gatewayService.getMarketSummary();
			Log.traceExit("GatewayController.getMarketSummary()");
			// redis cache changes
			hashOperations.put("getMarketSummary", exchange, marketSummary);
			/*
			 * CachedObjectBean.getInstance().addObjectToCache(exchange, marketSummary);
			 * System.out.println("CachedObjectBean.getInstance()" +
			 * CachedObjectBean.getInstance());
			 */

			return new ResponseEntity<MarketSummaryDataBean>(marketSummary, getNoCacheHeaders(), HttpStatus.OK);
		} catch (NotFoundException nfe) {
			Log.error("QuotesController.getMarketSummary()", nfe);
			return new ResponseEntity<MarketSummaryDataBean>(HttpStatus.NOT_FOUND);
		} catch (Throwable t) {
			Log.error("GatewayController.getMarketSummary()", t);
			return new ResponseEntity<MarketSummaryDataBean>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public ResponseEntity<MarketSummaryDataBean> getMarketSummaryFallback(@PathVariable("exchange") String exchange)
			throws Exception {

		System.out.println("in fallback method of market summary");
		Collection<QuoteDataBean> topGainersData = new ArrayList<QuoteDataBean>(5);
		Collection<QuoteDataBean> topLosersData = new ArrayList<QuoteDataBean>(5);
		BigDecimal TSIA = new BigDecimal(12);
		BigDecimal openTSIA = new BigDecimal(120);
		double volume = 7.0;

		/*
		 * if (CachedObjectBean.getInstance().getCacheObject(exchange) != null) {
		 * System.out.println("data is displayed from cache"); MarketSummaryDataBean
		 * marketSummaryData = (MarketSummaryDataBean) CachedObjectBean.getInstance()
		 * .getCacheObject(exchange); return new
		 * ResponseEntity<MarketSummaryDataBean>(marketSummaryData, getNoCacheHeaders(),
		 * HttpStatus.OK);
		 */
		// redis cache
		if (hashOperations.get("getMarketSummary", exchange) != null) {
			MarketSummaryDataBean marketSummaryData = (MarketSummaryDataBean) hashOperations.get("getMarketSummary",
					exchange);
			return new ResponseEntity<MarketSummaryDataBean>(marketSummaryData, getNoCacheHeaders(), HttpStatus.OK);

		} else {
			topGainersData.add(new QuoteDataBean("s:701", "Company701", 10.00, new BigDecimal(190), new BigDecimal(190),
					new BigDecimal(-1), new BigDecimal(-1), 1.0));
			topGainersData.add(new QuoteDataBean("s:702", "Company702", 20.00, new BigDecimal(191), new BigDecimal(191),
					new BigDecimal(-1), new BigDecimal(-1), 1.0));
			topGainersData.add(new QuoteDataBean("s:703", "Company703", 30.00, new BigDecimal(192), new BigDecimal(192),
					new BigDecimal(-1), new BigDecimal(-1), 1.0));
			topGainersData.add(new QuoteDataBean("s:704", "Company704", 40.00, new BigDecimal(193), new BigDecimal(193),
					new BigDecimal(-1), new BigDecimal(-1), 1.0));
			topGainersData.add(new QuoteDataBean("s:705", "Company705", 50.00, new BigDecimal(194),
					new BigDecimal(-194), new BigDecimal(-1), new BigDecimal(-1), 1.0));

			topLosersData.add(new QuoteDataBean("s:706", "Company706", 9.00, new BigDecimal(195), new BigDecimal(195),
					new BigDecimal(-1), new BigDecimal(-1), 1.0));
			topLosersData.add(new QuoteDataBean("s:707", "Company707", 8.00, new BigDecimal(196), new BigDecimal(196),
					new BigDecimal(-1), new BigDecimal(-1), 1.0));
			topLosersData.add(new QuoteDataBean("s:708", "Company708", 7.00, new BigDecimal(197), new BigDecimal(197),
					new BigDecimal(-1), new BigDecimal(-1), 1.0));
			topLosersData.add(new QuoteDataBean("s:709", "Company709", 6.00, new BigDecimal(198), new BigDecimal(198),
					new BigDecimal(-1), new BigDecimal(-1), 1.0));
			topLosersData.add(new QuoteDataBean("s:710", "Company710", 5.00, new BigDecimal(199), new BigDecimal(199),
					new BigDecimal(-1), new BigDecimal(-1), 1.0));

			MarketSummaryDataBean marketSummaryData = new MarketSummaryDataBean(TSIA, openTSIA, volume, topGainersData,
					topLosersData);

			System.out.println("marketSummaryData from fall back method" + marketSummaryData);
			// return marketSummaryData;
			return new ResponseEntity<MarketSummaryDataBean>(marketSummaryData, getNoCacheHeaders(), HttpStatus.OK);
		}
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<Collection<HoldingDataBean>> getHoldingsFallback(@PathVariable("userId") String userId) {
		Log.traceEnter("getHoldingsFallback of GatewayController");

		Collection<HoldingDataBean> holdings = new ArrayList<HoldingDataBean>();
		String userKey = "holdings_" + userId;

		/*
		 * if (CachedObjectBean.getInstance().getCacheObject(userKey) != null) {
		 * 
		 * holdings = (Collection<HoldingDataBean>)
		 * CachedObjectBean.getInstance().getCacheObject(userKey); //
		 * holdings.add(holdingDataBean); return new
		 * ResponseEntity<Collection<HoldingDataBean>>(holdings, getNoCacheHeaders(),
		 * HttpStatus.OK);
		 */
		if (hashOperations.get("getHolidins", userKey) != null) {

			HoldingDataBean holdingDataBean = (HoldingDataBean) hashOperations.get("getHolidins", userKey);
			return new ResponseEntity<Collection<HoldingDataBean>>(holdings, getNoCacheHeaders(), HttpStatus.OK);

		} else {

			holdings.add(new HoldingDataBean(701, 107d, new BigDecimal(10), new Timestamp(System.currentTimeMillis()),
					"s:701"));
			holdings.add(new HoldingDataBean(702, 17d, new BigDecimal(10), new Timestamp(System.currentTimeMillis()),
					"s:702"));
			holdings.add(new HoldingDataBean(703, 177d, new BigDecimal(10), new Timestamp(System.currentTimeMillis()),
					"s:703"));
			return new ResponseEntity<Collection<HoldingDataBean>>(holdings, getNoCacheHeaders(), HttpStatus.OK);
		}
	}

	public ResponseEntity<QuoteDataBean> getQuoteFallback(@PathVariable("symbol") String symbol) {
		String quotekey = "getQuote_" + symbol;

		/*
		 * if (CachedObjectBean.getInstance().getCacheObject(quotekey) != null) {
		 * System.out.println("data is displayed from cache"); QuoteDataBean
		 * quoteDataBean = (QuoteDataBean)
		 * CachedObjectBean.getInstance().getCacheObject(quotekey); return new
		 * ResponseEntity<QuoteDataBean>(quoteDataBean, getNoCacheHeaders(),
		 * HttpStatus.OK);
		 */
		// redis cache changes
		if (hashOperations.get("getQuote", quotekey) != null) {

			QuoteDataBean quoteDataBean = (QuoteDataBean) hashOperations.get("getQuote", quotekey);
			return new ResponseEntity<QuoteDataBean>(quoteDataBean, getNoCacheHeaders(), HttpStatus.OK);
		} else {
			QuoteDataBean quoteData = new QuoteDataBean(symbol, "Company701", 9.00, new BigDecimal(195),
					new BigDecimal(195), new BigDecimal(1), new BigDecimal(10), 1.0);

			return new ResponseEntity<QuoteDataBean>(quoteData, getNoCacheHeaders(), HttpStatus.OK);
		}
	}
	public ResponseEntity<Collection<OrderDataBean>> getOrdersFallback(@PathVariable("userId") String userId) {
		Collection<OrderDataBean> orders = null;
		/*
		 * if (CachedObjectBean.getInstance().getCacheObject(userId) != null) {
		 * System.out.println("data is displayed from cache"); QuoteDataBean
		 * quoteDataBean = (QuoteDataBean)
		 * CachedObjectBean.getInstance().getCacheObject(userId); return new
		 * ResponseEntity<Collection<OrderDataBean>>(orders, getNoCacheHeaders(),
		 * HttpStatus.OK);
		 */
		//Redis cache changers
		if (hashOperations.get("getOrders", userId) != null) {
			QuoteDataBean quoteDataBean = (QuoteDataBean) hashOperations.get("getOrders", userId);
			return new ResponseEntity<Collection<OrderDataBean>>(orders, getNoCacheHeaders(), HttpStatus.OK);

		} else {

			return new ResponseEntity<Collection<OrderDataBean>>(orders, getNoCacheHeaders(), HttpStatus.OK);
		}

	}

	public ResponseEntity<AccountDataBean> getAccountDataFallback(@PathVariable("userId") String userId) {
		String DataKey = "AccountData" + userId;
		AccountDataBean accountData = new AccountDataBean();
		/*
		 * if (CachedObjectBean.getInstance().getCacheObject(DataKey) != null) {
		 * System.out.println("data is displayed from cache"); accountData =
		 * (AccountDataBean) CachedObjectBean.getInstance().getCacheObject(DataKey);
		 */
		// redis cache changes
					if (hashOperations.get("accountData", DataKey) != null) {
						System.out.println("data is displayed from cache");
						accountData = (AccountDataBean) hashOperations.get("accountData", DataKey);
		} else {
			accountData.setAccountID(1);
			accountData.setProfileID(userId);
			accountData.setBalance(new BigDecimal(-1));
			accountData.setOpenBalance(new BigDecimal(-1));

		}
		return new ResponseEntity<AccountDataBean>(accountData, getNoCacheHeaders(), HttpStatus.OK);
	}

	public ResponseEntity<AccountProfileDataBean> getAccountProfileDataFallback(@PathVariable("userId") String userId) {
		String profileDataKey = "AccountProfileData" + userId;

		AccountProfileDataBean accountProfileData = new AccountProfileDataBean();
		/*
		 * if (CachedObjectBean.getInstance().getCacheObject(profileDataKey) != null) {
		 * System.out.println("data is displayed from cache"); accountProfileData =
		 * (AccountProfileDataBean)
		 * CachedObjectBean.getInstance().getCacheObject(profileDataKey);
		 */
			if (hashOperations.get("ProfileData", profileDataKey) != null) {
				System.out.println("data is displayed from cache");
				accountProfileData = (AccountProfileDataBean) hashOperations.get("ProfileData", profileDataKey);
		} else {
			accountProfileData.setUserID(userId);
			accountProfileData.setPassword("777");
			accountProfileData.setAddress("");
			accountProfileData.setCreditCard("1234-5678-0123");
			accountProfileData.setEmail("email@gmail.com");
			accountProfileData.setExchangeRate(1.0d);
			accountProfileData.setFullName("FullName");

		}
		return new ResponseEntity<AccountProfileDataBean>(accountProfileData, getNoCacheHeaders(), HttpStatus.OK);
	}

	@SuppressWarnings("unchecked")
	public ResponseEntity<Collection<OrderDataBean>> getOrdersByStatusFallback(@PathVariable("userId") String userId,
			@RequestParam(value = "status") String status) {
		String OrdersByStatus = "OrdersByStatus_" + userId;
		Collection<OrderDataBean> orders = new ArrayList<OrderDataBean>();
		System.out.println("data is displayed from cache in getOrdersByStatusFallback method");
		/*
		 * if (CachedObjectBean.getInstance().getCacheObject(OrdersByStatus) != null) {
		 * System.out.println("data is displayed from cache"); orders =
		 * (Collection<OrderDataBean>)
		 * (CachedObjectBean.getInstance().getCacheObject(OrdersByStatus));
		 */
			if (hashOperations.get("getOrdersByStatus", userId)!=null) {
				System.out.println("data is displayed from cache");
				orders=(Collection<OrderDataBean>) hashOperations.get("OrdersByStatus", userId);

			// return new ResponseEntity<Collection<OrderDataBean>>(orderDataBean,
			// getNoCacheHeaders(), HttpStatus.OK);
		}
		return new ResponseEntity<Collection<OrderDataBean>>(orders, getNoCacheHeaders(), HttpStatus.OK);

	}
	//
	// Private helper functions
	//

	private HttpHeaders getNoCacheHeaders() {
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.set("Cache-Control", "no-cache");
		return responseHeaders;
	}

}
