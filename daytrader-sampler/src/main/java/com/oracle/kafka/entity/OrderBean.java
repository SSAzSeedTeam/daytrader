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
package com.oracle.kafka.entity;

import java.io.Serializable;

@SuppressWarnings("serial")
public class OrderBean implements Serializable {
	private Integer mode;
	private String uid;

	private String orderType; /* orderType (buy, sell, etc.) */
	private String orderStatus; /* orderStatus (open, processing, completed, closed, cancelled) */
	private double quantity;
	private String symbol;
	transient private Integer holdingID;

	public OrderBean() {
		super();
		this.mode = 0;
		this.uid = "";
		this.orderType = "";
		this.orderStatus = "";
		this.quantity = 0.0;
		this.symbol = "";
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public String getSymbol() {
		return symbol;
	}

	public void setSymbol(String symbol) {
		this.symbol = symbol;
	}

	public Integer getHoldingID() {
		return holdingID;
	}

	public void setHoldingID(Integer holdingID) {
		this.holdingID = holdingID;
	}

	public Integer getMode() {
		return mode;
	}

	public void setMode(Integer mode) {
		this.mode = mode;
	}

	public String getUid() {
		return uid;
	}

	public void setUid(String uid) {
		this.uid = uid;
	}

	@Override
	public String toString() {
		return "OrderBean [orderType=" + orderType + ", orderStatus=" + orderStatus + ", quantity=" + quantity
				+ ", symbol=" + symbol + ", holdingID=" + holdingID + "]";
	}

}
