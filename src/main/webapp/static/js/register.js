$().ready(function() {
	//图片验证码按钮事件
	$("#verification").click(function(){
		$("#verification").attr("src",basePath+"/register/verification?r"+Math.random());
	});
	
	//手机号码校验
	function checkPhoneFormat(value){
		var length = value.length;
        return (length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[0-9]{1}))+\d{8})$/.test(value));
	};

    jQuery.validator.addMethod("isMobile", function (value, element) {
        return this.optional(element) || checkPhoneFormat(value);
    }, "请正确填写您的手机号码");

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
            },
            name: {
                required: true,
                maxlength: 30
            },
            phone: {
                required: true,
                digits: true,
                isMobile: true,
                //remote: basePath + "/register/checkCellphoneUserByAjax?" + $("#phone").val()
            },
            picCode: {
                required: true,
                remote:basePath + "/register/checkPicCodeByAjax?"+$("#picCode").val()
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
            },
            name: {
                required: "未输入姓名",
                maxlength: "不能大于30个字符"
            },
            phone: {
                required: "未输入手机号码",
                digits: "请输入数字",
                //remote: "手机号码已被占用"
            } ,
            picCode: {
                required: "未输入图片验证码",
                remote:"图片验证码不正确"
            }
        },
        errorPlacement: function (error, element) {
        	var p = $("<span/>").append(error);
			//p.appendTo(element.parent());	 
        	element.parent().find(":last").after("<br/>").after(p);
        },
        submitHandler: function (form) {
        	$.ajax({
            	type : 'POST',
                dataType: "json",
                data:$("#register-form").serialize(),
                url:basePath+'/register',
                success: function (json) {
                    if (json.result) {
                    	swal({
                    		     title: "注册成功",  
                  	             text: "前往邮箱 <span style='color:#F8BB86'>"+json.message+"</span>激活账号!", 
                  	             html: true,
                  	      	 },
                  	      	 function(){
                  	      		 window.location.href= basePath+"/login";
                  	      	 });
                    } else {
                    	swal({
	               		     	 title: "注册失败",  
	             	             text: "重新注册！", 
             	      	 },
             	      	 function(){
             	      		 	 window.location.href= basePath+"/register/forward";
             	      	 });
                    }
                }
            });
        }
        
    });
	
});

 
 
 






















