package cn.ycxy.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import cn.ycxy.common.entity.Constants;
import cn.ycxy.modules.entity.Role;
import cn.ycxy.modules.service.IUserService;

public class MyUserDetailService implements UserDetailsService {

	@Autowired
	private IUserService userService;
	
	// 登陆验证时，通过username获取用户的所有权限信息，
	// 并返回User放到spring的全局缓存SecurityContextHolder中，以供授权器使用
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, DataAccessException {
		Collection<GrantedAuthority> auths = new ArrayList<GrantedAuthority>();
		SimpleGrantedAuthority auth = null;
		cn.ycxy.modules.entity.User account = null;
		try {
			//查询用户相关信息
			account = userService.selectByUserName(username);
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		if(account == null ||account.getStatus() == Constants.ACCOUNT_STATUS_STOP){
			throw new AuthenticationServiceException("用户不存在或被停用!");
		}
		
		if(account.getStatus() == Constants.ACCOUNT_STATUS_UNACTIVE){
			throw new AuthenticationServiceException("用户未激活!");
		}
		
		List<Role> roles = account.getRole();
		//给用户相应权限
		if (username.equals(account.getAccount())) {
			for(Role role : roles){
				auth = new SimpleGrantedAuthority(role.getType());
				auths.add(auth);
			}
		}
		
		return new User(username, account.getPwd(), true, true, true, true, auths);
	}
}
