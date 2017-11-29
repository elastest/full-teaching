package com.fullteaching.e2e.no_elastest.common;

import org.openqa.selenium.By;

import org.openqa.selenium.WebElement;

public class ForumNavigationUtilities {

	public static boolean isForumEnabled(WebElement forumTabContent) {
		
		try {
			forumTabContent.findElement(By.id("add-entry-icon"));
			return true;
		}catch(Exception e) {
			return false;
		}
			
	}
}
