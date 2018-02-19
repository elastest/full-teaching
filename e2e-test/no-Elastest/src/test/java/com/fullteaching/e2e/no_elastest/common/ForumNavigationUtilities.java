package com.fullteaching.e2e.no_elastest.common;

import org.openqa.selenium.By;

import org.openqa.selenium.WebElement;

import static com.fullteaching.e2e.no_elastest.common.Constants.*;


public class ForumNavigationUtilities {

	public static boolean isForumEnabled(WebElement forumTabContent) {
		
		try {
			forumTabContent.findElement(FORUM_NEWENTRY_ICON);
			return true;
		}catch(Exception e) {
			return false;
		}
			
	}
}
