package test;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import cn.ycxy.modules.entity.Product;
import cn.ycxy.modules.entity.User;
import cn.ycxy.modules.mapper.ProductMapper;
import cn.ycxy.modules.mapper.UserMapper;

public class TestUserMapper {
	ApplicationContext ctx;
	UserMapper userMapper;
	@Before
	public void init(){
		ctx = 
		new ClassPathXmlApplicationContext(
			"spring-mybatis.xml"
			);
	    userMapper = ctx.getBean("userMapper",UserMapper.class);
	}
	
	
	@Test
	public void testSelectByPrimaryKey(){
		 
		 try {
			User user = userMapper.selectByPrimaryKey("1001");
			System.out.println(user);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	@Test
	public void testInsert(){
		 User user = new User();
		 user.setId("1002");
		 user.setName("laoma");
		 user.setEmail("laoma@qq.com");
		 user.setPwd("111111");
		 user.setPhone("1234567894654");
		 user.setType(0);
		 user.setStatus(0);
		 user.setAccount("1331307111");
		 
		 try {
			int i = userMapper.insert(user);
			System.out.println(i);
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
	}
	 
	@Test
	public void testDelte(){
		 try {
			int i = userMapper.deleteByPrimaryKey("1002");
			System.out.println(i);
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
	}
	
	@Test
	public void testUpdateByPrimaryKey(){
		 try {
			 User user = userMapper.selectByPrimaryKey("1001");
			 user.setName("Zyw");
			 userMapper.updateByPrimaryKey(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
	}
	
	@Test
	public void testSelectByUserName(){
		 try {
			 User user = userMapper.selectByUserName("manager");
			 System.out.println(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
	}
	
	@Test
	public void testUpdateByUserName(){
		 try {
			 User user = userMapper.selectByUserName("manager");
			 user.setStatus(-1);
			 userMapper.updateByUserName(user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		 
	}
	
}
