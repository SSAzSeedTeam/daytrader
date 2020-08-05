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

package org.apache.geronimo.daytrader.javaee6.accounts;

import javax.sql.DataSource;

import org.apache.catalina.Context;
import org.apache.catalina.startup.Tomcat;
import org.apache.tomcat.util.descriptor.web.ContextResource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainer;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Bean;

@ServletComponentScan(basePackages={"org.apache.geronimo.daytrader.javaee6.accounts"})
@SpringBootApplication
public class AccountsApplication extends SpringBootServletInitializer {
	
//  Configure database environment 
    private static String driverClassName = System.getenv("DAYTRADER_DATABASE_DRIVER");
    private static String url = System.getenv("DAYTRADER_DATABASE_URL");
    private static String username = System.getenv("DAYTRADER_DATABASE_USERNAME");
    private static String password = System.getenv("DAYTRADER_DATABASE_PASSWORD");

	@Override
	protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
		return application.sources(AccountsApplication.class);
	}

	public static void main(String[] args) throws Exception 
	{	
		SpringApplication.run(AccountsApplication.class, args);
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
				// Accounts Data Source
				//
				ContextResource accountsDataSource = new ContextResource();
				accountsDataSource.setName("jdbc/AccountsDataSource");
				accountsDataSource.setAuth("Container");
				accountsDataSource.setType(DataSource.class.getName());
				// Set Database Properties
				accountsDataSource.setProperty("driverClassName", driverClassName);
				accountsDataSource.setProperty("url", url);
				//accountsDataSource.setProperty("username", username);
				//accountsDataSource.setProperty("password", password);
				accountsDataSource.setProperty("maxActive", "100");
				accountsDataSource.setProperty("maxIdle", "30");
				accountsDataSource.setProperty("maxWait", "10000");
				context.getNamingResources().addResource(accountsDataSource);
			}
		};
		
	    return factory;
	}
	
}

