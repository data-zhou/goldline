$(function(){
    var layer = layui.layer,
        laypage = layui.laypage,
        element = layui.element;
    var uidCookie = getCookie("uidCookie");
    var accountCookie = getCookie("accountCookie");
    jQuery.support.cors = true;
    userStatus();
    // console.log(uidCookie+accountCookie);
    //公用
    // $(".topbar").load("ifram/topbar.html");
    // $(".head-nav").load("ifram/header.html");
    // $(".footer").load("ifram/footer.html");
    //外部链接切换到指定tab项上
    var layid = location.hash.replace(/^#anchor_href=/, '');
    element.tabChange('goldline_zhi', layid);//值
    element.tabChange('goldline_jifen', layid);//积分
    element.tabChange('goldline_shangpin', layid);//商品
    //监听Tab切换，以改变地址hash值
    element.on('tab(entrust)', function(){
       location.hash = 'anchor_href='+ this.getAttribute('lay-id');
        console.log(location.hash);
    })
    //购物车提示
    $(".add-cart-one").click(function(event) {
        
        layer.tips('购物车+1', this,{
            tips:[2,'#ff4400'],
            skin:'layer-tips-skin',
            time:1000
        });
    });
    
    //资金转换为人民币
    $(".transRMB").click(function(event) {
        layer.open({
            type:1,
            title:'联合金转换为人民币',
            btn:'确定转换',
            area:["550px","380px"],
            skin:"capital-layer",
            shadeClose: true, //开启遮罩关闭
            content:'<div class="asset-trans-cont">'+   
                    '<p class="asset-p"><em>转换联合金：</em><span><i class="asset-lay-LHJ pr10">9000</i>LHJ</span></p>'+
                    '<p class="asset-p"><em>转换后人民币：</em><span><i class="asset-lay-RMB pr10">9000</i>¥</span></p>'+
                    '</div>',
            yes:function(index,layero){
                layer.open({
                    type:1,
                    title:'输入资金密码',
                    btn:'提 交',
                    area:["550px","380px"],
                    skin:"capital-layer",
                    content:'<div class="asset-trans-cont">'+
                            '<input type="password" class="capital-pass" id="capital_pass" placeholder="输入资金密码" />'+
                            '</div>',
                    yes:function(){
                        var demo = $("#capital_pass").val();
                        if(demo==123){
                            layer.msg("转换成功",{icon:1},function(){
                                layer.closeAll();
                            });
                        }else{
                            layer.msg("密码不正确",{icon:2},function(){
                                layer.closeAll();
                            });
                        }
                    }
                });
            }

        });
    });
    //公告信息
    function notice(){
        var url = config.lineDev1+"/systems/unioncoin/getNoticeList?count=1&type=1";
        // console.log(url);
        $.ajax({
            type:"GET",
            url:config.lineDev1+"/systems/unioncoin/getNoticeList?count=1&type=1",
            complete:function(data){
                var obj = JSON.parse(data.responseText);
                var title = obj.Json[0][0].title;
                console.log(obj);
                $(".notice a").text(title);
            }
        });

        /*$.get(url,function(data,status){
            console.log(status);
            // alert("Data: " + data + "\nStatus: " + status);
            console.log(data);
        });*/

        // $.ajax({
        //     type: "GET",
        //     url: config.lineDev1+"/systems/unioncoin/getNoticeList",
        //     data: {
        //         "count": 1,
        //         "type": 1
        //     },
        //     cache:false,
        //     // dataType: "json",
        //     success: function (data) {
        //         // var obj = JSON.parse(data.responseText);
        //         // var title = obj.Json[0][0].title;
        //         console.log(data);
        //         // $(".notice a").text(title);
        //     },
        //     error: function(XMLHttpRequest, textStatus, errorThrown) {
        //         console.log(XMLHttpRequest.status);
        //         console.log(XMLHttpRequest.readyState);
        //         console.log(textStatus);
        //     },
        // });
    }
    // notice();


    
})

//登录时设置cookie
// setCookie('LoginStatus', false, -1);
//退出登录
$(".login_out").click(function(event) {
    layer.confirm('是否要退出登录', {
        btn: ['退出','取消'] //按钮
    }, function(){
        layer.msg('已退出登录', {icon: 1},function(){
            setCookie('accountCookie',false, -1);
            setCookie('LoginStatus',false, -1);
            setCookie('uidCookie',false, -1);
            window.location.reload();
        });
    }, function(){
        layer.close();
    });
});

//判断登录状态
var userStatus = function(){
    if(getCookie('LoginStatus')){
        $(".topbar-ul,.navbar-box").css("display","block");
        $(".top-nav-register").css("display","none");
        $(".topbar-ul .user_phone").text(getCookie("accountCookie"));
        // console.log("登录");
    }else{
        $(".top-nav-register").css("display","block");
        $(".navbar-box").css("display","none");
        // console.log("未登录");
    }
}
//设置cookie
function setCookie(cname,cvalue,exdays){
    var d = new Date();
    d.setTime(d.getTime()+(exdays*24*60*60*1000));
    var expires = "expires="+d.toGMTString();
    document.cookie = cname+"="+cvalue+"; "+expires+"; path=/goldline";
}
function getCookie(cname){
    // var allcookies = document.cookie;
    var strCookie = document.cookie;
    var arrCookie = strCookie.split("; ");
    for(var i=0; i<arrCookie.length; i++) {
        var arr = arrCookie[i].split("=");
        if(cname == arr[0]){
            return arr[1];
        }
    }
    return "";
}
function delCookie(name) {                   //删除一个cookie  
    var exp = new Date();  
    exp.setTime(exp.getTime() - 1);  
    var cval=getCookie(name);  
    if(cval!=null)  
    document.cookie= name + "="+cval+";expires="+exp.toUTCString();  
}