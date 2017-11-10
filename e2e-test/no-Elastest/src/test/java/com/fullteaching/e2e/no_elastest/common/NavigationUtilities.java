package com.fullteaching.e2e.no_elastest.common;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;

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
}
