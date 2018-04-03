package com.fullteaching.e2e.no_elastest.functional.test.teacher;

import static java.lang.invoke.MethodHandles.lookup;
import static org.openqa.selenium.OutputType.BASE64;
import static org.openqa.selenium.logging.LogType.BROWSER;
import static org.slf4j.LoggerFactory.getLogger;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.Properties;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.slf4j.Logger;

import com.fullteaching.e2e.no_elastest.common.AttendersNavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.CourseNavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.ForumNavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.UserUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.ExceptionsHelper;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.common.exception.TimeOutExeception;
import com.fullteaching.e2e.no_elastest.utils.Click;
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;
import com.fullteaching.e2e.no_elastest.utils.SetUp;
import com.fullteaching.e2e.no_elastest.utils.Wait;
import static com.fullteaching.e2e.no_elastest.common.Constants.*;


abstract public class CourseTeacherTest {

	
	protected static WebDriver driver;
	
	@Parameter(0)
	public String user; 
	
	@Parameter(1)
	public String password;
	
	@Parameter(2)
	public String roles;
	
	protected String userName;

	protected String host=LOCALHOST;
	
	protected Properties properties;
	
	protected String courseName;
	
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
	    	
	    	properties = new Properties();
			try {
				// load a properties file for reading
				properties.load(new FileInputStream("src/test/resources/inputs/test.properties"));
				courseName = properties.getProperty("forum.test.course");
				
			} catch (IOException ex) {
				ex.printStackTrace();
			}  
	    	
