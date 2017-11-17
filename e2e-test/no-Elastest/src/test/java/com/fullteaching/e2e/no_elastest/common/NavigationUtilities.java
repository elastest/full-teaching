package com.fullteaching.e2e.no_elastest.common;

import org.openqa.selenium.By;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.utils.Wait;

public class NavigationUtilities {

	public static WebDriver getUrl(WebDriver wd, String url) {
		
		String currentUrl = wd.getCurrentUrl().trim();
		String compareUrl = url;
		
		if (currentUrl.endsWith("/") && !compareUrl.trim().endsWith("/")) {
			compareUrl=compareUrl.trim()+"/";
		}
		if (!currentUrl.endsWith("/")&& compareUrl.trim().endsWith("/")) {
			compareUrl=compareUrl.substring(0, compareUrl.length()-2);
		}
		
		if (!currentUrl.equals(compareUrl))
			wd.get(url);
	
		return wd; 
	}
	
	public static WebDriver getUrlAndWaitFooter(WebDriver wd, String url) {
		wd = getUrl( wd,  url);
		
		Wait.ten(wd).until(ExpectedConditions.visibilityOfElementLocated(By.className("page-footer")));
		
		return wd;
	}
	
	public static WebDriver toCoursesHome(WebDriver wd) {
		
		Wait.one(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id(coursesButtonId))).click();
		
		Wait.one(wd).until(ExpectedConditions.visibilityOfElementLocated(By.className("dashboard-title")));
		
		return wd; 
	}
	
	
	public static WebDriver clickWithNRetries(WebDriver wd, WebElement ele, int n, By waitFor) throws ElementNotFoundException {
		int i = 0;
		do {
			try {
				ele.click();
				Wait.one(wd).until(ExpectedConditions.visibilityOfElementLocated(waitFor));
				return wd;
			}
			catch(TimeoutException toe) {
				i ++;
			}
			
		}while(i<n);
		
		throw new ElementNotFoundException("Click doesn't work properly");
	}
	
	
	private static String coursesButtonId= "courses-button";
}
