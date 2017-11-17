package com.fullteaching.e2e.no_elastest.common;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.utils.Click;
import com.fullteaching.e2e.no_elastest.utils.Wait;

public class UserUtilities {
	
	public static String login_url = "http://localhost:5000";
	
	public static WebDriver login(WebDriver wd, String user, String password) throws ElementNotFoundException {
		
		//navigate to login page
		NavigationUtilities.getUrlAndWaitFooter(wd, login_url);
		
		try {
			WebElement login_menu  = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app/div/header/navbar/div/nav/div/ul/li[2]/a")));
						
			wd = Click.withNRetries(wd, login_menu, 3, By.id("login-modal") );
			
			WebElement login_modal = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("login-modal")));
			
			WebElement user_field = login_modal.findElement(By.id("email"));
			WebElement pass_field = login_modal.findElement(By.id("password"));
			WebElement submit_field = login_modal.findElement(By.id("log-in-btn"));
			
			user_field.sendKeys(user);
			pass_field.sendKeys(password);
			
			submit_field.click();
			
		}
		catch(TimeoutException tOe) {
			System.err.println("[User.login] Time Out");
			throw new ElementNotFoundException("[User.login] Time Out");
		}
		catch(NoSuchElementException nEe) {
			System.err.println("[User.login] Element not found");
			throw new ElementNotFoundException("[User.login] Time Out");
		}
				
		return wd;
		
	}
	
	public static WebDriver checkLogin(WebDriver wd, String user) throws NotLoggedException, BadUserException{
		
		//Wait to settings button to be present
		try {
			WebElement settings_button  = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("settings-button")));
		
			settings_button.click();
		}catch(TimeoutException toe) {
			throw new NotLoggedException(toe.getMessage());
		}
		
		WebElement settings_page  = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("stng-user-mail")));
		
		//Check if the user name is the expected
		if (!settings_page.getText().trim().equals(user.trim())) throw new BadUserException();
		
		return wd;
	}
	
	public static WebDriver logOut(WebDriver wd) throws NotLoggedException {
		//press logout link
		try {
			WebElement arrow_button  = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("arrow-drop-down")));
		
			arrow_button.click();
			
			WebElement logout_button  = Wait.aLittle(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("logout-button")));
			
			logout_button.click();
			
			//go to home as the log out has been done
			NavigationUtilities.getUrlAndWaitFooter(wd, login_url);
			
		}catch(TimeoutException toe) {
			throw new NotLoggedException("Already logged Out");
		}
		
		return wd;
		
	}
	
	public static WebDriver checkLogOut(WebDriver wd) throws ElementNotFoundException {
		
		try {
			Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app/div/header/navbar/div/nav/div/ul/li[2]/a")));
		}
		catch (TimeoutException toe) {
			throw new ElementNotFoundException("Not Logged Out. Not in the home");	
		}
		
		return wd;
		
	}
	
	public static String getLoggedUser(WebDriver wd) throws NotLoggedException {
		String current_url = wd.getCurrentUrl();
		String current_user = null;
		
		try {
			//go to settings
			WebElement settings_button  = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("settings-button")));
			
			settings_button.click();
			
			WebElement settings_page  = Wait.notTooMuch(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("stng-user-mail")));
			current_user = settings_page.getText().trim();
			wd.get(current_url);
			
		}catch(TimeoutException toe) {
			wd.get(current_url);
			throw new NotLoggedException(toe.getMessage());
		}
		
		return current_user;
		
	}
	
}
