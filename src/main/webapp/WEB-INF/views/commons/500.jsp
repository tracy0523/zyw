<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" %>
<%@page import="java.io.StringWriter"%>
<%@page import="java.io.PrintWriter"%>
<%@ page import="org.slf4j.Logger,org.slf4j.LoggerFactory" %>
 
<%response.setStatus(200);%>

<%
	Throwable ex = null;
	if (exception != null)
		ex = exception;
	if (request.getAttribute("javax.servlet.error.exception") != null)
		ex = (Throwable) request.getAttribute("javax.servlet.error.exception");

	//记录日志
	Logger logger = LoggerFactory.getLogger("500.jsp");
	logger.error(ex.getMessage(), ex);
	
	StringWriter sw = new StringWriter();
	ex.printStackTrace(new PrintWriter(sw));
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>500 - 系统内部错误</title>
</head>

<body>
	<div class="container">
		<p class="text-center">
			<img alt="500" src="${image_path}/500.png" /><br/>
			<a href="${basePath}">返回首页</a>
		</p>
	</div>
	<pre><%=ex.getMessage() %></pre>
	<pre><%=sw%></pre>
</body>
</html>
