package com.fullteaching.e2e.no_elastest.utils;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

public class ParameterLoader {

	public static Collection<String[]> getTestUsers()throws IOException {
		
		List<String[]> records = new ArrayList<String[]>();
		
		Collection<User> users = UserLoader.getAllUsers();
		
		for(User user : users) {
			records.add(user.getUserCsv().split(","));
		}
		
		return records;
		}
}
