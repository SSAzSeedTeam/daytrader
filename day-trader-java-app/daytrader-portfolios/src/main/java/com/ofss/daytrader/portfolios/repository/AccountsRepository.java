package com.ofss.daytrader.portfolios.repository;

import com.ofss.daytrader.entities.AccountDataBean;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface AccountsRepository extends JpaRepository<AccountDataBean,Integer>{
	
	@SuppressWarnings("unchecked")
	public AccountDataBean save(AccountDataBean accountData);

	public AccountDataBean findAccountDataByprofileID(String profile_userid);
	
	@Query(value = "select a.accountid from accountejb a where a.profile_userid = ?1", nativeQuery = true)
	public List<Integer> findAccountidByprofileID(String userId);
	
	 @Modifying      
	 @Query(value = "delete from accountejb where profile_userid like 'ru:%'", nativeQuery = true)
	 public int deleteAccountDataByUser();
	 
	 @Query(value = "select count(accountid) as tradeUserCount from accountejb a where a.profile_userid like 'uid:%'", nativeQuery = true)
	 public int getTraderUserCount();
	 
	 @Modifying  
	 @Query(value = "update accountejb set logout_countt=?1,login_count=?2 where profile_userid like 'uid:%'", nativeQuery = true)
	 public void updateLoginLogoutCount(int logoutCount, int loginCount);
	 
	 @Query(value = "select sum(login_count) as sumLoginCount, sum(logout_count) as sumLogoutCount from accountejb a where  a.profile_userid like 'uid:%'", nativeQuery = true)
	 Map<String,Integer> fetchSumOfLoginLogoutCount();
	 
	 @Modifying
	 @Query(value="update accountejb set balance = balance + ?1 where accountid = ?2", nativeQuery = true)
	 public void creditAccountBalance(BigDecimal balance, Integer accountid);
	 
	 
	 

}
