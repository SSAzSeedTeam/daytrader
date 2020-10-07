package com.ofss.daytrader.accounts.repository;

import com.ofss.daytrader.entities.AccountProfileDataBean;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public interface AccountsProfileRepository extends CrudRepository<AccountProfileDataBean, String>{

	AccountProfileDataBean findAccountProfileDataById(String userId);
	
    @Modifying      // to mark delete or update query
    @Query(value = "delete from accountprofileejb where userid like 'ru:%'")
    public void deleteAccountprofileByUser();
}
