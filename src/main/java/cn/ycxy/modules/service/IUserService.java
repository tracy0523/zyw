package cn.ycxy.modules.service;

import cn.ycxy.modules.entity.User;

public interface IUserService {
	User selectByUserName(String name) throws Exception;
	
	int insert(User user) throws Exception;
	
	void updateByUserName(User user) throws Exception;
}
