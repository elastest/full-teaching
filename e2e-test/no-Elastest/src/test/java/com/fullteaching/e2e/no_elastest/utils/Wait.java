package com.fullteaching.e2e.no_elastest.utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Wait {
	
	public static WebDriverWait ten(WebDriver wd) {
		return new WebDriverWait(wd, 10);
	}
 
	public static WebDriverWait one(WebDriver wd) {
		return new WebDriverWait(wd, 1);
	}

	public static void footer(WebDriver wd) {
		ten(wd).until(ExpectedConditions.visibilityOfElementLocated(By.className("page-footer")));	
	}
}
