package com.fullteaching.backend.unitary.session;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import com.fullteaching.backend.AbstractUnitTest;
import com.fullteaching.backend.course.Course;
import com.fullteaching.backend.session.Session;
import com.fullteaching.backend.utils.CourseTestUtils;
import com.fullteaching.backend.user.User;

public class SessionUnitaryTest extends AbstractUnitTest {

	private static String title = "Session Title";
	private static String description = "Session Description";
	
	@BeforeEach
	public void setUp() throws Exception {
	}

	@Test
	public void newSessionTest() {
		//Empty Session
		Session emptySession = new Session();
		assertNotNull(emptySession);
		
		//Not empty
		Long date = System.currentTimeMillis();
		Session session = new Session(title, description, date);
		assertNotNull(session);
		assertTrue(date == session.getDate());
		assertTrue(title.equals(session.getTitle()));
		assertTrue(description.equals(session.getDescription()));
		
		//with course 
		String[] roles = {"STUDENT"};
		User u = new User("mock_teacher","mock2222","t_mocky", null,roles);
		Course c= CourseTestUtils.newCourseWithCd("course", u, null, "this is the info", false);
		
		Session c_session = new Session(title, description, date, c);
		assertNotNull(c_session);
		assertTrue(date == c_session.getDate());
		assertTrue(title.equals(c_session.getTitle()));
		assertTrue(description.equals(c_session.getDescription()));
		assertTrue(c.equals(c_session.getCourse()));
	}


	@Test
	public void setAndGetSessionTitleTest() {
		Session session = new Session();
		session.setTitle(title);
		assertNotNull(session);
		assertTrue(title.equals(session.getTitle()));
	}

	@Test
	public void setAndGetSessionDescriptionTest() {
		Session session = new Session();
		session.setDescription(description);
		assertNotNull(session);
		assertTrue(description.equals(session.getDescription()));
	}

	@Test
	public void setAndGetSessionDateTest() {
		Session session = new Session();
		Long date = System.currentTimeMillis();
		session.setDate(date);
		assertNotNull(session);
		assertTrue(date == session.getDate());	
	}

	@Test
	public void setAndGetSessionCourseTest() {
		String[] roles = {"STUDENT"};
		User u = new User("mock_teacher","mock2222","t_mocky", null,roles);
		Course c= CourseTestUtils.newCourseWithCd("course", u, null, "this is the info", false);
		
		Session session = new Session();
		session.setCourse(c);
		assertNotNull(session);
		assertTrue(c.equals(session.getCourse()));		
	}

	@Test
	public void equalSessionTest() {
		Session session1 = new Session();
		session1.setId(1);
		Session session2 = new Session();
		session2.setId(1);
		Session session3 = new Session();
		session3.setId(2);
		assertNotNull(session1);
		assertNotNull(session2);
		assertNotNull(session3);
		assertTrue(session1.equals(session2));	
		assertTrue(session1.equals(session1));
		assertTrue(!session1.equals(null));
		assertTrue(!session1.equals("not_a_session"));
		assertTrue(!session1.equals(session3));
		
	}

}
