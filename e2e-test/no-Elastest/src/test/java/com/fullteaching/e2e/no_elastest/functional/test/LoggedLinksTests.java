package com.fullteaching.e2e.no_elastest.functional.test;

import static java.lang.invoke.MethodHandles.lookup;
import static org.slf4j.LoggerFactory.getLogger;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.slf4j.Logger;

import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.SpiderNavigation;
import com.fullteaching.e2e.no_elastest.common.UserUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.common.exception.TimeOutExeception;
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;
import com.fullteaching.e2e.no_elastest.utils.SetUp;
import static com.fullteaching.e2e.no_elastest.common.Constants.*;

abstract public class LoggedLinksTests{
	
	protected static WebDriver driver;
	
	@Parameter(0)
	public String user; 
	
	@Parameter(1)
	public String password;
	
	@Parameter(2)
	public String roles;
	
	protected String userName;

	protected String host=LOCALHOST;
	
	final  Logger log = getLogger(lookup().lookupClass());
	
	 @Before 
	 public void setUp() throws BadUserException, ElementNotFoundException, NotLoggedException, TimeOutExeception {
		 	
		 	log.info("[INI setUP]");    	
	    	
	    	host = SetUp.getHost();
	     
	        log.info("Test over url: "+host);
	        
	    	//check if logged with correct user
	    	driver = SetUp.loginUser(driver, host, user, password);
	    	
	    	driver = UserUtilities.checkLogin(driver, user);
	    	
	    	userName = UserUtilities.getUserName(driver, true, host);
	    	
	    	log.info("[End setUP]");
	    }
	 
	 @After
	 public void teardown() throws IOException {
        SetUp.tearDown(driver);
    }
	
	protected static int DEPTH = 3;
	
	@Parameters
    public static Collection<String[]> data() throws IOException {
        return ParameterLoader.getTestUsers();
    }
	    
    
	@Test
	public void spiderLoggedTest() {
		
		/*navigate from home*/
		NavigationUtilities.getUrlAndWaitFooter(driver, host);
				
		List <WebElement> pageLinks = SpiderNavigation.getPageLinks(driver);
		
		Map <String,String> explored = new HashMap<String,String>();
		
		//Navigate the links... 
		//Problem: once one is pressed the rest will be unusable as the page reloads... 

		explored = SpiderNavigation.exploreLinks(driver, pageLinks, explored, DEPTH);
		
		List<String> failed_links = new ArrayList<String>();
		System.out.println(user+" tested "+explored.size()+" urls");
		explored.forEach((link,result) -> {
				log.debug("\t"+link+" => "+result);
				if (result.equals("KO")) {
					failed_links.add(link);				
				}			
		});

		String msg = "";
		for (String failed: failed_links) {
			msg = failed +"\n";	
		}
		Assert.assertTrue(msg, failed_links.isEmpty());
	}
	
}
