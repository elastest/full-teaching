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

import com.fullteaching.e2e.no_elastest.common.CourseNavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.ForumNavigationUtilities;
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
	    	    	
	    	WebElement course_button = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(FIRSTCOURSE_XPATH+GOTOCOURSE_XPATH)));
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
    	if (!NavigationUtilities.amIHere(driver, COURSES_URL))
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
	
	    	Assert.assertTrue("The course title hasn't been found in the list ¿Have been created?",CourseNavigationUtilities.checkIfCourseExists(driver, course_title));
	    	
    	}catch (TimeoutException toe) {
    		Assert.fail("The courses list is not visible"); 
    	}
    	
    	//Well done!!!
    }
    
    
    @Test
    public void teacherEditCourseValues() {
    	
    	// navigate to courses if not there
    	if (!NavigationUtilities.amIHere(driver, COURSES_URL))
    		driver = NavigationUtilities.toCoursesHome(driver);
    	
    	// select first course (never mind which course -while application is in a test environment-)
    	// for more general testing use NavigationUtilities.newCourse but it will need some code rewriting.
    	
    	
    	//Modify name
    	try {
    		WebElement edit_name_button = driver.findElement(By.xpath(FIRSTCOURSE_XPATH+EDITCOURSE_BUTTON_XPATH));
    		
    		edit_name_button.click();//if "normal" click doesn't work => Click.byJS(driver,edit_name_button);
    		
    		//wait for edit modal
    		WebElement edit_modal = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(EDITDELETE_MODAL_ID)));
    	
    		
    		//change name
    		WebElement name_field = edit_modal.findElement(By.id(EDITCOURSE_MODAL_NAMEFIELD_ID));

    		String old_name = name_field.getAttribute("value");
    		String edition_name = "EDITION TEST_"+System.currentTimeMillis();
    		name_field.clear();
    		name_field.sendKeys(edition_name);
    		
    		//save
    		WebElement save_button = edit_modal.findElement(By.id(EDITCOURSE_MODAL_SAVE_ID));
    		save_button.click();
    		
    		//check if course exists
	    	Assert.assertTrue("The course title hasn't been found in the list ¿Have been created?",CourseNavigationUtilities.checkIfCourseExists(driver, edition_name));

	    	//return to old name
	    	driver = CourseNavigationUtilities.changeCourseName(driver, edition_name, old_name);
	    	
    	}catch (Exception e) {
    		Assert.fail("Failed to edit course name "+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	//Go to details and edit them
    	try {//*[@id="sticky-footer-div"]/main/app-dashboard/div/div[3]/div/div[1]/ul/li[1]/div/div[2]
    		    	    	
	    	WebElement course_button = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(FIRSTCOURSE_XPATH)));
	    	course_button.click();
	    	Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id(TABS_DIV_ID)));
	    	
    	}catch(Exception e) {
    		Assert.fail("Failed to load Courses Tabs"+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	
    	// Modify description TAB HOME
    	try {
    		WebElement home_tab = driver.findElement(By.id(HOMETAB_ID));
    		home_tab.click();
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-0")));	
    		
    		
    		//Modify the description
    		WebElement editdescription_button = driver.findElement(By.xpath(EDITDESCRIPTION_BUTTON_XPATH));
    		editdescription_button.click();
    		
    		//wait for editor md editor???'
    		WebElement editdescription_desc = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className(EDITDESCRIPTION_CONTENTBOX_CLASS)));
    		
    		//text here?? /html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[2]/div[1]/div/div[2]/p-editor/div/div[2]/div[1]
    		String old_desc = editdescription_desc.getAttribute("ng-reflect-model");
    		
    		//deletee old_desc
    		WebElement editor = driver.findElement(By.className("ql-editor"));
    		editor.sendKeys(NavigationUtilities.SELECTALL);
    		editor.sendKeys(NavigationUtilities.DELETE);
    		
    		//New Title
    		WebElement headerSelector = driver.findElement(By.className("ql-header"));
    		headerSelector.click();
    		WebElement picker_options = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className("ql-picker-options")));
    		WebElement option = NavigationUtilities.getOption(picker_options.findElements(By.className("ql-picker-item")), "Heading", NavigationUtilities.FindOption.ATTRIBUTE, "data-label");
    		
    		Assert.assertNotNull("Something went wrong while setting the Heading",option);
    		
    		option.click();
    		
    		//Write the new Title.
    		editor = driver.findElement(By.className("ql-editor"));
    		editor.sendKeys("New Title");
    		editor.sendKeys(NavigationUtilities.NEWLINE);
    		
    		//New SubTitle
    		headerSelector = driver.findElement(By.className("ql-header"));
    		headerSelector.click();
    		picker_options = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className("ql-picker-options")));
    		option = NavigationUtilities.getOption(picker_options.findElements(By.className("ql-picker-item")), "Subheading", NavigationUtilities.FindOption.ATTRIBUTE, "data-label");

    		Assert.assertNotNull("Something went wrong while setting the Subheading",option);
    		
    		option.click();
    		
    		//Write the new SubTitle.
    		editor = driver.findElement(By.className("ql-editor"));
    		editor.sendKeys("New SubHeading");
    		editor.sendKeys(NavigationUtilities.NEWLINE);
    		
    		//Content
    		headerSelector = driver.findElement(By.className("ql-header"));
    		headerSelector.click();
    		picker_options = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className("ql-picker-options")));
    		option = NavigationUtilities.getOption(picker_options.findElements(By.className("ql-picker-item")), "Normal", NavigationUtilities.FindOption.ATTRIBUTE, "data-label");

    		Assert.assertNotNull("Something went wrong while setting the Content",option);
    		
    		option.click();
    		
    		//Write the new Content.
    		editor = driver.findElement(By.className("ql-editor"));
    		editor.sendKeys("This is the normal content");
    		editor.sendKeys(NavigationUtilities.NEWLINE);
    		
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
    		driver.findElement(By.id(EDITDESCRIPTION_SAVEBUTTON_ID)).click();
    		
    		WebElement saved = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.className("ql-editor-custom")));
    		//chech heading
    		Assert.assertEquals("Heading not properly rendered", "New Title", saved.findElement(By.tagName("h1")).getText());
    		//check subtitle
    		Assert.assertEquals("Subheading not properly rendered", "New SubHeading", saved.findElement(By.tagName("h2")).getText());
    		//check content
    		Assert.assertEquals("Normal content not properly rendered", "This is the normal content", saved.findElement(By.tagName("p")).getText());
    		
    		    		
    	} catch(Exception e) {	
    		Assert.fail("Failed to modify description:: (File: "+e.getStackTrace()[15].getFileName() +" -line: "+e.getStackTrace()[15].getLineNumber()+") "
    						+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	// in sessions program 
    	try {
    		WebElement session_tab = driver.findElement(By.id(SESSIONSTAB_ID));
    		session_tab.click();
    		Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-1")));	
    		// new session ¡in session Tests!
    		// delete session ¡in session Tests!
    	} catch(Exception e) {	
    		Assert.fail("Failed to test session:: (File: "+e.getStackTrace()[15].getFileName() +" -line: "+e.getStackTrace()[15].getLineNumber()+") "
    						+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	
    	// in forum enable/disable
    	try {
    		WebElement forum_tab = driver.findElement(By.id(FORUMTAB_ID));
    		forum_tab.click();
    		WebElement forum_tab_content = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-2")));	
    		
    		//check if Forum is enabled 
    		if(ForumNavigationUtilities.isForumEnabled(forum_tab_content)) {
    			//if (enabled)
    			//check entries ¡Only check if there is entries and all the buttons are present!
    			Assert.assertNotNull("Add Entry not found", forum_tab_content.findElement(By.id("add-entry-icon")));
    			Assert.assertNotNull("Add Entry not found", forum_tab_content.findElement(By.id("edit-forum-icon")));
    			
    			//disable 
    			//clic edit
    			WebElement edit_button =  Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("edit-forum-icon")));
    			edit_button.click();
    			WebElement edit_modal = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("put-delete-modal")));
    			//press disable
    			WebElement disable_button = edit_modal.findElement(By.xpath(DISABLEFORUM_BUTTON_XPATH));
    			Click.withNRetries(driver, disable_button, 3, By.id("put-modal-btn"));
    			//disable_button.click();
    			WebElement save_button = edit_modal.findElement(By.id("put-modal-btn"));
    			save_button.click();
    			Assert.assertFalse("The forum is not dissabled", ForumNavigationUtilities.isForumEnabled(forum_tab_content));
    			
    			//enable
    			//clic edit
    			edit_button =  Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("edit-forum-icon")));
    			edit_button.click();
    			edit_modal = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("put-delete-modal")));
    			//press disable
    			WebElement enable_button = edit_modal.findElement(By.xpath(ENABLEFORUM_BUTTON_XPATH));
    			Click.withNRetries(driver, enable_button, 3, By.id("put-modal-btn"));
    			//enable_button.click();
    			save_button = edit_modal.findElement(By.id("put-modal-btn"));
    			save_button.click();
    			forum_tab_content = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-2")));
    			Assert.assertTrue("The forum is not dissabled", ForumNavigationUtilities.isForumEnabled(forum_tab_content));
    		}
    		else {
    		//else
    			//enable 
    			//clic edit
    			WebElement edit_button =  Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("edit-forum-icon")));
    			edit_button.click();
    			WebElement edit_modal = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("put-delete-modal")));
    			//press disable
    			WebElement enable_button = edit_modal.findElement(By.xpath(ENABLEFORUM_BUTTON_XPATH));
    			Click.withNRetries(driver, enable_button, 3, By.id("put-modal-btn"));
    			//enable_button.click();
    			WebElement save_button = edit_modal.findElement(By.id("put-modal-btn"));
    			save_button.click();
    			Assert.assertTrue("The forum is not enabled", ForumNavigationUtilities.isForumEnabled(forum_tab_content));
    			
    			//check entries  ¡Only check if there is entries and all the buttons are present!
    			Assert.assertNotNull("Add Entry not found", forum_tab_content.findElement(By.id("add-entry-icon")));
    			Assert.assertNotNull("Add Entry not found", forum_tab_content.findElement(By.id("edit-forum-icon")));
    			
    			//disable 
    			//clic edit
    			edit_button =  Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("edit-forum-icon")));
    			edit_button.click();
    			edit_modal = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("put-delete-modal")));
    			//press disable
    			WebElement disable_button = edit_modal.findElement(By.xpath(DISABLEFORUM_BUTTON_XPATH));
    			Click.withNRetries(driver, disable_button, 3, By.id("put-modal-btn"));
    			//disable_button.click();
    			save_button = edit_modal.findElement(By.id("put-modal-btn"));
    			save_button.click();
    			Assert.assertFalse("The forum is not dissabled", ForumNavigationUtilities.isForumEnabled(forum_tab_content));
    		}
    		
    	} catch(Exception e) {	
    		Assert.fail("Failed to tests forum:: (File: "+e.getStackTrace()[15].getFileName() +" -line: "+e.getStackTrace()[15].getLineNumber()+") "
    						+ e.getClass()+ ": "+e.getLocalizedMessage());
    	}
    	// in attenders
    	try {
    		WebElement attenders_tab = driver.findElement(By.id(ATTEDENDERSTAB_ID));
    		attenders_tab.click();
    		WebElement attenders_tab_content = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-4")));
    		
    		// check logged user 
    		//get attenders list
    		WebElement userRow = attenders_tab_content.findElement(By.className("user-attender-row"));
    		Assert.assertEquals("The main attender doesn't compare with loged user", userName, userRow.findElements(By.tagName("div")).get(2).getText().trim());
    		// add attenders -in test attenders
    		// delete attenders -in test attenders
    	}
    	 catch(Exception e) {	
     		Assert.fail("Failed to tests attenders:: (File: "+e.getStackTrace()[15].getFileName() +" -line: "+e.getStackTrace()[15].getLineNumber()+") "
     						+ e.getClass()+ ": "+e.getLocalizedMessage());
     	}
    		
    	
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
    private static String FIRSTCOURSE_XPATH = "/html/body/app/div/main/app-dashboard/div/div[3]/div/div[1]/ul/li[1]/div";
    
    private static String GOTOCOURSE_XPATH = "/div[2]"; /*use with XCOURSE_XPATH+GOTOCOURSE_XPATH*/
 
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

    private static String EDITCOURSE_BUTTON_XPATH = "/div[3]/a";/*use with XCOURSE_XPATH+EDITCOURSE_BUTTON_XPATH*/
    private static String EDITDELETE_MODAL_ID = "put-delete-course-modal";
    private static String EDITCOURSE_MODAL_NAMEFIELD_ID = "inputPutCourseName";
    private static String EDITCOURSE_MODAL_SAVE_ID="submit-put-course-btn";
    
    private static String EDITDESCRIPTION_BUTTON_XPATH = "/html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[2]/div[1]/div/div[1]/a";
    private static String EDITDESCRIPTION_CONTENTBOX_CLASS = "ui-editor-content";
    private static String EDITDESCRIPTION_PREVIEWBUTTON_XPATH = "/html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[2]/div[1]/div/div[2]/div/a[2]";
    private static String EDITDESCRIPTION_SAVEBUTTON_ID = "send-info-btn";
    
    private static String DISABLEFORUM_BUTTON_XPATH = "/html/body/app/div/main/app-course-details/div/div[2]/div/div/form/div[1]/label";
    private static String ENABLEFORUM_BUTTON_XPATH = "/html/body/app/div/main/app-course-details/div/div[2]/div/div/form/div[1]/label";
    
    private static String COURSES_LIST_XPATH = "/html/body/app/div/main/app-dashboard/div/div[3]/div/div[1]/ul";
    
}
