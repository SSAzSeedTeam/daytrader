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

package org.apache.geronimo.daytrader.javaee6.quotes;

import java.util.Arrays;

import javax.sql.DataSource;

import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;
import org.apache.tomcat.util.descriptor.web.ContextResource;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.tomcat.TomcatContextCustomizer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

//
// Defining Application class
// @SpringBootApplication enables many defaults. It also enables @EnableWebMvc that activates web endpoints.
//
@ServletComponentScan(basePackages={"org.apache.geronimo.daytrader.javaee6.quotes"})
@SpringBootApplication
public class QuotesApplication extends SpringBootServletInitializer {
	
	// Added by on 2018-08-18 
//  - Configure database environment 
    private static String driverClassName = System.getenv("DAYTRADER_DATABASE_DRIVER");
    private static String url = System.getenv("DAYTRADER_DATABASE_URL");
    private static String username = System.getenv("DAYTRADER_DATABASE_USERNAME");
    private static String password = System.getenv("DAYTRADER_DATABASE_PASSWORD");
	
	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(QuotesApplication.class);
	}

	public static void main(String[] args) throws Exception {
		SpringApplication.run(QuotesApplication.class, args);
	}

	@Bean
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
			protected void postProcessContext(Context context) 
			{
				//
				// Quotes Data Source
				//
				ContextResource quotesDataSource = new ContextResource();
				quotesDataSource.setName("jdbc/QuotesDataSource");
				quotesDataSource.setAuth("Container");
				quotesDataSource.setType(DataSource.class.getName());
				// Set Database Properties
				quotesDataSource.setProperty("driverClassName", driverClassName);
				quotesDataSource.setProperty("url", url);
				//quotesDataSource.setProperty("username", username);
				//quotesDataSource.setProperty("password", password);
				quotesDataSource.setProperty("maxActive", "100");
				quotesDataSource.setProperty("maxIdle", "30");
				quotesDataSource.setProperty("maxWait", "10000");
				context.getNamingResources().addResource(quotesDataSource);
			}
		};
		
	    return factory;
	}
}

