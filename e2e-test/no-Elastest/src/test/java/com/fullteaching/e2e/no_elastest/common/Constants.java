package com.fullteaching.e2e.no_elastest.common;

import static com.fullteaching.e2e.no_elastest.common.Constants.FORUMTAB_XPATH;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;

public final class Constants {

	public static final String LOCALHOST = "https://localhost:5000";
	public static final String COURSES_URL = "__HOST__/courses";
	   
    //Xpaths and ids
    public static final String FOOTER_CLASS ="page-footer";
    public static final String MAINMENU_ARROW_ID="arrow-drop-down";
    public static final String LOGOUT_BUTTON_ID = "logout-button";
    
    public static final String LOGIN_MODAL_ID = "login-modal";
    public static final String LOGINMODAL_USER_FIELD_ID = "email";
    public static final String LOGINMODAL_PASSWORD_FIELD_ID = "password";
    public static final String LOGINMODAL_LOGIM_BUTTON_ID = "log-in-btn";

    
    public static final String COURSESDASHBOARD_TITLE_CLASS = "dashboard-title";
	public static final String FIRSTCOURSE_XPATH = "/html/body/app/div/main/app-dashboard/div/div[3]/div/div[1]/ul/li[1]/div";
    public static final String GOTOCOURSE_XPATH = "/div[2]"; /*use with XCOURSE_XPATH+GOTOCOURSE_XPATH*/
    public static final String COURSELIST_COURSETITLE_CLASS = "course-title"; 
    public static final String COURSELIST_ID = "course-list";
    
    public static final String TABS_DIV_ID ="tabs-course-details";
    public static final String HOMETAB_ID ="md-tab-label-0-0";
    public static final String SESSIONSTAB_ID ="md-tab-label-0-1";
    public static final String FORUMTAB_ID ="md-tab-label-0-2";
    public static final String FILESTAB_ID ="md-tab-label-0-3";
    public static final String ATTEDENDERSTAB_ID ="md-tab-label-0-4";

    public static final String NEWCOURSE_BUTTON_XPATH = "/html/body/app/div/main/app-dashboard/div/div[3]/div/div[1]/div/a";
    public static final String NEWCOURSE_MODAL_ID = "course-modal";
    public static final String NEWCOURSE_MODAL_NAMEFIELD_ID = "input-post-course-name";
    public static final String NEWCOURSE_MODAL_SAVE_ID="submit-post-course-btn";

    public static final String EDITCOURSE_BUTTON_XPATH = "/div[3]/a";/*use with XCOURSE_XPATH+EDITCOURSE_BUTTON_XPATH*/
    public static final String EDITDELETE_MODAL_ID = "put-delete-course-modal";
    public static final String EDITCOURSE_MODAL_NAMEFIELD_ID = "input-put-course-name";
    public static final String EDITCOURSE_MODAL_SAVE_ID="submit-put-course-btn";
    
    public static final String COURSE_BACK_TO_DASHBOARD_ID = "back-to-dashboard-btn";
            
    public static final String HOMETAB_XPATH ="/html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[1]/div[1]";
    public static final String SESSIONSTAB_XPATH ="/html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[1]/div[2]";
    public static final String FORUMTAB_XPATH ="/html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[1]/div[3]"; 
    public static final String FILESTAB_XPATH ="/html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[1]/div[4]";
    public static final String ATTENDERSTAB_XPATH ="/html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[1]/div[5]";
    
    public static final String FORUM_ICON_ID = "forum-tab-icon";
    public static final String HOME_ICON_ID = "info-tab-icon";
    public static final String SESSION_ICON_ID = "sessions-tab-icon";
    public static final String FILES_ICON_ID = "files-tab-icon";
    public static final String ATTENDERS_ICON_ID = "attenders-tab-icon";
        
    public static final String EDITDESCRIPTION_BUTTON_XPATH = "/html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[2]/div[1]/div/div[1]/a";
    public static final String EDITDESCRIPTION_CONTENTBOX_CLASS = "ui-editor-content";
    public static final String EDITDESCRIPTION_PREVIEWBUTTON_XPATH = "/html/body/app/div/main/app-course-details/div/div[4]/md-tab-group/div[2]/div[1]/div/div[2]/div/a[2]";
    public static final String EDITDESCRIPTION_SAVEBUTTON_ID = "send-info-btn";
    
