package com.fullteaching.e2e.no_elastest.functional.test;

import static java.lang.System.getProperty;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.SpiderNavigation;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import static com.fullteaching.e2e.no_elastest.common.Constants.*;

abstract public class UnLoggedLinksTests {

	protected static WebDriver driver; 
	protected static int DEPTH = 3;
	protected static String host = LOCALHOST;
	
	 @Before 
	    public void setUp() throws NotLoggedException, BadUserException {
			
	    	String appHost = getProperty("fullTeachingUrl");
	        if (appHost != null) {
	            host = appHost;
	        }
	 }
	@Test
	public void spiderUnloggedTest() {
		/*navigate from home*/
		NavigationUtilities.getUrlAndWaitFooter(driver, host);
				
		List <WebElement> pageLinks = SpiderNavigation.getPageLinks(driver);
		
		Map <String,String> explored = new HashMap<String,String>();
		
		//Navigate the links... 
		//Problem: once one is pressed the rest will be unusable as the page reloads... 

		explored = SpiderNavigation.exploreLinks(driver, pageLinks, explored, DEPTH);
		
		List<String> failed_links = new ArrayList<String>();
		
		explored.forEach((link,result) -> {if (result.equals("KO")) failed_links.add(link);});

		String msg = "";
		for (String failed: failed_links) {
			msg = failed +"\n";	
		}
		Assert.assertTrue(msg, failed_links.isEmpty());
	}
	
}
