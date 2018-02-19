package com.fullteaching.e2e.no_elastest.functional.test.student;

import static java.lang.invoke.MethodHandles.lookup;
import static org.slf4j.LoggerFactory.getLogger;

import java.io.IOException;
import java.util.Collection;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.slf4j.Logger;

import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.UserUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.common.exception.TimeOutExeception;
import com.fullteaching.e2e.no_elastest.utils.Click;
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;
import com.fullteaching.e2e.no_elastest.utils.SetUp;
import com.fullteaching.e2e.no_elastest.utils.Wait;
import static com.fullteaching.e2e.no_elastest.common.Constants.*;


public abstract class CourseStudentTest {
	
	protected static WebDriver driver;
	
	@Parameter(0)
	public String user; 
	
	@Parameter(1)
	public String password;
	
	@Parameter(2)
	public String roles;
	
	protected String userName;

	protected String host=LOCALHOST;
	
	final  Logger log = getLogger(lookup().lookupClass());
	
	 @Before 
	 public void setUp() throws BadUserException, ElementNotFoundException, NotLoggedException, TimeOutExeception {
		 	
		 	log.info("[INI setUP]");    	
	    	
	    	host = SetUp.getHost();
	     
	        log.info("Test over url: "+host);
	        
	    	//check if logged with correct user
	    	driver = SetUp.loginUser(driver, host, user, password);
	    	
	    	driver = UserUtilities.checkLogin(driver, user);
	    	
	    	userName = UserUtilities.getUserName(driver, true, host);
	    	
	    	log.info("[End setUP]");
	    }
	 
	 @After
	 public void teardown() throws IOException {
        SetUp.tearDown(driver);
    }
	
	@Parameters
    public static Collection<String[]> data() throws IOException {
        return ParameterLoader.getTestStudents();
    }
    
    
    @Test
    public void studentCourseMainTest() {
    	
    	try {
    		if(!NavigationUtilities.amIHere(driver,COURSES_URL.replace("__HOST__", host)))
        		driver = NavigationUtilities.toCoursesHome(driver);
	    	    	
	    	WebElement course_button = Wait.notTooMuch(driver).until(ExpectedConditions.presenceOfElementLocated(By.xpath(FIRSTCOURSE_XPATH)));
	    	driver = Click.element(driver, By.xpath(FIRSTCOURSE_XPATH));
	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(TABS_DIV_ID)));
    	}catch(Exception e) {
    		Assert.fail("Failed to load Courses Tabs"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	//Check tabs
    	//Home tab 
    	try {
    		WebElement home_tab = driver.findElement(By.xpath(HOMETAB_XPATH));
    		String id = home_tab.getAttribute("id");
    		driver = Click.element(driver, By.xpath(HOMETAB_XPATH));
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(id.replace("label", "content"))));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load home tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		WebElement session_tab = driver.findElement(By.xpath(SESSIONSTAB_XPATH));
    		String id = session_tab.getAttribute("id");
    		driver = Click.element(driver, By.xpath(SESSIONSTAB_XPATH));
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(id.replace("label", "content"))));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load session tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		WebElement forum_tab = driver.findElement(By.xpath(FORUMTAB_XPATH));
    		String id = forum_tab.getAttribute("id");
    		driver = Click.element(driver, By.xpath(FORUMTAB_XPATH));
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(id.replace("label", "content"))));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load forum tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		WebElement files_tab = driver.findElement(By.xpath(FILESTAB_XPATH));
    		String id = files_tab.getAttribute("id");
    		driver = Click.element(driver, By.xpath(FILESTAB_XPATH));
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(id.replace("label", "content"))));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load files tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		WebElement attenders_tab = driver.findElement(By.xpath(ATTENDERSTAB_XPATH));
    		String id = attenders_tab.getAttribute("id");
    		driver = Click.element(driver, By.xpath(ATTENDERSTAB_XPATH));
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(id.replace("label", "content"))));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load attenders tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    }
    


}
