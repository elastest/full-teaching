package com.fullteaching.e2e.no_elastest.functional.test.teacher;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

import org.junit.Assert;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.Point;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.functional.test.LoggedTest;
import com.fullteaching.e2e.no_elastest.utils.Click;
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
		
	private static String course_title; 
	
	
	@Parameters
    public static Collection<String[]> data() throws IOException {
        return ParameterLoader.getTestTeachers();
    }
	
    
    @Test
    public void teacherCourseMainTest() {
    	
    	try {
    		if(!NavigationUtilities.amIHere(driver,COURSES_URL))
        		driver = NavigationUtilities.toCoursesHome(driver);
	    	    	
	    	WebElement course_button = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(FIRSTCOURSE_XPATH)));
	    	course_button.click();
	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(TABS_DIV_ID)));
    	}catch(Exception e) {
    		Assert.fail("Failed to load Courses Tabs"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	//Check tabs
    	//Home tab 
    	try {
    		WebElement home_tab = driver.findElement(By.id(HOMETAB_ID));
    		home_tab.click();
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-0")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load home tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		WebElement session_tab = driver.findElement(By.id(SESSIONSTAB_ID));
    		session_tab.click();
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-1")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load session tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		WebElement forum_tab = driver.findElement(By.id(FORUMTAB_ID));
    		forum_tab.click();
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-2")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load forum tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		WebElement files_tab = driver.findElement(By.id(FILESTAB_ID));
    		files_tab.click();
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-3")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load files tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		WebElement attenders_tab = driver.findElement(By.id(ATTEDENDERSTAB_ID));
    		attenders_tab.click();
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-4")));	
    	} catch(Exception e) {
    		Assert.fail("Failed to load attenders tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    }
    
    
    @Test
    public void teacherNewCourseTest() {
    	
    	boolean found = false;
    	
    	// navigate to courses if not there
    	driver = NavigationUtilities.toCoursesHome(driver);

    	try {
	    	// press new course button and wait for modal course-modal 
	    	WebElement new_course_button = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(NEWCOURSE_BUTTON_XPATH)));
	    	
	    	Click.byJS(driver,new_course_button);
    	
    	}catch (TimeoutException toe) {
    		Assert.fail("Button for new course not found");
    	}
    	
    	try {
    		Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(NEWCOURSE_MODAL_ID)));
    	}
    	catch (TimeoutException toe) {
    		Assert.fail("New course modal doesn't appear");
		}
    	
    	
    	//fill information
    	try {
	    	WebElement name_field = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(NEWCOURSE_MODAL_NAMEFIELD_ID)));
	    	course_title = "Test Course_"+System.currentTimeMillis();
	    	name_field.sendKeys(course_title); //no duplicated courses
    	}catch (TimeoutException toe) {
    		Assert.fail("New course modal doesn't appear");
    	}
    	
    	//Save
    	try {
	    	WebElement save_button = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(NEW_COURSE_MODAL_SAVE_ID)));
	    	save_button.click();
    	}catch (TimeoutException toe) {
    		Assert.fail("New course modal doesn't appear");
    	}
    	
    	//check if the course appears now in the list
    	try {
	    	WebElement courses_list = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(COURSES_LIST_XPATH)));
	    	
	    	//find the newly create course
	    	List<WebElement> courses = courses_list.findElements(By.tagName("li"));
	    	
	    	for (WebElement c : courses) {
	    		try {
	    			WebElement title = c.findElement(By.className("title"));
	    			String title_text = title.getText();
	    			if(course_title.equals(title_text)) {
	    				found = true;
	    				break;
	    			}
	    		}
	    		catch(NoSuchElementException csee) {
	    			//do nothing and look for the next item
	    		}
	    	}
	    	Assert.assertTrue("The course title hasn't been found in the list ¿Have been created?",found);
	    	
    	}catch (TimeoutException toe) {
    		Assert.fail("The courses list is not visible"); 
    	}
    	
    	//Well done!!!
    }
    
    @Ignore
    @Test
    public void teacherEditCourseValues() {
    	// navigate to courses if not there
    	
    	// select first course (never mind which course -while application is in a test environment-)
    	
    	// in home modify description
    	
    	// in sessions program 
    		// new session
    		// delete session
    	
    	// in forum enable/disable
    	
    	// in attenders
    		// add attenders
    		// delete attenders
    	
    	//Well done!
    }
    
    @Ignore
    @Test 
    public void teacherDeleteCourseTest() {
    	// navigate to courses if not there
    	
    	// create a course 
    	
    	// populate course
	    	// in sessions program 
				// new session
    		// in attenders
				// add attenders
    	
    	// delete course  	
    	
    	//Well done!
    }
    
    private static String COURSES_URL = "http://localhost:5000/courses";
   
    //Xpaths and ids
    private static String FIRSTCOURSE_XPATH = "/html/body/app/div/main/app-dashboard/div/div[3]/div/div[1]/ul/li[1]/div/div[2]";
    private static String TABS_DIV_ID ="tabs-course-details";
    private static String HOMETAB_ID ="md-tab-label-0-0";
    private static String SESSIONSTAB_ID ="md-tab-label-0-1";
    private static String FORUMTAB_ID ="md-tab-label-0-2";
    private static String FILESTAB_ID ="md-tab-label-0-3";
    private static String ATTEDENDERSTAB_ID ="md-tab-label-0-4";

    private static String NEWCOURSE_BUTTON_XPATH = "/html/body/app/div/main/app-dashboard/div/div[3]/div/div[1]/div/a";
    private static String NEWCOURSE_MODAL_ID = "course-modal";
    private static String NEWCOURSE_MODAL_NAMEFIELD_ID = "inputPostCourseName";
    private static String NEW_COURSE_MODAL_SAVE_ID="submit-post-course-btn";
    
    private static String COURSES_LIST_XPATH = "/html/body/app/div/main/app-dashboard/div/div[3]/div/div[1]/ul";
    
}
