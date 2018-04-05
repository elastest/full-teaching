package com.fullteaching.e2e.no_elastest.functional.chrome;

import org.junit.AfterClass;
import org.junit.BeforeClass;

import com.fullteaching.e2e.no_elastest.functional.test.UnLoggedLinksTests;
import com.fullteaching.e2e.no_elastest.webDriverFactory.ChromeFactory;

import io.github.bonigarcia.wdm.ChromeDriverManager;


public class ChromeUnLoggedLinkTest extends UnLoggedLinksTests {
	
	@BeforeClass
	public static void beforeClass() {
		ChromeDriverManager.getInstance().setup();
		
		driver = ChromeFactory.getWebDriver();
	}
	
	@AfterClass
	public static void tearOff() {
		ChromeFactory.disposeWebDriver();
	}
}
