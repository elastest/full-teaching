package com.fullteaching.backend.unitary.comment;


import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import com.fullteaching.backend.AbstractUnitTest;
import com.fullteaching.backend.comment.Comment;
import com.fullteaching.backend.user.User;

public class CommentUnitaryTest extends AbstractUnitTest {

	@BeforeEach
	public void setUp() throws Exception {
	}

	@Test
	public void newForumEntryCommentTest() {
		Comment cm = new Comment();
		assertNotNull(cm);
		
		String[] roles = {"TEACHER"};
		User u =  new User("mock", "Pass1234", "mock", null, roles);
		Long date = System.currentTimeMillis();
		String message = "This is the message";
		Comment cm2 = new Comment(message, date, u);
	
		assertNotNull(cm2);
		assertNotNull(cm2.getReplies());
		assertTrue(u.equals(cm2.getUser()));
		assertTrue(date== cm2.getDate());
		assertTrue(message.equals(cm2.getMessage()));
		
		Comment cm3 = new Comment(message, date, u, cm2);
		
		assertNotNull(cm3);
		assertNotNull(cm3.getReplies());
		assertTrue(u.equals(cm3.getUser()));
		assertTrue(date== cm3.getDate());
		assertTrue(message.equals(cm3.getMessage()));
		assertTrue(cm2.equals(cm3.getCommentParent()));
	}


	@Test
	public void setAndGetCommentMessageTest() {
		Comment cm = new Comment();
		String message = "This is the message";
		cm.setMessage(message);
		assertNotNull(cm);
		assertTrue(message.equals(cm.getMessage()));
	}

	@Test
	public void setAndGetCommentDateTest() {
		Comment cm = new Comment();
		Long date = System.currentTimeMillis();
		cm.setDate(date);
		assertNotNull(cm);
		assertTrue(date== cm.getDate());
	}

	@Test
	public void setAndGetCommentRepliesTest() {
		String[] roles = {"TEACHER"};
		User u =  new User("mock", "Pass1234", "mock", null, roles);
		Long date = System.currentTimeMillis();
		String message = "This is the message";
		Comment rep = new Comment(message, date, u);
		
		List<Comment> replies = new ArrayList<Comment>();
		replies.add(rep);
		
		Comment cm = new Comment();
		cm.setReplies(replies);
		assertNotNull(cm);
		assertNotNull(cm.getReplies());
		assertTrue(replies.equals(cm.getReplies()));
	}

	@Test
	public void setAndGetCommentUserTest() {
		String[] roles = {"TEACHER"};
		User u =  new User("mock", "Pass1234", "mock", null, roles);
		
		Comment cm = new Comment();
		cm.setUser(u);
		assertNotNull(cm);
	}

	@Test
	public void setAndGetCommentParentTest() {
		String[] roles = {"TEACHER"};
		User u =  new User("mock", "Pass1234", "mock", null, roles);
		Long date = System.currentTimeMillis();
		String message = "This is the message";
		Comment parent = new Comment(message, date, u);
		
		Comment cm = new Comment();
		cm.setCommentParent(parent);
		assertNotNull(cm);
	}

}
