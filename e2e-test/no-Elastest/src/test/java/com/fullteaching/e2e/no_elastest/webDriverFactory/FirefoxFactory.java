package com.fullteaching.e2e.no_elastest.webDriverFactory;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.firefox.FirefoxDriver;

public class FirefoxFactory {
	
	static WebDriver driver;
	
	public static WebDriver getWebDriver() {
		if (driver == null) {
			driver = new FirefoxDriver();
		}
		return driver;
	}
	
	public static void disposeWebDriver() {
		if (driver !=null) {
			driver.close();
			driver = null;
		}
		
	}
	
	public static WebDriver newWebDriver() {
		return  new FirefoxDriver();
	}
}
