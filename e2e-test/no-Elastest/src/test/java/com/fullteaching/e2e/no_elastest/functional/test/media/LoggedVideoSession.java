package com.fullteaching.e2e.no_elastest.functional.test.media;

import static com.fullteaching.e2e.no_elastest.common.Constants.COURSELIST_COURSETITLE;
import static com.fullteaching.e2e.no_elastest.common.Constants.COURSES_URL;
import static com.fullteaching.e2e.no_elastest.common.Constants.COURSE_TABS;
import static com.fullteaching.e2e.no_elastest.common.Constants.LOCALHOST;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_EDITMODAL_DELETE_DIV;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_EDIT_MODAL;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_NEWSESSION_ICON;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_NEWSESSION_MODAL;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_NEWSESSION_MODAL_CONTENT;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_NEWSESSION_MODAL_DATE;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_NEWSESSION_MODAL_POSTBUTTON;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_NEWSESSION_MODAL_TIME;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_NEWSESSION_MODAL_TITLE;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_SESSIONEDIT_ICON;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSIONLIST_SESSION_ACCESS;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSION_EXIT_ICON;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSION_ICON;
import static com.fullteaching.e2e.no_elastest.common.Constants.SESSION_LEFT_MENU_BUTTON;
import static com.fullteaching.e2e.no_elastest.common.Constants.TABS_DIV_ID;
import static java.lang.invoke.MethodHandles.lookup;
import static java.util.logging.Level.ALL;
import static org.openqa.selenium.logging.LogType.BROWSER;
import static org.openqa.selenium.remote.CapabilityType.LOGGING_PREFS;
import static org.openqa.selenium.remote.DesiredCapabilities.chrome;
import static org.slf4j.LoggerFactory.getLogger;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collection;
import java.util.List;
import java.util.Properties;

import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.junit.runners.Parameterized.Parameter;
import org.junit.runners.Parameterized.Parameters;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.logging.LoggingPreferences;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.slf4j.Logger;

import com.fullteaching.e2e.no_elastest.common.CourseNavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.NavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.SessionNavigationUtilities;
import com.fullteaching.e2e.no_elastest.common.UserUtilities;
import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.common.exception.TimeOutExeception;
import com.fullteaching.e2e.no_elastest.utils.Click;
import com.fullteaching.e2e.no_elastest.utils.ParameterLoader;
import com.fullteaching.e2e.no_elastest.utils.SetUp;
import com.fullteaching.e2e.no_elastest.utils.UserLoader;
import com.fullteaching.e2e.no_elastest.utils.Wait;

import io.github.bonigarcia.DriverCapabilities;

@RunWith(Parameterized.class)
public class LoggedVideoSession {

	//1 teacher
	protected WebDriver teacherDriver;
	
	//at least 1 student;
	protected List<WebDriver> studentDriver;
	
	@Parameter(0)//format email:password:browser
	public String teacher_data; 
		
	@Parameter(1) //format user1:password1:browser1;user2:password2:browser2;...
	public String users_data;
	
	@Parameter(2)
	public String courseName; 

	
	protected String teacherName;
	protected String teacher;
	protected String teacher_pass;
	
	protected List<String>students;
	protected List<String>studentPass;
	protected List<String>studentNames;
	

	protected String host=LOCALHOST;
	
	protected Properties properties; 
	
	final  Logger log = getLogger(lookup().lookupClass());

	private String sessionName = "Today's Session";
	private String sessionDescription= "Wow today session will be amazing";
	private String sessionDate;
	private String sessionHour;
	
	@DriverCapabilities
	 DesiredCapabilities capabilities = chrome();
	 {
	        LoggingPreferences logPrefs = new LoggingPreferences();
	        logPrefs.enable(BROWSER, ALL);
	        capabilities.setCapability(LOGGING_PREFS, logPrefs);
	    }
	    
