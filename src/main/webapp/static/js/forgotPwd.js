$().ready(function() {
	 
	 

    jQuery.validator.addMethod("emailOutChinese", function (value, element) {
        var reg = /[\u4E00-\u9FA5\uF900-\uFA2D]/;
        return this.optional(element) || !reg.test(value);
    }, "邮箱不能输入中文");

    jQuery.validator.addMethod("isContainsSpecialChar", function (value, element) {
        //var reg = RegExp(/[(\ )(\`)(\~)(\!)(\@)(\#)(\$)(\%)(\^)(\&)(\*)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\.)(\<)(\>)(\/)(\?)(\~)(\！)(\@)(\#)(\￥)(\%)(\…)(\&)(\*)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
        //没有过滤特殊符号@ 和.
        var reg = RegExp(/[(\ )(\`)(\~)(\!)(\#)(\$)(\%)(\^)(\()(\))(\+)(\=)(\|)(\{)(\})(\')(\:)(\;)(\')(',)(\[)(\])(\<)(\>)(\/)(\?)(\~)(\！)(\#)(\￥)(\%)(\…)(\（)(\）)(\—)(\+)(\|)(\{)(\})(\【)(\】)(\‘)(\；)(\：)(\”)(\“)(\’)(\。)(\，)(\、)(\？)]+/);
        return this.optional(element) || !reg.test(value);
    }, "含有中英文特殊字符");
    

    $("#register-form").validate({
        focusInvalid: false,
        rules: {
        	email: {
                required: true,
                emailOutChinese: true,
                isContainsSpecialChar: true,
                email: true,
                maxlength: 30,
                //remote: basePath + "/register/checkAccount?" + $("#userId").val()
            },
            pwd: {
                required: true,
                minlength: 5,
                maxlength: 15
            },
            confirmPassword: {
                required: true,
                minlength: 5,
                equalTo: "#pwd"
            },
            account: {
                required: true,
                maxlength: 30
            }
        },
        messages: {
        	email: {
                required: "未输入邮箱",
                account: "请输入正确的email地址",
                //remote: "账号已存在，请重新输入",
                maxlength: "不能大于30个字符",
            },

            pwd: {
                required: "未输入密码",
                minlength: jQuery.format("密码不能小于{0}个字符"),

            },
            confirmPassword: {
                required: "未输入确认密码",
                minlength: "确认密码小于5个字符",
                equalTo: "两次输入密码不一致"
            },
            account: {
                required: "未输入学号",
                maxlength: "不能大于30个字符"
            } 
        },
        errorPlacement: function (error, element) {
        	var p = $("<span/>").append(error);
        	element.parent().find(":last").after("<br/>").after(p);
        },
        submitHandler: function (form) {
        	$.ajax({
            	type : 'POST',
                dataType: "json",
                data:$("#register-form").serialize(),
                url:basePath+'/register/forgotPwd',
                success: function (json) {
                    if (json.result) {
                    	swal({
                    		     title: "忘记密码",  
                  	             text: "前往邮箱 <span style='color:#F8BB86'>"+$("#email").val()+"</span>重置密码!", 
                  	             html: true,
                  	      	 },
                  	      	 function(){
                  	      		 window.location.href= basePath+"/login";
                  	      	 });
                    } else {
                    	swal({
	               		     	 title: "忘记密码",  
	             	             text: "重试一次！", 
             	      	 },
             	      	 function(){
             	      		 	 window.location.href= basePath+"/register/forgotPwdIndex";
             	      	 });
                    }
                }
            });
        }
        
    });
	
});

 
 
 






















