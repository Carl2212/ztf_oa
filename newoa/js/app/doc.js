var username, userid, password, cnname, isLeader;
var ssHelper = new SStorageHelper(); //sessionStorage

var listHtmlStr = '<li class="list-group-item" moduleid="{moduleid}" doctype="{doctype}" style="padding:19px 15px"><span style="font-size:18px">{moduleName}</span>'
				     +'<span class="badge important-bg-primary">{count}</span>'
			     +'</li>';
function showBg(_name){
	var bgs = $("span[role=bg]");
//	console.log(bgs);
	$.each(bgs,function(idx, item){
		$(item).html(_name);
	});
};
function getTodoCount(userid){
	getCount(userid, 'todo', $("#todolist"));
};

function getToreadCount(userid){
	getCount(userid, 'toread', $("#toreadlist"));
};

function getCount(userid, doctype, listDom){
	var opts = {};
	
	opts.data = {};
	opts.data.username = username;
	opts.data.userid = userid;
	opts.data.doctype = doctype;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + Config.modulelist_action;
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
			
			var tmp = "";
//			console.log(typeof(data.result.modulelist));
			if('string'!=typeof(data.result.modulelist)){
				$.each(data.result.modulelist, function(idx, item){
					tmp = listHtmlStr.replace("{moduleName}", item.module_name).replace("{count}", item.count).replace("{moduleid}", item.module_id).replace("{doctype}", doctype);
					listDom.append(tmp);
				});
			}else{
				alert('暂无数据');
			}
			
		}
		$(".list-group-item").on("click",function(){
//			console.log($(this));
//			alert($(this).attr("doctype"));
			window.location.href = "list.html?r="+Math.random()+"&moduleid="+$(this).attr("moduleid")+"&doctype="+$(this).attr("doctype");
		});
	};
	
	$.jsonPost(opts);
};

$(function(){
	
	var state = getURLParam('state');//todo, toread

    //判断sessionStorage是否有用户信息
    username = ssHelper.getValue('username');
    cnname = ssHelper.getValue('cnname');
    userid = ssHelper.getValue('userid');
    if(!username) {
        alert(Config.nouserinfotip);
    }
    showBg(cnname);

    if('todo'==state){
        $("#toreadPanel").hide();
        $("#todoPanel").show();
        getTodoCount(userid);
    }else{
        $("#todoPanel").hide();
        $("#toreadPanel").show();
        getToreadCount(userid);
    }
	
	
	
	
	
	/*$(".list-group-item").on("touchend",function(){
		console.log($(this));
		alert($(this).attr("moduleid"));
	})*/
});