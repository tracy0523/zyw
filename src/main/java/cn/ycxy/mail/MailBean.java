package cn.ycxy.mail;

import java.io.Serializable;
import java.util.Arrays;

public class MailBean implements Serializable{
	private static final long serialVersionUID = -485495635499966036L;
	
	private String from;    
    private String fromName;    
    private String[] toEmails;    
    private String subject;  
    private String context;  
    
    public MailBean(){}

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	public String getFromName() {
		return fromName;
	}

	public void setFromName(String fromName) {
		this.fromName = fromName;
	}

	public String[] getToEmails() {
		return toEmails;
	}

	public void setToEmails(String[] toEmails) {
		this.toEmails = toEmails;
	}

	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getContext() {
		return context;
	}

	public void setContext(String context) {
		this.context = context;
	}

	@Override
	public String toString() {
		return "MailBean [from=" + from + ", fromName=" + fromName + ", toEmails=" + Arrays.toString(toEmails)
				+ ", subject=" + subject + ", context=" + context + "]";
	}
    
    
}
