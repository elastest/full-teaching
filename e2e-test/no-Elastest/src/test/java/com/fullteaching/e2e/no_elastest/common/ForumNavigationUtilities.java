package com.fullteaching.e2e.no_elastest.common;

import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.utils.Click;
import com.fullteaching.e2e.no_elastest.utils.DOMMannager;
import com.fullteaching.e2e.no_elastest.utils.Wait;

import static com.fullteaching.e2e.no_elastest.common.Constants.*;

import java.util.ArrayList;
import java.util.List;


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
    	Assert.assertEquals("Forum not activated",ForumNavigationUtilities.isForumEnabled(CourseNavigationUtilities.getTabContent(wd,FORUM_ICON)),true);
    	
    	wd = Click.element(wd, FORUM_NEWENTRY_ICON);
    	
    	//wait for modal
    	Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(FORUM_NEWENTRY_MODAL));
    	
    	//fill new Entry
    	WebElement title = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(FORUM_NEWENTRY_MODAL_TITLE));
    	title.sendKeys(newEntryTitle);
    	WebElement comment = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(FORUM_NEWENTRY_MODAL_CONTENT));
    	comment.sendKeys(newEntryContent);
    	
    	//Publish
    	Click.element(wd,FORUM_NEWENTRY_MODAL_POSTBUTTON);

    	//Wait to publish
    	Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(FORUMENTRYLIST_ENTRIESUL));
		
    	//Check entry... 
    	WebElement newEntry = ForumNavigationUtilities.getEntry(wd, newEntryTitle);
    	
    	return wd;
	}
}
