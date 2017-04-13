package cn.ycxy.mail;

import org.springframework.context.ApplicationContext;  
import org.springframework.context.support.ClassPathXmlApplicationContext;  
  
public class MailSenderUtil {  
    /**  
     * 参考：http://wang3065.iteye.com/blog/1718381  
     * @param args  
     * @throws Exception  
     */  
    public static void main(String[] args) throws Exception{  
        ApplicationContext ac = new ClassPathXmlApplicationContext("spring-mail.xml");  
        MailSenderService mailSenderService = (MailSenderService) ac.getBean("mailSender");  
        MailBean mailBean = new MailBean();  
        mailBean.setFrom("zyw@arcvideo.com ");  
        mailBean.setFromName("zyw");  
        mailBean.setSubject("你好");  
        mailBean.setToEmails(new String[]{"734296325@qq.com","zhuya_wei@163.com"});  
        mailBean.setContext("<html><head></head><body><a href='http://www.baidu.com'><font color='red'>点击</font></a></body></html>");  
        mailSenderService.sendMail(mailBean); 
    }  
}  