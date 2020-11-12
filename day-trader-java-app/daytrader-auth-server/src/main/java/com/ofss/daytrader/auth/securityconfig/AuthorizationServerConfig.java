package com.ofss.daytrader.auth.securityconfig;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.oauth2.client.registration.ClientRegistration;
import org.springframework.security.oauth2.client.registration.ClientRegistrationRepository;
import org.springframework.security.oauth2.client.registration.InMemoryClientRegistrationRepository;
import org.springframework.security.oauth2.config.annotation.configurers.ClientDetailsServiceConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerConfigurerAdapter;
import org.springframework.security.oauth2.config.annotation.web.configuration.AuthorizationServerSecurityConfiguration;
import org.springframework.security.oauth2.config.annotation.web.configuration.EnableAuthorizationServer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerEndpointsConfigurer;
import org.springframework.security.oauth2.config.annotation.web.configurers.AuthorizationServerSecurityConfigurer;
import org.springframework.security.oauth2.core.AuthorizationGrantType;
import org.springframework.security.oauth2.core.ClientAuthenticationMethod;
import org.springframework.security.oauth2.core.oidc.IdTokenClaimNames;
import org.springframework.security.oauth2.provider.token.TokenStore;
import org.springframework.security.oauth2.provider.token.store.JwtAccessTokenConverter;
import org.springframework.security.oauth2.provider.token.store.JwtTokenStore;

@Configuration
@EnableAuthorizationServer
public class AuthorizationServerConfig extends AuthorizationServerConfigurerAdapter {
	
	static final String CLIEN_ID = "devglan-client";
	static final String CLIENT_SECRET = "devglan-secret";
	static final String GRANT_TYPE_PASSWORD = "password";
	static final String AUTHORIZATION_CODE = "authorization_code";
    static final String REFRESH_TOKEN = "refresh_token";
    static final String IMPLICIT = "implicit";
	static final String SCOPE_READ = "read";
	static final String SCOPE_WRITE = "write";
    static final String TRUST = "trust";
	static final int ACCESS_TOKEN_VALIDITY_SECONDS = 2*60*60;
    static final int FREFRESH_TOKEN_VALIDITY_SECONDS = 6*60*60;
    
	@Value("${jwt.secret}")
	private String secret;

	@Autowired
	private AuthenticationManager authenticationManager;
	
	/*
	 * @Qualifier("AuthorizationServerSecurityConfiguration") private
	 * AuthorizationServerSecurityConfiguration security;
	 */

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

   /* @Bean
    public ClientRegistrationRepository clientRegistrationRepository() {
        return new InMemoryClientRegistrationRepository(this.googleClientRegistration());
    }*/
    
	@Override
	public void configure(ClientDetailsServiceConfigurer configurer) throws Exception {
		configurer
				.inMemory()
				.withClient(CLIEN_ID)
				.secret(CLIENT_SECRET)
				.authorizedGrantTypes(GRANT_TYPE_PASSWORD, AUTHORIZATION_CODE, REFRESH_TOKEN, IMPLICIT )
				.scopes(SCOPE_READ, SCOPE_WRITE, TRUST)
				.accessTokenValiditySeconds(ACCESS_TOKEN_VALIDITY_SECONDS).
				refreshTokenValiditySeconds(FREFRESH_TOKEN_VALIDITY_SECONDS);
	}
    
    /*private ClientRegistration googleClientRegistration() {
        return ClientRegistration.withRegistrationId("auth-service-oauth-jwt")
            .clientId(CLIEN_ID)
            .clientSecret(CLIENT_SECRET)
            .clientAuthenticationMethod(ClientAuthenticationMethod.BASIC)
            .authorizationGrantType(AuthorizationGrantType.PASSWORD)
            .redirectUriTemplate("{baseUrl}/login/oauth2/code/{registrationId}")
            .scope(SCOPE_READ, SCOPE_WRITE, TRUST)
            
            //.authorizationUri("https://accounts.google.com/o/oauth2/v2/auth")
            .tokenUri("https://www.googleapis.com/oauth2/token")
            .userInfoUri("https://www.googleapis.com/oauth2/v3/userinfo")
            //.userNameAttributeName(IdTokenClaimNames.SUB)
            //.jwkSetUri("https://www.googleapis.com/oauth2/v3/certs")
            //.clientName("Google")
            .build();
    }*/
	/*
	 * @Bean public AuthorizationServerSecurityConfigurer
	 * authorizationServerSecurityConfigurer() { return super. }
	 */
	/*
	 * @Override public void configure(AuthorizationServerSecurityConfigurer
	 * security) throws Exception {
	 * security.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()");
	 * }
	 */

	@Override
	public void configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception {
		endpoints.tokenStore(tokenStore())
				.authenticationManager(authenticationManager)
                .accessTokenConverter(accessTokenConverter());
	}

}
