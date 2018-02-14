package com.fullteaching.e2e.no_elastest.functional.chrome;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import com.fullteaching.e2e.no_elastest.functional.test.LoggedLinksTests;
import com.fullteaching.e2e.no_elastest.webDriverFactory.ChromeFactory;

import io.github.bonigarcia.wdm.ChromeDriverManager;

@Ignore
@RunWith(Parameterized.class)
public class ChromeLoggedLinkTest extends LoggedLinksTests {
	
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
