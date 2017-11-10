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
	
	public static Collection<String[]> getTestStudents() throws IOException {
		
		List<String[]> records = new ArrayList<String[]>();
		
		Collection<User> users = UserLoader.getAllUsers();
		
		for(User user : users) {
			if (isStudent(user) && !isTeacher(user))
				records.add(user.getUserCsv().split(","));
		}
		
		return records;
	}
	
	public static Collection<String[]> getTestTeachers() throws IOException {
		List<String[]> records = new ArrayList<String[]>();
		
		Collection<User> users = UserLoader.getAllUsers();
		
		for(User user : users) {
			if (!isStudent(user) && isTeacher(user))
				records.add(user.getUserCsv().split(","));
		}
		
		return records;
	}

	private static boolean isStudent(User user) {
		String[] roles = user.getRoles();
		
		for(String role : roles) {
			if (role.trim().equals("STUDENT")) 
				return true;
		}
		return false;
	}
	
	private static boolean isTeacher(User user) {
		String[] roles = user.getRoles();
		
		for(String role : roles) {
			if (role.trim().equals("TEACHER")) 
				return true;
		}
		return false;
	}

}
