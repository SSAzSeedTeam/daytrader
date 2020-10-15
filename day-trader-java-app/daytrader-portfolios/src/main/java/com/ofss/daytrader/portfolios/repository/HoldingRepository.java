package com.ofss.daytrader.portfolios.repository;

import java.sql.Timestamp;
import java.util.Collection;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.ofss.daytrader.entities.HoldingDataBean;

@Repository
public interface HoldingRepository extends JpaRepository<HoldingDataBean, Integer>{
	
	@Query(value="select * from holdingejb h where h.account_accountid in(?1)", nativeQuery = true)
	public Collection<HoldingDataBean> findHoldingDataByaccountID(List<Integer> accountid);
	
	@Modifying
	@Query(value="update holdingejb set purchase_date= ?1 where holdingid = ?2", nativeQuery = true)
	public void updateHoldingStatus(Timestamp purchasedate, Integer holdingID);
	
	@Modifying
	@Query(value="delete from holdingejb where holdingejb.account_accountid is null", nativeQuery = true)
	public void deleteHoldingForAccountidNull();
	
	@Modifying
	@Query(value = "delete from holdingejb where account_accountid in (select accountid from accountejb a where a.profile_userid like 'ru:%')", nativeQuery = true)
	public void deleteHoldingDataByAccountid();
	
	@Query(value="select count(holdingid) as holdingCount from holdingejb h where h.account_accountid in(select accountid from accountejb a where a.profile_userid like 'uid:%')", nativeQuery = true)
	public int countHoldingByAccountid();

}
