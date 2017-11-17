package com.fullteaching.e2e.no_elastest.utils;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;

public class Click {

	public static WebDriver here(WebDriver wd, int x, int y) {
		Actions builder = new Actions(wd);  
		
		builder.moveToElement(wd.findElement(By.tagName("body")), x, y).click().build().perform();
		
		return wd;
	}
	
	public static WebDriver withNRetries(WebDriver wd, WebElement ele, int n, By waitFor) throws ElementNotFoundException {
		int i = 0;
		do {
			try {
				ele.click();
				Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(waitFor));
				return wd;
			}
			catch(TimeoutException toe) {
				i ++;
			}
			
		}while(i<n);
		
		throw new ElementNotFoundException("Click doesn't work properly");
	}
	
	public static WebDriver byJS(WebDriver wd, WebElement we) {
		JavascriptExecutor js = (JavascriptExecutor) wd;
		js.executeScript("var evt = document.createEvent('MouseEvents');" 
							+ "evt.initMouseEvent('click',true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0,null);" 
							+ "arguments[0].dispatchEvent(evt);", we);
		return wd;
	}
}
