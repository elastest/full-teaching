package com.fullteaching.e2e.no_elastest.common;

import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.utils.Click;
import com.fullteaching.e2e.no_elastest.utils.Wait;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import java.util.ArrayList;
import java.util.List;

import static com.fullteaching.e2e.no_elastest.common.Constants.*;
import static org.junit.jupiter.api.Assertions.*;


public class ForumNavigationUtilities {

		
	public static boolean isForumEnabled(WebElement forumTabContent) {
		
		try {
			forumTabContent.findElement(FORUM_NEWENTRY_ICON);
			return true;
		}catch(Exception e) {
			return false;
		}
				}
	
	
	public static List<String> getFullEntryList(WebDriver wd){
		ArrayList <String> entries_titles = new ArrayList<String>();
		
		WebElement tab_content = CourseNavigationUtilities.getTabContent(wd, FORUM_ICON);
		List<WebElement> entries = tab_content.findElements(By.className("entry-title"));
		for(WebElement entry: entries) {
			entries_titles.add(entry.findElement(FORUMENTRYLIST_ENTRYTITLE).getText());
		}
		
		return entries_titles;
	}
	
	public static List<String> getUserEntries(WebDriver wd, String user_name){
		ArrayList <String> entries_titles = new ArrayList<String>();
		
		WebElement tab_content = CourseNavigationUtilities.getTabContent(wd, FORUM_ICON);
		List<WebElement> entries = tab_content.findElements(By.className("entry-title"));
		for(WebElement entry: entries) {
			//if user name is the publisher of the entry... 
			entries_titles.add(entry.findElement(FORUMENTRYLIST_ENTRYTITLE).getText());
		}
		
		return entries_titles;
	}
	
	public static WebElement getEntry(WebDriver wd, String entry_name) throws ElementNotFoundException {
		WebElement tab_content = CourseNavigationUtilities.getTabContent(wd, FORUM_ICON);
		List<WebElement> entries = tab_content.findElements(By.className("entry-title"));
		for(WebElement entry: entries) {
    		try {
    			WebElement title = entry.findElement(FORUMENTRYLIST_ENTRYTITLE);
    			String title_text = title.getText();
    			if (title_text ==null || title_text.equals("")) {
    				title_text = title.getAttribute("innerHTML");
    			}
    			if(entry_name.equals(title_text)) {
    				
    				return entry;
    			}
    		}
    		catch(NoSuchElementException csee) {
    			//do nothing and look for the next item
    		}
    	}
    	
    	throw new ElementNotFoundException("getEntry-the entry doesn't exist");
	}
	
	public static List<WebElement> getComments(WebDriver wd){
		return wd.findElements(FORUMCOMMENTLIST_COMMENT);
	}
	
	public static List<WebElement> getUserComments(WebDriver wd, String user_name){
		List<WebElement> user_comments = new ArrayList<WebElement>();
		
		List<WebElement> all_comments = wd.findElements(FORUMCOMMENTLIST_COMMENT);
		
		for (WebElement comment: all_comments) {
			String comment_username = comment.findElement(FORUMCOMMENTLIST_COMMENT_USER).getText();
			if (user_name.equals(comment_username)) {
				user_comments.add(comment);
			}
		}
		return user_comments;
	}
	
	public static List<WebElement> getHighLightedComments(WebDriver wd, String user_name){
		List<WebElement> user_comments = new ArrayList<WebElement>();
		
		List<WebElement> all_comments = wd.findElements(FORUMCOMMENTLIST_COMMENT);
		
		for (WebElement comment: all_comments) {
			String comment_username = comment.findElement(FORUMCOMMENTLIST_COMMENT_USER).getText();
			if (user_name.equals(comment_username)) {
				user_comments.add(comment);
			}
		}
		return user_comments;
	}
	
	public static WebDriver newEntry(WebDriver wd, String newEntryTitle, String newEntryContent) throws ElementNotFoundException {
		wd = CourseNavigationUtilities.go2Tab(wd, FORUM_ICON);
    	assertEquals(ForumNavigationUtilities.isForumEnabled(CourseNavigationUtilities.getTabContent(wd,FORUM_ICON)), true, "Forum not activated");
    	
    	wd = Click.element(wd, FORUM_NEWENTRY_ICON);
    	
    	//wait for modal
    	Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(FORUM_NEWENTRY_MODAL));
    	
    	//fill new Entry
    	WebElement title = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(FORUM_NEWENTRY_MODAL_TITLE));
    	title.sendKeys(newEntryTitle);
    	WebElement comment = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(FORUM_NEWENTRY_MODAL_CONTENT));
    	comment.sendKeys(newEntryContent);
    	
    	//Publish
    	wd = Click.element(wd,FORUM_NEWENTRY_MODAL_POSTBUTTON);

    	//Wait to publish
    	Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(FORUMENTRYLIST_ENTRIESUL));
		
    	//Check entry... 
    	WebElement newEntry = ForumNavigationUtilities.getEntry(wd, newEntryTitle);
    	
    	return wd;
	}


	public static List<WebElement> getReplies(WebDriver driver, WebElement comment) {
		List<WebElement> replies= new ArrayList<WebElement>();
		
		//get all comment-div 
		List<WebElement> subcomments = comment.findElements(FORUMCOMMENTLIST_COMMENT_DIV);
		
		//ignore first it is original comment
		for (int i = 1; i<subcomments.size(); i++) {
			replies.add(subcomments.get(i));
		}
		
		return replies;
	}
	
	public static WebDriver enableForum(WebDriver driver) throws ElementNotFoundException {
		WebElement edit_button =  Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(FORUM_EDITENTRY_ICON));
		driver = Click.element(driver,FORUM_EDITENTRY_ICON);
		WebElement edit_modal = Wait.notTooMuch(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("put-delete-modal")));
		//press disable
		WebElement enable_button = edit_modal.findElement(ENABLEFORUM_BUTTON);
		driver = Click.withNRetries(driver, ENABLEFORUM_BUTTON, 3, By.id("put-modal-btn"));
		//enable_button.click();
		WebElement save_button = edit_modal.findElement(By.id("put-modal-btn"));
		driver = Click.element(driver, By.id("put-modal-btn"));
		WebElement forum_tab_content = Wait.aLittle(driver).until(ExpectedConditions.visibilityOfElementLocated(By.id("md-tab-content-0-2")));
		assertTrue(ForumNavigationUtilities.isForumEnabled(forum_tab_content),"The forum is not dissabled");
		return driver;
	}
}
