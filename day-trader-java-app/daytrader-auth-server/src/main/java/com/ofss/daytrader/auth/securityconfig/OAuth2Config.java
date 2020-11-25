package com.ofss.daytrader.auth.securityconfig;
/*
 * package com.example.auth.securityconfig;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.beans.factory.annotation.Qualifier; import
 * org.springframework.context.annotation.Bean; import
 * org.springframework.security.authentication.AuthenticationManager; import
 * org.springframework.security.oauth2.config.annotation.configurers.
 * ClientDetailsServiceConfigurer; import
 * org.springframework.security.oauth2.config.annotation.web.configuration.
 * AuthorizationServerSecurityConfiguration; import
 * org.springframework.security.oauth2.config.annotation.web.configurers.
 * AuthorizationServerEndpointsConfigurer; import
 * org.springframework.security.oauth2.config.annotation.web.configurers.
 * AuthorizationServerSecurityConfigurer; import
 * org.springframework.security.oauth2.provider.token.store.
 * JwtAccessTokenConverter; import
 * org.springframework.security.oauth2.provider.token.store.JwtTokenStore;
 * import org.springframework.security.oauth2.config.annotation.web.configurers.
 * AuthorizationServerEndpointsConfigurer;
 * 
 * public class OAuth2Config extends AuthorizationServerSecurityConfiguration{
 * 
 * private String clientid = "tutorialspoint"; private String clientSecret =
 * "my-secret-key"; private String privateKey = "private key"; private String
 * publicKey = "public key";
 * 
 * @Autowired
 * 
 * @Qualifier("authenticationManagerBean") private AuthenticationManager
 * authenticationManager;
 * 
 * @Bean public JwtAccessTokenConverter tokenEnhancer() {
 * JwtAccessTokenConverter converter = new JwtAccessTokenConverter();
 * converter.setSigningKey(privateKey); converter.setVerifierKey(publicKey);
 * return converter; }
 * 
 * @Bean public JwtTokenStore tokenStore() { return new
 * JwtTokenStore(tokenEnhancer()); } public void
 * configure(AuthorizationServerEndpointsConfigurer endpoints) throws Exception
 * {
 * endpoints.authenticationManager(authenticationManager).tokenStore(tokenStore(
 * )) .accessTokenConverter(tokenEnhancer()); }
 * 
 * @Override public void configure(AuthorizationServerSecurityConfigurer
 * security) throws Exception {
 * security.tokenKeyAccess("permitAll()").checkTokenAccess("isAuthenticated()");
 * }
 * 
 * @Override public void configure(ClientDetailsServiceConfigurer clients)
 * throws Exception {
 * clients.inMemory().withClient(clientid).secret(clientSecret).scopes("read",
 * "write") .authorizedGrantTypes("password",
 * "refresh_token").accessTokenValiditySeconds(20000)
 * .refreshTokenValiditySeconds(20000);
 * 
 * }
 * 
 * }
 */