<%@ page language="java" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
    <%@include file="/WEB-INF/views/commons/common.jsp" %>
    <link rel="stylesheet" href="${css_path}/register.css" type="text/css">
    <script type="text/javascript" src="${js_path}/jquery-easyui/1.3.2/jquery.easyui.min.js"></script>
    <script src="${js_path}/sweetalert.min.js"></script> 
    <link rel="stylesheet" type="text/css" href="${css_path}/sweetalert.css">
    <script src="${js_path}/forgotPwd.js"></script> 
    <title></title>
    <style>
    	 .login_content{
            width:fit-content;
            height:fit-content;
        }
        .login_content .btn {
            position: relative;
            top: 20px;
        }
        .login_all {
            background: #e2fad3 url("${image_path}/logo2.png") no-repeat;
            background-position: 48%  70px;
        }

    </style>
</head>
<body>
  <div class="login_mar">
	    <div class="login_all" >
	        <form class="login_content" id="register-form">
	            <ul>
	                <li>
	                    <span>学&nbsp;&nbsp;号:</span><input type="text" placeholder="请输入学号"  name="account" id="account"/>
	                     
	                </li>
	                <li>
	                    <span style="letter-spacing: 5px;margin:10px 0px 0 37px;">新密码:</span><input type="password" placeholder="请输入新密码" name="pwd" id="pwd"/>
	                </li>
	                <li>
	                    <span>确认密码:</span><input type="password" placeholder="请再次输入密码"  name="confirmPassword" id="confirmPassword"/>
	                </li>
	                <li>
	                    <span>邮&nbsp;&nbsp;箱:</span><input type="text" placeholder="请输入邮箱" name="email" id="email"/>
	                </li>
	            </ul>
	            <!-- <a href="" class="btn">提交</a> -->
	            <input type="submit" value="提交"  class="btn"/>
	            <input type="reset" value="重置"  class="btn"/>
	        </form>
	    </div>
	</div>

</body>
</html>  