<%@ page contentType="text/html;charset=UTF-8"%>
 
<%response.setStatus(200);%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
	<title>404 - 页面不存在</title>
</head>

<body>
	<div class="container">
		<p class="text-center">
			<img alt="404" src="${image_path}/404.png" /><br/>
			<a href="${basePath}">返回首页</a>
		</p>
	</div>
</body>
</html>