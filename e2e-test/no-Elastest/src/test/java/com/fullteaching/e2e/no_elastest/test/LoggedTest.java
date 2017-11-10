package com.fullteaching.e2e.no_elastest.test;

import org.junit.Before;
import org.junit.runners.Parameterized.Parameter;
import org.openqa.selenium.WebDriver;

import com.fullteaching.e2e.no_elastest.common.UserUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;

public class LoggedTest {

	protected static WebDriver driver;
	
	@Parameter(0)
	public String user; 
	
	@Parameter(1)
	public String password;
	
	@Parameter(2)
	public String roles;
	
	
	 @Before 
	 public void setUp() throws BadUserException, ElementNotFoundException, NotLoggedException {
			
	    	String logged_user = null; 
	    	boolean is_logged = true;
	    	
	    	//check if logged with correct user
	    	try {
	    		
				logged_user = UserUtilities.getLoggedUser(driver);
				if (!logged_user.equals(user)) {
					UserUtilities.logOut(driver);
					UserUtilities.checkLogOut(driver);
					is_logged = false;
				}
				
			} catch (NotLoggedException e) {
				//perfect we will log it after
				is_logged=false;
			}
	    	if (!is_logged) {
	    		driver = UserUtilities.login(driver, user, password);
	    	}
	    	driver = UserUtilities.checkLogin(driver, user);
	 
	    }
}
