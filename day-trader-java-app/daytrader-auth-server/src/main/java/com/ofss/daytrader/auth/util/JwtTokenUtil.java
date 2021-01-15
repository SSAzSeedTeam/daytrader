package com.ofss.daytrader.auth.util;

import java.security.PrivateKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenUtil {
	

	//public static final long JWT_TOKEN_VALIDITY = 1 * 60 * 60;

	@Value("${DAYTRADER_AUTH_PRIVATE_KEY_BASE64}")
	private String privateKeyBase64;
	
	@Value("${JWT_TOKEN_VALIDITY}")
	private long tokenValidity;
	
	//retrieve username from jwt token
		public String getUsernameFromToken(String token) {
		return getClaimFromToken(token, Claims::getSubject);
		}
		//retrieve expiration date from jwt token
		public Date getExpirationDateFromToken(String token) {
		return getClaimFromToken(token, Claims::getExpiration);
		}
		public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
		final Claims claims = getAllClaimsFromToken(token);
		return claimsResolver.apply(claims);
		}
		    //for retrieveing any information from token we will need the secret key
		private Claims getAllClaimsFromToken(String token) {
			System.out.println("inside getAllClaimsFromToken");
		return Jwts.parser()/*setSigningKey(secret)*/.parseClaimsJws(token).getBody();
		}
		//check if the token has expired
		private Boolean isTokenExpired(String token) {
		final Date expiration = getExpirationDateFromToken(token);
		return expiration.before(new Date());
		}
	//generate token for user
	public String generateToken(UserDetails userDetails) throws Exception {
	Map<String, Object> claims = new HashMap<>();
	return doGenerateToken(claims, userDetails.getUsername());
	}
	//while creating the token -
	//1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
	//2. Sign the JWT using the HS512 algorithm and secret key.
	//3. According to JWS Compact Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
	//   compaction of the JWT to a URL-safe string 
	private String doGenerateToken(Map<String, Object> claims, String subject) throws Exception {
		//start PKI Changes
		System.out.println("private key: "+ privateKeyBase64);
		byte[] privateByteArray = Utils.decodeBase64(privateKeyBase64);
        PrivateKey privateKey = RSAUtil.convertByteArrayToPrivateKey(privateByteArray);
        if(tokenValidity<=0) {
        	tokenValidity = 1 * 60 * 60;
        }
	return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
	.setExpiration(new Date(System.currentTimeMillis() + tokenValidity * 1000))
	.signWith(SignatureAlgorithm.RS256, privateKey).compact();
	}

}
