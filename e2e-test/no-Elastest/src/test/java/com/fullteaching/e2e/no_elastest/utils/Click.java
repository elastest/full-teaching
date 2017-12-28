package com.fullteaching.e2e.no_elastest.utils;

import static java.lang.invoke.MethodHandles.lookup;
import static org.slf4j.LoggerFactory.getLogger;

import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.interactions.Actions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.slf4j.Logger;

import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;

public class Click {

	public static final  Logger log = getLogger(lookup().lookupClass());

	public static WebDriver here(WebDriver wd, int x, int y) {
		Actions builder = new Actions(wd);  
		
		builder.moveToElement(wd.findElement(By.tagName("body")), x, y).click().build().perform();
		
		return wd;
	}
	
	public static WebDriver withNRetries(WebDriver wd, By eleBy, int n, By waitFor) throws ElementNotFoundException {
		/*properties for log*/
		String tagName = wd.findElement(eleBy).getTagName();
		String text= wd.findElement(eleBy).getText();
		
		int i = 0;
		
		try {
			wd = Scroll.toElement(wd, wd.findElement(eleBy));
		}
		catch(Exception e) {
			log.error("Click.withNRetries: Failed on scroll");
		}
		do {
			try {
				Wait.notTooMuch(wd).until(ExpectedConditions.elementToBeClickable(wd.findElement(eleBy)));
				wd.findElement(eleBy).click();
				Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(waitFor));
				log.info("Click.withNRetries: ele:"+tagName+":"+text+"+>OK");
				return wd;
			}
			catch(Exception e) {
				log.error("Click.withNRetries n:"+i+" "+e.getClass().getName()+":"+e.getLocalizedMessage());
				i ++;
			}
			
		}while(i<n);
		
		log.error("Click.withNRetries: ele:"+tagName+":"+text+"+>KO");
		throw new ElementNotFoundException("Click doesn't work properly");
	}
	
	public static WebDriver byJS(WebDriver wd, WebElement we) {
		JavascriptExecutor js = (JavascriptExecutor) wd;
		js.executeScript("var evt = document.createEvent('MouseEvents');" 
							+ "evt.initMouseEvent('click',true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0,null);" 
							+ "arguments[0].dispatchEvent(evt);", we);
		return wd;
	}
	
	/**
	 * Scrolls and click
	 * @param wd
	 * @param ele
	 * @return
	 * @throws ElementNotFoundException 
	 */
	public static WebDriver element(WebDriver wd, By eleBy) throws ElementNotFoundException {
		
		/*properties for log*/
		String tagName = wd.findElement(eleBy).getTagName();
		String text= wd.findElement(eleBy).getText();
		
		WebElement ele =  wd.findElement(eleBy);
		try {
			wd = Scroll.toElement(wd, wd.findElement(eleBy));
		}catch(Exception e) {
			log.error("Click.element: Scroll failed continuing...");
		}
		
		try {			
			Wait.notTooMuch(wd).until(ExpectedConditions.elementToBeClickable(wd.findElement(eleBy)));
			wd.findElement(eleBy).click();
			log.info("Click.element: ele:"+tagName+":"+text+"+>OK");
		}
		catch(Exception e) {
			log.error("Click.element: ele:"+tagName+":"+text+"+>KO");
			throw new ElementNotFoundException("Click.element ERROR::"+e.getClass().getName()+":"+e.getLocalizedMessage());
		}
		
		return wd;
	}
}
