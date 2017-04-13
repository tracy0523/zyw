package cn.ycxy.modules.controller;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.io.FileUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

import cn.ycxy.common.controller.BaseController;
import cn.ycxy.common.util.Identities;
import cn.ycxy.common.util.PasswordEncoderUtil;
import cn.ycxy.common.util.VerifyCodeUtil;
import cn.ycxy.mail.MailBean;
import cn.ycxy.mail.MailSenderService;
import cn.ycxy.modules.entity.User;
import cn.ycxy.modules.service.IUserService;



@Controller
public class RegisterController extends BaseController{
	private static final Logger logger = LoggerFactory.getLogger(RegisterController.class);
	
	@Autowired
	private IUserService userService;
	
	@Autowired
	private MailSenderService mainSenderService;
	
	@RequestMapping(value = "/register/forward")
	public String registerForward() {
		return "register";
	}
	
	@RequestMapping(value = "/register")
	@ResponseBody
	public String register(User user) {
		System.out.println(user);
		user.setId(Identities.uuid());
		user.setPwd(PasswordEncoderUtil.md5Encoder(user.getPwd()));
		user.setType(0);
		user.setStatus(-1);
		try {
			userService.insert(user);
			//生成用户权限相关记录
			//todo
			MailBean mailBean = new MailBean();  
	        mailBean.setFrom("zyw@arcvideo.com ");  
	        mailBean.setFromName("YCUshare");  
	        mailBean.setSubject("激活邮件");  
	        mailBean.setToEmails(new String[]{user.getEmail()});  
	        mailBean.setContext("<html><head></head><body><a href='http://127.0.0.1:8080/YCUshare/register/active?account="+user.getAccount()+"'><font color='red'>请点击激活账号</font></a></body></html>");  
	        mainSenderService.sendMail(mailBean); 
		} catch (Exception e) {
			logger.error("注册失败");
			e.printStackTrace();
			return this.returnResult(false, "注册失败");
		}
		return this.returnResult(true, user.getEmail());
	}
	
	
	// 生成图片验证码
	@RequestMapping("/register/verification")
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Pragma", "No-cache");  
        response.setHeader("Cache-Control", "no-cache");  
        response.setDateHeader("Expires", 0);  
        response.setContentType("image/jpeg");  
          
        //生成随机字串  
        String verifyCode = VerifyCodeUtil.generateVerifyCode(4);  
        //存入会话session  
        HttpSession session = request.getSession(true);  
        session.setAttribute("rand", verifyCode.toLowerCase());  
        //生成图片  
        int w = 200, h = 80;  
        VerifyCodeUtil.outputImage(w, h, response.getOutputStream(), verifyCode);  

	}
	
	//异步校验图片验证码
	@RequestMapping("/register/checkPicCodeByAjax")
	@ResponseBody
	public boolean checkPicCodeByAjax(HttpServletRequest request, HttpServletResponse response,
			@RequestParam(value = "picCode") String picCode) throws Exception {
		
		HttpSession session = request.getSession();
		String code = String.valueOf(session.getAttribute("rand"));
		if(code.equals(picCode)){
			return true;
		}
		return false;

	}
	
	//激活账号
	@RequestMapping("/register/active")
	public String active(@RequestParam(value = "account") String account) {
		
		try {
			User user = userService.selectByUserName(account);
			user.setStatus(0);
			userService.updateByUserName(user);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("账号激活失败");
		}
		
		return "redirect:/login";
	}
	
	//忘记密码
	@RequestMapping("/register/forgotPwdIndex")
	public String forgotPwdIndex(){
		return "forgotPwd";
	}
	
	//重置密码邮件
	@RequestMapping("/register/forgotPwd")
	@ResponseBody
	public String forgotPwd(@RequestParam(value = "account") String account,@RequestParam(value = "pwd") String pwd,@RequestParam(value = "email") String email){
        try {
        	MailBean mailBean = new MailBean();  
            mailBean.setFrom("zyw@arcvideo.com ");  
            mailBean.setFromName("YCUshare");  
            mailBean.setSubject("重置密码邮件");  
            mailBean.setToEmails(new String[]{email});  
            mailBean.setContext("<html><head></head><body><a href='http://127.0.0.1:8080/YCUshare/register/restPwd?account="+account+"&pwd="+pwd+"'><font color='red'>请点击重置密码</font></a></body></html>");  
			mainSenderService.sendMail(mailBean);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("发送忘记密码邮件失败");
			return this.returnResult(false, "发送忘记密码邮件失败");
		}  
		return this.returnResult(true, "发送邮件成功");
	}
	
	//重置密码
	@RequestMapping("/register/restPwd")
	public String restPwd(@RequestParam(value = "account") String account,@RequestParam(value = "pwd") String pwd){
         
		try {
			User user = userService.selectByUserName(account);
			user.setPwd(PasswordEncoderUtil.md5Encoder(pwd));
			userService.updateByUserName(user);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("重置密码失败");
		}
		
		return "redirect:/login";
	}
	@RequestMapping(value="/register/toUpload")
	public String toUpload(){
		
		return "upload";
	}
	@RequestMapping(value = "/register/doUpload")  
	public String fileUpload2(HttpServletRequest request)  
			throws IllegalStateException, IOException {
		 System.out.println(request.getSession().getServletContext().getRealPath(request.getRequestURI()));
		// 设置上下方文  
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(  
				request.getSession().getServletContext());  
		// 检查form是否有enctype="multipart/form-data"  
		if (multipartResolver.isMultipart(request)) {  
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;  
			Iterator<String> iter = multiRequest.getFileNames();  
			while (iter.hasNext()) {  
				// 由CommonsMultipartFile继承而来,拥有上面的方法.  
				MultipartFile file = multiRequest.getFile(iter.next());  
				if (file != null) {  
					String path = "D:/" + file.getOriginalFilename(); 
					File localFile = new File(path);  
					file.transferTo(localFile);  
				}  
			}  
		}  
		return "success";  
	}
	
}
