package com.fullteaching.e2e.no_elastest.functional.test;

import static java.lang.System.getProperty;
import static java.lang.invoke.MethodHandles.lookup;

import org.junit.Before;
import org.junit.runners.Parameterized.Parameter;
import org.openqa.selenium.WebDriver;
import org.slf4j.Logger;

import com.fullteaching.e2e.no_elastest.common.UserUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.common.exception.TimeOutExeception;

import static org.slf4j.LoggerFactory.getLogger;


abstract public class LoggedTest {

	protected static WebDriver driver;
	
	@Parameter(0)
	public String user; 
	
	@Parameter(1)
	public String password;
	
	@Parameter(2)
	public String roles;
	
	protected String userName;

	protected String host="localhost";
	
	final Logger log = getLogger(lookup().lookupClass());
	
	 @Before 
	 public void setUp() throws BadUserException, ElementNotFoundException, NotLoggedException, TimeOutExeception {
			
	    	String logged_user = null; 
	    	boolean is_logged = true;
	    	
	    	String appHost = getProperty("fullTeachingUrl");
	        if (appHost != null) {
	            host = appHost;
	        }
	        
	        log.info("Test over url: http://"+host+":5000/");
	        
	    	//check if logged with correct user
	    	try {
	    		
				logged_user = UserUtilities.getLoggedUser(driver);
				if (!logged_user.equals(user)) {
					UserUtilities.logOut(driver,host);
					UserUtilities.checkLogOut(driver);
					is_logged = false;
				}
				
			} catch (NotLoggedException e) {
				//perfect we will log it after
				is_logged=false;
			}
	    	if (!is_logged) {
	    		driver = UserUtilities.login(driver, user, password, host);
	    	}
	    	driver = UserUtilities.checkLogin(driver, user);
	    	
	    	userName = UserUtilities.getUserName(driver, true, host);
	    }
}
