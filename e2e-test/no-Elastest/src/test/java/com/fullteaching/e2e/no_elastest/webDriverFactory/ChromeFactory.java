package com.fullteaching.e2e.no_elastest.webDriverFactory;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

public class ChromeFactory {
	
	static WebDriver driver;
	
	public static WebDriver getWebDriver() {
		if (driver == null) {
			ChromeOptions options = new ChromeOptions();
			options.addArguments("--start-maximized");
			driver = new ChromeDriver(options);
			
		}
		return driver;
	}
	
	public static void disposeWebDriver() {
		if (driver !=null)
			driver.close();
	}
}
