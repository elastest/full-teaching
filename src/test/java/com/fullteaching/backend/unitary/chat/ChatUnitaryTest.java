package com.fullteaching.backend.unitary.chat;

import java.util.concurrent.ExecutorService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

import org.mockito.Mock;
import org.springframework.web.socket.WebSocketSession;

import com.fullteaching.backend.AbstractUnitTest;
import com.fullteaching.backend.chat.Chat;
import com.fullteaching.backend.chat.ChatManager;
import com.fullteaching.backend.chat.WebSocketChatUser;

public class ChatUnitaryTest extends AbstractUnitTest {

	private static String chat_name="chat Name";
	private String teacher_name="teacher Name";
	private String user_name="user Name";

	private static String color = "color";
	
	@Mock
	WebSocketSession session;
	
	@Mock
	ExecutorService executor;
	
	@Mock 
	ChatManager chatManager; 
	
	@BeforeEach
	public void setUp() throws Exception {
	}

	@Test
	public void newChatTest() {
		
		Chat ch = new Chat (chatManager, chat_name, executor, teacher_name);
		
		assertNotNull(ch);
	}

	@Test
	public void addUser2ChatTest() {
		
		Chat ch = new Chat (chatManager, chat_name, executor, teacher_name);
		
		assertNotNull(ch);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		WebSocketChatUser wscht = new WebSocketChatUser(session, teacher_name, "teacherColor");
		ch.addUser(wschu);
		ch.addUser(wscht);
		assertTrue(ch.getUser(user_name).equals(wschu));
		assertTrue(ch.getUser(teacher_name).equals(wscht));
		assertTrue(ch.getUsers().size()==2);
		assertTrue(chat_name.equals(ch.getName()));
	}

	@Test
	public void removeUserFromChatTest() {
		
		Chat ch = new Chat (chatManager, chat_name, executor, teacher_name);
		
		assertNotNull(ch);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		ch.addUser(wschu);
		assertTrue(ch.getUser(user_name).equals(wschu));
		
		ch.removeUser(wschu);
		assertTrue(ch.getUser(user_name)==null);
		
	}

	@Disabled //unitary test on chatManager.closeChat
	@Test
	public void closeChatTest() {
		
		Chat ch = new Chat (chatManager, chat_name, executor, teacher_name);
		
		assertNotNull(ch);
		ch.close();
		
	}

	@Test 
	public void sendMessage2ChatTest() {
		
		Chat ch = new Chat (chatManager, chat_name, executor, teacher_name);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		ch.addUser(wschu);
		assertNotNull(ch);
		ch.sendMessage(wschu, "Este mensaje");
	}

	@Test
	public void requestInterventionTest() {
		
		Chat ch = new Chat (chatManager, chat_name, executor, teacher_name);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		WebSocketChatUser wscht = new WebSocketChatUser(session, teacher_name, "teacherColor");
		ch.addUser(wschu);
		ch.addUser(wscht);
		assertNotNull(ch);
		ch.requestIntervention(wschu, true);
	}

	@Test
	public void grantInterventionTest() {
		
		Chat ch = new Chat (chatManager, chat_name, executor, teacher_name);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		ch.addUser(wschu);
		assertNotNull(ch);
		ch.grantIntervention(wschu.getName(), true);
	}

	@Test
	public void getUsersFromChatTest() {
		
		Chat ch = new Chat (chatManager, chat_name, executor, teacher_name);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		ch.addUser(wschu);
		assertNotNull(ch);
		assertTrue(ch.getUsers().contains(wschu));
	}


	@Test
	public void getUserFromChatTest() {
		
		Chat ch = new Chat (chatManager, chat_name, executor, teacher_name);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		ch.addUser(wschu);
		assertNotNull(ch);
		assertTrue(ch.getUser(wschu.getName()).equals(wschu));
	}

}
