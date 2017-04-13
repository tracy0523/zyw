package cn.ycxy.common.util;

import org.springframework.security.authentication.encoding.Md5PasswordEncoder;

/**
 * 
 * <strong>Title : PasswordEncoderUtil </strong>. <br>
 * <strong>Description : 密码加密工具类.</strong> <br>
 * <strong>修改历史: .</strong> <br>
 * 修改人 修改日期 修改描述<br>
 * -------------------------------------------<br>
 * <br>
 * <br>
 */
public class PasswordEncoderUtil {
	private static final Md5PasswordEncoder md5 = new Md5PasswordEncoder();
	
	private PasswordEncoderUtil() {}
	
	/**
	 * MD5加密，不使用base64加密，不加盐
	 * @param rawPass 明文密码
	 * @return
	 */
	public static String md5Encoder(String rawPass){
		return md5.encodePassword(rawPass, null);
	}
	
	/**
	 * MD5加密，不使用base64加密
	 * @param rawPass 明文密码
	 * @param salt	加密盐
	 * @return
	 */
	public static String md5Encoder(String rawPass, String salt){
		md5.setEncodeHashAsBase64(false);
		return md5.encodePassword(rawPass, salt);
	}
	
	/**
	 * MD5加密
	 * @param rawPass 明文密码
	 * @param salt	加密盐
	 * @param base64  是否使用base64加密
	 * @return
	 */
	public static String md5Encoder(String rawPass, String salt, boolean base64){
		md5.setEncodeHashAsBase64(base64);
		return md5.encodePassword(rawPass, salt);
	}
	
	/**
	 * 匹配密码
	 * @param encPass 加密密码
	 * @param rawPass 明文密码
	 * @param salt 加密盐
	 * @return true：匹配正确，false：匹配错误
	 */
	public static boolean md5Match(String encPass, String rawPass, String salt){
		return md5.isPasswordValid(encPass, rawPass, salt);
	}
	
}
