package com.ofss.daytrader.accounts.config;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
/*import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;*/
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ofss.daytrader.accounts.utils.JwtFilterRequest;


@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	
	  /*@Autowired
	  private MyUserDetailsService myUserDetailsService;*/
	  
	  @Autowired
	  private JwtFilterRequest jwtFilterRequest;
		
		
		@Override
		@Order(Ordered.HIGHEST_PRECEDENCE)
	    public void configure(HttpSecurity http) throws Exception {
	        http
	        .csrf().disable()
	            .authorizeRequests()
	            /*.antMatchers("/login/*").authenticated()*/
	            .anyRequest().permitAll()
	            .and().sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
	        
	        //http.addFilterBefore(jwtFilterRequest, UsernamePasswordAuthenticationFilter.class);
	    }
	 

	@Override
	@Bean
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManager();
	}

	/*@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(myUserDetailsService);
	}

	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
				//new BCryptPasswordEncoder();//
*/	//}
}
