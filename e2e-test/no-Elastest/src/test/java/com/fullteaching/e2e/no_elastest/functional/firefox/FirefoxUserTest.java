package com.fullteaching.e2e.no_elastest.functional.firefox;

import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;

import com.fullteaching.e2e.no_elastest.functional.test.UserTest;
import com.fullteaching.e2e.no_elastest.webDriverFactory.FirefoxFactory;

import io.github.bonigarcia.wdm.FirefoxDriverManager;

@Ignore
@RunWith(Parameterized.class)
public class FirefoxUserTest extends UserTest {

	@BeforeClass
	public static void beforeClass() {
		FirefoxDriverManager.getInstance().setup();
		
		driver = FirefoxFactory.getWebDriver();
	}
	
	@AfterClass
	public static void tearOff() {
		FirefoxFactory.disposeWebDriver();
	}
}