	    	log.info("[End setUP]");
	    	
	    }
	 
	 @After
	 public void teardown() throws IOException {
        SetUp.tearDown(driver);
    }
	/* @After
	 public void tearDown()throws IOException {
		 if (driver != null) {
	            log.info("url:"+driver.getCurrentUrl()+"\nScreenshot (in Base64) at the end of the test:\n{}",
	                    getBase64Screenshot(driver));

	            log.info("Browser console at the end of the test");
	            LogEntries logEntries = driver.manage().logs().get(BROWSER);
	            logEntries.forEach((entry) -> log.info("[{}] {} {}",
	                    new Date(entry.getTimestamp()), entry.getLevel(),
	                    entry.getMessage()));
	        }
	    }
	 
	 private String getBase64Screenshot(WebDriver driver) throws IOException {
		 
	 	String screenshotBase64 = ((TakesScreenshot) driver)
                .getScreenshotAs(BASE64);
        return "data:image/png;base64," + screenshotBase64;
    }*/
		
	private static String course_title; 
	
	
	@Parameters
    public static Collection<String[]> data() throws IOException {
        return ParameterLoader.getTestTeachers();
    }
	
    
    @Test
    public void teacherCourseMainTest() {
    	
    	try {
    		if(!NavigationUtilities.amIHere(driver,COURSES_URL.replace("__HOST__", host)))
        		driver = NavigationUtilities.toCoursesHome(driver);
	    	    	
	    	WebElement course_button = Wait.notTooMuch(driver).until(ExpectedConditions.presenceOfElementLocated(By.xpath(FIRSTCOURSE_XPATH+GOTOCOURSE_XPATH)));
	    	Click.element(driver, By.xpath(FIRSTCOURSE_XPATH+GOTOCOURSE_XPATH));
	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(TABS_DIV_ID)));
    	}catch(Exception e) {
    		Assert.fail("Failed to load Courses Tabs"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	//Check tabs
    	//Home tab 
    	try {
    		driver = CourseNavigationUtilities.go2Tab(driver, HOME_ICON);	
    	} catch(Exception e) {
    		Assert.fail("Failed to load home tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		driver = CourseNavigationUtilities.go2Tab(driver, SESSION_ICON);	
    	} catch(Exception e) {
    		Assert.fail("Failed to load session tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		driver = CourseNavigationUtilities.go2Tab(driver, FORUM_ICON);
    	} catch(Exception e) {
    		Assert.fail("Failed to load forum tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		driver = CourseNavigationUtilities.go2Tab(driver, FILES_ICON);	
    	} catch(Exception e) {
    		Assert.fail("Failed to load files tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
    		driver = CourseNavigationUtilities.go2Tab(driver, ATTENDERS_ICON);	
    	} catch(Exception e) {
    		Assert.fail("Failed to load attenders tab"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    }
    
    
    @Test
    public void teacherNewCourseTest() {
    	
    	boolean found = false;
    	try {
	    	// navigate to courses if not there
	    	if (!NavigationUtilities.amIHere(driver, COURSES_URL.replace("__HOST__", host)))
	    		driver = NavigationUtilities.toCoursesHome(driver);
    	}catch (Exception e) {
    		Assert.fail("Failed to go to Courses "+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	try {
	    	// press new course button and wait for modal course-modal 
	    	WebElement new_course_button = Wait.notTooMuch(driver).until(ExpectedConditions.presenceOfElementLocated(By.xpath(NEWCOURSE_BUTTON_XPATH)));
	    	
	    	Click.byJS(driver,new_course_button);
    	
    	}catch (TimeoutException toe) {
    		Assert.fail("Button for new course not found");
    	}
    	
    	try {
    		Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(NEWCOURSE_MODAL));
    	}
    	catch (TimeoutException toe) {
    		Assert.fail("New course modal doesn't appear");
		}
    	
    	
    	//fill information
    	try {
	    	WebElement name_field = Wait.aLittle(driver).until(ExpectedConditions.presenceOfElementLocated(By.id(NEWCOURSE_MODAL_NAMEFIELD_ID)));
	    	course_title = "Test Course_"+System.currentTimeMillis();
	    	name_field.sendKeys(course_title); //no duplicated courses
    	}catch (TimeoutException toe) {
    		Assert.fail("New course modal doesn't appear");
    	}
    	
    	//Save
    	try {
	    	WebElement save_button = Wait.aLittle(driver).until(ExpectedConditions.presenceOfElementLocated(By.id(NEWCOURSE_MODAL_SAVE_ID)));
	    	driver = Click.element(driver, By.id(NEWCOURSE_MODAL_SAVE_ID));
    	}catch (TimeoutException toe) {
    		Assert.fail("New course modal doesn't appear");
    	} catch (ElementNotFoundException e) {
    		Assert.fail("Button failed");
		}
    	
    	//check if the course appears now in the list
    	try {
	
	    	Assert.assertTrue("The course title hasn't been found in the list ¿Have been created?",CourseNavigationUtilities.checkIfCourseExists(driver, course_title));
	    	
    	}catch (TimeoutException toe) {
    		Assert.fail("The courses list is not visible"); 
    	}
    	
    	//Well done!!!
    }
    
    
    @Test
    public void teacherEditCourseValues() {
    	
    	try {
	    	// navigate to courses if not there
	    	if (!NavigationUtilities.amIHere(driver, COURSES_URL.replace("__HOST__", host)))
	    		driver = NavigationUtilities.toCoursesHome(driver);
    	}catch(Exception e) {
    		Assert.fail("Failed to go to Courses "+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	// select first course (never mind which course -while application is in a test environment-)
    	// for more general testing use NavigationUtilities.newCourse but it will need some code rewriting.
    	
    	
    	//Modify name
    	try {
    		
    		WebElement course = CourseNavigationUtilities.getCourseElement(driver, courseName);
    		
    		String old_name = course.findElement(By.className("title")).getText();
    		String edition_name = "EDITION TEST_"+System.currentTimeMillis();
    		
    		driver = CourseNavigationUtilities.changeCourseName(driver, old_name, edition_name);
    		//check if course exists
	    	Assert.assertTrue("The course title hasn't been found in the list ¿Have been created?",CourseNavigationUtilities.checkIfCourseExists(driver, edition_name));

	    	//return to old name	    	
	    	driver = CourseNavigationUtilities.changeCourseName(driver, edition_name, old_name);
	    	Assert.assertTrue("The course title hasn't been reset",CourseNavigationUtilities.checkIfCourseExists(driver, old_name));

    	}catch (Exception e) {
    		Assert.fail("Failed to edit course name "+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	//Go to details and edit them
    	try {//*[@id="sticky-footer-div"]/main/app-dashboard/div/div[3]/div/div[1]/ul/li[1]/div/div[2]
    		    	    	
    		WebElement course = CourseNavigationUtilities.getCourseElement(driver, courseName);
    		course.findElement(COURSELIST_COURSETITLE).click();
	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(TABS_DIV_ID)));
	    	
    	}catch(Exception e) {
    		Assert.fail("Failed to load Courses Tabs "+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
  	
    	// Modify description TAB HOME
    	try {
    		driver = CourseNavigationUtilities.go2Tab(driver, HOME_ICON);
    		
    		//Modify the description
    		WebElement editdescription_button = driver.findElement(EDITDESCRIPTION_BUTTON);
    		driver = Click.element(driver, editdescription_button);
    		
    		//wait for editor md editor???'
    		WebElement editdescription_desc = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className(EDITDESCRIPTION_CONTENTBOX_CLASS)));
    		
    		//text here?? /html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[2]/div[1]/div/div[2]/p-editor/div/div[2]/div[1]
    		String old_desc = editdescription_desc.getAttribute("ng-reflect-model");
    		
    		//deletee old_desc
    		WebElement editor = driver.findElement(By.className("ql-editor"));
    		editor.sendKeys(SELECTALL);
    		editor.sendKeys(DELETE);
    		
    		//New Title
    		WebElement headerSelector = driver.findElement(By.className("ql-header"));
    		Click.element(driver, By.className("ql-header"));
    		WebElement picker_options = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className("ql-picker-options")));
    		WebElement option = NavigationUtilities.getOption(picker_options.findElements(By.className("ql-picker-item")), "Heading", NavigationUtilities.FindOption.ATTRIBUTE, "data-label");
    		
    		Assert.assertNotNull("Something went wrong while setting the Heading",option);
    		
    		driver  = Click.element(driver, option);
    		
    		//Write the new Title.
    		editor = driver.findElement(By.className("ql-editor"));
    		editor.sendKeys("New Title");
    		editor.sendKeys(NEWLINE);
    		
    		//New SubTitle
    		headerSelector = driver.findElement(By.className("ql-header"));
    		Click.element(driver, By.className("ql-header"));
    		picker_options = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className("ql-picker-options")));
    		option = NavigationUtilities.getOption(picker_options.findElements(By.className("ql-picker-item")), "Subheading", NavigationUtilities.FindOption.ATTRIBUTE, "data-label");

    		Assert.assertNotNull("Something went wrong while setting the Subheading",option);
    		
    		driver  = Click.element(driver, option);
    		
    		//Write the new SubTitle.
    		editor = driver.findElement(By.className("ql-editor"));
    		editor.sendKeys("New SubHeading");
    		editor.sendKeys(NEWLINE);
    		
    		//Content
    		headerSelector = driver.findElement(By.className("ql-header"));
    		Click.element(driver, By.className("ql-header"));
    		picker_options = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className("ql-picker-options")));
    		option = NavigationUtilities.getOption(picker_options.findElements(By.className("ql-picker-item")), "Normal", NavigationUtilities.FindOption.ATTRIBUTE, "data-label");

    		Assert.assertNotNull("Something went wrong while setting the Content",option);
    		
    		driver  = Click.element(driver, option);
    		
    		//Write the new Content.
    		editor = driver.findElement(By.className("ql-editor"));
    		editor.sendKeys("This is the normal content");
    		editor.sendKeys(NEWLINE);
    		
    		//preview? /html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[2]/div[1]/div/div[2]/div/a[2]
    		driver.findElement(By.xpath(EDITDESCRIPTION_PREVIEWBUTTON_XPATH)).click();
    		
    		WebElement preview = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className("ql-editor-custom")));
    		//chech heading
    		Assert.assertEquals("Heading not properly rendered", "New Title", preview.findElement(By.tagName("h1")).getText());
    		//check subtitle
    		Assert.assertEquals("Subheading not properly rendered", "New SubHeading", preview.findElement(By.tagName("h2")).getText());
    		//check content
    		Assert.assertEquals("Normal content not properly rendered", "This is the normal content", preview.findElement(By.tagName("p")).getText());
    		
    		//save send-info-btn
    		driver.findElement(EDITDESCRIPTION_SAVEBUTTON).click();
    		
    		WebElement saved = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className("ql-editor-custom")));
    		//chech heading
    		Assert.assertEquals("Heading not properly rendered", "New Title", saved.findElement(By.tagName("h1")).getText());
    		//check subtitle
    		Assert.assertEquals("Subheading not properly rendered", "New SubHeading", saved.findElement(By.tagName("h2")).getText());
    		//check content
    		Assert.assertEquals("Normal content not properly rendered", "This is the normal content", saved.findElement(By.tagName("p")).getText());
    		
    		    		
    	} catch(Exception e) {	
    		Assert.fail("Failed to modify description:: (File:CourseTeacherTest.java - line:"+ExceptionsHelper.getFileLineInfo(e.getStackTrace(), "CourseTeacherTest.java")+") "
    						+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	// in sessions program 
    	try {
    		driver = CourseNavigationUtilities.go2Tab(driver, SESSION_ICON);	
    		// new session ¡in session Tests!
    		// delete session ¡in session Tests!
    	} catch(Exception e) {	
    		Assert.fail("Failed to test session:: (File:CourseTeacherTest.java - line:"+ExceptionsHelper.getFileLineInfo(e.getStackTrace(), "CourseTeacherTest.java")+") "
    						+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	// in forum enable/disable
    	try {
    		driver = CourseNavigationUtilities.go2Tab(driver, FORUM_ICON);	
    		
    		WebElement forum_tab_content = CourseNavigationUtilities.getTabContent(driver, FORUM_ICON);		
    		
    		//check if Forum is enabled 
    		if(ForumNavigationUtilities.isForumEnabled(forum_tab_content)) {
    			//if (enabled)
    			//check entries ¡Only check if there is entries and all the buttons are present!
    			Assert.assertNotNull("Add Entry not found", forum_tab_content.findElement(FORUM_NEWENTRY_ICON));
    			Assert.assertNotNull("Add Entry not found", forum_tab_content.findElement(FORUM_EDITENTRY_ICON));
    			
    			//disable 
    			//clic edit
    			WebElement edit_button =  Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUM_EDITENTRY_ICON));
    			driver = Click.element(driver,FORUM_EDITENTRY_ICON);
    			WebElement edit_modal = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("put-delete-modal")));
    			//press disable
    			WebElement disable_button = edit_modal.findElement(DISABLEFORUM_BUTTON);
    			driver = Click.withNRetries(driver, DISABLEFORUM_BUTTON, 3, By.id("put-modal-btn"));
    			//disable_button.click();
    			WebElement save_button = edit_modal.findElement(By.id("put-modal-btn"));
    			driver = Click.element(driver,By.id("put-modal-btn"));
    			Assert.assertFalse("The forum is not dissabled", ForumNavigationUtilities.isForumEnabled(forum_tab_content));
    			
    			//enable
    			//clic edit
    			edit_button =  Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUM_EDITENTRY_ICON));
    			driver = Click.element(driver,FORUM_EDITENTRY_ICON);
    			edit_modal = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("put-delete-modal")));
    			//press disable
    			WebElement enable_button = edit_modal.findElement(ENABLEFORUM_BUTTON);
    			driver = Click.withNRetries(driver, ENABLEFORUM_BUTTON, 3, By.id("put-modal-btn"));
    			//enable_button.click();
    			save_button = edit_modal.findElement(By.id("put-modal-btn"));
    			driver = Click.element(driver, By.id("put-modal-btn"));
    			forum_tab_content = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-2")));
    			Assert.assertTrue("The forum is not dissabled", ForumNavigationUtilities.isForumEnabled(forum_tab_content));
    		}
    		else {
    		//else
    			//enable 
    			//clic edit
    			WebElement edit_button =  Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUM_EDITENTRY_ICON));
    			driver = Click.element(driver,FORUM_EDITENTRY_ICON);
    			WebElement edit_modal = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("put-delete-modal")));
    			//press disable
    			WebElement enable_button = edit_modal.findElement(ENABLEFORUM_BUTTON);
    			driver = Click.withNRetries(driver, ENABLEFORUM_BUTTON, 3, By.id("put-modal-btn"));
    			//enable_button.click();
    			WebElement save_button = edit_modal.findElement(By.id("put-modal-btn"));
    			driver = Click.element(driver,By.id("put-modal-btn"));
    			Assert.assertTrue("The forum is not enabled", ForumNavigationUtilities.isForumEnabled(forum_tab_content));
    			
    			//check entries  ¡Only check if there is entries and all the buttons are present!
    			Assert.assertNotNull("Add Entry not found", forum_tab_content.findElement(FORUM_NEWENTRY_ICON));
    			Assert.assertNotNull("Add Entry not found", forum_tab_content.findElement(FORUM_EDITENTRY_ICON));
    			
    			//disable 
    			//clic edit
    			edit_button =  Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUM_EDITENTRY_ICON));
    			driver = Click.element(driver,FORUM_EDITENTRY_ICON);
    			edit_modal = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("put-delete-modal")));
    			//press disable
    			WebElement disable_button = edit_modal.findElement(DISABLEFORUM_BUTTON);
    			driver = Click.withNRetries(driver, DISABLEFORUM_BUTTON, 3, By.id("put-modal-btn"));
    			//disable_button.click();
    			save_button = edit_modal.findElement(By.id("put-modal-btn"));
    			driver = Click.element(driver,By.id("put-modal-btn"));
    			Assert.assertFalse("The forum is not dissabled", ForumNavigationUtilities.isForumEnabled(forum_tab_content));
    		}
    		
    	} catch(Exception e) {	
    		Assert.fail("Failed to tests forum:: (File:CourseTeacherTest.java - line:"+ExceptionsHelper.getFileLineInfo(e.getStackTrace(), "CourseTeacherTest.java")+") "
    						+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	// in attenders
    	try {
    		driver = CourseNavigationUtilities.go2Tab(driver, ATTENDERS_ICON);
    		WebElement attenders_tab_content = CourseNavigationUtilities.getTabContent(driver, ATTENDERS_ICON);
    		
    		// check logged user 
    		//get attenders list
    		WebElement userRow = attenders_tab_content.findElement(By.className("user-attender-row"));
    		Assert.assertEquals("The main attender doesn't compare with loged user", userName, userRow.findElements(By.tagName("div")).get(2).getText().trim());
    		// add attenders -in test attenders
    		// delete attenders -in test attenders
    	}
    	 catch(Exception e) {	
     		Assert.fail("Failed to tests attenders:: (File: CourseTeacherTest.java -line: "+ExceptionsHelper.getFileLineInfo(e.getStackTrace(), "CourseTeacherTest.java")+") "
     						+ e.getClass()+ ": "+e.getLocalizedMessage());
     	}
    		
    	
    	//Well done!
    }
    
    @Test 
    public void teacherDeleteCourseTest() {
    	String courseName="";
    	// navigate to courses if not there
    	try {
	    	if (!NavigationUtilities.amIHere(driver, COURSES_URL.replace("__HOST__", host)))
	    		driver = NavigationUtilities.toCoursesHome(driver);
    	}catch (Exception e) {
    		Assert.fail("Failed to go to Courses "+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	// create a course 
    	try {
    		courseName= CourseNavigationUtilities.newCourse(driver, host);
		
    	} catch (ElementNotFoundException e) {
    		Assert.fail("Failed to create course:: "+ e.getClass()+ ": "+e.getLocalizedMessage());
		}
    	// populate course
	    	// in sessions program 
				// TODO: new session
    		// in attenders
				// TODO: add attenders
    	
    	// delete course  	
    	try {
    		WebElement course = CourseNavigationUtilities.getCourseElement(driver, courseName);
    		
    		
    		WebElement edit_name_button = course.findElement(EDITCOURSE_BUTTON);
    		
    	    Click.element(driver,edit_name_button);
    	    		
    	    //wait for edit modal
    	    WebElement edit_modal = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(EDITDELETE_MODAL));;
    	
    		//allow deletion
    		driver = Click.element(driver, ENABLECOURSE_DELETION_BUTTON);
    		
    		//delete	
    		driver = Click.withNRetries(driver, DELETECOURSE_BUTTON, 3, COURSELIST);
    		
    		Assert.assertFalse("The course have not been deleted", CourseNavigationUtilities.checkIfCourseExists(driver, courseName));
    		
    	} catch(Exception e) {
    		Assert.fail("Failed to deletecourse:: (File:CourseTeacherTest.java - line:"+ExceptionsHelper.getFileLineInfo(e.getStackTrace(), "CourseTeacherTest.java")+") "
						+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	//Well done!
    }
    
  
    
}
