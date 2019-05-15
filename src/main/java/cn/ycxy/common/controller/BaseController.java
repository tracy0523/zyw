package cn.ycxy.common.controller;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import com.fasterxml.jackson.annotation.JsonIgnore;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;

public class BaseController {
	
	
	/**
	 * 获取当前用户信息
	 * 
	 * @return User 用户信息对象
	 */
	protected UserDetails getUserInfo() {
		UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext()
			    .getAuthentication()
			    .getPrincipal();
		System.out.println("22222");
		return userDetails;
	}
	
	/**
	 * rest接口统一返回类型
	 * @param code
	 * @param message
	 * @param result
	 * @return
	 */
	
	protected String returnRestResult(int code, String message, Object result) {
		
		JsonConfig jsonConfig = new JsonConfig();  
		jsonConfig.addIgnoreFieldAnnotation(JsonIgnore.class);
		
		JSONObject resultjson = new JSONObject();
		resultjson.put("code", code);
		resultjson.put("message", message);
		resultjson.put("result", JSONObject.fromObject(result, jsonConfig) );
		return resultjson.toString();
	}
	
	/**
	 * rest接口统一返回类型
	 * @param code
	 * @param message
	 * @param result
	 * @return
	 */
	protected String returnRestResult(int code, String message, String result) {
		
		JSONObject resultjson = new JSONObject();
		resultjson.put("code", code);
		resultjson.put("message", message);
		resultjson.put("result", result );
		return resultjson.toString();
	}
	
	/**
	 * rest接口统一返回集合类型
	 * @param code
	 * @param message
	 * @param result
	 * @return
	 */
	protected String returnRestListResult(int code, String message, Object result) {
		
		JsonConfig jsonConfig = new JsonConfig();  
		jsonConfig.addIgnoreFieldAnnotation(JsonIgnore.class);
		
		JSONObject resultjson = new JSONObject();
		resultjson.put("code", code);
		resultjson.put("message", message);
		resultjson.put("result", JSONArray.fromObject(result, jsonConfig) );
		return resultjson.toString();
	}

	/**
	 * 返回结果JSON字符串
	 * 
	 * @param result
	 *            执行结果，true：成功，false：失败
	 * @param message
	 *            详细描述
	 * @return
	 */
	protected String returnResult(boolean result, String message) {
		if (!result && message.trim() == null) {
			message = "未知错误";
		}

		JSONObject resultjson = new JSONObject();
		resultjson.put("result", result);
		resultjson.put("message", message);
		return resultjson.toString();
	}

	/**
	 * 返回结果JSON字符串
	 * 
	 * @param result
	 *            执行结果，true：成功，false：失败
	 * @param message
	 *            描述信息
	 * @param data
	 *            数据
	 * @return
	 */
	protected String returnResult(boolean result, String message, Object data) {
		JSONObject resultjson = new JSONObject();
		resultjson.put("result", result);
		resultjson.put("message", message);
		resultjson.put("data", data);
		return resultjson.toString();
	}

	/**
	 * 转发结果
	 * 
	 * @param redirectAttributes
	 * @param result
	 * @param resultMessage
	 */
	protected void redirectResult(RedirectAttributes redirectAttributes, boolean result, String resultMessage) {
		redirectAttributes.addFlashAttribute("resultFlag", result);
		redirectAttributes.addFlashAttribute("resultMessage", resultMessage);
	}
}
