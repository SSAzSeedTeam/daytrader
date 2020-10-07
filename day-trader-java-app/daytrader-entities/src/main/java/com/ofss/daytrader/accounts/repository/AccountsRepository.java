package com.ofss.daytrader.accounts.repository;

import com.ofss.daytrader.entities.AccountDataBean;

import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface AccountsRepository extends CrudRepository<AccountDataBean,Integer>{

	AccountDataBean findAccountDataByUserID(String userID);
	
	 @Modifying      
	 @Query(value = "delete from accountejb where profile_userid like 'ru:%'")
	 public int deleteAccountDataByUser();
	 
	 @Query(value = "select count(accountid) as \\\"tradeUserCount\\\" from accountejb a where a.profile_userid like 'uid:%'")
	 public int getTraderUserCount();
	 
	 @Modifying  
	 @Query(value = "update accountejb set logoutCount=?1,loginCount=?2 where profile_userID like 'uid:%'")
	 public void updateLoginLogoutCount(int logoutCount, int loginCount);
	 
	 @Query(value = "select sum(loginCount) as \\\"sumLoginCount\\\", sum(logoutCount) as \\\"sumLogoutCount\\\" from accountejb a where  a.profile_userID like 'uid:%'")
	 Map<String,Integer> fetchSumOfLoginLogoutCount();
	 

}
