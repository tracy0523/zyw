package cn.ycxy.modules.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import cn.ycxy.modules.entity.User;
import cn.ycxy.modules.mapper.UserMapper;
import cn.ycxy.modules.service.IUserService;

@Service
public class UserService implements IUserService{

	private static final Logger logger = LoggerFactory.getLogger(UserService.class);
	@Autowired
	private UserMapper userMapper;
	
	public User selectByUserName(String name) throws Exception {
		return userMapper.selectByUserName(name);
	}
	
	public int insert(User user) throws Exception {
		return userMapper.insert(user);
	}

	public void updateByUserName(User user) throws Exception {
		userMapper.updateByUserName(user);
	}
	
}
