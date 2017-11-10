package com.fullteaching.e2e.no_elastest.test;

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
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;


public class UserTest {

	
	protected static WebDriver driver;
	
	@Parameter(0)
	public String user; 
	
	@Parameter(1)
	public String password;
	
	@ Parameter(2)
	public String roles;
	
	
	@Parameters
    public static Collection<String[]> data() throws IOException {
        return ParameterLoader.getTestUsers();
    }
	
    @Before 
    public void setUp() throws NotLoggedException, BadUserException {
		
    	try {	
    		NavigationUtilities.getUrlAndWaitFooter(driver, UserUtilities.login_url);
    		
			driver = UserUtilities.checkLogOut(driver);
			
		} catch (ElementNotFoundException enfe) {
			driver = UserUtilities.logOut(driver);
		}
    }
    
    
	@Test
	public void loginTest() {
		try {
			driver = UserUtilities.login(driver, user, password);
		
			driver = UserUtilities.checkLogin(driver, user);

			Assert.assertTrue(true);
			
		} catch (NotLoggedException | BadUserException e) {
				
			e.printStackTrace();
			Assert.fail("Not logged");
			
		} catch (ElementNotFoundException e) {
			
			e.printStackTrace();
			Assert.fail(e.getLocalizedMessage());
		}
		
		try {
			driver = UserUtilities.logOut(driver);
			
			driver = UserUtilities.checkLogOut(driver);
			
		} catch (ElementNotFoundException enfe) {
			Assert.fail("Still logged");
			
		} catch (NotLoggedException e) {
			Assert.assertTrue(true);
		} 
			
		Assert.assertTrue(true);
	}
	
	
}
