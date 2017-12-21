package com.fullteaching.e2e.no_elastest.functional.test;

import static java.lang.System.getProperty;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.WebElement;

import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.SpiderNavigation;
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;

abstract public class LoggedLinksTests extends LoggedTest {
	
	/* In super class Logged Test:
	
		@Parameter(0)
		public String user; 
		
		@Parameter(1)
		public String password;
		
		@Parameter(2)
		public String roles;	
	*/	
	protected static String host ="localhost";
	
	protected static int DEPTH = 3;
	
	@Parameters
    public static Collection<String[]> data() throws IOException {
        return ParameterLoader.getTestUsers();
    }
	    
    @Before
    public void setUp() {
    	String appHost = getProperty("fullTeachingUrl");
        if (appHost != null) {
            host = appHost;
        }
    }
    
	@Test
	public void spiderLoggedTest() {
		
		/*navigate from home*/
		NavigationUtilities.getUrlAndWaitFooter(driver, "http://"+host+":5000/");
				
		List <WebElement> pageLinks = SpiderNavigation.getPageLinks(driver);
		
		Map <String,String> explored = new HashMap<String,String>();
		
		//Navigate the links... 
		//Problem: once one is pressed the rest will be unusable as the page reloads... 

		explored = SpiderNavigation.exploreLinks(driver, pageLinks, explored, DEPTH);
		
		List<String> failed_links = new ArrayList<String>();
		System.out.println(user+" tested "+explored.size()+" urls");
		explored.forEach((link,result) -> {
				System.out.println("\t"+link+" => "+result);
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
