package com.ofss.daytrader.portfolios.repository;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ofss.daytrader.entities.OrderDataBean;

@Repository
public interface OrderRepository extends JpaRepository<OrderDataBean, Integer>{
	
	@Query(value="select * from orderejb o where o.accountID in(?1)", nativeQuery = true)
	public Collection<OrderDataBean> findOrderByAccountID(List<Integer> accountid);
	
	@Query(value="select * from orderejb o where o.orderID =?1", nativeQuery = true)
	public OrderDataBean fetchOrdersByOrderID(Integer orderid);
	
	@Query(value="select * from orderejb  where order_status = ?2 AND account_accountid in(?1)", nativeQuery = true)
	public Collection<OrderDataBean> fetchOrderByStatusAndAccountid(List<Integer> accountid, String status);
	
	@Modifying
	@Query(value="update orderejb set holding_holdingid = ?1 where orderID = ?2", nativeQuery = true)
	public void updateOrderDataHoldingID(int holdingID, int orderID);
	
	@Modifying
	@Query(value="update orderejb set holding_holdingid = null where holding_holdingid = ?1", nativeQuery = true)
	public void updateOrderDataHoldingIDNull(int holdingID);
	
	@Modifying
	@Query(value="update orderejb set order_status = ?1, completion_date = ?2 where orderid = ?3", nativeQuery = true)
	public void updateOrderStatus(String orderStatus, Timestamp completionDate, int orderID);
	
	@Modifying
	@Query(value="delete from orderejb where account_accountid in (select accountid from accountejb a where a.profile_userid like 'ru:%')", nativeQuery = true)
	public void deleteOrderByAccountid();
	
	@Modifying
	@Query(value="delete from orderejb where holding_holdingid is null", nativeQuery = true)
	public int deleteOrderByHoldingidNull();
	
	@Modifying
	public int deleteByOrderStatus(String status);
	
	@Query(value="select count(orderid) openOrderCount from orderejb o where (o.account_accountid in(select accountid from accountejb a where a.profile_userid like 'uid:%')) AND (o.order_status='open')", nativeQuery = true)
	public int countOrderIdByAccountAndOrderStatus();
	
	@Query(value="select count(orderid) sellOrderCount from orderejb o where (o.account_accountid in(select accountid from accountejb a where a.profile_userid like 'uid:%')) AND (o.order_type='sell')", nativeQuery = true)
	public int countOrderByOrderTypeSell();
	
	@Query(value="select count(orderid) buyOrderCount from orderejb o where (o.account_accountid in(select accountid from accountejb a where a.profile_userid like 'uid:%')) AND (o.order_type='buy')", nativeQuery = true)
	public int countOrderByOrderTypeBuy();
	
	@Query(value="select count(orderid) as orderCount from orderejb o where o.account_accountid in(select accountid from accountejb a where a.profile_userid like 'uid:%')", nativeQuery = true)
	public int countOrderByAccountid();

}
