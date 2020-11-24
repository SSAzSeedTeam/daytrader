package com.ofss.daytrader.auth.filter;

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

import com.ofss.daytrader.auth.model.MyUserDetailsService;
import com.ofss.daytrader.auth.util.JwtTokenUtil;

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
//		System.out.println("inside doFilterInternal");
//		String autherization = request.getHeader("Authorization");
//		
//		String username = null;
//		String jwt = null;
//		
//		if(null!=autherization && autherization.startsWith("Bearer ")) {
//			System.out.println("if authorization");
//			jwt = autherization.substring(7);
//			System.out.println("jwt:"+jwt);
//			username = jwtTokenUtil.getUsernameFromToken(jwt);
//			
//		}
//		// Once we get the token validate it.
//		if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
//		UserDetails userDetails = this.myUserDetailsService.loadUserByUsername(username);
//		// if token is valid configure Spring Security to manually set
//		// authentication
//		if (jwtTokenUtil.validateToken(jwt, userDetails)) {
//			System.out.println("if validate Token");
//			UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
//			userDetails, null, userDetails.getAuthorities());
//			usernamePasswordAuthenticationToken
//			.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//			// After setting the Authentication in the context, we specify
//			// that the current user is authenticated. So it passes the
//			// Spring Security Configurations successfully.
//			SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
//			}
//			}
		filterChain.doFilter(request, response);
	}

}
