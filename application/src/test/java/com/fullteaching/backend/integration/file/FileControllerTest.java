package com.fullteaching.backend.integration.file;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;


import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockHttpSession;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.fullteaching.backend.AbstractControllerUnitTest;
import com.fullteaching.backend.AbstractLoggedControllerUnitTest;
import com.fullteaching.backend.course.Course;
import com.fullteaching.backend.file.MimeTypes;
import com.fullteaching.backend.filegroup.FileGroup;
import com.fullteaching.backend.utils.CourseTestUtils;
import com.fullteaching.backend.utils.FileTestUtils;

public class FileControllerTest extends AbstractLoggedControllerUnitTest {

	private static String upload_uri="/api-load-files/upload/course/{courseId}/file-group/";//{fileGroupId}
	private static String download_uri="/api-load-files/course/{courseId}/download/";//{fileId}
	private static String uploadPicture_uri="/api-load-files/upload/picture/";//{userId}
	
	private static MockMultipartFile firstFile = new MockMultipartFile("data", "filename.txt", "text/plain", "some xml".getBytes());
	private static MockMultipartFile secondFile = new MockMultipartFile("data", "other-file-name.txt", "text/plain", "some other type".getBytes());
	private static MockMultipartFile jsonFile = new MockMultipartFile("json", "", "application/json", "{\"json\": \"someValue\"}".getBytes());
	
	@BeforeEach
	public void setUp() {
		super.setUp();
	}


	@Test
	public void fileUploadTest() {
		Course c = CourseTestUtils.newCourseWithCd("Course", loggedUser, null, "this is the info", true);
		c = CourseTestUtils.createCourseIfNotExist(mvc, c, httpSession);
		
		FileGroup fg = new FileGroup("Test File Group");
		fg = FileTestUtils.newFileGroup(mvc, httpSession, fg, c);
		
		
		try {
			MvcResult result =  mvc.perform(MockMvcRequestBuilders.fileUpload(upload_uri.replace("{courseId}",""+c.getId())+fg.getId())
	                .file(firstFile)
	                .session((MockHttpSession) httpSession)
	                ).andReturn();
	
			int status = result.getResponse().getStatus();
			
			int expected = HttpStatus.CREATED.value();
			
			assertEquals(expected, status, "failure - expected HTTP status "+expected);
			
			fg = FileTestUtils.json2FileGroup(result.getResponse().getContentAsString());
			
			assertEquals(0, fg.getFiles().get(0).getIndexOrder(), "failure - file order"+ 0);
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION: //test OK");
		}
		//test secondFile
		try {
			MvcResult result =  mvc.perform(MockMvcRequestBuilders.fileUpload(upload_uri.replace("{courseId}",""+c.getId())+fg.getId())
	                .file(secondFile)
	                .session((MockHttpSession) httpSession)
	                ).andReturn();
	
			int status = result.getResponse().getStatus();
			
			int expected = HttpStatus.CREATED.value();
			
			assertEquals(expected, status, "failure - expected HTTP status "+expected);
			
			fg = FileTestUtils.json2FileGroup(result.getResponse().getContentAsString());
			
			assertEquals(1, fg.getFiles().get(1).getIndexOrder(), "failure - file order"+ 1);
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION: //test OK");
		}
		
		//BAD_REQUEST
		try {
			MvcResult result =  mvc.perform(MockMvcRequestBuilders.fileUpload(upload_uri.replace("{courseId}",""+c.getId())+"not_a_long")
	                .file(firstFile)
	                .session((MockHttpSession) httpSession)
	                ).andReturn();
	
			int status = result.getResponse().getStatus();
			
			int expected = HttpStatus.BAD_REQUEST.value();
			
			assertEquals(expected, status, "failure - expected HTTP status "+expected);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION: //test BAD_REQUEST");
		}
		
		//UNAUTHORIZED
		try {
			MvcResult result =  mvc.perform(MockMvcRequestBuilders.fileUpload(upload_uri.replace("{courseId}",""+c.getId())+"not_a_long")
	                .file(firstFile)
	                ).andReturn();
	
			int status = result.getResponse().getStatus();
			
			int expected = HttpStatus.UNAUTHORIZED.value();
			
			assertEquals(expected, status, "failure - expected HTTP status "+expected);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION: //test UNAUTHORIZED");
		}
	}
	
