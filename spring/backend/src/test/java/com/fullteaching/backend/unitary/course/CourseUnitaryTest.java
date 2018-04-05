package com.fullteaching.backend.unitary.course;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import com.fullteaching.backend.AbstractUnitTest;
import com.fullteaching.backend.course.Course;
import com.fullteaching.backend.coursedetails.CourseDetails;
import com.fullteaching.backend.user.User;

public class CourseUnitaryTest extends AbstractUnitTest {

	private static String title = "CURSO de Prueba";
	private static String image = "Mock_image";
	private static User teacher;
	
	
	@BeforeAll
	public static void initialize() {
		String [] roles = {"ROLE_TEACHER"};
		teacher = new User("mock_teacher","mock2222","t_mocky", null,roles);
	}

	@Test
	public void newCourseTest() {
		Course c2 = new Course();
		assertNotNull(c2);
		
		Course c = new Course(title, image, teacher);
		assertNotNull(c);
		assertTrue(c.getTeacher().equals(teacher));
		assertTrue(c.getImage().equals(image));
		assertTrue(c.getTitle().equals(title));
		assertNotNull(c.getSessions());
		assertNotNull(c.getAttenders());
		assertNull(c.getCourseDetails());
		
		CourseDetails cd = new CourseDetails();
		
		Course c3 = new Course(title, image, teacher, cd);
		assertNotNull(c3);
		assertTrue(c3.getTeacher().equals(teacher));
		assertTrue(c3.getImage().equals(image));
		assertTrue(c3.getTitle().equals(title));
		assertNotNull(c3.getSessions());
		assertNotNull(c3.getAttenders());
		assertNotNull(c3.getCourseDetails());
		
		assertTrue(c3.getCourseDetails().equals(cd));
	}


	@Test
	public void setAndGetCourseTitleTest() {
		Course c = new Course();
		c.setTitle(title);
		assertTrue(c.getTitle().equals(title));
	}

	@Test
	public void setAndGetCourseImageTest() {
		Course c = new Course();
		c.setImage(image);
		assertTrue(c.getImage().equals(image));
	}

	@Test
	public void setAndGetCourseTeacherTest() {
		Course c = new Course();
		c.setTeacher(teacher);
		assertTrue(c.getTeacher().equals(teacher));
	}

	@Test
	public void setAndGetCourseDetailsTest() {
		Course c = new Course();
		c.setCourseDetails(new CourseDetails());
		assertNotNull(c.getCourseDetails());
	}

	@Test
	public void equalCourseTest() {
		CourseDetails cd = new CourseDetails();
		
		Course c1 = new Course(title, image, teacher, cd);
		c1.setId((long) Math.floor((Math.random()*Long.MAX_VALUE )));
		Course c2 = new Course(title, image, teacher);
		c1.setId((long) Math.floor((Math.random()*Long.MAX_VALUE)));
		
		assertTrue(c1.equals(c1));
		assertTrue(!c1.equals("not_a_course"));
		assertTrue(!c1.equals(c2));
		assertTrue(!c1.equals(null));
		
	}

}
