$(function(){
	var layer = layui.layer;
	var upload = layui.upload;
	var laypage = layui.laypage;
	// 用户订单等高
	var listlength = $(".user-details-msg").height();
	$(".user-details-msg ul li").css("height",listlength+"px");
	//帮助中心
	$(".help-nav ul li").click(function(event) {
		$(this).addClass('help-this').siblings().removeClass('help-this');
	});
	//新增地址
	$(".made-address").click(function(event) {
		layer.open({
			type:2,
			title:'添加收货地址',
			area:["550px","500px"],
			skin:"made-address-layer",
			shadeClose: true, //开启遮罩关闭
			content:'../ifram/user_address_add.html',
		})
	});
	//修改地址
	$(".user_edit").click(function(event) {
		layer.open({
			type:2,
			title:'修改收货地址',
			area:["550px","500px"],
			skin:"made-address-layer",
			shadeClose: true, //开启遮罩关闭
			content:'../ifram/user_address_made.html'
		})
	});
	//绑定手机
	$(".use_phone").click(function(event) {
		layer.open({
			type:2,
			title:'更换绑定手机',
			area:["550px","420px"],
			skin:"made-address-layer",
			content:'../ifram/use_phone.html'
		})
	});
	//绑定邮箱
	$(".use_email").click(function(event) {
		layer.open({
			type:2,
			title:'绑定邮箱',
			area:["550px","420px"],
			skin:"made-address-layer",
			content:'../ifram/use_email.html'
		})
	});
	//修改登陆密码
	$(".use_password").click(function(event) {
		layer.open({
			type:2,
			title:'登陆密码',
			area:["550px","500px"],
			skin:"made-address-layer",
			content:'../ifram/use_password.html'
		})
	});
	//拨打客服
	$(".use_cap_password").click(function(event) {
		layer.open({
			type:1,
			title:'请拨打客服电话',
			area:["500px","340px"],
			shadeClose: true, //开启遮罩关闭
			content:'<div class="service-tel"><p>400-118-0566</p><a>关 闭</a></div>'
		})
	});
	//关闭客服
	$(document).on('click','.service-tel a',function(){
		layer.closeAll();
	})
	//layer的分页，订单分页
	// laypage.render({
	// 	elem:"user_order_all",//绑定的ID，要是ID
	// 	count:70,//数据总数，从服务器获得
	// 	limit:4,//每页几条
		
	// })

	//获取用户信息
	function userCount(){
		$.ajax({
			type:"GET",
			url:config.lineDev1+"/systems/unioncoin/getCerify?uid="+getCookie("uidCookie"),
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
                	var status = obj.Json[0].status;//0 没有实名 1已经实名等待审核 2审核通过
                	var phone = obj.Json[0].phone;//replaceAction(idCard, "(?<=\\d{4})\\d(?=\\d{4})")
                    $(".user-name").text(obj.Json[0].realname);
                    $(".user-uid").text(obj.Json[0].uid);
                    $(".user-code").text(obj.Json[0].id_num);
                    $(".user_phone").text(phone);
                    console.log(status);
                    if(status == 0){
                    	$(".stay-authen").css("display","block");
                    }else
                    if(status == 1){
                    	// $(".to-audit").css("display","block");
                    	// $(".over-authen,.stay-authen").css("display","none");
                    	//$(".card_id").text("待审核");
                    	$(".over-authen").css("display","block");
                    	$(".to-audit,.stay-authen").css("display","none");
                    	$(".card_id").text("已认证");
                    }else
                    if(status == 2){
                    	$(".over-authen").css("display","block");
                    	$(".to-audit,.stay-authen").css("display","none");
                    }
                }else{
                    layer.msg(errorMsg);
                }
			}
		})
	}
	// userCount();
	// 删除收货地址
	$(".del_icon").click(function(event) {
		var thisAddress = $(this);
		layer.confirm('是否删除收货地址', {
	        btn: ['确定','取消'] //按钮
	    }, function(){
	        layer.msg('成功删除收货地址', {icon: 1},function(){
	        	thisAddress.parents(".user-address-cont").css("display","none");
	            // window.location.reload();
	        });
	    }, function(){
	        layer.close();
	        // layer.msg("取消了");
	    });
	});
	//图片展示到容器
    $(".file-btn1").change(function() {
    	var $file = $(this);
	    var fileObj = $file[0];
	    var windowURL = window.URL || window.webkitURL;
	    var dataURL;
	    var $img1 = $("#preview1");
        if(fileObj && fileObj.files && fileObj.files[0]){
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img1.attr('src',dataURL);
        }else{
            dataURL = $file.val();
            var imgObj = document.getElementById("preview1");
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
        }
    });
    $(".file-btn2").change(function() {
    	var $file = $(this);
	    var fileObj = $file[0];
	    var windowURL = window.URL || window.webkitURL;
	    var dataURL;
	    var $img2 = $("#preview2");
        if(fileObj && fileObj.files && fileObj.files[0]){
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img2.attr('src',dataURL);
        }else{
            dataURL = $file.val();
            var imgObj = document.getElementById("preview2");
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
        }
    });
    $(".file-btn3").change(function() {
    	var $file = $(this);
	    var fileObj = $file[0];
	    var windowURL = window.URL || window.webkitURL;
	    var dataURL;
	    var $img3 = $("#preview3");
        if(fileObj && fileObj.files && fileObj.files[0]){
            dataURL = windowURL.createObjectURL(fileObj.files[0]);
            $img3.attr('src',dataURL);
        }else{
            dataURL = $file.val();
            var imgObj = document.getElementById("preview3");
            // imgObj.innerHTML = ""
            imgObj.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
            imgObj.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = dataURL;
        }
    });
})
