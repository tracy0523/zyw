package cn.ycxy.modules.mapper;

import cn.ycxy.modules.entity.Role;

public interface RoleMapper {
	Role selectRoleByUserId() throws Exception;
}
