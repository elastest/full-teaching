package com.fullteaching.e2e.no_elastest.utils;

import java.io.Serializable;

public class User implements Serializable{

	private static final long serialVersionUID = 694253668952718366L;
	
	private String name;
	private String password;
	private String roles[];
	
	
	public User(String name, String password, String roles[]) {
		this.name = name; 
		this.password = password;
		this.roles = roles;
	}
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String[] getRoles() {
		return roles;
	}
	public void setRoles(String[] roles) {
		this.roles = roles;
	}
	
	public String getUserCsv() {
		return ""+name+","+password+","+getRolesCsv();
	}
	
	private String getRolesCsv() {
		String rolesStr = "";
		for (int i=0; i<roles.length; i++) {
			
			rolesStr += roles[i];
			if ( i < roles.length-1)
				rolesStr += "|";
			
		}
		
		return rolesStr;
	}
	
	
}
