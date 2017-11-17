package com.fullteaching.e2e.no_elastest.functional.test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.junit.Assert;
import org.junit.Test;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.SpiderNavigation;

public class UnLoggedLinksTests {

	protected static WebDriver driver; 
	protected static int DEPTH = 3;
	
	@Test
	public void spiderUnloggedTest() {
		/*navigate from home*/
		NavigationUtilities.getUrlAndWaitFooter(driver, "http://localhost:5000/");
				
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
