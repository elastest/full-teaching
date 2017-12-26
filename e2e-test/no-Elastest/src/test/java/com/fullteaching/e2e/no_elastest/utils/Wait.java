package com.fullteaching.e2e.no_elastest.utils;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Wait {
	
	public static WebDriverWait notTooMuch(WebDriver wd) {
		return new WebDriverWait(wd, 10);
	}
 
	public static WebDriverWait aLittle(WebDriver wd) {
		return new WebDriverWait(wd, 2);
	}

	public static void footer(WebDriver wd) {
		notTooMuch(wd).until(ExpectedConditions.presenceOfElementLocated(By.className("page-footer")));	
	}
}
