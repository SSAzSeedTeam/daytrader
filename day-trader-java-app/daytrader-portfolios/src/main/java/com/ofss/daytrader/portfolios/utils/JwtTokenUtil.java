package com.ofss.daytrader.portfolios.utils;

import java.security.PublicKey;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;

@Component
public class JwtTokenUtil {

	
	@Value("${DAYTRADER_AUTH_PUBLIC_KEY_BASE64}")
	private String publicKeyBase64;

public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
private static final Logger logger = LoggerFactory.getLogger(JwtTokenUtil.class);
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
		System.out.println("inside getAllClaimsFromToken: ");
		//Load keys - start
	    byte[] publicByteArray = null;
	    PublicKey publicKey = null;
		try {
			publicByteArray = Utils.decodeBase64(publicKeyBase64);
		    publicKey = RSAUtil.convertByteArrayToPublicKey(publicByteArray);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return Jwts.parser().setSigningKey(publicKey).parseClaimsJws(token).getBody();
	}
	//check if the token has expired
	public Boolean isTokenExpired(String token) {
	final Date expiration = getExpirationDateFromToken(token);
	return expiration.before(new Date());
	}
	//validate token
	public boolean validateJwtToken(String authToken) {
		try {
			
			byte[] publicByteArray = Utils.decodeBase64(publicKeyBase64);
			PublicKey publicKey = RSAUtil.convertByteArrayToPublicKey(publicByteArray);
			Jwts.parser().setSigningKey(publicKey).parseClaimsJws(authToken);
			return true;
		} catch (SignatureException e) {
			System.out.println("Invalid JWT signature: {}"+ e.getMessage());
		} catch (MalformedJwtException e) {
			System.out.println("Invalid JWT token: {}"+ e.getMessage());
		} catch (ExpiredJwtException e) {
			System.out.println("JWT token is expired: {}"+ e.getMessage());
		} catch (UnsupportedJwtException e) {
			System.out.println("JWT token is unsupported: {}"+ e.getMessage());
		} catch (IllegalArgumentException e) {
			System.out.println("JWT claims string is empty: {}"+ e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
		}

		return false;
	}
	
	
	/*public Boolean validateToken(String token, UserDetails userDetails) {
	final String username = getUsernameFromToken(token);
	return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
	}
*/
}
