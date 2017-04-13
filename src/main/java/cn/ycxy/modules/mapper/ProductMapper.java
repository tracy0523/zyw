package cn.ycxy.modules.mapper;

import cn.ycxy.modules.entity.Product;

public interface ProductMapper {
	Product selectProductByUserId(String id) throws Exception;
}
