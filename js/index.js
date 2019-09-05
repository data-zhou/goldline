$(function(){
        jQuery.support.cors = true;
	var carousel = layui.carousel,form = layui.form,laydate = layui.laydate;
    //banner
	carousel.render({
    	elem: '.ibanner',
    	width: "100%", //设置容器宽度
    	height: 440,
    	arrow: 'none', //不显示箭头
    	anim: 'fade' //切换动画方式
  	});
    //公告
    $(".article-cont").hover(function() {
        $(this).addClass('article-atc').siblings().removeClass('article-atc');
    });
    // 登录
    form.on('submit(logbtn)',function(data){
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
                        window.location = "index.html";
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
    //咨询公告
    
    //banner 图片接口
    function getBanner_index(){
        $.ajax({
            url: config.lineDev1+'/systems/unioncoin/getBanner',
            type: 'GET',
            data:{type:1},
            complete:function(data){
                var obj = JSON.parse(data.responseText);
                var errorMsg = obj.Info;
                if(obj.Code == 0){
                    for (var i=0;i<obj.Json.length;i++) {//var i in obj.info,var i=0;i<obj.Json.length;i++
                        var infoImg = obj.Json[i];
                        for (var i=0;i<infoImg.length;i++) {
                            $(".req-index-banner .demo-carousel img").attr('src',config.lineDev1 + '/img/' + infoImg[i].url);
                            // console.log(infoImg[i].url);
                        }
                        // console.log(infoImg[0].url);
                    };
                }else{
                    console.log(errorMsg);
                }
            }
        })
        
    }
    // getBanner_index();
  	
})