$(function(){
	jQuery.support.cors = true;
	var form = layui.form,
  		layer = layui.layer,
  		carousel = layui.carousel,
  		laydate = layui.laydate;
	form.verify({
		PassWord:function(value){
			if(!/^[0-9A-Za-z]{6,16}$/.test(value)){
				return '密码为6-16位数';
			}
		},
		capital:function(value){
			if(!/^\d{6}$/.test(value)){
				return '请设置6位数字交易密码';
			}
		},
		reCapital:function(value){
			var CapitalVal = $(".capitalPassWord").val();
			if(value != CapitalVal){
				return '两次输入密码不一致';
			}
		},
		password:function(value){
			if(!/^[0-9A-Za-z]{6,16}$/.test(value)){
				return '请填写6-16位数的密码';
			}
		},
		rePassword:function(value){
			var rePassword = $(".newPassWord").val();
			if(value != rePassword){
				return '两次输入密码不一致';
			}
		}
	});
	// 登录
	form.on('submit(loginbtn)',function(data){
		var phone = data.field['loginPhone'];
		var password = data.field['password'];
		// console.log(phone);
		$.ajax({
			type:"POST",
			url:config.lineDev1+"/systems/unioncoin/loginPhone", 
			async:false,
			data:{account:phone,password:password},
			complete: function (data) {
				obj = JSON.parse(data.responseText);
				// var obj= eval("(" + data + ")");
				var errorMsg = obj.Info;
				if(obj.Code == 0){
					var uid = obj.Json[0].uid;
					layer.msg("登录成功",{icon:6},function(){
						// alert('登录成功后，消失跳转');
						window.location = "../index.html";
						setCookie("accountCookie",phone,1/24);
                        setCookie("uidCookie",uid,1/24);
						setCookie("LoginStatus",true,1/24);
						$(".topbar-ul,.navbar-box").css("display","block");
                        $(".top-nav-register").css("display","none");
                        $(".topbar-ul .user_phone").text(phone);
					});
				}else{
					// return errorMsg;
					layer.msg(errorMsg,{icon:5});
				}
			}
		})
		
	});
	//注册
	$(".reg-form-next").click(function(event) {
		var regPhone = $(".regPhone").val();
		var regPassWord = $(".regPassWord").val();
		var regCode = $(".regCode").val();
		var checked = $(".agree-check").is(':checked');
		if(regPhone=="" || !/^1(3|4|5|7|8)\d{9}$/.test(regPhone)){
			layer.msg("请填写正确的手机号码",{icon:5});
		}else
		if(regPassWord=="" || !/^[0-9A-Za-z]{6,16}$/.test(regPhone)){
			layer.msg("请填写6-16位数的密码",{icon:5});
		}else
		if(regCode==""){
			layer.msg("请输入验证码",{icon:5});
		}else
		if(!checked){
			layer.msg('您未同意用户协议',{icon:5});
		}else{
			$(".reg-bef").css("display","none");
			$(".reg-cap-pass").css("display","block");
		}


	});
	form.on('submit(reg-form-submit)',function(data){
		var account = data.field.regphone,
			pay_pwd = data.field.capital,
			pwd = data.field.regpassword,
			sms_code = data.field.regcode;
		$.ajax({
			url: config.lineDev1+'/systems/unioncoin/regPhone',
			type: 'POST',
			data: {account:account,pay_pwd:pay_pwd,pwd:pwd,sms_code:sms_code},
			complete:function(data){
				// console.log(data);
            	var obj = JSON.parse(data.responseText);
            	if(obj.Code == 0){
            		window.location = "../index.html";
            		setCookie("LoginStatus",true,1/24);
            	}else
            	if(obj.Code == 6){
            		layer.msg(obj.Info,{icon:5},function(){
            			$(".reg-bef").css("display","block");
						$(".reg-cap-pass").css("display","none");
            		});
            	}else{
            		layer.msg(obj.Info);
            	}
            }
		});
		
	});
	//忘记密码
	$(".forget-form-next").click(function(event) {
		var forgetPhone = $(".forgetPhone").val();
		var codeValue = $(".forgetCode").val();
		// console.log(codeValue);
		if(forgetPhone=="" || !/^1(3|4|5|7|8)\d{9}$/.test(forgetPhone)){
			layer.msg("请填写正确的手机号码",{icon:5});
		}else if(codeValue==""){
			layer.msg("请输入验证码",{icon:5});
		}else{
			$(".reg-bef").css("display","none");
			$(".reg-cap-pass").css("display","block");
		}
	});
	$(".forget-get-code").click(function(event) {
		forgetGetCode();
	});
	form.on('submit(forget-form-submit)',function(data){
		var phone = data.field.forget_phone,
			sms_code = data.field.forget_code,
			new_pwd = data.field.newPassWord;
		$.ajax({
			url: config.lineDev1+'/systems/unioncoin/resetPwd',
			type: 'POST',
			data: {phone:phone,sms_code:sms_code,new_pwd:new_pwd},
			complete:function(data){
            	var obj = JSON.parse(data.responseText);
				// console.log(obj);
            	if(obj.Code == 0){
            		// window.location = "../index.html";
            		layer.msg("更改密码成功，请牢记密码",{icon:6});
            	}else
            	if(obj.Code == 5){
            		layer.msg(obj.Info,{icon:5},function(){
            			$(".reg-bef").css("display","block");
						$(".reg-cap-pass").css("display","none");
            		});
            	}else{
            		layer.msg(obj.Info);
            	}
            }
		});
	});
	//获取短信验证码
	$(".register-get-code").click(function(event) {
		getCode();
	});
	function getCode(){
		var phone = $(".Phone").val();
		var regPassWord = $(".regPassWord").val();
		// console.log(phone);
		if(phone=="" || !/^1(3|4|5|7|8)\d{9}$/.test(phone)){
			layer.msg("请填写正确的手机号码",{icon:5});
		}else
		if(regPassWord=="" || !/^[0-9A-Za-z]{6,16}$/.test(regPassWord)){
			layer.msg("请填写6-16位数的密码",{icon:5});
		}else{
			$.ajax({  
            	type: "POST",
            	url: config.lineDev1+"/systems/unioncoin/getSMS",
            	async:false,
            	data: {phone:phone,type:1},
            	complete:function(data){
            		var obj = JSON.parse(data.responseText);
            		if(obj.Code == 0){
            		InterValObj = window.setInterval(SetRemainTime, 1000);
            		console.log("registers");
            		}else{
            			layer.msg(obj.Info,{icon:5});
            		}
            	}
        	})
		}
	}
	function forgetGetCode(){
		var phone = $(".Phone").val();
		var regPassWord = $(".regPassWord").val();
		// console.log(phone);
		if(phone=="" || !/^1(3|4|5|7|8)\d{9}$/.test(phone)){
			layer.msg("请填写正确的手机号码",{icon:5});
		}else
		if(regPassWord=="" || !/^[0-9A-Za-z]{6,16}$/.test(regPassWord)){
			layer.msg("请填写6-16位数的密码",{icon:5});
		}else{
			$.ajax({  
            	type: "POST",
            	url: config.lineDev1+"/systems/unioncoin/getSMS",
            	async:false,
            	data: {phone:phone,type:2},
            	complete:function(data){
            		var obj = JSON.parse(data.responseText);
            		if(obj.Code == 0){
            		InterValObj = window.setInterval(SetRemainTime, 1000);
            		console.log("forget");
            		}else{
            			layer.msg(obj.Info,{icon:5});
            		}
            	}
        	})
		}
	}
	var InterValObj;
	var curCount = 60;
	function SetRemainTime() {
      	if (curCount == 0) {
      	    curCount = 60;              
      	    window.clearInterval(InterValObj);
      	    $(".get-code").removeAttr("disabled",false);
      	    $(".get-code").val("获取验证码");
      	}
      	else {
      	    curCount--;
      	    $(".get-code").val("获取验证码" + curCount);
      	    // $(".get-code").attr("disabled", "true");
          	// $(".get-code").val("获取验证码" + curCount);
          	// InterValObj = window.setInterval(SetRemainTime, 1000);放在ajax成功调用里面
      	}
  	}





































})