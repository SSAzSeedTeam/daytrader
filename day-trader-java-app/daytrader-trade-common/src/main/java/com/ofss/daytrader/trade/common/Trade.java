package com.ofss.daytrader.trade.common;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class Trade {

	private Integer mode;
	private String uid;

	private String orderType; /* orderType (buy, sell, etc.) */
	private String orderStatus; /* orderStatus (open, processing, completed, closed, cancelled) */
	private double quantity;
	private String symbol;
	transient private Integer holdingID;

	public Trade() {
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
