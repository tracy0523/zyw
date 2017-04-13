$().ready(function() {
	
	var errorMessage = $("#errorMessage").html();
	if(errorMessage){
		if("Bad credentials" == errorMessage){
			$(this).find("#errorMessage").html("密码错误").show();
		}else{
			$(this).find("#errorMessage").html(errorMessage).show();
		}
	}
	
	$("#register").click(function(){
		window.location.href= basePath+"/register/forward"; 
	});
	
	$("#login-form").validate({
		focusInvalid : false,  
		rules : {
			j_username : {
				required : true
			},
			j_password : {
				required : true,
				minlength : 5
			}
		},
		messages : {
			j_username : {
				required : "请输入学号"
			},
			j_password : {
				required : "请输入密码",
				minlength : jQuery.format("密码不能小于{0}个字 符")
			}
		},
		errorPlacement: function (error, element) {
			var p = $("<span/>").append(error);
			p.appendTo(element.parent());
		},
        submitHandler:function(form){
			form.submit();
        }
	});

});

 
 
 






















