package cn.ycxy.modules.mapper;

import cn.ycxy.modules.entity.User;
 
public interface UserMapper {
	User selectByPrimaryKey(String id) throws Exception;
	
	User selectByUserName(String name) throws Exception;
	
	int insert(User user) throws Exception;
	
	int deleteByPrimaryKey(String id) throws Exception;
	
	void updateByPrimaryKey(User user) throws Exception;
	
	void updateByUserName(User user) throws Exception;
}
