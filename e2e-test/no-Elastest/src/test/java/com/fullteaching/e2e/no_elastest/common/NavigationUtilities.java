package com.fullteaching.e2e.no_elastest.common;

import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.utils.Wait;

public class NavigationUtilities {

	public static boolean amIHere(WebDriver wd, String url) {
		String currentUrl = wd.getCurrentUrl().trim();
		String compareUrl = url;
		
		if (currentUrl.endsWith("/") && !compareUrl.trim().endsWith("/")) {
			compareUrl=compareUrl.trim()+"/";
		}
		if (!currentUrl.endsWith("/")&& compareUrl.trim().endsWith("/")) {
			compareUrl=compareUrl.substring(0, compareUrl.length()-2);
		}
		
		return (currentUrl.equals(compareUrl));
	}
	
	public static WebDriver getUrl(WebDriver wd, String url) {
		
		if (!amIHere(wd, url))
			wd.get(url);
	
		return wd; 
	}
	
	public static WebDriver getUrlAndWaitFooter(WebDriver wd, String url) {
		
		wd = getUrl( wd,  url);
		
		Wait.notTooMuch(wd).until(ExpectedConditions.presenceOfElementLocated(By.className("page-footer")));
		
		return wd;
	}
	
	public static WebDriver toCoursesHome(WebDriver wd) {
		
		WebElement button = Wait.aLittle(wd).until(ExpectedConditions.presenceOfElementLocated(By.id(coursesButtonId)));
		
		button.click();
		
		Wait.notTooMuch(wd).until(ExpectedConditions.presenceOfElementLocated(By.className("dashboard-title")));
		
		return wd; 
	}
	
	public static WebElement getOption(List<WebElement> options, String find, FindOption type, String attribute) {
		

		
		for (WebElement option: options) {
			switch(type) {
				case CLASS: 
						if (find.equals(option.getAttribute("class")))
							return option;		
						break;
				case TEXT:
						if (find.equals(option.getText()))
							return option;
						break;
				case VALUE:
						if (find.equals(option.getAttribute("value")))
							return option;
						break;
				default:
						if (find.equals(option.getAttribute(attribute)))
							return option;
						break;	
			}
		}
		
		return null;
		
	}
	
	private static String coursesButtonId= "courses-button";
	
	public static String SELECTALL = Keys.chord(Keys.CONTROL, "a");
	public static String NEWLINE= Keys.chord(Keys.ENTER);
	public static String DELETE= Keys.chord(Keys.BACK_SPACE);

	public enum FindOption {
	    CLASS, TEXT, VALUE, ATTRIBUTE
	}

}
