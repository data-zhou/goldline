$(function(){
    //商城的banner
	var carousel = layui.carousel,
        laydate = layui.laydate,
        table = layui.table,
        util = layui.util;
	carousel.render({
    	elem: '.intobanner',
    	width: "100%", //设置容器宽度
    	height: 440,
    	arrow: 'none', //不显示箭头
    	anim: 'fade' //切换动画方式
  	});
    //页面跳转，可删除
    $(".shop-settle-btn").click(function(event) {
        window.location = "shop_cart_balance.html";
    });
    $(".balance-btn").click(function(event) {
        window.location = "shop_cart_pay.html";
    });
    $(".pay-btn").click(function(event) {
        window.location = "shop_cart_pay_over.html";
    });
    //购物车结算地址收放
    $(".mess-more").toggle(function() {
        var down_address = $(".consignee-mess ul");
        $(this).text('收起地址')
            $(".consignee-mess ul").slideDown(500);
    }, function() {
        $(this).text('更多地址');
            $(".consignee-mess ul").slideUp(500);
    });
    $(".consignee-mess .consignee-name").click(function(event) {
        var dd = $(this).parent().children('consignee-name');
        $(".consignee-mess .consignee-name").removeClass('consignee-active');
        $(this).addClass('consignee-active');
        // $(".consignee-mess .mess-more").not(this).removeClass('consignee-active');
    });
    //转入转出商城翻页动画
    $(".move-cont").animate({marginLeft: "0%"},500);
    
    //全选
    var into_allcheck = $(".into-allcheck");
    var into_check =$(".into-checkbox");
    var out_allcheck = $(".out-allcheck");
    var out_check =$(".out-checkbox");
    $(".into-allcheck").click(function() {  
        $(".into-checkbox").prop("checked", this.checked);  
    });
    // $(".into-checkbox").click(function() {  
    //     var $subs = $("input[name='sub']");  
    //     into_allcheck.prop("checked" , into_check.length == into_check.filter(":checked").length ? true :false);  
    // });
    $(".out-allcheck").click(function() {  
        $(".out-checkbox").prop("checked", this.checked);  
    });
    // $(".out-checkbox").click(function() {  
    //     var $subs = $("input[name='sub']");  
    //     out_allcheck.prop("checked" , out_check.length == out_check.filter(":checked").length ? true :false);  
    // });





    // 数量加减
    $(".amount-more").click(function(){
        var n=$(this).parent().find(".amount").val();
        var num=parseInt(n)+1;
        $(this).parent().find(".amount").val(num);
    });

    $(".amount-less").click(function(){
        var n=$(this).parent().find(".amount").val();
        var num=parseInt(n)-1;
        if(num==0){
            return;
        }
        $(this).parent().find(".amount").val(num);
    });
    //倒计时
    var thisTimer;
    var setCountdown = function(y, M, d, H, m, s){
        var endTime = new Date(y, M||0, d||1, H||0, m||0, s||0); //结束日期
        // var endTime = 4073558400000;
        var serverTime = new Date(); //假设为当前服务器时间，这里采用的是本地时间，实际使用一般是取服务端的
       
        clearTimeout(thisTimer);
        // console.log(thisTimer);
        util.countdown(endTime, serverTime, function(date, serverTime, timer){
            // var str = date[0] + '天' + date[1] + '时' +  date[2] + '分' + date[3] + '秒';
            var str = date[1] + '时' + date[2] + '分' + date[3] + '秒';
            $('.count-time').html(str);
            thisTimer = timer;
        });
    };
    setCountdown(2018,02,01);//提交订单的时间

})