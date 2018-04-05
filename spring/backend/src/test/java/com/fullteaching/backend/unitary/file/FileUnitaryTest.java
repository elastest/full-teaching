package com.fullteaching.backend.unitary.file;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import com.fullteaching.backend.AbstractUnitTest;
import com.fullteaching.backend.file.File;

public class FileUnitaryTest extends AbstractUnitTest {

	static int filetype = 0;
	static String filename = "FileNAME.doc";
	static String filelink = "this link";
	static int fileorder = 1;

	
	@BeforeEach
	public void setUp() throws Exception {

	}

	@Test
	public void newFileTest() {
		File f1 = new File (filetype, filename);
		assertNotNull(f1);
		assertTrue(filetype==f1.getType());
		assertTrue(filename.equals(f1.getName()));
		//No possiblity of test as Random is used
		//assertTrue(encoder.matches(filename, f1.getNameIdent()));
		
		
		File f2 = new File (filetype, filename, filelink);
		assertNotNull(f2);
		assertTrue(filetype==f2.getType());
		assertTrue(filename.equals(f2.getName()));
		assertTrue(filelink.equals(f2.getLink()));
		//No possiblity of test as Random is used
		//assertTrue(encoder.matches(filename, f2.getNameIdent()));
		
		File f3 = new File (filetype, filename, filelink, fileorder);
		assertNotNull(f3);
		assertTrue(filetype==f3.getType());
		assertTrue(filename.equals(f3.getName()));
		assertTrue(filelink.equals(f3.getLink()));
		assertTrue(fileorder==f3.getIndexOrder());
		//No possiblity of test as Random is used
		//assertTrue(encoder.matches(filename, f3.getNameIdent()));
		
		File f4 = new File (filetype, ".doc");
		assertNotNull(f4);
		assertTrue(filetype==f4.getType());
		assertTrue(".doc".equals(f4.getName()));
		assertTrue(f4.getNameIdent().contains(".doc"));
		//No possiblity of test as Random is used
		//assertTrue(encoder.matches(filename, f1.getNameIdent()));
		
	}
	

	@Test
	public void setAndGetFileIdTest() {
		File f1 = new File (filetype, filename);
		assertNotNull(f1);
		assertTrue(filetype==f1.getType());
		assertTrue(filename.equals(f1.getName()));
		
		f1.setId(0);
		assertTrue(0==f1.getId());
	}

	@Test
	public void setAndGetFileTypeTest() {
		File f1 = new File (filetype, filename);
		assertNotNull(f1);
		assertTrue(filetype==f1.getType());
		assertTrue(filename.equals(f1.getName()));
		
		f1.setType(1);
		assertTrue(1==f1.getType());

	}

	@Test
	public void setAndGetFileNameTest() {
		File f1 = new File (filetype, filename);
		assertNotNull(f1);
		assertTrue(filetype==f1.getType());
		assertTrue(filename.equals(f1.getName()));
		
		f1.setName("test_name");
		assertTrue("test_name".equals(f1.getName()));
	}

	@Test
	public void setAndGetFileNameIdentTest() {
		File f1 = new File (filetype, filename);
		assertNotNull(f1);
		assertTrue(filetype==f1.getType());
		assertTrue(filename.equals(f1.getName()));
		
		f1.setNameIdent("NAME_IDENT");
		assertTrue("NAME_IDENT".equals(f1.getNameIdent()));

	}

	@Test
	public void setAndGetFileLinkTest() {
		File f1 = new File (filetype, filename);
		assertNotNull(f1);
		assertTrue(filetype==f1.getType());
		assertTrue(filename.equals(f1.getName()));
		
		f1.setLink(filelink);
		assertTrue(filelink.equals(f1.getLink()));
	}

	@Test
	public void testGetIndexOrder() {
		File f1 = new File (filetype, filename);
		assertNotNull(f1);
		assertTrue(filetype==f1.getType());
		assertTrue(filename.equals(f1.getName()));
		
		f1.setIndexOrder(5);
		assertTrue(5 == f1.getIndexOrder());
	}

	@Test
	public void testEqualsObject() {
		File f1 = new File (filetype, filename);
		f1.setId(5);
		assertNotNull(f1);
		assertTrue(filetype==f1.getType());
		assertTrue(filename.equals(f1.getName()));
		
		File f2 = new File (filetype, filename);
		f2.setId(2);
		assertNotNull(f2);
		assertTrue(filetype==f2.getType());
		assertTrue(filename.equals(f2.getName()));
		
		File f3 = new File (filetype, filename);
		f3.setId(5);
		assertNotNull(f3);
		assertTrue(filetype==f3.getType());
		assertTrue(filename.equals(f3.getName()));
		
		
		assertTrue(f1.equals(f3));
		assertTrue(!f1.equals(null));
		assertTrue(!f1.equals("not a file"));
		assertTrue(!f1.equals(f2));
	}

	@Test
	public void getFileExtTest() {
		File f1 = new File (filetype, filename);
		f1.setId(5);
		assertNotNull(f1);
		assertTrue(filetype==f1.getType());
		assertTrue(filename.equals(f1.getName()));
		
		assertTrue("doc".equals(f1.getFileExtension()));
	}

}
