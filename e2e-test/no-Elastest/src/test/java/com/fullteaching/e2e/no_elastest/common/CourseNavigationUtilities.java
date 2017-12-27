package com.fullteaching.e2e.no_elastest.common;

import static java.lang.invoke.MethodHandles.lookup;
import static org.slf4j.LoggerFactory.getLogger;

import java.util.List;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.slf4j.Logger;

import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.utils.Click;
import com.fullteaching.e2e.no_elastest.utils.Wait;

public class CourseNavigationUtilities {

	public static final  Logger log = getLogger(lookup().lookupClass());

	public static String newCourse(WebDriver wd, String host) throws ElementNotFoundException {
		boolean found = false;
    	
		
    	// navigate to courses if not there
		if (!NavigationUtilities.amIHere(wd, COURSES_URL.replace("__HOST__", host))) {
			
			wd = NavigationUtilities.toCoursesHome(wd);
		}

    	// press new course button and wait for modal course-modal 
	    WebElement new_course_button = Wait.notTooMuch(wd).until(ExpectedConditions.presenceOfElementLocated(By.xpath(NEWCOURSE_BUTTON_XPATH)));
	    Click.byJS(wd,new_course_button);
   	
	    Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id(NEWCOURSE_MODAL_ID)));
    	
    	
    	//fill information
    	WebElement name_field = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id(NEWCOURSE_MODAL_NAMEFIELD_ID)));
	    String course_title = "Test Course_"+System.currentTimeMillis();
	    name_field.sendKeys(course_title); //no duplicated courses
    	
    	WebElement save_button = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id(NEW_COURSE_MODAL_SAVE_ID)));
	    save_button.click();
    	    	
    	//check if the course appears now in the list
    	WebElement courses_list = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(COURSES_LIST_XPATH)));
	    	
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
	    if (! found) {
	    	throw new ElementNotFoundException("Course hasn't been created");
	    }
		return course_title;
	}
	
	public static boolean checkIfCourseExists(WebDriver wd, String course_title) {
		WebElement courses_list = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(COURSES_LIST_XPATH)));
    	
    	//find the newly create course
    	List<WebElement> courses = courses_list.findElements(By.tagName("li"));
    	
    	for (WebElement c : courses) {
    		try {
    			WebElement title = c.findElement(By.className("title"));
    			String title_text = title.getText();
    			if(course_title.equals(title_text)) {
    				return true;
    			}
    		}
    		catch(NoSuchElementException csee) {
    			//do nothing and look for the next item
    		}
    	}
    	return false;
	}
	
	public static WebDriver changeCourseName(WebDriver wd, String oldName, String newName) throws ElementNotFoundException {
		boolean found = false;
		WebElement courses_list = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.xpath(COURSES_LIST_XPATH)));
    	
    	//find the newly create course
    	List<WebElement> courses = courses_list.findElements(By.tagName("li"));
    	int i = 1;
    	for (WebElement c : courses) {
    		try {
    			log.info("Course ["+i+"]");
    			WebElement title = c.findElement(By.className("title"));
    			String title_text = title.getText();
    			if(oldName.equals(title_text)) {
    				
    				WebElement edit_name_button = wd.findElement(By.xpath(FIRSTCOURSE_XPATH+EDITCOURSE_BUTTON_XPATH));
    	    		
    	    		edit_name_button.click();//if "normal" click doesn't work => Click.byJS(driver,edit_name_button);
    	    		
    	    		//wait for edit modal
    	    		WebElement edit_modal = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id(EDITDELETE_MODAL_ID)));
    				//change name
    				WebElement name_field = edit_modal.findElement(By.id(EDITCOURSE_MODAL_NAMEFIELD_ID));

    				name_field.clear();
    				name_field.sendKeys(newName);
    				
    				//save
    				WebElement save_button = edit_modal.findElement(By.id(EDITCOURSE_MODAL_SAVE_ID));
    				save_button.click();
    				found=true;
    				break;
    			}
    		}
    		catch(NoSuchElementException csee) {
    			//do nothing and look for the next item
    		}
    		i++;
    	}
    	
    	if (!found) throw new ElementNotFoundException("Course "+oldName +"doesn't exists");
    	
    	return wd;
		
	}
	
	public static WebElement getCourseElement(WebDriver wd, String name) throws ElementNotFoundException {
		WebElement courses_list = Wait.notTooMuch(wd).until(ExpectedConditions.presenceOfElementLocated(By.xpath(COURSES_LIST_XPATH)));
    	
    	//find the newly create course
    	List<WebElement> courses = courses_list.findElements(By.tagName("li"));
    	
    	for (WebElement c : courses) {
    		try {
    			WebElement title = c.findElement(By.className("title"));
    			String title_text = title.getText();
    			if(name.equals(title_text)) {
    				
    				return c;
    			}
    		}
    		catch(NoSuchElementException csee) {
    			//do nothing and look for the next item
    		}
    	}
    	
    	throw new ElementNotFoundException("the course doesn't exist");
	}
	
	private static String COURSES_URL = "__HOST__/courses";
	   
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
    
    private static String COURSES_LIST_XPATH = "/html/body/app/div/main/app-dashboard/div/div[3]/div/div[1]/ul";
}