package com.ofss.daytrader.gateway.utils;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.ofss.daytrader.gateway.service.MyUserDetailsService;

import io.jsonwebtoken.SignatureException;


@Component
public class JwtFilterRequest extends OncePerRequestFilter{

	@Autowired
	private MyUserDetailsService myUserDetailsService;
	
	@Autowired
	private JwtTokenUtil jwtTokenUtil;
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		System.out.println("inside doFilterInternal");
		String autherization = request.getHeader("Authorization");
		
		String username = null;
		String jwt = null;
		/*if (autherization == null) {
			System.out.println("response value - " + HttpServletResponse.SC_FORBIDDEN);
			response.sendError(HttpServletResponse.SC_FORBIDDEN);
			return ;
		}
		*/
		if(null!=autherization && autherization.startsWith("Bearer ")) {
			System.out.println("if authorization");
			jwt = autherization.substring(7);
			System.out.println("jwt:"+jwt);
			try {
				username = jwtTokenUtil.getUsernameFromToken(jwt);
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
				SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
				filterChain.doFilter(request, response);
				return;
			}
		}
		//response.sendError(HttpServletResponse.SC_FORBIDDEN);
		//return ;
		//if (username == null) filterChain.doFilter(request, response);
	}

}
