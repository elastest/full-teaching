package com.fullteaching.e2e.no_elastest.functional.test;

import static java.lang.System.getProperty;
import static java.lang.invoke.MethodHandles.lookup;
import static org.openqa.selenium.OutputType.BASE64;
import static org.openqa.selenium.logging.LogType.BROWSER;
import static org.slf4j.LoggerFactory.getLogger;

import java.io.IOException;
import java.util.Date;

import org.junit.After;
import org.junit.Before;
import org.junit.runners.Parameterized.Parameter;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.logging.LogEntries;
import org.slf4j.Logger;

import com.fullteaching.e2e.no_elastest.common.UserUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.common.exception.TimeOutExeception;




abstract public class LoggedTest {

	protected static WebDriver driver;
	
	@Parameter(0)
	public String user; 
	
	@Parameter(1)
	public String password;
	
	@Parameter(2)
	public String roles;
	
	protected String userName;

	protected String host="https://localhost:5000";
	
	final  Logger log = getLogger(lookup().lookupClass());
	
	 @Before 
	 public void setUp() throws BadUserException, ElementNotFoundException, NotLoggedException, TimeOutExeception {
		 	
		 	log.info("[INI setUP]");
	    	String logged_user = null; 
	    	boolean is_logged = true;
	    	
	    	String appHost = getProperty("fullTeachingUrl");
	        if (appHost != null) {
	            host = appHost;
	        }
	        
	        log.info("Test over url: "+host);
	        
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
	    	
	    	log.info("[End setUP]");
	    }
	 
	 @After
	 public void teardown() throws IOException {
        if (driver != null) {
            log.info("url:"+driver.getCurrentUrl()+"\nScreenshot (in Base64) at the end of the test:\n{}",
                    getBase64Screenshot());

            log.info("Browser console at the end of the test");
            LogEntries logEntries = driver.manage().logs().get(BROWSER);
            logEntries.forEach((entry) -> log.info("[{}] {} {}",
                    new Date(entry.getTimestamp()), entry.getLevel(),
                    entry.getMessage()));
        }
    }
	 protected String getBase64Screenshot() throws IOException {
		 
		 	String screenshotBase64 = ((TakesScreenshot) driver)
	                .getScreenshotAs(BASE64);
	        return "data:image/png;base64," + screenshotBase64;
	    }
}
