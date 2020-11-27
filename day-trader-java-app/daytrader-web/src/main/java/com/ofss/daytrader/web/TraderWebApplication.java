/**
 *  Licensed to the Apache Software Foundation (ASF) under one or more
 *  contributor license agreements.  See the NOTICE file distributed with
 *  this work for additional information regarding copyright ownership.
 *  The ASF licenses this file to You under the Apache License, Version 2.0
 *  (the "License"); you may not use this file except in compliance with
 *  the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

package com.ofss.daytrader.web;

import java.io.IOException;
import java.io.InputStream;
import java.security.KeyManagementException;
import java.security.KeyStore;
import java.security.KeyStoreException;
import java.security.NoSuchAlgorithmException;
import java.security.cert.CertificateException;
import java.util.Arrays;

import javax.net.ssl.SSLContext;
import javax.net.ssl.SSLSocketFactory;
import javax.net.ssl.TrustManager;
import javax.net.ssl.TrustManagerFactory;
import javax.servlet.SessionCookieConfig;
import javax.sql.DataSource;

import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;
import org.apache.tomcat.util.descriptor.web.ContextResource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
/*import org.springframework.boot.context.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;*/
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@ServletComponentScan(basePackages={"com.ofss.daytrader"})
@ComponentScan(basePackages={"com.ofss.daytrader"})
@SpringBootApplication
public class TraderWebApplication extends SpringBootServletInitializer {
	
	// Updated by on 2018-02-22
	//	- Each microservice has their own private database (datasource)

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(TraderWebApplication.class);
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(TraderWebApplication.class, args);
	}

	/*@Bean
	public TomcatEmbeddedServletContainerFactory tomcatFactory() 
	{	
		TomcatEmbeddedServletContainerFactory factory = new TomcatEmbeddedServletContainerFactory() 
		{
			@Override
			protected TomcatEmbeddedServletContainer getTomcatEmbeddedServletContainer(Tomcat tomcat) 
			{
				tomcat.enableNaming();
				return super.getTomcatEmbeddedServletContainer(tomcat);
			}

			@Override
			protected void postProcessContext(Context context) {}
		};
		
		TomcatContextCustomizer contextCustomizer = new TomcatContextCustomizer() 
		{
		    @Override
		    public void customize(Context context) 
		    {
                // Set the cookie properties to make sure the browser will send them over the
                // in-secure connection (ie. http) between the browser and the kubectl proxy.
		        context.setUseHttpOnly(true);
		        context.setSessionCookiePath("/");
		    }
		};
		
		factory.setTomcatContextCustomizers(Arrays.asList(contextCustomizer));

	    return factory;
	}*/
	
}

