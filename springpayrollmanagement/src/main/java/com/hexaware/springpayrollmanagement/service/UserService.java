package com.hexaware.springpayrollmanagement.service;

import java.util.List;

import com.hexaware.springpayrollmanagement.entity.User;

public interface UserService {
	 public User addUser(User user);

	 public User updateUser(User user);

	 public  boolean deleteUser(int userId);

	 public  User getUserById(int userId);

	 public List<User> getAllUsers();

	   
}