	@Before 
	public void setUp() throws BadUserException, ElementNotFoundException, NotLoggedException, TimeOutExeception {
		 	
		 	log.info("[INI setUP]");    	
	    	
	    	host = SetUp.getHost();
	     
	        log.info("Test over url: "+host);
	        
	        //teacher setUp
	        
	        teacher = teacher_data.split(":")[0];
	        teacher_pass= teacher_data.split(":")[1];
	        teacherDriver = UserLoader.allocateNewBrowser(teacher_data.split(":")[2]);
	        
	    	//check if logged with correct user
	        teacherDriver = SetUp.loginUser(teacherDriver, host, teacher , teacher_pass);
	        teacherDriver = UserUtilities.checkLogin(teacherDriver, teacher);
	        teacherName = UserUtilities.getUserName(teacherDriver, true, host);
	    	
	        //students setUp
	        students = new ArrayList<String>();
	    	studentPass = new ArrayList<String>();
	    	studentNames = new ArrayList<String>();
	    	studentDriver = new ArrayList<WebDriver>();
	    	
	        String[] students_data = users_data.split(";");
	        
	        for(int i=0; i< students_data.length; i++) {
	        	String userid = students_data[i].split(":")[0];
	        	students.add(userid);
	        	String userpass = students_data[i].split(":")[1];
	        	studentPass.add(userpass);
	        	
	        	WebDriver studentD = UserLoader.allocateNewBrowser(students_data[i].split(":")[2]);
	        	
	        	studentD = SetUp.loginUser(studentD, host, userid , userpass);
	        	studentD = UserUtilities.checkLogin(studentD, userid);
	        	studentNames.add(UserUtilities.getUserName(studentD, true, host));	        	
	        	studentDriver.add(studentD);
	        }
	        
	    	/* Dedicated set up to Forum tests*/
	        /*log.info("INI dedicated setUP");
	    	
	    	
	    	//LOAD PROPERTIES:
	    	properties = new Properties();
			try {
				// load a properties file for reading
				properties.load(new FileInputStream("src/test/resources/inputs/test.properties"));
				courseName = properties.getProperty("forum.test.course");
				
			} catch (IOException ex) {
				ex.printStackTrace();
			}  
			
	    	log.info("End dedicated setUP");*/
	    	/*END dedicated*/
	    	log.info("[End setUP]");
	    }
	
	 @After
	 public void teardown() throws IOException {
		//TODO delete tested test if it is last test.
        SetUp.tearDown(teacherDriver);
        teacherDriver.close();
        for (WebDriver driver: studentDriver) {
        	SetUp.tearDown(driver);
        	driver.close();
        }           
    }
	
	@Parameters
    public static Collection<String[]> data() throws IOException {
        return ParameterLoader.sessionParameters();
    }
    
