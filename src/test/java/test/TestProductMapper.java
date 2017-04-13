package test;

import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import cn.ycxy.modules.entity.Product;
import cn.ycxy.modules.entity.User;
import cn.ycxy.modules.mapper.ProductMapper;

public class TestProductMapper {

	ApplicationContext ctx;
	ProductMapper productMapper;
	@Before
	public void init(){
		ctx = 
		new ClassPathXmlApplicationContext(
			"spring-mybatis.xml"
			);
		productMapper = ctx.getBean("productMapper",ProductMapper.class);
	}
	
	
	@Test
	public void testSelectByPrimaryKey(){
		try {
			Product product = productMapper.selectProductByUserId("1001");
			System.out.println(product);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
}
