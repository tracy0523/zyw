<%@ page language="java" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%response.setStatus(200);%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
 <head>
   <title>Access Denied</title>
 </head>

<body>
	<h2>Access Denied</h2>
	<p>
		Access to the specified resource has been denied for the following reason: <strong>${errorDetails}</strong>.
	</p>
	<em>Error Details (for Support Purposes only):</em><br />
	<blockquote>
	<pre>${errorTrace}</pre>
		<p><a href="<c:url value="/"/>">返回首页</a></p>
	</blockquote>
</body>
</html>