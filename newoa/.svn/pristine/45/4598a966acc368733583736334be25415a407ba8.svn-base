var state, selfGroupId,hisLength=0,addressType, currentNode, isFromOrg=false/*是否从组织架构选取*/;
//var ssHelper = new SStorageHelper(); //sessionStorage
var navList = [{id:'next0', name:'>', idx:1}];
var orgList = [];
var currentList = [];
var selectedUsers = [];
var navDiv = $("#navDiv");
var listDiv = $("#listDiv");
var userPanel = $("#userPanel");
var formPanel = $("#formPanel");
var parent_group="";

var offPic;
var onPic;


var multiUser = false;

var navHtmlStr = '<button type="button" role="nav" class="btn btn-primary" groupid="{groupid}" idx="{idx}">{orgname}</button>';
var groupHtmlStr = '<li class="list-group-item" role="groupInfo" idx="{idx}"><span class="glyphicon glyphicon-list"></span> {groupname}</li>';
//var userHtmlStr = '<li class="list-group-item" role="userInfo" idx="{idx}"> <span class="glyphicon glyphicon-user"></span> {username}</li>';

var userHtmlStr = '<li class="list-group-item" role="userInfo" idx="{idx}"> <span class="glyphicon glyphicon-user"></span> {username}'
	+'<img role="userSelect" userid={userid} class="pull-right ico_radio_check" alt="" src="{pic}">'
+'</li>';



/**
  * 
  * 
 */
function getUserList(parentid, callback){
	var opts = {};
	
	opts.data = currentNode.departmentParam;
	opts.data.username = username;
	opts.data.userid = userid;
	opts.data.groupid = parentid;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + Config.nextroute_user_action;
	opts.completeFun=function(){
		$("#maskDiv").hide();
	};
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
						
			var userList = data.result.userlist;
			if(userList&&"string" != typeof(userList)){
				$.each(userList, function(idx, user){
					var userInfo = {};
					$.each(user, function(_idx, item){
						userInfo[item.name] = item.text;
					})
					userInfo.username=userInfo.cnname;					
					currentList.push(userInfo);
					
				});
			}
			
		}
		callback&&callback();
	};
	$("#maskDiv").show();
	$.jsonPost(opts);
};



