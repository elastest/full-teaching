package com.fullteaching.backend.unitary.filegroup;


import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import com.fullteaching.backend.AbstractUnitTest;
import com.fullteaching.backend.file.File;
import com.fullteaching.backend.filegroup.FileGroup;

public class FileGroupUnitaryTest extends AbstractUnitTest {

	private static String filegroup_name="FileGroup";
	static int filetype = 0;
	static String filename = "FileNAME.doc";
	
	@BeforeEach
	public void setUp() throws Exception {
	}

	@Test
	public void testFileGroup() {
		FileGroup fg1 = new FileGroup();
		assertNotNull(fg1);
		
		FileGroup fg2 = new FileGroup(filegroup_name);
		assertNotNull(fg2);
		assertTrue(filegroup_name.equals(fg2.getTitle()));
		
		FileGroup fg3 = new FileGroup(filegroup_name,fg2);
		assertNotNull(fg3);
		assertTrue(filegroup_name.equals(fg3.getTitle()));
		assertNotNull(fg3.getFileGroupParent());
		assertTrue(fg2.equals(fg3.getFileGroupParent()));

	}

	@Test
	public void setAndGetFileGroupIdTest() {
		FileGroup fg1 = new FileGroup();
		assertNotNull(fg1);
		
		fg1.setId(1);
		assertTrue(1==fg1.getId());
	}

	@Test
	public void setAndGetTitleTest() {
		FileGroup fg1 = new FileGroup();
		assertNotNull(fg1);
		
		fg1.setTitle(filegroup_name);
		assertTrue(filegroup_name.equals(fg1.getTitle()));
	}

	@Test
	public void setAndGetFilesTest() {
		FileGroup fg1 = new FileGroup();
		assertNotNull(fg1);
		
		List<File> files = new ArrayList<File>();
		files.add( new File (filetype, filename));
		fg1.setFiles(files);
		
		assertTrue(fg1.getFiles().size()==1);
		
	}

	@Test
	public void setAndGetFileGroupsTest() {
		List<FileGroup> groups = new ArrayList<FileGroup>();
		groups.add(new FileGroup(filegroup_name+"2"));
		groups.add(new FileGroup(filegroup_name+"3"));
		
		FileGroup fg3 = new FileGroup();
		assertNotNull(fg3);
		
		fg3.setFileGroups(groups);
		
		assertTrue(fg3.getFileGroups().size()==2);
	}

	@Test
	public void setAndGetFileGroupParentTest() {
		FileGroup fg1 = new FileGroup();
		assertNotNull(fg1);
		
		FileGroup fg2 = new FileGroup(filegroup_name);
		assertNotNull(fg2);
		assertTrue(filegroup_name.equals(fg2.getTitle()));
		
		fg1.setFileGroupParent(fg2);
		assertNotNull(fg1.getFileGroupParent());
		assertTrue(fg2.equals(fg1.getFileGroupParent()));
	}

	@Test
	public void fileGroupEqualTest() {
		FileGroup fg1 = new FileGroup();
		assertNotNull(fg1);
		fg1.setId(1);
		FileGroup fg2 = new FileGroup(filegroup_name);
		assertNotNull(fg2);
		fg2.setId(2);
		FileGroup fg3 = new FileGroup(filegroup_name);
		assertNotNull(fg3);
		fg3.setId(1);
		
		assertTrue(!fg1.equals(null));
		assertTrue(!fg1.equals("not a group"));
		assertTrue(!fg1.equals(fg2));
		assertTrue(fg1.equals(fg3));
		
	}

	@Test
	public void updateFileIndexOrderTest() {
		FileGroup fg1 = new FileGroup();
		assertNotNull(fg1);
		
		List<File> files = new ArrayList<File>();
		files.add( new File (filetype, filename));
		files.add( new File (filetype, filename+"2"));
		fg1.setFiles(files);
		
		fg1.updateFileIndexOrder();
		
		List<File> list = fg1.getFiles(); 
		assertTrue(list.get(0).getIndexOrder()==0);
		assertTrue(list.get(1).getIndexOrder()==1);
		
	}

}
