<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <%@include file="/WEB-INF/views/commons/common.jsp" %>
    <link rel="stylesheet" href="${css_path}/login.css" type="text/css">
    <script src="${js_path}/login.js" type="text/javascript"></script>
    <style>
    	.login_all{
	        position: fixed;
	        width: 100%;
	        height:100%;
	        background: #e2fad3 url("${image_path}/logo1.png") no-repeat;
	        background-position: 50% 110px;
	        background-size: 430px auto;
	        margin: auto;

        }
    </style>
    <title></title>
</head>
<body>
<div>
    <div class="login_mar">
	    <div class="login_all">
	        <div class="login_content">
	           <form id="login-form"  action="j_spring_security_check" method="post">
	               <ul>	
	               		<li><span id="errorMessage" style="display:none;">${sessionScope['SPRING_SECURITY_LAST_EXCEPTION'].message}</span> </li>
		                <li ><input name="j_username" id="j_username"  type="input"    placeholder="请输入学号登陆"/><span></li>
		                <li ><input name="j_password" id="j_password"  type="password" placeholder="请输入登陆密码"/><span></li>
		                <ul>
		                    <li><input type="submit" value="登录"  class="btn"></li>
		                    <li><input id="register" type="button" value="注册"  class="btn"></li>
		                </ul>
						<a href="register/forgotPwdIndex">忘记密码?</a>
	               </ul>
	            </form>
	        </div>
	    </div>
    </div>
</div>
</body>
</html>  