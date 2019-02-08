package com.fullteaching.backend.unitary.chat;

import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.WebSocketSession;

import com.fullteaching.backend.AbstractUnitTest;
import com.fullteaching.backend.chat.ChatHandler;

public class ChatHandlerUnitaryTest extends AbstractUnitTest {

	@Autowired
	private ChatHandler chh;
	
	@Mock
	private WebSocketSession session;
	
	@BeforeEach
	public void setUp() throws Exception {
	}

	@Disabled
	@Test
	public void testAfterConnectionEstablishedWebSocketSession() {
		try {
			
			chh.afterConnectionEstablished(session);
			assertTrue(true);
		} catch (Exception e) {
			
			e.printStackTrace();
			fail("Exception KO// testAfterConnectionEstablishedWebSocketSession => "+e.getClass().getName());
		}
	}
	


	@Disabled
	@Test
	public void testAfterConnectionClosedWebSocketSessionCloseStatus() {
		try {
			chh.afterConnectionClosed(session, CloseStatus.NORMAL);
			assertTrue(true);

		} catch (Exception e) {
			e.printStackTrace();
			fail("Exception KO// testAfterConnectionClosedWebSocketSessionCloseStatus => "+e.getClass().getName());

		}
	}

}
