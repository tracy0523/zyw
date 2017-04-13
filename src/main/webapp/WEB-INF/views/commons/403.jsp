<%@ page language="java" pageEncoding="UTF-8"%>
<% response.setStatus(200); %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
  <title>403 - 用户权限不足</title>
</head>

<body>
	<div class="container">
		<p class="text-center">
			<img alt="403" src="${image_path}/403.png" /><br/><br/>
			<span style="color:red">请联系系统管理员添加访问权限！</span>
			<a href="${base_path}/login">重新登陆</a>
		</p>
	</div>
</body>
</html>