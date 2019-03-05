package com.fullteaching.e2e.no_elastest.common;

import com.fullteaching.e2e.no_elastest.common.exception.BadUserException;
import com.fullteaching.e2e.no_elastest.common.exception.ElementNotFoundException;
import com.fullteaching.e2e.no_elastest.common.exception.NotLoggedException;
import com.fullteaching.e2e.no_elastest.common.exception.TimeOutExeception;
import com.fullteaching.e2e.no_elastest.utils.SetUp;

import io.github.bonigarcia.seljup.BrowserType;
import io.github.bonigarcia.seljup.DriverCapabilities;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.TestInfo;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.logging.LogEntries;
import org.openqa.selenium.logging.LoggingPreferences;
import org.openqa.selenium.remote.DesiredCapabilities;

import org.openqa.selenium.remote.RemoteWebDriver;
import org.slf4j.Logger;

import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.Date;
import java.util.Properties;

import static java.lang.invoke.MethodHandles.lookup;
import static java.util.logging.Level.ALL;
import static org.openqa.selenium.logging.LogType.BROWSER;
import static org.openqa.selenium.remote.CapabilityType.LOGGING_PREFS;
import static org.openqa.selenium.remote.DesiredCapabilities.chrome;
import static org.slf4j.LoggerFactory.getLogger;

public class BaseLoggedTest {

    //protected common attributes
    protected static final String BROWSER_VERSION_LATEST = "latest";

    protected static final String host= SetUp.getHost();

    protected static String userName;
    protected static String user;
    protected static String password;

    protected final Logger log = getLogger(lookup().lookupClass());

    public WebDriver driver;

    protected Properties properties;

    @DriverCapabilities
    DesiredCapabilities capabilities = chrome();

    {
        LoggingPreferences logPrefs = new LoggingPreferences();
        logPrefs.enable(BROWSER, ALL);
        capabilities.setCapability(LOGGING_PREFS, logPrefs);
    }

    @BeforeEach
    void setup(TestInfo testInfo) {
        String testName = testInfo.getTestMethod().get().getName();
        log.info("##### Start test: {}", testName);

        properties = new Properties();
        try {
            // load a properties file for reading
            properties.load(new FileInputStream("src/test/resources/inputs/test.properties"));

        } catch (IOException ex) {
            ex.printStackTrace();
        }
    }

    @AfterEach
    void tearDown(TestInfo testInfo) throws IOException {
        String testName = testInfo.getTestMethod().get().getName();
        log.info("##### Finish test: {}", testName);
        if (driver != null) {
            log.info("url:"+driver.getCurrentUrl()+"\nScreenshot (in Base64) at the end of the test:\n{}",
                    SetUp.getBase64Screenshot(driver));

            log.info("Browser console at the end of the test");
            LogEntries logEntries = driver.manage().logs().get(BROWSER);
            logEntries.forEach((entry) -> log.info("[{}] {} {}",
                    new Date(entry.getTimestamp()), entry.getLevel(),
                    entry.getMessage()));
        }

    }

    protected WebDriver loginAndValidate(WebDriver driver, String user, String password) throws BadUserException, ElementNotFoundException, NotLoggedException, TimeOutExeception {

        this.user = user;
        this.password = password;

        //check if logged with correct user
        driver = SetUp.loginUser(driver, host, user, password);

        driver = UserUtilities.checkLogin(driver, user);

        userName = UserUtilities.getUserName(driver, true, host);

        return driver;
    }

}