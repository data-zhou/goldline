$(function(){
	var form = layui.form,
		layer = layui.layer,
		layedit = layui.layedit,
		laydate = layui.laydate;
	// 地址验证
	form.verify({
		userName: function(value){
    	 	if(value.length < 2){
    	    	return '名字长度不能小于2';
    		}
  		},
        new_password:function(value){
            if(!/^[0-9A-Za-z]{6,16}$/.test(value)){
                return '请填写6-16位数的密码';
            }
        },
        cope_new_password:function(value){
            var rePassword = $(".new_password").val();
            if(value != rePassword){
                return '两次输入密码不一致';
            }
        }
	});
    //监听添加提交
    form.on('submit(add_mode)', function(data){
    	var formVal = JSON.stringify(data.field);
    	// var obj = formVal.parseJSON();
    	layer.alert(formVal, {
    		title: '最终的提交信息'
    	})
    	console.log(formVal);
    	return false;
    // console.log(obj.quiz2);
	});
	//监听更改地址提交
    form.on('submit(made_mode)', function(data){
    	var formVal = JSON.stringify(data.field);
    	// var obj = formVal.parseJSON();
    	layer.alert(formVal, {
    		title: '最终的提交信息'
    	})
    	console.log(formVal);
    	return false;
    // console.log(obj.quiz2);
	});
	// 更改密码
    var phone_val = getCookie("accountCookie");
    form.on('submit(use_password_btn)',function(data){
        var new_login_pwd = data.field.new_password,
            old_login_pwd = data.field.used_password;
        $.ajax({
            type:"POST",
            url:config.lineDev1+"/systems/unioncoin/resetPwdNotSMS",
            data:{new_login_pwd:new_login_pwd,old_login_pwd:old_login_pwd,phone:phone_val},
            beforeSend:function(){
                    var index = layer.load(1, {
                      shade: [0.2,'#fff'] //0.1透明度的白色背景
                    });
                },
            complete:function(data){
                var obj = JSON.parse(data.responseText);
                var errorMsg = obj.Info;
                layer.closeAll("loading");
                if(obj.Code == 0){
                    layer.msg('更改密码成功',function(){
                        parent.location.reload(); 
                        var index = parent.layer.getFrameIndex(window.name); 
                        parent.layer.close(index);
                    });
                }else{
                    layer.msg(errorMsg);
                }
            },
            error:function(data){
                layer.msg("服务器出现错误！");
            }
        })
    });
    //更改绑定手机
    form.on('submit(use_phone_btn)',function(data){
        var new_phone = data.field.phone,
            code_val = data.field.phone_ver;
        $.ajax({
            type:"POST",
            url:config.lineDev1+"/systems/unioncoin/upgBindingPhone",
            data:{new_phone:new_phone,phone:phone_val,sms_code:code_val},
            complete:function(data){
                var obj = JSON.parse(data.responseText);
                var errorMsg = obj.Info;
                if(obj.Code == 0){
                    layer.msg('更改绑定手机成功',function(){
                        $(".user_phone").text(phone_val);
                        parent.location.reload(); 
                        var index = parent.layer.getFrameIndex(window.name); 
                        parent.layer.close(index);
                    });
                }else{
                    layer.msg(errorMsg);
                }
            }
        })
    })
    //获取短信验证码
    $(".get-code").click(function(event) {
        getCode();
    });
    function getCode(){
        var phone = $(".acc_phone").val();
        if(phone=="" || !/^1(3|4|5|7|8)\d{9}$/.test(phone)){
            layer.msg("请填写正确的手机号码",{icon:5});
        }else{
            $.ajax({  
                type: "POST",
                url: config.lineDev1+"/systems/unioncoin/getSMS",
                async:false,
                data: {phone:phone,type:3},
                beforeSend:function(){
                    var index = layer.load(1, {
                      shade: [0.2,'#fff'] //0.1透明度的白色背景
                    });
                },
                complete:function(data){
                    var obj = JSON.parse(data.responseText);
                    layer.closeAll("loading");
                    if(obj.Code == 0){
                    InterValObj = window.setInterval(SetRemainTime, 1000);
                    layer.msg("已发送验证码，请注意查看");
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
        }
    }
	
})