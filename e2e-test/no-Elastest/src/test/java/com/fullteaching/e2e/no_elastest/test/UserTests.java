package com.fullteaching.e2e.no_elastest.test;

import java.io.IOException;
import java.util.Collection;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.WebDriver;

import com.fullteaching.e2e.no_elastest.common.UserUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;


public class UserTests {

	
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
	
	@Test
	public void loginTest() {
		boolean isLogged = false;
		try {
			driver = UserUtilities.login(driver, user, password);
		
			driver = UserUtilities.checkLogin(driver, user);
			isLogged = true;
			
		} catch (NotLoggedException | BadUserException e) {
				// TODO Auto-generated catch block
			e.printStackTrace();
			Assert.fail("Not logged");
		}
		
		try {
			driver = UserUtilities.logOut(driver);
			
			driver = UserUtilities.checkLogin(driver, ""); //if BadUserException there is still a user logged
			
		} catch (NotLoggedException nle) {
			// TODO Auto-generated catch block
			isLogged = false;
		} 
		catch (BadUserException e) {
			Assert.fail("Still logged");
		}
		
		Assert.assertFalse(isLogged);

	}
	
	
	
}
