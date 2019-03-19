package com.fullteaching.backend.integration.security;

import static org.springframework.security.test.web.servlet.setup.SecurityMockMvcConfigurers.springSecurity;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.junit.jupiter.api.Assertions.*;

import java.io.UnsupportedEncodingException;

import javax.servlet.http.HttpSession;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import com.fullteaching.backend.AbstractControllerUnitTest;
import com.fullteaching.backend.utils.LoginTestUtils;

public class LoginControllerUnitaryTest extends AbstractControllerUnitTest {

	
	String user_parameters = "[\"fakeemail@gmail.com\", \"Mock66666\", \"fakeUser\", \"IGNORE\"]";

	String logout_uri = "/api-logOut";
	String login_uri = "/api-logIn";
	
	@BeforeEach
	public void setUp() {
		mvc = MockMvcBuilders.webAppContextSetup(webAppCtx)
				.apply(springSecurity())
				.build();
	}

	@Test
	public void logInSecurityTest() throws UnsupportedEncodingException, Exception {

		LoginTestUtils.registerUserIfNotExists(mvc, user_parameters);
		
		String userPass = "fakeemail@gmail.com:Mock66666";

		MvcResult result_login = mvc.perform(get(login_uri)
						.header("Authorization", "Basic "+LoginTestUtils.utf8_to_b64(userPass))
						.header("X-Requested-With", "XMLHttpRequest")
					.contentType(MediaType.APPLICATION_JSON_VALUE)
				).andReturn();
		
		System.out.println(result_login.getResponse().toString());
		int status_login = result_login.getResponse().getStatus();
		
		assertTrue(status_login==HttpStatus.OK.value(),
				"failure login - expected HTTP status "+
						HttpStatus.OK.value() +
						" but was: "+status_login);
		
		//login KO 
		MvcResult result_login_ko = mvc.perform(get(login_uri)
						.header("X-Requested-With", "XMLHttpRequest")
					.contentType(MediaType.APPLICATION_JSON_VALUE)
				).andReturn();
		
		System.out.println(result_login_ko.getResponse().toString());
		int status_login_ko = result_login_ko.getResponse().getStatus();
		
		assertTrue(status_login_ko==HttpStatus.UNAUTHORIZED.value(),
				"failure login - expected HTTP status "+
						HttpStatus.UNAUTHORIZED.value() +
						" but was: "+status_login_ko);

		//login KO bad password
		String userBadPass = "fakeemail@gmail.com:BadPass";

		MvcResult result_login_bad_password = mvc.perform(get(login_uri)
						.header("Authorization", "Basic "+LoginTestUtils.utf8_to_b64(userBadPass))
						.header("X-Requested-With", "XMLHttpRequest")
					.contentType(MediaType.APPLICATION_JSON_VALUE)
				).andReturn();
		
		System.out.println(result_login_ko.getResponse().toString());
		int status_login_bad_password = result_login_bad_password.getResponse().getStatus();
		
		assertTrue(status_login_bad_password==HttpStatus.UNAUTHORIZED.value(),
				"failure login - expected HTTP status "+
						HttpStatus.UNAUTHORIZED.value() +
						" but was: "+status_login_bad_password);
		
		//login KO nouser
				String noUser = "nouser:BadPass";

				MvcResult result_login_noUser = mvc.perform(get(login_uri)
								.header("Authorization", "Basic "+LoginTestUtils.utf8_to_b64(noUser))
								.header("X-Requested-With", "XMLHttpRequest")
							.contentType(MediaType.APPLICATION_JSON_VALUE)
						).andReturn();
				
				System.out.println(result_login_ko.getResponse().toString());
				int status_login_noUser = result_login_noUser.getResponse().getStatus();
				
				assertTrue(status_login_noUser==HttpStatus.UNAUTHORIZED.value(),
						"failure login - expected HTTP status "+
								HttpStatus.UNAUTHORIZED.value() +
								" but was: "+status_login_noUser);
		
		
	}

	@Test
	public void logOutSecurityTest() throws Exception {
		/*Create new user*/
		LoginTestUtils.registerUserIfNotExists(mvc, user_parameters);
		
		/*Login user*/
		HttpSession session = LoginTestUtils.logIn(mvc, "fakeemail@gmail.com", "Mock66666");
		
		/*Test LogOut OK*/
		MvcResult result_pass = mvc.perform(put(logout_uri)
				.contentType(MediaType.APPLICATION_JSON_VALUE)
				.session((MockHttpSession) session)
			).andReturn();
		
		int status_pass = result_pass.getResponse().getStatus();
		assertTrue(status_pass==HttpStatus.OK.value(),
				"failure login - expected HTTP status "+
						HttpStatus.OK.value() +
						" but was: "+status_pass);
		
		/*Test LogOut Unauthorized*/
		MvcResult result_unauthorized = mvc.perform(put(logout_uri)
				.contentType(MediaType.APPLICATION_JSON_VALUE)
				.session((MockHttpSession) session)
			).andReturn();
		
		int status_unauthorized = result_unauthorized.getResponse().getStatus();
		assertTrue(status_unauthorized==HttpStatus.UNAUTHORIZED.value(),
				"failure login - expected HTTP status "+
				HttpStatus.UNAUTHORIZED.value() +
				" but was: "+status_unauthorized);
		
		
	
	}

}
