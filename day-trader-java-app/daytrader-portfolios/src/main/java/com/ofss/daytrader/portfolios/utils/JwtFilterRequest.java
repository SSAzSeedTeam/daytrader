package com.ofss.daytrader.portfolios.utils;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.http.protocol.HttpContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ofss.daytrader.portfolios.service.MyUserDetailsService;

import io.jsonwebtoken.SignatureException;


@Component
public class JwtFilterRequest extends OncePerRequestFilter{

	@Autowired
	private MyUserDetailsService myUserDetailsService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Value("${DAYTRADER_OAUTH_ENABLE}")
	private boolean oauthEnabled;
	
	@SuppressWarnings("unused")
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		
		if (oauthEnabled==false) {
			filterChain.doFilter(request, response);
			return;
		}
		// TODO Auto-generated method stub
		System.out.println("inside doFilterInternal-gateway");
		String autherization = request.getHeader("Authorization");
		System.out.println("autherization value - " + autherization);
		if((null!= autherization) && (!autherization.contains(" ")) ) {
			System.out.println("inside if");
			autherization = autherization +" ";
		}
		String username = null;
		String jwt = null;
		
		
		String path = request.getRequestURI();
		System.out.println(path);
		String methodname = request.getMethod();
		System.out.println(path);
		System.out.println(methodname);
		if ((path.equals("/accounts")) && (methodname.equals("POST"))) {
	    	filterChain.doFilter(request, response);
	    	return;
	    }
		
		if ((path.equals("/profiles")) && (methodname.equals("GET"))) {
	    	filterChain.doFilter(request, response);
	    	return;
	    }
		if (autherization == null) {
			System.out.println("response value - " + HttpServletResponse.SC_FORBIDDEN);
			response.sendError(HttpServletResponse.SC_FORBIDDEN);
			//filterChain.doFilter(request, response);
			return ;
		}
		
		if(null!=autherization && autherization.startsWith("Bearer ")) {
			System.out.println("if authorization");
			jwt = autherization.substring(7);
			System.out.println("jwt:"+jwt);
			try {
				if(!jwt.isEmpty()) {
					System.out.println("username");
				username = jwtTokenUtil.getUsernameFromToken(jwt);
				}
				
				SessionHolder sh = SpringContext.getBean(SessionHolder.class);
				sh.setJwtToken(jwt);
			}
			catch(SignatureException exc) {
				System.out.println("invalid token ");
				response.sendError(HttpServletResponse.SC_FORBIDDEN);
				return ;
			}
			
		}
		// Once we get the token validate it.
		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
			UserDetails userDetails = this.myUserDetailsService.loadUserByUsername(username);
			
			System.out.println("userDetails - " + userDetails);
			// if token is valid configure Spring Security to manually set
			// authentication
			if (jwtTokenUtil.validateToken(jwt, userDetails)) {
				System.out.println("if validate Token");
				UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
				userDetails, null, userDetails.getAuthorities());
				usernamePasswordAuthenticationToken
				.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				// After setting the Authentication in the context, we specify
				// that the current user is authenticated. So it passes the
				// Spring Security Configurations successfully.
				 //ThreadLocal<HttpSession> instance = new ThreadLocal<>(); 
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				SessionHolder sh = SpringContext.getBean(SessionHolder.class);
				sh.setJwtToken(jwt);
			/*	request.setAttribute("token", jwt);
				HttpSession session = request.getSession(true);
            	session.setAttribute("token", jwt);
            	holder.setHttpSession(session);*/
            	//instance.set(session);
            	
				filterChain.doFilter(request, response);
				return;
			}
		}
		System.out.println("end of do filter");
		filterChain.doFilter(request, response);
		//response.sendError(HttpServletResponse.SC_FORBIDDEN);
		//return ;
		//if (username == null) filterChain.doFilter(request, response);
	}

}
