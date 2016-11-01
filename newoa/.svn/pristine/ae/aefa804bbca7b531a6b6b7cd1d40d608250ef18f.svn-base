var wxConfigReady = false;
var navList = [{id:'1', name:'>', idx:1}];
var orgList = [];
var currentList = null;
var selectedUsers = [];
var navDiv = $("#navDiv");
var listDiv = $("#listDiv");
var userPanel = $("#userPanel");

var offPic = '../res/images/check_off.png';
var onPic = '../res/images/check_on.png';



var multiUser = false;

var navHtmlStr = '<button type="button" role="nav" class="btn btn-primary" groupid="{groupid}" idx="{idx}">{orgname}</button>';
var groupHtmlStr = '<li class="list-group-item" role="groupInfo" idx="{idx}"><span class="glyphicon glyphicon-list"></span> {groupname}</li>';
//var userHtmlStr = '<li class="list-group-item" role="userInfo" idx="{idx}"> <span class="glyphicon glyphicon-user"></span> {username}</li>';

var userHtmlStr = '<li class="list-group-item" role="userInfo" idx="{idx}"> <span class="glyphicon glyphicon-user"></span> {username}'
	+'<img role="userSelect" userid={userid} class="pull-right ico_radio_check" alt="" src="{pic}">'
+'</li>';

function setNav(){
	navDiv.html('');
	var tmp = '';
	$.each(navList, function(idx, item){
		tmp = navHtmlStr.replace("{orgname}", item.name+">").replace("{groupid}", item.id).replace("{idx}", item.idx);
		navDiv.append(tmp);
	});
	
	$("button[role=nav]").on('click', function(){
		var groupid = $(this).attr('groupid');
		var idx = $(this).attr('idx');
		if(idx<navList.length){
			window.history.go(idx - navList.length);
		}
		
	});
	
};


function setList(){
	listDiv.html('');
	var tmp = '';
	$.each(currentList.children,function(idx, item){
		tmp = groupHtmlStr.replace("{groupname}", item.name).replace("{idx}", "group_"+idx);
		listDiv.append(tmp);
	});
	
	$.each(currentList.users,function(idx, item){
		tmp = userHtmlStr.replace("{username}", item.name).replace("{idx}", "user_"+idx).replace("{pic}", offPic).replace("{userid}", item.userid);
		
		listDiv.append(tmp);
	});
	
	$("li[role=groupInfo]").on('click', function(){
		var data = currentList.children[$(this).attr('idx').substr(6)];
//		console.log(data);
		var nav = {};
		nav.id=data.id;
		nav.name = data.name;
		nav.idx = navList.length+1;
		navList.push(nav);
		window.location.hash="#"+data.id;
		//getList(data.groupid);
	});
	
	for(var sidx in selectedUsers){
		if(selectedUsers[sidx]){
			$("img[userid="+selectedUsers[sidx].userid+"]").attr('src', onPic);
		}
		
	}
	
	$("li[role=userInfo]").on('click', function(){
		var dom = $(this).children("img[role=userSelect]");
		var _idx = $(this).attr('idx').substr(5);//.attr('src', routeSelectPic);
		var user=currentList.users[_idx];
//		console.log('user selectd:'+user.selected);
		user.selected=!user.selected;
		if(user.selected){
			selectedUsers[user.userid]=user;
			
			dom.attr('src', onPic);
		}else{
			selectedUsers[user.userid]=undefined;
			
			dom.attr('src', offPic);
		}
		
	});
};

function hashchangeHandler(){
	var hash = window.location.hash;
	var id='';
	if(''==hash){
		id="1";
	}else{
		id = hash.substr(1);
	}
	
	$.each(navList, function(idx, item){
		if(item.id==id){
			navList = navList.slice(0, idx+1);
		}
	});

	currentList = orgList[id];
	if(!currentList.children){
		currentList.children=[];
		for(key in orgList){
			if(orgList[key].parentid==id){
				currentList.children.push(orgList[key]);
			}
		}
	}
	setNav();
	setList();
	

};


