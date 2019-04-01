package com.fullteaching.e2e.no_elastest.common;

import static java.lang.invoke.MethodHandles.lookup;
import static org.slf4j.LoggerFactory.getLogger;

import java.util.ArrayList;
import java.util.List;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.slf4j.Logger;

import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.utils.Click;
import com.fullteaching.e2e.no_elastest.utils.DOMMannager;
import com.fullteaching.e2e.no_elastest.utils.Wait;
import static com.fullteaching.e2e.no_elastest.common.Constants.*;

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
   	
	    Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(NEWCOURSE_MODAL));
    	
    	
    	//fill information
    	WebElement name_field = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id(NEWCOURSE_MODAL_NAMEFIELD_ID)));
	    String course_title = "Test Course_"+System.currentTimeMillis();
	    name_field.sendKeys(course_title); //no duplicated courses
    	
    	WebElement save_button = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id(NEWCOURSE_MODAL_SAVE_ID)));
	    Click.element(wd, By.id(NEWCOURSE_MODAL_SAVE_ID));
    	    	
    	//check if the course appears now in the list
    	WebElement courses_list = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(COURSELIST));
	    	
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
	    	log.error("newCourse - Course hasn't been created");
	    	throw new ElementNotFoundException("newCourse - Course hasn't been created");
	    }
		return course_title;
	}
	
	public static boolean checkIfCourseExists(WebDriver wd, String course_title) {
		WebElement courses_list = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(COURSELIST));
    	
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
		
		log.info("[INI] changeCourseName({}=>{})",oldName,  newName);
		
		boolean found = false;
		WebElement courses_list = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(COURSELIST));
    	
		try {
			//find the course 
			WebElement c = getCourseElement(wd, oldName);
			
			WebElement edit_name_button = c.findElement(EDITCOURSE_BUTTON);
    	    		
    	    Click.element(wd,edit_name_button);
    	    		
    	    //wait for edit modal
    	    WebElement edit_modal = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(EDITDELETE_MODAL));
    				//change name
    		WebElement name_field = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(EDITCOURSE_MODAL_NAMEFIELD));
    		name_field.clear();
    		name_field.sendKeys(newName);
    				
    		//save
    		WebElement save_button = edit_modal.findElement(By.id(EDITCOURSE_MODAL_SAVE_ID));
    		Click.element(wd, EDITCOURSE_MODAL_SAVE);
    		
		}catch(NoSuchElementException csee) {
    		log.info("[END] changeCourseName KO: changeCourseName - Course \"{}\" probably doesn't exists",oldName);
			throw new ElementNotFoundException("changeCourseName - Course "+oldName +"probably doesn't exists");
    	}
    		
    	
    	log.info("[END] changeCourseName OK");
    	return wd;
		
	}
	
	public static List<String> getCoursesList(WebDriver wd, String host) throws ElementNotFoundException{
		
		ArrayList <String> courses_names = new ArrayList<String>();
		
		if (!NavigationUtilities.amIHere(wd, COURSES_URL.replace("__HOST__", host))) {
			
			wd = NavigationUtilities.toCoursesHome(wd);
		}
		WebElement courses_list = Wait.notTooMuch(wd).until(ExpectedConditions.presenceOfElementLocated(COURSELIST));
    	List<WebElement> courses = courses_list.findElements(By.tagName("li"));

		for (WebElement c : courses) {
    		try {
    			WebElement title = c.findElement(By.className("title"));
    			String title_text = title.getText();
    			courses_names.add(title_text);   			
    		}
    		catch(NoSuchElementException csee) {
    			//do nothing and look for the next item
    		}
    	}
		
		return courses_names;
		
	}
	
	
	public static WebElement getCourseElement(WebDriver wd, String name) throws ElementNotFoundException {
		WebElement courses_list = Wait.notTooMuch(wd).until(ExpectedConditions.presenceOfElementLocated(COURSELIST));
    	
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
    	
    	throw new ElementNotFoundException("getCourseElement-the course doesn't exist");
	}
	
	public static WebDriver go2Tab(WebDriver wd, By icon) throws ElementNotFoundException {
		
		
		WebElement icon_element = wd.findElement(COURSE_TABS).findElement(icon);
		WebElement tab =  DOMMannager.getParent(wd, DOMMannager.getParent(wd, DOMMannager.getParent(wd, icon_element)));
		String id = tab.getAttribute("id");
		wd = Click.element(wd,tab);
		Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id(id.replace("label", "content"))));	
		
		return wd;
	
	}
	
	public static String getTabId(WebDriver wd, By icon) {
		WebElement icon_element = wd.findElement(COURSE_TABS).findElement(icon);
		WebElement tab =  DOMMannager.getParent(wd, DOMMannager.getParent(wd, icon_element));
		return tab.getAttribute("id");
	}
	
	public static WebElement getTabContent(WebDriver wd, By icon) {
		
		String tab_id = getTabId(wd, icon);
		return wd.findElement(By.id(tab_id.replace("label", "content"))); 
	}
	
}