/*
package com.ofss.daytrader.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SuppressWarnings("deprecation")
@Configuration
@EnableWebSecurity
public class BasicConfiguration extends WebSecurityConfigurerAdapter {

	
	 * @Autowired
	 * 
	 * @Value("${spring.datasource.username}") private String dbUsername;
	 * 
	 * @Autowired
	 * 
	 * @Value("${spring.security.user.name}") private String username;
	 * 
	 * @Autowired
	 * 
	 * @Value("${spring.security.user.password}") private String password;
	 

	
	 * @Override
	 * 
	 * @Order(Ordered.HIGHEST_PRECEDENCE) protected void
	 * configure(AuthenticationManagerBuilder auth) throws Exception {
	 * 
	 * PasswordEncoder encoder =
	 * PasswordEncoderFactories.createDelegatingPasswordEncoder();
	 * auth.inMemoryAuthentication().withUser("Arunima1").password("A@1234567893").
	 * roles("USERS"); }
	 

	
	 * @Override protected void configure(HttpSecurity http) throws Exception {
	 * http.csrf().disable() .authorizeRequests().anyRequest().authenticated()
	 * .and().and() .httpBasic(); }
	 * 
	 
    
	@Value("${jwt.secret}")
	private String secret;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	
	 * @Qualifier("AuthorizationServerSecurityConfiguration") private
	 * AuthorizationServerSecurityConfiguration security;
	 

	@Bean
	public JwtAccessTokenConverter accessTokenConverter() {
		System.out.println("JwtAccessTokenConverter");
        JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
        converter.setSigningKey(secret);
        return converter;
	}

    @Bean
    public TokenStore tokenStore() {
    	System.out.println("tokenStore");
        return new JwtTokenStore(accessTokenConverter());
    }

    
	
	 * @Bean public AuthorizationServerSecurityConfigurer
	 * authorizationServerSecurityConfigurer() { return super. }
	 
	
	 * @Override public void configure(AuthorizationServerSecurityConfigurer
	 * security) throws Exception {
	 * security.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()");
	 * }
	 

	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.tokenStore(tokenStore())
				.authenticationManager(authenticationManager)
                .accessTokenConverter(accessTokenConverter());
	}
	@Bean
	public PasswordEncoder passwordEncoder() {
		return NoOpPasswordEncoder.getInstance();
	}
}
*/