    public static final String USERNAME_XPATH ="/html/body/app/div/main/app-settings/div/div[3]/div[2]/ul/li[2]/div[2]";
    public static final String LOGINMENU_XPATH ="/html/body/app/div/header/navbar/div/nav/div/ul/li[2]/a";
    
    public static final String ENABLEFORUM_BUTTON_XPATH = "/html/body/app/div/main/app-course-details/div/div[2]/div/div/form/div[1]/label";
    
    public static final String ENABLECOURSE_DELETION_BUTTON_XPATH = "/html/body/app/div/main/app-dashboard/div/div[2]/div/div/form/div[2]/div/div/label";
    public static final String DELETECOURSE_BUTTON_XPATH = "/html/body/app/div/main/app-dashboard/div/div[2]/div/div/form/div[2]/div/a";
        
    public static final String COURSES_BUTTON_ID= "courses-button";
    public static final String SETTINGS_BUTTON_ID= "settings-button";
    
    public static final String FORUM_NEWENTRY_ICON_ID ="add-entry-icon";
    public static final String FORUM_EDITENTRY_ICON_ID = "edit-forum-icon";
    public static final String FORUMENTRYLIST_ENTRYTITLE_CLASS = "forum-entry-title";
    public static final String FORUMENTRYLIST_ENTRIESUL_CLASS = "entries-side-view";
    public static final String FORUMENTRYLIST_ENTRY_USER_CLASS = "forum-entry-author";
    public static final String FORUMCOMMENTLIST_ENTRY_TITLE_CLASS = "comment-section-title";
    public static final String FORUMCOMMENTLIST_ENTRY_USER_CLASS = "user-name";
    public static final String FORUMCOMMENTLIST_ID = "row-of-comments";
    public static final String FORUMCOMMENTLIST_COMMENT_CLASS = "comment-block";
    public static final String FORUMCOMMENTLIST_COMMENT_USER_CLASS = "user-name";
    public static final String FORUMCOMMENTLIST_COMMENT_CONTENT_CLASS = "forum-comment-msg";
    public static final String FORUMCOMMENTLIST_BACK_TO_ENTRIESLIST_ICON_ID = "entries-sml-btn";
    public static final String FORUM_NEWENTRY_MODAL_ID = "course-details-modal";
    public static final String FORUM_NEWENTRY_MODAL_TITLE_ID = "input-post-title";
    public static final String FORUM_NEWENTRY_MODAL_CONTENT_ID = "input-post-comment";
    public static final String FORUM_NEWENTRY_MODAL_POSTBUTTON_ID = "post-modal-btn";
    

    public static final String SETTINGS_USEREMAIL_ID = "stng-user-mail";
    
    //BUTTONS
    public static final By SETTINGS_BUTTON = By.id(SETTINGS_BUTTON_ID);
    public static final By COURSES_BUTTON = By.id(COURSES_BUTTON_ID);
    public static final By LOGOUT_BUTTON = By.id(LOGOUT_BUTTON_ID);
    
    public static final By LOGIN_BUTTON = By.id(LOGINMODAL_LOGIM_BUTTON_ID);
    
    public static final By EDITDESCRIPTION_BUTTON = By.xpath(EDITDESCRIPTION_BUTTON_XPATH);
    public static final By EDITDESCRIPTION_SAVEBUTTON = By.id(EDITDESCRIPTION_SAVEBUTTON_ID);
    
    public static final By DISABLEFORUM_BUTTON = By.xpath(ENABLEFORUM_BUTTON_XPATH);
    public static final By ENABLEFORUM_BUTTON = By.xpath(ENABLEFORUM_BUTTON_XPATH);
    
    public static final By ENABLECOURSE_DELETION_BUTTON = By.xpath(ENABLECOURSE_DELETION_BUTTON_XPATH);
    public static final By DELETECOURSE_BUTTON = By.xpath(DELETECOURSE_BUTTON_XPATH);
    
    public static final By BACK_TO_DASHBOARD = By.id(COURSE_BACK_TO_DASHBOARD_ID);
    
    public static final By FORUM_NEWENTRY_MODAL_POSTBUTTON = By.id(FORUM_NEWENTRY_MODAL_POSTBUTTON_ID);
    
