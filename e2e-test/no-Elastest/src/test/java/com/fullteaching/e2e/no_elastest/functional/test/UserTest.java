package com.fullteaching.e2e.no_elastest.functional.test;

import static java.lang.System.getProperty;
import java.io.IOException;
import java.util.Collection;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.WebDriver;

import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.UserUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.common.exception.TimeOutExeception;
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;


abstract public class UserTest {

	
	protected static WebDriver driver;
	
	@Parameter(0)
	public String user; 
	
	@Parameter(1)
	public String password;
	
	@ Parameter(2)
	public String roles;

	
	private String host="localhost";
	
	
	@Parameters
    public static Collection<String[]> data() throws IOException {
        return ParameterLoader.getTestUsers();
    }
	
    @Before 
    public void setUp() throws NotLoggedException, BadUserException {
		
    	String appHost = getProperty("fullTeachingUrl");
        if (appHost != null) {
            host = appHost;
        }
        
    	try {	
    		NavigationUtilities.getUrlAndWaitFooter(driver, UserUtilities.login_url.replace("__HOST__", host));
    		
			driver = UserUtilities.checkLogOut(driver);
			
		} catch (ElementNotFoundException enfe) {
			driver = UserUtilities.logOut(driver,host);
		}
    }
    
    
	@Test
	public void loginTest() {
		try {
			driver = UserUtilities.login(driver, user, password, host);
		
			driver = UserUtilities.checkLogin(driver, user);

			Assert.assertTrue(true);
			
		} catch (NotLoggedException | BadUserException e) {
				
			e.printStackTrace();
			Assert.fail("Not logged");
			
		} catch (ElementNotFoundException e) {
			
			e.printStackTrace();
			Assert.fail(e.getLocalizedMessage());
			
		}  catch (TimeOutExeception e) {
			Assert.fail(e.getLocalizedMessage());
		} 
		
		try {
			driver = UserUtilities.logOut(driver,host);
			
			driver = UserUtilities.checkLogOut(driver);
			
		} catch (ElementNotFoundException enfe) {
			Assert.fail("Still logged");
			
		} catch (NotLoggedException e) {
			Assert.assertTrue(true);	
		}
			
		Assert.assertTrue(true);
	}
	
	
}
