package com.ofss.daytrader.quotes.utils;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;



@Component
public class JwtFilterRequest extends OncePerRequestFilter{
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Value("${DAYTRADER_OAUTH_ENABLE}")
	private boolean oauthEnabled;
	
	@Value("${DAYTRADER_AUTH_PUBLIC_KEY_BASE64}")
	private String  publicKeyBase64;
	
	@SuppressWarnings("unused")
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		if (oauthEnabled==false) {
			System.out.println("oauth is disabled");
			filterChain.doFilter(request, response);
			return;
		}
		// TODO Auto-generated method stub
		System.out.println("inside doFilterInternal-gateway");
		String authorization = request.getHeader("Authorization");
		System.out.println("authorization value - " + authorization);
		if((null!= authorization) && (!authorization.contains(" ")) ) {
			System.out.println("inside if");
			authorization = authorization +" ";
		}
		String username = null;
		String jwtHeader = null;
		
		String path = request.getRequestURI();
		System.out.println(path);
		String methodname = request.getMethod();
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
			response.sendError(HttpServletResponse.SC_FORBIDDEN);
			//filterChain.doFilter(request, response);
			return ;
		}
		
		if(null!=authorization && authorization.startsWith("Bearer ")) {
			System.out.println("if authorization");
			jwtHeader = authorization.substring(7);
			System.out.println("jwtHeader:"+jwtHeader);
			if (jwtHeader=="") {
				System.out.println("jwtHeader is empty");
				response.sendError(HttpServletResponse.SC_FORBIDDEN);
				return ;
			}
//			SessionHolder sh = SpringContext.getBean(SessionHolder.class);
//			sh.setJwtToken(jwtHeader);
		}
		
		// Once we get the token validate it.
		if (jwtHeader != null && jwtTokenUtil.validateJwtToken(jwtHeader)) {
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwtHeader);
				System.out.println("username after validation token: "+username);
		
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
		response.sendError(HttpServletResponse.SC_FORBIDDEN);
		System.out.println("after error  ");
		return ;
	}
}
