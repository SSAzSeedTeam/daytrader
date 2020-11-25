package com.ofss.daytrader.auth.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ofss.daytrader.auth.model.UserDataBean;

@Repository
public interface UserDataRepository extends JpaRepository<UserDataBean, Integer>{

	@SuppressWarnings("unchecked")
	public UserDataBean save(UserDataBean userdata); 
	
//	@Query(value="select password from userdatatable where user_name = ?1", nativeQuery=true)
//	public String getPwdByUserid(String userName);

	public UserDataBean findByUsername(String userName);

}
