package com.fullteaching.e2e.no_elastest.functional.test;

import static java.lang.invoke.MethodHandles.lookup;
import static org.slf4j.LoggerFactory.getLogger;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.Properties;
import java.text.DateFormatSymbols;


import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Ignore;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.slf4j.Logger;

import com.fullteaching.e2e.no_elastest.common.CourseNavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.ForumNavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.UserUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.common.exception.TimeOutExeception;
import com.fullteaching.e2e.no_elastest.utils.Click;
import com.fullteaching.e2e.no_elastest.utils.DOMMannager;
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;
import com.fullteaching.e2e.no_elastest.utils.SetUp;
import com.fullteaching.e2e.no_elastest.utils.Wait;

import static com.fullteaching.e2e.no_elastest.common.Constants.*;


abstract public class LoggedForumTest {
	protected static WebDriver driver;
	
	@Parameter(0)
	public String user; 
	
	@Parameter(1)
	public String password;
	
	@Parameter(2)
	public String roles;
	
	protected String userName;

	protected String courseName; 

	protected String host=LOCALHOST;
	
	protected Properties properties; 
	
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
	    	
	    	/* Dedicated set up to Forum tests*/
	    	log.info("INI dedicated setUP");
	    	
	    	
	    	//LOAD PROPERTIES:
	    	properties = new Properties();
			try {
				// load a properties file for reading
				properties.load(new FileInputStream("src/test/resources/inputs/test.properties"));
				courseName = properties.getProperty("forum.test.course");
				
			} catch (IOException ex) {
				ex.printStackTrace();
			}  
			