	@Test
	public void fileDownloadTest() {
		Course c = CourseTestUtils.newCourseWithCd("Course", loggedUser, null, "this is the info", true);
		c = CourseTestUtils.createCourseIfNotExist(mvc, c, httpSession);
		
		FileGroup fg = new FileGroup("Test File Group");
		fg = FileTestUtils.newFileGroup(mvc, httpSession, fg, c);
		
		fg = FileTestUtils.uploadTestFile(mvc, httpSession, fg, c);
		
		long fileId = fg.getFiles().get(0).getId();
		String expected_contentType = MimeTypes.getMimeType(fg.getFiles().get(0).getFileExtension());
		
		//test OK
		try {

			MvcResult result =  mvc.perform(get(download_uri.replace("{courseId}", ""+c.getId())+fileId)
					                .contentType(MediaType.APPLICATION_JSON_VALUE)
					                .session((MockHttpSession) httpSession)
					                ).andReturn();
	
			int status = result.getResponse().getStatus();
			
			int expected = HttpStatus.OK.value();
			
			String contentType = result.getResponse().getContentType();
			
			String content = result.getResponse().getContentAsString();
			System.out.println(content);

			assertEquals(expected, status, "failure - expected HTTP status "+expected);
			assertEquals(expected_contentType, contentType, "failure - expected ContenType "+ expected_contentType);
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION: //test OK");
		}
		//test Unkown file
				try {

					MvcResult result =  mvc.perform(get(download_uri.replace("{courseId}", ""+c.getId())+23123)//Unexisting file
							                .contentType(MediaType.APPLICATION_JSON_VALUE)
							                .session((MockHttpSession) httpSession)
							                ).andReturn();
			
					int status = result.getResponse().getStatus();
					
					int expected = HttpStatus.NOT_FOUND.value();
					
					String content = result.getResponse().getContentAsString();
					System.out.println(content);

					assertEquals(expected, status, "failure - expected HTTP status "+expected);
				
				} catch (Exception e) {
					e.printStackTrace();
					fail("EXCEPTION: //test NOT_FOUND");
				}
		//test UNAUTHORIZED
		try {

			MvcResult result =  mvc.perform(get(download_uri.replace("{courseId}", ""+c.getId())+fileId)
					                .contentType(MediaType.APPLICATION_JSON_VALUE)
					                ).andReturn();
	
			int status = result.getResponse().getStatus();
			
			int expected = HttpStatus.UNAUTHORIZED.value();
			
			String content = result.getResponse().getContentAsString();
			System.out.println(content);

			assertEquals(expected, status, "failure - expected HTTP status "+expected);
		
		} catch (Exception e) {
			e.printStackTrace();
			fail("UNAUTHORIZED: //test OK");
		}
		
		//test BAD_REQUEST UNPROCESSABLE_ENTITY
		try {

			MvcResult result =  mvc.perform(get(download_uri.replace("{courseId}", ""+c.getId())+"not_a_long")
					                .contentType(MediaType.APPLICATION_JSON_VALUE)
					                .session((MockHttpSession) httpSession)
					                ).andReturn();
	
			int status = result.getResponse().getStatus();
			
			int expected = HttpStatus.UNPROCESSABLE_ENTITY.value();
			
			String content = result.getResponse().getContentAsString();
			System.out.println(content);

			assertEquals(expected, status, "failure - expected HTTP status "+expected);
		
		} catch (Exception e) {
			e.printStackTrace();
			fail("UNAUTHORIZED: //test UNPROCESSABLE_ENTITY");
		}
	}

	
	@Test
	public void pictureUploadTest() {
	

		try {
			MvcResult result =  mvc.perform(MockMvcRequestBuilders.fileUpload(uploadPicture_uri+loggedUser.getId())
	                .file(firstFile)
	                .session((MockHttpSession) httpSession)
	                ).andReturn();
	
			int status = result.getResponse().getStatus();
			
			int expected = HttpStatus.CREATED.value();
			
			assertEquals(expected, status, "failure - expected HTTP status "+expected);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION: //test OK");
		}
		
		//BAD_REQUEST
		try {
			MvcResult result =  mvc.perform(MockMvcRequestBuilders.fileUpload(uploadPicture_uri+"not_a_long")
	                .file(firstFile)
	                .session((MockHttpSession) httpSession)
	                ).andReturn();
	
			int status = result.getResponse().getStatus();
			
			int expected = HttpStatus.BAD_REQUEST.value();
			
			assertEquals(expected, status, "failure - expected HTTP status "+expected);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION: //test BAD_REQUEST");
		}
		
		//UNAUTHORIZED
		try {
			MvcResult result =  mvc.perform(MockMvcRequestBuilders.fileUpload(uploadPicture_uri+loggedUser.getId())
	                .file(firstFile)
	                ).andReturn();
	
			int status = result.getResponse().getStatus();
			
			int expected = HttpStatus.UNAUTHORIZED.value();
			
			assertEquals(expected, status, "failure - expected HTTP status "+expected);
			
			
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION: //test UNAUTHORIZED");
		}
	}

}