    //TABS
    public static final By FORUMTAB = By.xpath(FORUMTAB_XPATH); //ALERT! not working for some tests
    
    //MODALS
    public static final By NEWCOURSE_MODAL = By.id(NEWCOURSE_MODAL_ID);
    public static final By EDITDELETE_MODAL = By.id(EDITDELETE_MODAL_ID);
    public static final By LOGIN_MODAL = By.id(LOGIN_MODAL_ID);
    public static final By FORUM_NEWENTRY_MODAL = By.id(FORUM_NEWENTRY_MODAL_ID);
   
    //OTHER ELEMENTS
    public static final By FOOTER = By.className(FOOTER_CLASS);
    public static final By MAINMENU_ARROW = By.id(MAINMENU_ARROW_ID);
    
    public static final By LOGIN_USER_FIELD = By.id(LOGINMODAL_USER_FIELD_ID);
    public static final By LOGIN_PASSWORD_FIELD = By.id(LOGINMODAL_PASSWORD_FIELD_ID);
    
    public static final By SETTINGS_USEREMAIL = By.id(SETTINGS_USEREMAIL_ID);
    
    public static final By COURSESDASHBOARD_TITLE = By.className(COURSESDASHBOARD_TITLE_CLASS);
    public static final By COURSELIST = By.id(COURSELIST_ID);
    
    public static final By FORUMENTRYLIST_ENTRYTITLE = By.className(FORUMENTRYLIST_ENTRYTITLE_CLASS);
    public static final By FORUMENTRYLIST_ENTRIESUL = By.className(FORUMENTRYLIST_ENTRIESUL_CLASS);
    public static final By FORUMENTRYLIST_ENTRY_USER = By.className(FORUMENTRYLIST_ENTRY_USER_CLASS);
    public static final By FORUMCOMMENTLIST = By.id(FORUMCOMMENTLIST_ID);
    public static final By FORUMCOMMENTLIST_ENTRY_TITLE = By.className(FORUMCOMMENTLIST_ENTRY_TITLE_CLASS);
    public static final By FORUMCOMMENTLIST_ENTRY_USER = By.className(FORUMCOMMENTLIST_ENTRY_USER_CLASS);
    public static final By FORUMCOMMENTLIST_COMMENT = By.className(FORUMCOMMENTLIST_COMMENT_CLASS);
    public static final By FORUMCOMMENTLIST_COMMENT_USER = By.className(FORUMCOMMENTLIST_COMMENT_USER_CLASS);
    public static final By FORUMCOMMENTLIST_COMMENT_CONTENT = By.className(FORUMCOMMENTLIST_COMMENT_CONTENT_CLASS);
    public static final By BACK_TO_ENTRIESLIST_ICON = By.id(FORUMCOMMENTLIST_BACK_TO_ENTRIESLIST_ICON_ID);
    
    public static final By FORUM_NEWENTRY_MODAL_TITLE = By.id(FORUM_NEWENTRY_MODAL_TITLE_ID);
    public static final By FORUM_NEWENTRY_MODAL_CONTENT = By.id(FORUM_NEWENTRY_MODAL_CONTENT_ID);
    
    public static final By COURSELIST_COURSETITLE = By.className(COURSELIST_COURSETITLE_CLASS);
    
    //ICONS
    public static final By FORUM_ICON = By.id(FORUM_ICON_ID);
    public static final By HOME_ICON = By.id(HOME_ICON_ID);
    public static final By SESSION_ICON = By.id(SESSION_ICON_ID);
    public static final By FILES_ICON = By.id(FILES_ICON_ID);
    public static final By ATTENDERS_ICON = By.id(ATTENDERS_ICON_ID);
    
    public static final By FORUM_NEWENTRY_ICON = By.id(FORUM_NEWENTRY_ICON_ID);
    public static final By FORUM_EDITENTRY_ICON = By.id(FORUM_EDITENTRY_ICON_ID);
    //KEYS
	public static final String SELECTALL = Keys.chord(Keys.CONTROL, "a");
	public static final String NEWLINE = Keys.chord(Keys.ENTER);
	public static final String DELETE = Keys.chord(Keys.BACK_SPACE);
}