	    	log.info("End dedicated setUP");
	    	/*END dedicated*/
	    	log.info("[End setUP]");
	    }
	 
	 @After
	 public void teardown() throws IOException {
		//TODO delete tested test if it is last test.
		 
        SetUp.tearDown(driver);
    }
	 
	@Parameters
    public static Collection<String[]> data() throws IOException {
        return ParameterLoader.getTestUsers();
    }
       
    
    @Test
    public void forumLoadEntriesTest() {
 	 	
    	try {
    		//navigate to courses.
    		if (!NavigationUtilities.amIHere(driver, COURSES_URL.replace("__HOST__", host))) {	
    			driver = NavigationUtilities.toCoursesHome(driver);	
    		}
    		List <String> courses = CourseNavigationUtilities.getCoursesList(driver, host);
    		
    		Assert.assertTrue("No courses in the list",courses.size()>0);
    		
    		//find course with forum activated 
    		boolean activated_forum_on_some_test=false;
    		boolean has_comments=false;
    		for (String course_name : courses) {
    			//go to each of the courses 
    			WebElement course = CourseNavigationUtilities.getCourseElement(driver, course_name);
    			course.findElement(COURSELIST_COURSETITLE).click();
    	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(TABS_DIV_ID)));
    	    	
    	    	//go to forum tab to check if enabled:
    	    	//load forum
    	    	driver = CourseNavigationUtilities.go2Tab(driver, FORUM_ICON);
    	    	if(ForumNavigationUtilities.isForumEnabled(ForumNavigationUtilities.getForumTabContent(driver))) {
    	    		activated_forum_on_some_test = true;
    	        	//Load list of entries
    	    		List <String> entries_list = ForumNavigationUtilities.getFullEntryList(driver);
    	    		if (entries_list.size()>0) {
    	    			
	    	        	//Go into first entry
    	    			for (String entry_name : entries_list) {
    	    				WebElement entry = ForumNavigationUtilities.getEntry(driver, entry_name);
    	    				Click.element(driver, entry.findElement(FORUMENTRYLIST_ENTRYTITLE));
    	    				//Load comments
    	        	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUMCOMMENTLIST));
    	        	    	List<WebElement>comments = ForumNavigationUtilities.getComments(driver);
    	    				if(comments.size()>0) {
    	    					has_comments = true;
    	    					List <WebElement> user_comments = ForumNavigationUtilities.getUserComments(driver, userName);  	    					
    	    				}//else go to next entry
    	    				driver = Click.element(driver, DOMMannager.getParent(driver, driver.findElement(BACK_TO_ENTRIESLIST_ICON)));
    	    			}
    	    		}//(else) if no entries go to next course
    	    		
    	    	}//(else) if forum no active go to next course
    	    	
    	    	driver = Click.element(driver, BACK_TO_DASHBOARD);
    		}
    		Assert.assertEquals("There isn't any forum that can be used to test this [Or not activated or no entry lists or not comments]",(activated_forum_on_some_test&&has_comments),true );
    		
    	}catch(ElementNotFoundException enfe) {
    		Assert.fail("Failed to navigate to courses forum:: "+ enfe.getClass()+ ": "+enfe.getLocalizedMessage());
    	}
    	
    	
    	
    }

    @Test
    public void forumNewEntryTest() {
    	
    	Calendar calendar = Calendar.getInstance();
    	calendar.setTimeInMillis(System.currentTimeMillis());

    	int mYear = calendar.get(Calendar.YEAR);
    	int mMonth = calendar.get(Calendar.MONTH);
    	int mDay = calendar.get(Calendar.DAY_OF_MONTH);
    	int mHour = calendar.get(Calendar.HOUR_OF_DAY);
    	int mMinute = calendar.get(Calendar.MINUTE);
    	int mSecond = calendar.get(Calendar.SECOND);
    	
    	String newEntryTitle = "New Entry Test "+ mDay+mMonth+mYear+mHour+mMinute+mSecond;
    	String newEntryContent = "This is the content written on the "+mDay+" of "+months[mMonth-1]+", " +mHour+":"+mMinute+","+mSecond ;
    	
    	try {
    		//navigate to courses.
    		if (!NavigationUtilities.amIHere(driver, COURSES_URL.replace("__HOST__", host))) {	
    			driver = NavigationUtilities.toCoursesHome(driver);	
    		}
    		WebElement course = CourseNavigationUtilities.getCourseElement(driver, courseName);
    		course.findElement(COURSELIST_COURSETITLE).click();
	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(TABS_DIV_ID)));
	    	driver = CourseNavigationUtilities.go2Tab(driver, FORUM_ICON);
	    	Assert.assertEquals("Forum not activated",ForumNavigationUtilities.isForumEnabled(ForumNavigationUtilities.getForumTabContent(driver)),true);
	    	
	    	driver = Click.element(driver, FORUM_NEWENTRY_ICON);
	    	
	    	//wait for modal
	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUM_NEWENTRY_MODAL));
	    	
	    	//fill new Entry
	    	WebElement title = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUM_NEWENTRY_MODAL_TITLE));
	    	title.sendKeys(newEntryTitle);
	    	WebElement comment = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUM_NEWENTRY_MODAL_CONTENT));
	    	comment.sendKeys(newEntryContent);
	    	
	    	//Publish
	    	Click.element(driver,FORUM_NEWENTRY_MODAL_POSTBUTTON);

	    	//Wait to publish
	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUMENTRYLIST_ENTRIESUL));
    		
	    	//Check entry... 
	    	WebElement newEntry = ForumNavigationUtilities.getEntry(driver, newEntryTitle);
	    	Assert.assertEquals("Incorrect user",newEntry.findElement(FORUMENTRYLIST_ENTRY_USER).getText(),userName);
	    	
	    	driver = Click.element(driver, newEntry.findElement(FORUMENTRYLIST_ENTRYTITLE));
	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUMCOMMENTLIST));
	    	WebElement entryTitleRow = driver.findElement(FORUMCOMMENTLIST_ENTRY_TITLE);
	    	Assert.assertEquals("Incorrect Entry Title", entryTitleRow.getText().split("\n")[0], newEntryTitle);
	    	Assert.assertEquals("Incorrect User for Entry", entryTitleRow.findElement(FORUMCOMMENTLIST_ENTRY_USER).getText(), userName);
	    	
	    	//first comment should be the inserted while creating the entry
	    	List<WebElement>comments = ForumNavigationUtilities.getComments(driver);
	    	Assert.assertFalse("No comments on the entry", comments.size()< 1);
	    	
	    	WebElement newComment = comments.get(0);
	    	Assert.assertEquals("Bad content of comment", newComment.findElement(FORUMCOMMENTLIST_COMMENT_CONTENT).getText(),newEntryContent);
	    	Assert.assertEquals("Bad user in comment", newComment.findElement(FORUMCOMMENTLIST_COMMENT_USER).getText(),userName);
	    	
    	}catch(ElementNotFoundException enfe) {
    		Assert.fail("Failed to navigate to course forum:: "+ enfe.getClass()+ ": "+enfe.getLocalizedMessage());
    	}
    	
    }
    
    protected  String months[] = {"January", "February", "March", "April",
            "May", "June", "July", "August", "September",
            "October", "November", "December"};

}
