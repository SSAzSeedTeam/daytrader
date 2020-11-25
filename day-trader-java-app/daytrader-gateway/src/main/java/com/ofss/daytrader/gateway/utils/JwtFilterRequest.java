package com.ofss.daytrader.gateway.utils;

import java.io.IOException;
import java.security.PublicKey;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.Filter;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;



@Component
public class JwtFilterRequest extends OncePerRequestFilter{
	
	/*@Autowired
	private JwtTokenUtil jwtTokenUtil;*/
	
	@Value("${DAYTRADER_OAUTH_ENABLE}")
	private boolean oauthEnabled;
	
	@Value("${DAYTRADER_AUTH_PUBLIC_KEY_BASE64}")
	private String  publicKeyBase64;
	
	@SuppressWarnings("unused")
	@Override
	
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
/*	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {*/
		
		
		if (oauthEnabled==false) {
			System.out.println("oauth is disabled");
			filterChain.doFilter(request, response);
			return;
		}
		// TODO Auto-generated method stub
		System.out.println("inside doFilterInternal-gateway");
		String authorization = ((HttpServletRequest) request).getHeader("Authorization");
		System.out.println("authorization value - " + authorization);
		if((null!= authorization) && (!authorization.contains(" ")) ) {
			System.out.println("inside if");
			authorization = authorization +" ";
		}
		String username = null;
		String jwtHeader = null;
		
		String path = ((HttpServletRequest) request).getRequestURI();
		System.out.println(path);
		String methodname = ((HttpServletRequest) request).getMethod();
		System.out.println(path);
		System.out.println(methodname);
		if ((path.equals("/accounts")) && (methodname.equals("POST"))) {
	    	filterChain.doFilter(request, response);
	    	return;
	    }
		if ((path.contains("/admin")) && (methodname.equals("POST"))) {
	    	filterChain.doFilter(request, response);
	    	return;
	    }
		if ((path.equals("/profiles")) && (methodname.equals("GET"))) {
	    	filterChain.doFilter(request, response);
	    	return;
	    }
		if ((path.contains("/holdings")) && (methodname.equals("GET"))) {
	    	filterChain.doFilter(request, response);
	    	return;
	    }
		if (authorization == null) {
			System.out.println("authorization header missing");
			System.out.println("response value - " + HttpServletResponse.SC_FORBIDDEN);
			((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN);
			//filterChain.doFilter(request, response);
			return ;
		}
		
		if(null!=authorization && authorization.startsWith("Bearer ")) {
			System.out.println("if authorization");
			jwtHeader = authorization.substring(7);
			System.out.println("jwtHeader:"+jwtHeader);
			if (jwtHeader=="") {
				System.out.println("jwtHeader is empty");
				((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN);
				return ;
			}
//			SessionHolder sh = SpringContext.getBean(SessionHolder.class);
//			sh.setJwtToken(jwtHeader);
		}
		
		// Once we get the token validate it.
		if (jwtHeader != null) {
			try {
				int index = jwtHeader.indexOf(":");
				String signatureAsc = jwtHeader.substring(0,index);
				String jwtRaw = jwtHeader.substring(index+1);
				
				
		        byte[] publicKeyByteArray = Utils.decodeBase64(publicKeyBase64);
		        PublicKey publicKey = RSAUtil.convertByteArrayToPublicKey(publicKeyByteArray);
				
		        byte[] signedDataByteArray = Utils.decodeBase64(signatureAsc);
		        boolean signatureVerifySuccessFlag = RSAUtil.rsaVerifySignWithPublicKey(publicKey, jwtRaw.getBytes(), signedDataByteArray);
		        System.out.println("signatureVerifySuccessFlag:" + signatureVerifySuccessFlag);
				
		        if(signatureVerifySuccessFlag == false) {
		    		System.out.println("Signature mismatch");
		    		((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN);
		    		return ;
		        }
		        String[] splitArray = jwtRaw.split(":");
		        String userName = splitArray[0];
		        String loginTimeStr = splitArray[1];
		        String durationStr = splitArray[2];

		        long now = (new Date()).getTime();
		        long loginTime = Long.parseLong(loginTimeStr);
		        long duration = Long.parseLong(durationStr);
		        if(now > loginTime + duration ) {
		    		System.out.println("Token time exceeded!");
		    		((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN);
		    		return ;
		        }
		        System.out.println("Token time not exceeded!");
				SessionHolder sh = SpringContext.getBean(SessionHolder.class);
				sh.setJwtToken(jwtHeader);
				System.out.println("before the filter chain");
				filterChain.doFilter(request, response);
				return;
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		System.out.println("end of do filter");
		//filterChain.doFilter(request, response);
		((HttpServletResponse) response).sendError(HttpServletResponse.SC_FORBIDDEN);
		System.out.println("after error  ");
		return ;
	}

	
}
