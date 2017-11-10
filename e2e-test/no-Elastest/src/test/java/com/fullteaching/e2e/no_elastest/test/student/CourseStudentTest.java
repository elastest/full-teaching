package com.fullteaching.e2e.no_elastest.test.student;

import java.io.IOException;
import java.util.Collection;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.test.LoggedTest;
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;
import com.fullteaching.e2e.no_elastest.utils.Wait;

public class CourseStudentTest extends LoggedTest {
	
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
    	
    	NavigationUtilities.getUrlAndWaitFooter(driver,"http://localhost:5000/courses");
    	    	
    	WebElement course_button = Wait.ten(driver).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(FIRSTCOURSE_XPATH)));
    	course_button.click();
    	
    	//Check tabs
    	//Home tab 
    	try {
    		WebElement home_tab = driver.findElement(By.xpath(HOMETAB_XPATH));
    		home_tab.click();
    		Wait.one(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-0")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load home tab");
    	}
    	
    	try {
    		WebElement session_tab = driver.findElement(By.xpath(SESSIONSTAB_XPATH));
    		session_tab.click();
    		Wait.one(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-1")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load session tab");
    	}
    	
    	try {
    		WebElement forum_tab = driver.findElement(By.xpath(FORUMTAB_XPATH));
    		forum_tab.click();
    		Wait.one(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-2")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load forum tab");
    	}
    	
    	try {
    		WebElement files_tab = driver.findElement(By.xpath(FILESTAB_XPATH));
    		files_tab.click();
    		Wait.one(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-3")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load files tab");
    	}
    	
    	try {
    		WebElement attenders_tab = driver.findElement(By.xpath(ATTEDENDERSTAB_XPATH));
    		attenders_tab.click();
    		Wait.one(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-4")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load attenders tab");
    	}
    	
    }
    
    //Xpaths
    private static String FIRSTCOURSE_XPATH = "[@id=\"sticky-footer-div\"]/main/app-dashboard/div/div[3]/div/div[1]/ul/li[1]/div/div[1]";
    private static String HOMETAB_XPATH ="[@id=\"md-tab-label-0-0\"]/div";
    private static String SESSIONSTAB_XPATH ="[@id=\"md-tab-label-0-1\"]/div";
    private static String FORUMTAB_XPATH ="[@id=\"md-tab-label-0-2\"]/div";
    private static String FILESTAB_XPATH ="[@id=\"md-tab-label-0-3\"]/div";
    private static String ATTEDENDERSTAB_XPATH ="[@id=\"md-tab-label-0-4\"]/div";

    
}
