package com.ofss.daytrader.auth.securityconfig;

import java.util.ArrayList;

import org.apache.derby.tools.sysinfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
/*import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;*/

import com.ofss.daytrader.auth.filter.JwtFilterRequest;
import com.ofss.daytrader.auth.model.MyUserDetailsService;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	
	  @Autowired
	  private MyUserDetailsService myUserDetailsService;
	
	  @Override 
	  //@Order(Ordered.HIGHEST_PRECEDENCE)
	  protected void configure(HttpSecurity http) throws Exception {
		  
		  System.out.println("in configure(HttpSecurity http) method");
	  http.csrf().disable().authorizeRequests().antMatchers("/authenticate").	
	  permitAll().antMatchers("/registeruser","/userdetails/*").permitAll()
	  .anyRequest().authenticated()
	  .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.
	  STATELESS);
	  
	  }
	 

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManager();
	}

	@Autowired
	protected void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService (myUserDetailsService);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}
}