    @Test
    public void sessionTest() {
    	Calendar calendar = Calendar.getInstance();
    	calendar.setTimeInMillis(System.currentTimeMillis());

    	int mYear = calendar.get(Calendar.YEAR);
    	int mMonth = calendar.get(Calendar.MONTH);
    	int mDay = calendar.get(Calendar.DAY_OF_MONTH);	
    	int mHour = calendar.get(Calendar.HOUR);
    	if(mHour == 0) mHour = 12;
    	int mAMPM = calendar.get(Calendar.AM_PM);
    	int mMinute = calendar.get(Calendar.MINUTE);
    	int mSecond = calendar.get(Calendar.SECOND);
    	
    	sessionDate = ""+(mDay<10? "0"+mDay : mDay)+ (mMonth<10? "0"+mMonth : mMonth)+mYear;
    	sessionHour = ""+(mHour<10? "0"+mHour : mHour)+(mMinute<10? "0"+mMinute : mMinute)+(mAMPM == Calendar.AM ?"A" :"P" );
    	try {
    		if (!NavigationUtilities.amIHere(teacherDriver, COURSES_URL.replace("__HOST__", host))) {	
    			teacherDriver = NavigationUtilities.toCoursesHome(teacherDriver);	
    		}
    		List <String> courses = CourseNavigationUtilities.getCoursesList(teacherDriver, host);
    		
    		Assert.assertTrue("No courses in the list",courses.size()>0);
    		//Teacher go to Course and create a new session to join
    	
			WebElement course = CourseNavigationUtilities.getCourseElement(teacherDriver, courseName);
			
			course.findElement(COURSELIST_COURSETITLE).click();
	    	Wait.notTooMuch(teacherDriver).until(ExpectedConditions.visibilityOfElementLocated(By.id(TABS_DIV_ID)));
	    	teacherDriver = CourseNavigationUtilities.go2Tab(teacherDriver, SESSION_ICON);
	    	
	    	teacherDriver = Click.element(teacherDriver, SESSIONLIST_NEWSESSION_ICON);
	    	
			//wait for modal
	    	WebElement modal = Wait.notTooMuch(teacherDriver).until(ExpectedConditions.visibilityOfElementLocated(SESSIONLIST_NEWSESSION_MODAL));
	    	modal.findElement(SESSIONLIST_NEWSESSION_MODAL_TITLE).sendKeys(sessionName);
	    	modal.findElement(SESSIONLIST_NEWSESSION_MODAL_CONTENT).sendKeys(sessionDescription);
	    	modal.findElement(SESSIONLIST_NEWSESSION_MODAL_DATE).sendKeys(sessionDate);
	    	modal.findElement(SESSIONLIST_NEWSESSION_MODAL_TIME).sendKeys(sessionHour);
	    	teacherDriver = Click.element(teacherDriver, modal.findElement(SESSIONLIST_NEWSESSION_MODAL_POSTBUTTON));
	    	//teacherDriver = Click.element(teacherDriver, SESSIONLIST_NEWSESSION_MODAL_DATE);
	    	//check if session has been created
	    	List <String> session_titles = SessionNavigationUtilities.getFullSessionList(teacherDriver);
	    	Assert.assertTrue("Session has not been created", session_titles.contains(sessionName));    	
	    	
		} catch (ElementNotFoundException e) {
			Assert.fail("Error while creating new SESSION");
		}
    
    	//Teacher Join Session
    	try {
    		
	    	List <String> session_titles = SessionNavigationUtilities.getFullSessionList(teacherDriver);
	    	Assert.assertTrue("Session has not been created", session_titles.contains(sessionName)); 
			
	    	//Teacher to: JOIN SESSION.
			WebElement session = SessionNavigationUtilities.getSession(teacherDriver,sessionName );
			teacherDriver = Click.element(teacherDriver, session.findElement(SESSIONLIST_SESSION_ACCESS));
			
			//Assert.assertTrue(condition);
	    	//Check why this is failing... maybe urls are not correct? configuration on the project?
	    	
		} catch (ElementNotFoundException e) {
			Assert.fail("Error while creating new SESSION");
		}
    	
    	//Students Join Sessions
    	try {
    		for(WebDriver student_d: studentDriver) {
    			
    			if (!NavigationUtilities.amIHere(student_d, COURSES_URL.replace("__HOST__", host))) {	
    				student_d = NavigationUtilities.toCoursesHome(student_d);	
        		}
        		List <String> courses = CourseNavigationUtilities.getCoursesList(student_d, host);
        		
        		Assert.assertTrue("No courses in the list",courses.size()>0);
        		//Teacher go to Course and create a new session to join
        	
    			WebElement course = CourseNavigationUtilities.getCourseElement(student_d, courseName);
    			
    			course.findElement(COURSELIST_COURSETITLE).click();
    	    	Wait.notTooMuch(student_d).until(ExpectedConditions.visibilityOfElementLocated(By.id(TABS_DIV_ID)));
    	    	student_d = CourseNavigationUtilities.go2Tab(student_d, SESSION_ICON);
    	    	
		    	List <String> session_titles = SessionNavigationUtilities.getFullSessionList(student_d);
		    	Assert.assertTrue("Session has not been created", session_titles.contains(sessionName)); 
				
		    	//Student to: JOIN SESSION.
				WebElement session = SessionNavigationUtilities.getSession(student_d,sessionName );
				student_d = Click.element(student_d, session.findElement(SESSIONLIST_SESSION_ACCESS));
				
				//Assert.assertTrue(condition);
		    	//Check why this is failing... maybe urls are not correct? configuration on the project?
    		}
	    	
		} catch (ElementNotFoundException e) {
			Assert.fail("Error while creating new SESSION");
		}
    	
    	//Students Leave Sessions
    	try {
    		for(WebDriver student_d: studentDriver) {
		    			
		    	//student to: LEAVE SESSION.
    			student_d = Click.element(student_d, SESSION_LEFT_MENU_BUTTON);
				
    			student_d = Click.element(student_d, SESSION_EXIT_ICON);
				
				//Wait for something
				Wait.notTooMuch(student_d).until(ExpectedConditions.visibilityOfElementLocated(COURSE_TABS));
				//Assert.assertTrue(condition);
		    	//Check why this is failing... maybe urls are not correct? configuration on the project?
    		}
	    	
		} catch (ElementNotFoundException e) {
			Assert.fail("Error while leaving SESSION");
		}
    	//Teacher Leave Session
    	try {
			
		    //student to: LEAVE SESSION.
    		teacherDriver = Click.element(teacherDriver, SESSION_LEFT_MENU_BUTTON);
				
    		teacherDriver = Click.element(teacherDriver, SESSION_EXIT_ICON);
				
			//Wait for something
			Wait.notTooMuch(teacherDriver).until(ExpectedConditions.visibilityOfElementLocated(COURSE_TABS));
			//Assert.assertTrue(condition);
	    	//Check why this is failing... maybe urls are not correct? configuration on the project?
	    	
		} catch (ElementNotFoundException e) {
			Assert.fail("Error while leaving SESSION");
		}
    	try {
    		//delete session by teacher
			WebElement session = SessionNavigationUtilities.getSession(teacherDriver,sessionName);
			Click.element(teacherDriver, session.findElement(SESSIONLIST_SESSIONEDIT_ICON));
	    	WebElement modal = Wait.notTooMuch(teacherDriver).until(ExpectedConditions.visibilityOfElementLocated(SESSIONLIST_EDIT_MODAL));
	    	Click.element(teacherDriver, modal.findElement(SESSIONLIST_EDITMODAL_DELETE_DIV).findElement(By.tagName("label")));
	    	Click.element(teacherDriver, modal.findElement(SESSIONLIST_EDITMODAL_DELETE_DIV).findElement(By.tagName("a")));
	    	
	    	List <String> session_titles = SessionNavigationUtilities.getFullSessionList(teacherDriver);
	    	Assert.assertTrue("Session has not been deleted", !session_titles.contains(sessionName));  
	    	
		} catch (ElementNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	
    	
    }
}