function setNav(){ //设置顶部导航按钮
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

function setList(){ //组织及人员列表
	listDiv.html('');
	var tmp = '';
	var userCount=0;
	$.each(currentList,function(idx, item){
		if(item.userid &&''!=item.userid){
			tmp = userHtmlStr.replace("{username}", item.cnname).replace("{idx}", idx).replace("{pic}", offPic).replace("{userid}", item.userid);
			userCount++;
		}else{
			
			tmp = groupHtmlStr.replace("{groupname}", item.groupname).replace("{idx}", idx);
		}
		listDiv.append(tmp);
	});
	
	$("li[role=groupInfo]").on('click', function(){
		var data = currentList[$(this).attr('idx')];
//		console.log(data);
		var nav = {};
		nav.id=data.groupid;
		nav.name = data.groupname;
		nav.idx = navList.length+1;
		navList.push(nav);
		window.location.hash="#"+data.groupid;
		//getList(data.groupid);
	});
	
	var selectedCount=0;
	for(var sidx in selectedUsers){
		if(selectedUsers[sidx]){
			$("img[userid="+selectedUsers[sidx].userid+"]").attr('src', onPic);
			selectedCount++;
		}
		
	}
	
	if(isFromOrg&&"#next0"!=parent_group){
		if(0==userCount){
			$("#selectAllBtn").hide();
			$("#unSelectAllBtn").hide();
		}else if(userCount==selectedCount){
			$("#selectAllBtn").hide();
			$("#unSelectAllBtn").show();
		}else{
			$("#selectAllBtn").show();
			$("#unSelectAllBtn").hide();
		}
	}
	
	$("li[role=userInfo]").on('click', function(){
		var dom = $(this).children("img[role=userSelect]");
		var _idx = $(this).attr('idx');//.attr('src', routeSelectPic);
		var user=currentList[_idx];
//		console.log('user selectd:'+user.selected);
		user.selected=!user.selected;
		if(user.selected){
			if(!isFromOrg&&(!currentNode.multiuser||currentNode.multiuser=='0')){
				if(selectedUsers[0]){
					tmpUserid=selectedUsers[0].userid;
					selectedUsers[0].selected=false;
					$("img[userid="+tmpUserid+"]").attr('src', offPic);
				}
				selectedUsers[0]=user;
			}else{
				selectedUsers[user.userid]=user;
			}
			
			dom.attr('src', onPic);
		}else{
			if(!isFromOrg&&(!currentNode.multiuser||currentNode.multiuser=='0')){
				selectedUsers[0]=undefined;
			}else{
				selectedUsers[user.userid]=undefined;
			}
			
			dom.attr('src', offPic);
		}
		
		if(isFromOrg&&"next0"!=parent_group){//控制全选,全不选的显示
			var _selectCount=0;
			var _unSelectCount=0;
			var allCheckBox = $("li[role=userInfo]>img");
			$.each(allCheckBox, function(_idx, item){
				if($(item).attr("src")==onPic){
					_selectCount++;
				}else{
					_unSelectCount++;
				}
			});
			
			if(0==_selectCount){
				$("#selectAllBtn").show();
				$("#unSelectAllBtn").hide();
			}else if(0==_unSelectCount){
				$("#selectAllBtn").hide();
				$("#unSelectAllBtn").show();
			}
		}
		
	});
};

function getList(parentid){
	currentList = [];
	currentList=orgList[parentid]?orgList[parentid]:[];
	getUserList(parentid, function(){
//		orgList[parentid] = currentList;
		setNav();
		setList();
	});
	
};

function hashchangeHandler(){
	var hash = window.location.hash;
	parent_group=hash;
	if("#next0"==parent_group){
		$("#selectAllBtn").hide();
		$("#unSelectAllBtn").hide();
	}
//	console.log('hash:'+hash);
	if(''==hash){
		$('#userPanel').hide();
		$('#formPanel').show();
		return;
	}
	var inStack = false;
	if(hash && hash!=null && ''!=hash){
		$.each(navList, function(idx, item){//检查navList中是否 缓存了组织架构数据
			if('#'+item.id==hash){
				navList = navList.slice(0, idx+1);
				if(navList.hasFetchUsers){ //如果navList中有 缓存组织架构数据,则直接从组织架构取数据
					inStack = true;
					currentList = orgList[item.id];
					setNav();
					setList();
				}
			}
		});
		if(!inStack){//如果navList中没有 缓存组织架构数据,则请求接口获取数据
			if(isFromOrg&&'#common_'!=hash.substr(0,8)){ //通过组织架构接口取数据
				currentList=[];
				orgList[hash.substr(1)] = currentList;
				var parentid = '#next0'==hash?'0':hash.substr(1);
				getGroupOrUserList('group', parentid,'O', function(){
					getGroupOrUserList('user', parentid,'O', function(){
						setNav();
						setList();
						if('#next0'==hash){
							formPanel.hide();
							userPanel.show();
						}
						
					});
				});
			}else if('#next0'==hash){//通过路由取人接口取数据
				getGroups('next0', currentNode, function(){
					setNav();
					setList();
					formPanel.hide();
					userPanel.show();
				});
			}else if('#common_'==hash.substr(0,8)){//取常用分组的数据
				currentList=[];
				orgList[hash.substr(1)] = currentList;
				if('0'==hash.substr(8)){
					getGroupOrUserList('group', hash.substr(1), 'C',function(){
						getGroupOrUserList('user', hash.substr(8),'C', function(){
							setNav();
							setList();
						});	
					});
				}else{
					getGroupOrUserList('user', hash.substr(8), 'C',function(){
						setNav();
						setList();
					});	
				}
					
			}else{
				getList(hash.substr(1));
			}
			
		}
	}
	
	
	
};

function getGroupOrUserList(type, parentid,addressType, callback){
	var opts = {};
	
	opts.data = {};
	opts.data.username = username;
	opts.data.userid = userid;
	opts.data.parentid = parentid;
	opts.data.groupid = parentid;
	opts.data.type = addressType;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + ('group'==type?Config.grouplist_action:Config.userlist_action);
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
			var groupList = data.result.grouplist;
			if(groupList&&"string" != typeof(groupList)){
				$.each(groupList, function(idx, item){
					if('C'==addressType){
						item.groupid="common_"+item.groupid;
					}
					
					currentList.push(item);
				});
				if(0==parentid){
					currentList.push({groupid:'common_0',groupname:'常用分组'});
				}
			}
			
			var userList = data.result.userlist;
			if(userList&&"string" != typeof(userList)){
				$.each(userList, function(idx, user){
					var userInfo = {};
					$.each(user, function(_idx, item){
						userInfo[item.name] = item.text;
					})
					userInfo.username=userInfo.cnname;					
					currentList.push(userInfo);
					
				});
				
			}
			callback&&callback();
		}
	};
	opts.completeFun=function(){
		$("#maskDiv").hide();
	};
	$("#maskDiv").show();
	$.jsonPost(opts);
};


