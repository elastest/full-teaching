package com.fullteaching.e2e.no_elastest.common;

import org.openqa.selenium.By;
import org.openqa.selenium.NoSuchElementException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;

import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.utils.Wait;

public class UserUtilities {

	public static WebDriver login(WebDriver wd, String user, String password) {
		//navigate to login page
		wd.get("http://localhost:5000/");
		
		try {
			WebElement login_menu  = Wait.ten(wd).until(ExpectedConditions.visibilityOfElementLocated(By.xpath("/html/body/app/div/header/navbar/div/nav/div/ul/li[2]/a")));
						
			login_menu.click();
			
			WebElement login_modal = Wait.one(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("login-modal")));
			
			WebElement user_field = login_modal.findElement(By.id("email"));
			WebElement pass_field = login_modal.findElement(By.id("password"));
			WebElement submit_field = login_modal.findElement(By.id("log-in-btn"));
			
			user_field.sendKeys(user);
			pass_field.sendKeys(password);
			
			submit_field.click();
			
		}
		catch(TimeoutException tOe) {
			System.err.println("[User.login] Time Out");
		}
		catch(NoSuchElementException nEe) {
			System.err.println("[User.login] Element not found");
		}
				
		return wd;
		
	}
	
	public static WebDriver checkLogin(WebDriver wd, String user) throws NotLoggedException, BadUserException{
		
		//Wait to settings button to be present
		try {
			WebElement settings_button  = Wait.ten(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("settings-button")));
		
			settings_button.click();
		}catch(TimeoutException toe) {
			throw new NotLoggedException(toe.getMessage());
		}
		
		WebElement settings_page  = Wait.ten(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("stng-user-mail")));
		
		//Check if the user name is the expected
		if (!settings_page.getText().trim().equals(user.trim())) throw new BadUserException();
		
		return wd;
	}
	
	public static WebDriver logOut(WebDriver wd) throws NotLoggedException {
		//press logout link
		try {
			WebElement arrow_button  = Wait.ten(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("arrow-drop-down")));
		
			arrow_button.click();
			
			WebElement logout_button  = Wait.one(wd).until(ExpectedConditions.visibilityOfElementLocated(By.id("logout-button")));
			
			logout_button.click();
			
			
		}catch(TimeoutException toe) {
			throw new NotLoggedException("Already logged Out");
		}
		
		return wd;
		
	}
	
	
}
