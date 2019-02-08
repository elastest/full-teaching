package com.fullteaching.backend.unitary.chat;

import static org.junit.jupiter.api.Assertions.*;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;

import org.springframework.web.socket.WebSocketSession;

import com.fullteaching.backend.AbstractUnitTest;
import com.fullteaching.backend.chat.Chat;
import com.fullteaching.backend.chat.ChatManager;
import com.fullteaching.backend.chat.WebSocketChatUser;

public class ChatManagerUnitaryTest extends AbstractUnitTest {
	
	private static String user_name = "Nombre";
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
	public void newChatManagerTest() {
		ChatManager chm = new ChatManager(10);
		assertNotNull(chm);
	}

	@Test
	public void addChatUser2ManagerTest() {
		ChatManager chm = new ChatManager(10);
		assertNotNull(chm);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		chm.newUser(wschu);
		assertTrue(wschu.equals(chm.getUser(user_name)));
		assertTrue(chm.getUsers().size()==1);
		
		chm.newUser(wschu);
		assertTrue(chm.getUsers().size()==1); //the user hasn't been added again
			
	}

	@Test
	public void addChat2ManagerTest() {
		ChatManager chm = new ChatManager(1);
		assertNotNull(chm);
		
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		
		try {
			Chat ch = new Chat (chm, chat_name, executor, teacher_name);
			
			ch.addUser(wschu);
			Chat newch = chm.newChat(chat_name, 5, TimeUnit.SECONDS, teacher_name);
			assertNotNull(newch);
			assertTrue(chat_name.equals(newch.getName()));
			
		} catch (InterruptedException | TimeoutException e1) {
			e1.printStackTrace();
			fail("EXCEPTION ok -> e:"+e1.getClass().getName());
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION ok -> e:"+e.getClass().getName());
		}
		
				
		//no more capacity
		try {
			Chat ch2 = new Chat (chm, chat_name+"2", executor, teacher_name);
			ch2.addUser(wschu);
			chm.newChat(chat_name+"2", 5, TimeUnit.SECONDS, teacher_name);
			fail("//no more capacity -> execption not thrown");
			
		} catch (TimeoutException e) { //if there is not more capacity
			assertTrue(e.getMessage().equals("There is no enough capacity to create a new chat"));
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION ok -> e:"+e.getClass().getName());
		}
		
	}

	@Test
	public void getChatsFromManagerTest() {
		ChatManager chm = new ChatManager(10);
		
		try {
			chm.newChat(chat_name, 50000, TimeUnit.SECONDS, teacher_name);
			assertNotNull(chm);

			assertTrue(chm.getChats().size()==1);
			
		} catch (InterruptedException | TimeoutException e1) {
			e1.printStackTrace();
			fail("EXCEPTION ok -> e:"+e1.getClass().getName());
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION ok -> e:"+e.getClass().getName());
		}
	}

	@Test
	public void getChatByNameFromManagerTest() {
		ChatManager chm = new ChatManager(10);
		assertNotNull(chm);

		try {
			Chat newch = chm.newChat(chat_name, 50000, TimeUnit.SECONDS, teacher_name);
		
			assertTrue(newch.equals(chm.getChat(chat_name)));
			
		} catch (InterruptedException | TimeoutException e1) {
			e1.printStackTrace();
			fail("EXCEPTION ok -> e:"+e1.getClass().getName());
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION ok -> e:"+e.getClass().getName());
		}

	}

	@Test
	public void getUsersFromManagerTest() {
		ChatManager chm = new ChatManager(10);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		chm.newUser(wschu);
		
		assertNotNull(chm);
		assertTrue(chm.getUsers().size()==1);
		
	}

	@Test
	public void getUserByNameFromManagerTest() {
		ChatManager chm = new ChatManager(10);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		chm.newUser(wschu);
		
		assertNotNull(chm);
		assertTrue(wschu.equals(chm.getUser(user_name)));
	}

	@Test
	public void removeUserFromChatTest() {
		ChatManager chm = new ChatManager(10);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		chm.newUser(wschu);
		
		assertNotNull(chm);
		assertTrue(wschu.equals(chm.getUser(user_name)));
		
		chm.removeUserFromChatManager(wschu);
		assertTrue(chm.getUser(user_name)==null);
	}

	@Test
	public void checkIfChatExistsTest() {
		ChatManager chm = new ChatManager(10);
		assertNotNull(chm);
		Chat ch = new Chat (chm, chat_name, executor, teacher_name);
		WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
		ch.addUser(wschu);
		try {
			Chat newch = chm.newChat(chat_name, 5, TimeUnit.SECONDS, teacher_name);
			assertNotNull(newch);
			
			assertTrue(chm.chatExists(chat_name));
			assertTrue(!chm.chatExists("no_chat"));

		} catch (InterruptedException | TimeoutException e1) {
			e1.printStackTrace();
			fail("EXCEPTION ok -> e:"+e1.getClass().getName());
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION ok -> e:"+e.getClass().getName());
		}
	}

	@Test
	public void checkIfUserAtLeastIOneChatTest() {
		ChatManager chm = new ChatManager(10);
		assertNotNull(chm);
		try {
			Chat newch = chm.newChat(chat_name, 5, TimeUnit.SECONDS, teacher_name);
			assertNotNull(newch);
			
			WebSocketChatUser wschu = new WebSocketChatUser(session, user_name, color);
			//user in no chat
			assertTrue(!chm.userAtLeastInOneChat(wschu));
			
			chm.getChat(chat_name).addUser(wschu);
			
			assertTrue(chm.userAtLeastInOneChat(wschu));
			
		} catch (InterruptedException | TimeoutException e1) {
			e1.printStackTrace();
			fail("EXCEPTION ok -> e:"+e1.getClass().getName());
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION ok -> e:"+e.getClass().getName());
		}
		
	}

	@Test
	public void closeChatTest() {
		ChatManager chm = new ChatManager(10);
		assertNotNull(chm);
		
		try {
			Chat newch = chm.newChat(chat_name, 5, TimeUnit.SECONDS, teacher_name);
			assertNotNull(newch);
			
			Chat newch2 = chm.newChat(chat_name+"2", 5, TimeUnit.SECONDS, teacher_name);
			assertNotNull(newch2);
			
			chm.closeChat(newch);
			assertTrue(!chm.chatExists(newch.getName()));
			
			//try to close unknown chat
			try {
				chm.closeChat(newch); 
				}
			catch (IllegalArgumentException e) {
				assertTrue(true);
			}
			
		} catch (InterruptedException | TimeoutException e1) {
			e1.printStackTrace();
			fail("EXCEPTION ok -> e:"+e1.getClass().getName());
		} catch (Exception e) {
			e.printStackTrace();
			fail("EXCEPTION ok -> e:"+e.getClass().getName());
		}	
		
		
		
	}

}
