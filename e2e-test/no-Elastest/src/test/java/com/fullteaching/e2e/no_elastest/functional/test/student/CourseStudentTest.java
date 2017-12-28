package com.fullteaching.e2e.no_elastest.functional.test.student;

import java.io.IOException;
import java.util.Collection;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.functional.test.LoggedTest;
import com.fullteaching.e2e.no_elastest.utils.Click;
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;
import com.fullteaching.e2e.no_elastest.utils.Wait;

public abstract class CourseStudentTest extends LoggedTest {
	
	/* In super class Logged Test:
	
		@Parameter(0)
		public String user; 
		
		@Parameter(1)
		public String password;
		
		@Parameter(2)
		public String roles;	
	*/	
	
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
    
    //Xpaths and ids
    private static String COURSES_URL = "__HOST__/courses";
    
    //Xpaths and ids
    private static String FIRSTCOURSE_XPATH = "/html/body/app/div/main/app-dashboard/div/div[2]/div/div[1]/ul/li[1]/div/div[2]";
     
    private static String TABS_DIV_ID ="tabs-course-details";
    private static String HOMETAB_XPATH ="/html/body/app/div/main/app-course-details/div/div[3]/md-tab-group/div[1]/div[1]";
    private static String SESSIONSTAB_XPATH ="/html/body/app/div/main/app-course-details/div/div[3]/md-tab-group/div[1]/div[2]";
    private static String FORUMTAB_XPATH ="/html/body/app/div/main/app-course-details/div/div[3]/md-tab-group/div[1]/div[3]";
    private static String FILESTAB_XPATH ="/html/body/app/div/main/app-course-details/div/div[3]/md-tab-group/div[1]/div[4]";
    private static String ATTENDERSTAB_XPATH ="/html/body/app/div/main/app-course-details/div/div[3]/md-tab-group/div[1]/div[5]";

}
