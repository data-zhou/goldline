$(function(){
var layer = layui.layer,
	laypage = layui.laypage,
	table = layui.table;
//委托记录
function entrust_table(){
	$.ajax({
		type:'GET',
		url:config.lineDev1+'/systems/unioncoin/getEntrustCount?entrust_type=1',
		complete:function(data){
			var obj = JSON.parse(data.responseText);
			if(obj.Code == 100){
				window.location.href="../login/login.html";
			}else
			if(obj.Code == 0){
				var pageCount = obj.Json[0].count;//总条数
				laypage.render({
					elem: 'entrust_nc_page',
				  	count: pageCount,
				  	limit:10,
		    	  	theme:'entrust_NC',
				  	jump: function(index,first){
			  			$.ajax({
							type:'GET',
							url:config.lineDev1+'/systems/unioncoin/getEntrust',
							data:{entrust_type:1,page:index.curr,page_count:10},
							// beforeSend:function(){
				   //              layer.load(1);
				   //          },
							complete:function(data){
								var obj = JSON.parse(data.responseText);
								var objArry = obj.Json[0];
								$("#entrust_table tbody tr").remove();
								for (var i=0;i<objArry.length;i++) {
									var str = '<tr>'+
											'<td>'+ objArry[i].entrust_time + '时间' +'</td>'+
											'<td>'+ objArry[i].entrus_type + '类型' +'</td>'+
											'<td>'+ objArry[i].price + '委托价格' +'</td>'+
											'<td>'+ objArry[i].num + '委托数' +'</td>'+
											'<td>'+ objArry[i].service_charge + '总金额' +'</td>'+
											'<td>'+ objArry[i].sum_money + '手续费' +'</td>'+
											'<td>'+ objArry[i].id + '状态' +'</td>'+
											'</tr>';
								$("#entrust_table tbody").append(str);
								};
							}
						})
			  		}
				});
			}else{
				layer.msg(obj.Info);
			}
		}
	});
}
// entrust_table();
//区块链记录
function block_list(){
	$.ajax({
		type:'GET',
		url:config.lineDev1+'/systems/unioncoin/getEntrustCount?entrust_type=1',
		complete:function(data){
			var obj = JSON.parse(data.responseText);
			if(obj.Code == 100){
				window.location.href="../login/login.html";
			}else
			if(obj.Code == 0){
				var pageCount = obj.Json[0].count;
				laypage.render({
					elem: 'block_nc_page',
				  	count: pageCount+1,
				  	limit:3,
				  	jump: function(index,first){
			  			$.ajax({
							type:'GET',
							url:config.lineDev1+'/systems/unioncoin/getBCRecord',
							data:{bc_type:1,page:index.curr,page_count:3},
							// beforeSend:function(){
				   //              layer.load(1);
				   //          },
							complete:function(data){
								var obj = JSON.parse(data.responseText);
								var objArry = obj.Json[0];
								// console.log(objArry);
								// console.log(index.curr);
								$("#block_nc_list .layui-tab-content-list").remove();
								for (var i=0;i<objArry.length;i++) {
									var str = '<div class="layui-tab-content-list">'+
					    					'<div class="pub-tab personal-trans-id layui-clear">'+
					    						'<span>转换ID：<i>'+'jofdslmdsljfimjskglmckdlsmfdsf1d2fds'+'</i></span>'+
					    						'<span class="f-right">转换额：<i>'+370+'</i></span>'+
					    					'</div>'+
					    					'<div class="pub-tab personal-address layui-clear">'+
					    						'<span>'+'jofdslmdsljfimjskglmckdlsmfdsf1d2fds'+'</span>'+
					    						'<em class="personal-address-icon"><img src="../images/next-tab.png" alt=""></em>'+
					    						'<span class="f-right">'+'jofdslmdsljfimjskglmckdlsmfdsf1d2fds'+'</span>'+
					    					'</div>'+
					    					'<div class="pub-tab personal-trans-mesg layui-clear">'+
					    						'<span>服务费：<i>'+objArry[i].id+'</i><em class="personal-mesg-icon"></em></span>'+
					    						'<span class="f-right">'+'2017-09-18  17:55:10'+'</span>'+
					    					'</div>'+
					    					'</div>'
								$("#block_nc_page").before(str);
								};
							}
						})
			  		}
				});
			}
		}
	});
}	
// block_list();


	
})