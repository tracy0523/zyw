<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <%@include file="/WEB-INF/views/commons/common.jsp" %>
    <link rel="stylesheet" href="${css_path}/register.css" type="text/css">
    <script type="text/javascript" src="${js_path}/jquery-easyui/1.3.2/jquery.easyui.min.js"></script>
    <script src="${js_path}/sweetalert.min.js"></script> 
    <link rel="stylesheet" type="text/css" href="${css_path}/sweetalert.css">
    <script src="${js_path}/register.js" type="text/javascript"></script>
    <title></title>
    <style>
    	.login_all{
		    background: #e2fad3 url("${image_path}/logo2.png") no-repeat;
		    background-position: 48%  70px;
		}
    </style>
</head>
<body>
  <div class="login_mar">
        <div class="login_all">
            <form id="register-form" class="login_content">
                   <ul>
                    <li>
                        <span>学&nbsp;&nbsp;号:</span><input type="text" placeholder="请输入学号" name="account" id="account"/>
                    </li>
                    <li>
                        <span>密&nbsp;&nbsp;码:</span><input type="password" placeholder="请输入密码" name="pwd" id="pwd"/>
                    </li>
                    <li>
                        <span>确认密码:</span><input type="password" placeholder="请再次输入密码"  name="confirmPassword" id="confirmPassword"/>
                    </li>
                    <li>
                        <span>姓&nbsp;&nbsp;名:</span><input type="text" placeholder="请输入姓名" name="name" id="name"/>
                    </li>
                    <li>
                        <span>手机号码:</span><input type="text" placeholder="请输入手机号码" name="phone" id="phone"/>
                    </li>
                    <li>
                        <span>邮&nbsp;&nbsp;箱:</span><input type="text" placeholder="请输入邮箱" name="email" id="email"/>
                    </li>
                    <li>
                        <span style="letter-spacing: 5px; margin:10px -9px 0 42px;">验证码:</span>
                        <input type="text" placeholder="请输入验证码" name="picCode" id="picCode" style="width: 87px;margin-right:0px;"/>
                    	<img id="verification" src="verification" width="100" height="40px" style="margin-right:30px;"/> 
                    </li>
                </ul> 	
                <input type="submit" value="提交"  class="btn"/>
                <input type="reset" value="重置"  class="btn"/>
            </form>
        </div>
    </div>
</body>
</html>  