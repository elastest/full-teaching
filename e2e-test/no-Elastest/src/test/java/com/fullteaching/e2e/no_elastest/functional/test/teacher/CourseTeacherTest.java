package com.fullteaching.e2e.no_elastest.functional.test.teacher;

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
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;
import com.fullteaching.e2e.no_elastest.utils.Wait;

public class CourseTeacherTest extends LoggedTest{

	
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
        return ParameterLoader.getTestTeachers();
    }
	
    
    @Test
    public void teacherCourseMainTest() {
    	
    	//navigate to first course

    	driver = NavigationUtilities.toCoursesHome(driver);
    	    	
    	WebElement course_button = Wait.ten(driver).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(FIRSTCOURSE_XPATH)));
    	course_button.click();
    	
    	//Check tabs
    	//Home tab 
    	try {
    		WebElement home_tab = driver.findElement(By.id(HOMETAB_ID));
    		home_tab.click();
    		Wait.one(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-0")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load home tab");
    	}
    	
    	try {
    		WebElement session_tab = driver.findElement(By.id(SESSIONSTAB_ID));
    		session_tab.click();
    		Wait.one(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-1")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load session tab");
    	}
    	
    	try {
    		WebElement forum_tab = driver.findElement(By.id(FORUMTAB_ID));
    		forum_tab.click();
    		Wait.one(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-2")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load forum tab");
    	}
    	
    	try {
    		WebElement files_tab = driver.findElement(By.id(FILESTAB_ID));
    		files_tab.click();
    		Wait.one(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-3")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load files tab");
    	}
    	
    	try {
    		WebElement attenders_tab = driver.findElement(By.id(ATTEDENDERSTAB_ID));
    		attenders_tab.click();
    		Wait.one(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-4")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load attenders tab");
    	}
    	
    }
    
    //Xpaths and ids
    private static String FIRSTCOURSE_XPATH = "/html/body/app/div/main/app-dashboard/div/div[2]/div/div[1]/ul/li[1]/div/div[2]";
    private static String HOMETAB_ID ="md-tab-label-0-0";
    private static String SESSIONSTAB_ID ="md-tab-label-0-1";
    private static String FORUMTAB_ID ="md-tab-label-0-2";
    private static String FILESTAB_ID ="md-tab-label-0-3";
    private static String ATTEDENDERSTAB_ID ="md-tab-label-0-4";

    
}
