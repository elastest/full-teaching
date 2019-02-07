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
import com.fullteaching.backend.chat.WebSocketChatUser;

public class WebSocketChatUserUnitaryTest extends AbstractUnitTest {

	private static String name = "Nombre";
	private static String color = "color";
	private static String chat_name ="chat name";
	private static String teacher_name = "teacher_name";
	
	@Mock
	WebSocketSession session;
	
	@Mock
	ExecutorService executor;
	
	@BeforeEach
	public void setUp() throws Exception {
	}

	@Test
	public void newWebSocketTest() {
		WebSocketChatUser wschu = new WebSocketChatUser(session, name, color);
		assertNotNull(wschu);
		assertTrue(name.equals(wschu.getName()));
		assertTrue(color.equals(wschu.getColor()));
	}

	@Test
	public void addChat2UserTest() {
		WebSocketChatUser wschu = new WebSocketChatUser(session, name, color);
		Chat ch = new Chat (null, chat_name, executor, teacher_name);
		wschu.newChat(ch);
		
		assertNotNull(wschu);

	}

	@Test
	public void closeChat4UserTest() {
		WebSocketChatUser wschu = new WebSocketChatUser(session, name, color);
		assertNotNull(wschu);
		Chat ch = new Chat (null, chat_name, executor, teacher_name);
		wschu.newChat(ch);
		wschu.chatClosed(ch);
	}

	@Test
	public void notifyNewUserInChatTest() {
		WebSocketChatUser wschu = new WebSocketChatUser(session, name, color);
		WebSocketChatUser wschu2 = new WebSocketChatUser(session, "Second User", "Grey");

		assertNotNull(wschu);
		Chat ch = new Chat (null, chat_name, executor, teacher_name);
		
		ch.addUser(wschu); 
		
		wschu.newChat(ch);
		
		wschu.newUserInChat(ch, wschu2);
		
	}

	@Test
	public void notifyUserExitedChatTest() {
		WebSocketChatUser wschu = new WebSocketChatUser(session, name, color);
		WebSocketChatUser wschu2 = new WebSocketChatUser(session, "Second User", "Grey");

		assertNotNull(wschu);
		Chat ch = new Chat (null, chat_name, executor, teacher_name);
		wschu.newChat(ch);
		
		wschu.userExitedFromChat(ch, wschu2);
	}

	@Test
	public void newMessageTest() {
		WebSocketChatUser wschu = new WebSocketChatUser(session, name, color);
		assertNotNull(wschu);
		Chat ch = new Chat (null, chat_name, executor, teacher_name);
		wschu.newChat(ch);
		wschu.newMessage(ch, wschu, "Nuevo mensaje");
	}

	@Disabled //already tested with newUserInChat
	@Test
	public void testSendConnectedUsers() {
		WebSocketChatUser wschu = new WebSocketChatUser(session, name, color);
		assertNotNull(wschu);
	}

	@Test
	public void interventionPetitionTest() {
		WebSocketChatUser wschu = new WebSocketChatUser(session, name, color);
		assertNotNull(wschu);
		Chat ch = new Chat (null, chat_name, executor, teacher_name);
		wschu.newChat(ch);
		wschu.sendInterventionPetition(ch, wschu, true);
	}

	@Test
	public void grantInterventionTest() {
		WebSocketChatUser wschu = new WebSocketChatUser(session, name, color);
		assertNotNull(wschu);
		Chat ch = new Chat (null, chat_name, executor, teacher_name);
		wschu.newChat(ch);
		wschu.grantIntervention(ch, wschu, true);
	}

}