function fetchUsers(callback){
	var opts = {};
	
	opts.data = {};
	opts.data.department_id = "1";
	opts.data.api = "user/simplelist";
	opts.data.fetch_child = "1"; //递归取子部门
	opts.data.status="1";//只取已关注成员
	
	opts.url = Config.global_url + Config.wx_getapi_proxy;
//	opts.url = "http://owenli123.imwork.net/ms/" + Config.wx_getapi_proxy;
	opts.success = function(data,status, jqXHR){
		if(data.errcode!=undefined&&"0"==data.errcode){
			$.each(data.userlist,function(idx, user){
				$.each(user.department, function(_idx, deptid){
					orgList[deptid].users.push(user);
				});
			})
			callback&&callback();
		}else{
			alert(data.errmsg);
		}
		
	};
	opts.completeFun=function(){
		$("#maskDiv").hide();
	};
	
	
	$.jsonPost(opts);
}

function fetchGroups(callback){
	var opts = {};
	
	opts.data = {};
	opts.data.id = "1";
	opts.data.api = "department/list";
	
	opts.url = Config.global_url + Config.wx_getapi_proxy;
//	opts.url = "http://owenli123.imwork.net/ms/" + Config.wx_getapi_proxy;
	opts.success = function(data,status, jqXHR){
		if(data.errcode!=undefined&&"0"==data.errcode){
			$.each(data.department,function(idx, dept){
				/*if("0"!=dept.parentid){//暂时只处理一级部门
					
				}*/
				dept.users=[];
				dept.children=[];
				orgList[dept.id]=dept;
			})
			callback&&callback();
		}else{
			$("#maskDiv").hide();
			alert(data.errmsg);
		}
		
	};
	/*opts.completeFun=function(){
		$("#maskDiv").hide();
	};*/
	
	
	$.jsonPost(opts);
}

function doWxConfig(){
	var opts = {};
	
	opts.data = {};
	opts.data.url=window.location.href;//当前页面的url, 以便对当前页面授权
	opts.url = Config.global_url + Config.get_wx_js_signature;
	
	//opts.url = "http://owenli123.imwork.net/ms" + Config.get_wx_js_signature;//测试暂时使用此url, 以后需改为Config.global_url
	
	
	opts.success = function(data,status, jqXHR){
		console.log(data);
		if(data.code==1){
			var config = data.config;
			config.debug=false;//debug模式, 以便调试
			config.jsApiList=["openEnterpriseChat"];//需要使用的JS接口列表
			
			//通过config接口注入权限验证配置
			wx.config(config);
		}
	};
	
	//从服务端获取用于jsapi授权的签名
	$.jsonPost(opts);
}

function openChat(userIds,names){
	
	try{
		wx.openEnterpriseChat({
			userIds:userIds, 
			groupName:names,
			success:function(res){
				 $("#maskDiv").hide();
			},
		    fail:function(res){
				if(res.errMsg.indexOf('function not exist') > 0){
                    $("#maskDiv").hide();
                    alert('微信版本过低请升级');
		        }
			}
		});
	}catch(e){
		alert(e);
	}
}

$(function(){	
	$("#maskDiv").show();
	$(".cdc-scroll-panel-body").height($(window).height()-90);
	window.onhashchange = hashchangeHandler;
	fetchGroups(function(){
		fetchUsers(function(){
			currentList=orgList["1"];
			currentList.children=[];
			for(key in orgList){
				if(orgList[key].parentid=="1"){
					currentList.children.push(orgList[key]);
				}
			}
			console.log(currentList);
			setNav();
			setList();
		});
	});
	$("#userConfirmBtn").on('click',function(){
		var userIds = "";
		var names = "";
		for(key in selectedUsers){
			if(selectedUsers[key]){
				userIds+=key+";";
				names+=selectedUsers[key].name+";";
			}
		}
		if(""==userIds){
			alert("请先选者会话成员");
			return;
		}else{
			userIds=userIds.substr(0,userIds.length-1);
			names=names.substr(0,names.length-1);
			if(names.length>15){
				names=names.substr(0,15)+"...";
			}
			$("#maskDiv").show();
			if(wxConfigReady){
				openChat(userIds,names);
			}else{
				//通过config接口注入权限验证配置
				doWxConfig();
				
				//wx config信息验证后会执行ready方法, 所有调用微信js的方法,都要在ready后执行
				wx.ready(function(){
					wxConfigReady=true;
					openChat(userIds,names);
				});
			}
			
		}
		
		
	})

});