function getGroups(parentid, node, callback){
	var opts = {};
	
	opts.data = node.departmentParam;
	opts.data.username = username;
	opts.data.userid = userid;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + Config.nextroute_group_action;
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
//			console.log(data);
			if(data.result.grouplist&&data.result.grouplist.length==1&&'Org'==data.result.grouplist[0].groupid&&"天翼爱音乐文化科技有限公司"==data.result.grouplist[0].childlist[0].groupname){
				currentList=data.result.grouplist[0].childlist[0].childlist;
				setChildren(parentid, data.result.grouplist[0].childlist[0].childlist);
			}else if(data.result.grouplist){
				currentList=data.result.grouplist;
				setChildren(parentid, data.result.grouplist);
			}
			currentList.push({groupid:'common_0',groupname:'常用分组'});
		}else{
			alert(data.result.message);
		}
		callback&&callback();
	};
	opts.completeFun=function(){
		$("#maskDiv").hide();
	};
	$("#maskDiv").show();
	
	$.jsonPost(opts);
};

function setChildren(parentid, list){
	var childList = [];
	$.each(list, function(idx, item){
		childList.push(item);
		if(item.childlist){
			setChildren(item.groupid, item.childlist);
		}
	});
	orgList[parentid]=childList;
};

function selectUser(node){
	console.log('路由选人');
	$("#selectAllBtn").hide();
	$("#unSelectAllBtn").hide();
	isFromOrg=false;
	currentNode=node;
	initData();
	
	window.location.hash='#next0';
	
	
};

function selectToreadUser(){
	console.log('传阅选人');
	$("#selectAllBtn").hide();
	$("#unSelectAllBtn").hide();
	isFromOrg=true; //从组织架构选人
//	alert("333333--->>")
	//currentNode=node;
	initData();
	
	window.location.hash='#next0';
	
	
};

function initData(){
	navList = [{id:'next0', name:'>', idx:1}];
	orgList = [];
	currentList = [];
	selectedUsers = [];
//	currentNode.multiuser=1;
	if(isFromOrg){
		offPic=checkOffPic;
		onPic=checkOnPic;
	}else if(currentNode.multiuser&&currentNode.multiuser=='1'){
		offPic=checkOffPic;
		onPic=checkOnPic;
	}else{
		offPic=radioOffPic;
		onPic=radioOnPic;
	}
}

$(function(){	
	
	window.onhashchange = hashchangeHandler;
	$("#userConfirmBtn").on('click',function(){
		var _users = [];
		for(key in selectedUsers){
			selectedUsers[key]&&_users.push(selectedUsers[key]);
		}
		if(isFromOrg){
			//doToread(_users, navList.length);
			toreadUsers=_users;
			if(toreadUsers.length>0){
				var nameStr='';
				$.each(toreadUsers,function(idx, user){
					if(idx>0){
						nameStr+=",";
					}
					nameStr+=user.cnname;
					
				});
				$("#toreadBtnImg").attr('src','../res/images/check_on.png')
				$("#toreadSelectUser").html(nameStr);
			}else{
				$("#toreadBtnImg").attr('src','../res/images/check_off.png')
				$("#toreadSelectUser").html("");
			}
			window.history.go(-navList.length);
			return;
		}
		selectNode(currentNode, _users);
		window.history.go(-navList.length);
	});
	
	$("#selectAllBtn").on('click',function(){//全选
		$.each(currentList,function(idx, item){
			if(item.userid &&''!=item.userid){
				item.selected=true;
				$("img[userid="+item.userid+"]").attr('src', onPic);
				selectedUsers[item.userid]=item;
				
			}
		});
		
		$("#selectAllBtn").hide();
		$("#unSelectAllBtn").show();
	});
	$("#unSelectAllBtn").on('click',function(){
		$.each(currentList,function(idx, item){
			if(item.userid &&''!=item.userid){
				item.selected=false;
				$("img[userid="+item.userid+"]").attr('src', offPic);
				selectedUsers[item.userid]=undefined;
				
			}
		});
		
		$("#selectAllBtn").show();
		$("#unSelectAllBtn").hide();
	});

});