package com.fullteaching.e2e.no_elastest.functional.chrome;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import com.fullteaching.e2e.no_elastest.functional.test.LoggedForumTest;
import com.fullteaching.e2e.no_elastest.webDriverFactory.ChromeFactory;

import io.github.bonigarcia.wdm.ChromeDriverManager;

@RunWith(Parameterized.class)
public class ChromeLoggedForumTest extends LoggedForumTest{
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
