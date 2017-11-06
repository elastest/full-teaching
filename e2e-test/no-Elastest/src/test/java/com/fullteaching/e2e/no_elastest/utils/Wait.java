package com.fullteaching.e2e.no_elastest.utils;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

public class Wait {
	
 public static WebDriverWait ten(WebDriver wd) {
	 return new WebDriverWait(wd, 10);
 }
 
 public static WebDriverWait one(WebDriver wd) {
	 return new WebDriverWait(wd, 1);
 }
}
