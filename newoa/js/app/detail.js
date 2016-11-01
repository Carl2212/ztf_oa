var username, userid,cnname, moduleid, doctype, nodeid, docid, appid, routeparam, doctype, isLeader, docStatus, fromlist;
var ssHelper = new SStorageHelper(); //sessionStorage
var toreadUsers=[];

var hasFetchRoute=false;
var needRoute = true;
var multiRoute = false;
var selectedRoutes = [];
var allNodes = [];
var checkOffPic = '../res/images/check_off.png';
var checkOnPic = '../res/images/check_on.png';
var radioOffPic = '../res/images/radio_off.png';
var radioOnPic = '../res/images/radio_on.png';
var routeSelectPic = radioOffPic;
var routeSelectedPic = radioOnPic;

var detailHtmlStr = '<tr>'
    				+'<td style="word-break:break-all" class="detail-table-label">{label}</td>'
    				+'<td style="word-break:break-all">{value}</td>'
    			  +'</tr>';

var traceHtmlStr = '<table class="table table-bordered" >'
				   +'<tbody>';
var traceRowHtmlStr = '<tr>'
						+'<td class="detail-table-label" style="width:80px;word-break:break-all">{label}</td>'
						+'<td  style="word-break:break-all">{value}</td>'
					 +'</tr>';

var traceHtmlStrSuffix ='</tbody>'
			  +'</table>';

var attachHtmlStr = '<tr class="attach-row" url="{url}" filename="{filename}">'
				         +'<td class="detail-table-label" style="width:20px;min-width:30"><span class="glyphicon glyphicon-paperclip"></span></td>'
				         +'<td>{name}</td>'
				      +'</tr>';

var routeHtmlStr = '<div class="panel panel-default">'
						+'<div role="route" nodeid="{nodeid}" class="panel-heading">'
						+'<span>{nodename}</span>'
						+'<img role="select" class="pull-right ico_radio_check" alt="" src="{pic}">'
						+'</div>'
						+'<div role="selectUser" class="panel-body">'
						+'{users}'
						+'</div>'
				  +'</div>';

function getDocDetail(){
	var opts = {};
	
	opts.data = {};
	opts.data.username = username;
	opts.data.userid = userid;
	opts.data.doctype = doctype;
	opts.data.moduleid = moduleid;
	
	opts.data.nodeid = nodeid;
	opts.data.docid = docid;
	opts.data.appid = appid;
	
//	opts.data.pageindex = pageindex++;
//	opts.data.pagesize = pagesize;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + Config.docdetail_action;
	opts.completeFun=function(){
		$("#maskDiv").hide();
	};
	opts.success = function(response,status, jqXHR){
		if("1"==response.header.code){
			var detailDom = $("#detailDom");
			var traceDom = $("#tracePanel");
			var attachDom = $("#attachDom");
			
        	var detail = response.result.detail;
        	docStatus = response.result.status;
        	var isSecrecy = response.result.secrecy;
        	
        	routeparam = detail.routeparam;
        	
        	if(typeof(routeparam)!='string'&&'1'==docStatus){
        		$("#toSubBtn").show();
        	}else if('toread'==doctype){//待阅
        		$("#toSubBtn").html('转传阅');
        		$("#toSubBtn").show();
        		if('1'==docStatus){
        			$("#subToreadBtn").show();
        		}
        		
        	}else{
        		$("#toSubBtn").hide();
        	}
        	var formData = [];
        	var attachList = [];
        	var traceList = [];
        	/*var titleItem = {text: detail.title, formtype: 'title'};
        	var attachHeight = 60;
        	formData.push(titleItem);*/
        	
        	detail.item&&$.each(detail.item, function(idx, field){
        		switch(field.formtype){
        			case '1':
        				if(field.text){
        					field.text = field.text.replace(new RegExp('<','gm'),'&lt;').replace(new RegExp('>','gm'),'&gt;');
        					if('密级'==field.label&&'1'==isSecrecy){
        						field.label="<span style='color:red'>"+field.label+"</span>";
        						field.text="<span style='color:red'>"+field.text+"</span>";
        					}
        				}
        				
        				formData.push(field); break;
        			case '2': 
        				field.text = UrlUtil.decode(field.text);
        				attachList.push(field); break;
        			case '3': 
        				field.text = UrlUtil.decode(field.text);
        				attachList.push(field);
        				break;
        			case '5': 
        				field.text = BASE64.decode(field.text.substring(8));
        				formData.push(field);
        				break;
        			case '6': 
        				formData.push(field);
        				break;
        			default: alert("未处理表单数据类型");
        		}
        		if('1'==field.formtype){
        			var tmp = detailHtmlStr.replace("{label}", field.label).replace("{value}", field.text?field.text:'');
            		detailDom.append(tmp);
        		}else if('2'==field.formtype||'3'==field.formtype){
        			var tmp = attachHtmlStr.replace("{name}", field.label).replace("{filename}", field.label).replace("{url}", field.text?field.text:'');
        			attachDom.append(tmp);
        		}
        		
        	});
        	
        	$(".attach-row").on('click', function(){
        		if("1"==isSecrecy){
        			alert('加密公文附件请登录PC端查看！');
        		}else{
        			readFile($(this).attr('url'), $(this).attr('filename'));
        		}
        		
        	});
        	
        	if(response.result.toread&&response.result.toread=='1'){
        		$("#toreadPanel").show();
        	}
        	
        	
        	/*var len = attachList.length;
        	if(len > 0){
        		me.getAttachList().setData(attachList);
        		me.getAttachList().show();
            	me.getAttachList().setMinHeight(attachHeight + "px");
        	}*/
        	
        	
        	if(detail.tracelist&&detail.tracelist.length>0){
        		$.each(detail.tracelist, function(idx1, trace){
            		var item = [];
            		var tmpTraceHtml = traceHtmlStr;
            		$.each(trace, function(idx2, traceItem){
            			
            			if(traceItem.text){
            				traceItem.text = traceItem.text.replace(new RegExp('<','gm'),'&lt;').replace(new RegExp('>','gm'),'&gt;');
            			}
            			tmpTraceHtml += traceRowHtmlStr.replace("{label}", traceItem.label).replace("{value}", traceItem.text?traceItem.text:'');
            			item.push(traceItem);
            		});
            		tmpTraceHtml += traceHtmlStrSuffix;
            		traceDom.append(tmpTraceHtml);
            		traceList.push({item:item});
            	})
//            	me.getDetailTrace().setData(traceList);
        	}
        	
        }
		showBg(cnname);
	};
	
	$.jsonPost(opts);
};

function showBg(_name){
	var bgs = $("span[role=bg]");
//	console.log(bgs);
	$.each(bgs,function(idx, item){
		$(item).html(_name);
	});
};

function getUsername(callback){
	var opts = {};
	
	opts.data = {};
	opts.url = Config.global_url + Config.current_user_action;
	opts.success = function(data,status, jqXHR){
		console.log(data);
		if("1"==data.header.code){
			username = data.body;
            callback&&callback();
		}else{
			alert('您尚未登录或登录信息已过期！');
		}
	};
	
	if(Config.author_check){
		$.jsonPost(opts);
	}else{
		username = getURLParam('username');
		callback&&callback();
	}
	
};

function doLogin(callback){
//	var formData = $('#loginForm').serializeObject();
//	console.log(formData);
	var opts = {};
	
	opts.data = {};
	opts.data.username = username;
//	opts.data.password = password;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + Config.login_action;
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
			var userList = data.result.userlist;
			var user = {};
            $.each(userList, function(idx,item){
            	if(idx==0){
            		$.each(item,function(_idx, userinfo){
            			user[userinfo.name] = userinfo.text;
                    	
            		});
                	console.log(user);
            	}
            	
            });
            userid = user['userid'];
            cnname = user['cnname'];
            isLeader = data.result.isLeader;
            selfGroupId= user['groupid'];
            saveUser();
            callback&&callback(userid);
		}
	};
	
	$.jsonPost(opts);
};

function saveUser(){
	ssHelper.save('userid', userid);
    ssHelper.save('username', username);
    ssHelper.save('isLeader',isLeader);
};

function hideAll(){
	$("#tracePanel").hide();
	$("#detailPanel").hide();
	$("#routePanel").hide();
	$("#subToreadBtn").hide();
	
};

function inactiveAll(){
	$("#detailBtn").removeClass('active');
	$("#traceBtn").removeClass('active');
	$("#toSubBtn").removeClass('active');
};

function fetchRoute(){
	if(hasFetchRoute){
		return;
	}
	$("#maskDiv").show();
	var opts = {};
	
	opts.data = {};
	opts.data.username = username;
	opts.data.userid = userid;
	opts.data.doctype = doctype;
	opts.data.moduleid = moduleid;
	
	opts.data.nodeid = nodeid;
	opts.data.docid = docid;
	opts.data.appid = appid;
	
//	opts.data.pageindex = pageindex++;
//	opts.data.pagesize = pagesize;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	
	$.each(routeparam,function(idx,item){
		opts.data[item.name]=item.text;
	});
	
	console.log(opts);
	
	opts.url = Config.global_url + Config.nextroute_action;
	opts.completeFun = function(){
		$("#maskDiv").hide();
	}
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
			hasFetchRoute=true;
			var result = data.result;
			if('false'==result.isNeedRount){
				return;
			}
			
			if(result.multiroute=='1'){
				multiRoute=true;
				routeSelectPic = checkOffPic;
				routeSelectedPic = checkOnPic;
			}
			
			var routeHtml='';
			if(!result.nodelist.node){
				if(result.nodelist.length>1){
					result.nodelist.node=result.nodelist;
				}else{
					var tmp = result.nodelist[0];
					result.nodelist.node=[];
					result.nodelist.node[0]=tmp;
				}
				
			}
			if(!result.nodelist.node.length){
				var tmp = result.nodelist.node;
				result.nodelist.node=[];
				result.nodelist.node[0]=tmp;
			}
			$.each(result.nodelist.node, function(idx, _node){
				var node = parseNode(_node);
				var routePic = routeSelectPic;
				var defaultUser = '';
//				allNodes.push(node);
				allNodes[node.nodeid]=node;
				if(node.isdefaultroute && node.isdefaultroute=='Y'){//默认路由
					routePic = routeSelectedPic;
					node.isSelected = true;
					if(node.defaultUser){//默认处理人
						defaultUser=node.defaultUser.username;
						node.selectedUsers=[];
						node.selectedUsers.push(defaultUser);
					}
					
					
				}
				
				routeHtml += routeHtmlStr.replace('{nodeid}',node.nodeid).replace('{nodename}', node.nodename).replace('{pic}', routePic).replace('{users}',defaultUser);
			});
			
			if(result.nodelist.umopinion&&result.nodelist.umopinion.length>0){
				setCommonOpinion(result.nodelist.umopinion);
			}
			
			$('#routeList').html(routeHtml);
			
			addRouteEvent();
		}
	};
	
	$.jsonPost(opts);
};

function addRouteEvent(){
	$("div[role=route]").on('click', function(){
		var nodeid = $(this).attr('nodeid');
		var node = allNodes[nodeid];
		if(node.isSelected){
			node.isSelected=false;
			$(this).children("img[role=select]").attr('src', routeSelectPic);
			$(this).next("div[role=selectUser]").html('');
			return;
		}
		
		if(node.ispointtoend&&('Y'==node.ispointtoend||'S'==node.ispointtoend)){
			selectNode(node, undefined);
		}else if(node.defaultUser){//默认处理人
			selectNode(node, [node.defaultUser]);
		}else{
			selectUser(node);
		}
	});
};

function setCommonOpinion(opinions){
	var opinionHtml="";
	$.each(opinions, function(idx, opinion){
		opinionHtml+='<li role="opinionItem">'+opinion.text+'</li>';
	});
	$('#opinionItem').html(opinionHtml);
	$('#opinionBtn').show();
	
	$('li[role=opinionItem]').on('click',function(){
		$('#opinion').val($(this).html());
	})
};

function selectNode(node, users){
	if(!multiRoute){//单选路由
		unSelectAllNode();
	}else if(node.exclude&&''!=node.exclude.replace(/\s/g,"")){//互斥路由
		unSelectExclude(node.exclude);
	}
	node.isSelected=true;
	node.selectedUsers=users;
	
	var nodeDom = $("div[nodeid="+node.nodeid+"]");
	nodeDom.children("img[role=select]").attr('src', routeSelectedPic);
	if(users&&users.length>0){
		var userStr = '';
		$.each(users,function(idx,user){
			userStr+=user.username+";";
		});
		nodeDom.next("div[role=selectUser]").html(userStr);
	}
	
};

function unSelectExclude(exclude){
	var excludes = exclude.split(",");
	for(var exIndex = 0; exIndex < excludes.length; exIndex++){
		var id=excludes[exIndex];
		allNodes[id].isSelected=false;
		allNodes[id].selectedUsers=undefined;
		var nodeDom = $("div[nodeid="+id+"]");
		nodeDom.children("img[role=select]").attr('src', routeSelectPic);
		nodeDom.next("div[role=selectUser]").html('');
	}
};

function unSelectAllNode(){
	for(idx in allNodes){
		allNodes[idx].selectedUsers=undefined;
		allNodes[idx].isSelected = false;
	}
	$("img[role=select]").attr('src', routeSelectPic);
	$("div[role=selectUser]").html('');
};

function parseNode(inObj){
	var node = {};
	$.each(inObj.item,function(_idx, item){
		node[item.name] = item.text;
	});
	
	if(inObj.defaultuser&&inObj.defaultuser.length>0){
		var defaultUser={};
		
		$.each(inObj.defaultuser[0],function(_idx, item){
			defaultUser[item.name] = item.text;
		});
		node.defaultUser = defaultUser;
	}
	var departmentParam = {};
	$.each(inObj.departmentparam,function(_idx, item){
		departmentParam[item.name] = item.text;
	});
	node.departmentParam=departmentParam;
	
	return node;
};

/**
 * 传阅
 * @param users
 */
function doToread(users, callback){
	if(users.length<1){
		alert("请选择传阅人员");
		return;
	}
	var touserid="";
	$.each(users, function(j, _user){
		if(j!=0){
			touserid+=",";
		}
		touserid += _user.userid;
	});
	
	var opts = {};
	var data = {};
	data.userid = userid;
	data.moduleid = moduleid;
	data.appid = appid;
	data.touserid=touserid;
	data.toreadmsg=$("#opinion").val();
	
	opts.data = data;
	
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	
	opts.url = Config.global_url + Config.toread_action;
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
			callback&&callback();
		}else{
			alert("传阅失败");
		}
	};
	
	$.jsonPost(opts);
}

function submitTodo(){

	var data = {};
//	var msg = null;
	var flag = prepareTodoData(data);
	
	if(flag){ // 可提交待办
		data.userid = userid;
		data.username = username;
//		data.logonid = Sme.app.tempCache.loginUser.logonid;
//			data.appType = this.appType;
		data.moduleid = moduleid;
		data.docid = docid;
//			console.log(JSON.stringify(data));
//			var url = global_url + "/wap.do?cmd=submit";
		console.log(data);return;
		var opts = {};
		
		opts.data = data;
		
		opts.data.qybm = Config.global_qybm;
		opts.data.xmbm = Config.global_xmbm;
		
		opts.url = Config.global_url + Config.submit_action;;
		opts.success = function(data,status, jqXHR){
			if("1"==data.header.code){
				alert(data.result.message);
				docStatus="0";
				$("#subBtn").hide();
				hideAll();
				if('1'==fromlist){
					window.history.go(-1);
				}else{
					WeixinJSBridge.call('closeWindow');
				}
				
			}else{
				alert(data.result.messge);
			}
		};
		
		if(toreadUsers.length>0){
			doToread(toreadUsers, function(){
				$.jsonPost(opts);
			})
		}else{
			$.jsonPost(opts);
		}
	}/*else if(toreadUsers.length<1){ //不可提交待办,而且未选择传阅
		alert(data.msg);
		return false;
	}*/else{ //仅传阅
		/*$("#confirmMsgDiv").html(data.msg+",是否仅传阅");
		$("#confirmModal").modal('show');*/
		
		alert(data.msg);
		return false;
		/*doToread(toreadUsers, function(){
			toreadUsers=[];
			$("#toreadBtnImg").attr('src','../res/images/check_off.png')
			$("#toreadSelectUser").html("");
			alert("传阅成功");
		})*/
	}
	
};

function prepareTodoData(data,msg){
	data.opinion = $('#opinion').val().replace(new RegExp('<','gm'),'&lt;').replace(new RegExp('>','gm'),'&gt;');
	if(null == data.opinion || '' == data.opinion.trim()){
		data.msg="未输入签批意见";
		return false;
	};
	
	selectedRoutes=[];
	var endNode = null;
	for(idx in allNodes){
		if(allNodes[idx].isSelected){
			selectedRoutes[idx]=allNodes[idx];
		}
		if(allNodes[idx].ispointtoend != 'N'){
			endNode=allNodes[idx];
		}
	}
	var keys = Object.keys(selectedRoutes);
	
	if(needRoute){
		if(0 == keys.length &&toreadUsers.length<1){
			data.msg="未选择路由及处理人";
			return false;
		};
		
		var nodes = {};
		nodes.tagname = "nodes";
		nodes.values = [];
		
		$.each(keys, function(idx,key){
			var node = {};
			node.tagname = "node";
			node.values = [];

			node.nodeid = key;
			node.nodename = selectedRoutes[key].nodename;
			var users = selectedRoutes[key].selectedUsers;
			if((undefined == users || users.length<1)&&selectedRoutes[key].ispointtoend == 'N'){
				data.msg="路由:" + node.nodename + ",未选择操作人";
				return false;
			} ;
			
			if(undefined != users){
				$.each(users, function(j, _user){
					var user = {};
					user.tagname = "user";
					user.userid = _user.userid;
					user.values = _user.username;
					node.values.push(user);
				});
			}
			
			
			/*if('' != selectedRoutes[key].nodeUserId){
				var userids = selectedRoutes[key].nodeUserId.split(",");
				var usernames = selectedRoutes[key].nodeUserName.split(",");
				
				for(var i=0; i<userids.length; i++){
					var user = {};
					user.tagname = "user";
					user.userid = userids[i];
					user.values = usernames[i];
					node.values.push(user);
				}
			};*/
			
			nodes.values.push(node);
			
		});
		
		if(0 == nodes.values.length){
			if(endNode!=null){
				var node = {};
				node.tagname = "node";
				node.values = [];

				node.nodeid = endNode.nodeid;
				node.nodename = endNode.nodename;
				nodes.values.push(node);
			}else{
				data.msg="未选择路由及处理人";
				return false;
			}
			
		};
		
//			console.log(JSON.stringify(nodes));
		data.nodes = "#!#" + JSON.stringify(nodes); // #!# 作为标记，用于转为特定的xml
		console.log(data.nodes);
		return true;
	}
};

function submitToread(){

	var data = {};
	
	/*data.opinion = $('#opinion').val().replace(new RegExp('<','gm'),'&lt;').replace(new RegExp('>','gm'),'&gt;');
	if(null == data.opinion || '' == data.opinion.trim()){
		alert("请输入签批意见");
		return false;
	};*/
	
	data.opinion='已阅';
	
	data.userid = userid;
	data.username = username;
	data.submittype = '2';
//	data.logonid = Sme.app.tempCache.loginUser.logonid;
//		data.appType = this.appType;
	data.moduleid = moduleid;
	data.docid = docid;
	data.appid = appid;
//		console.log(JSON.stringify(data));
//		var url = global_url + "/wap.do?cmd=submit";
	
	var opts = {};
	
	opts.data = data;
	
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	console.log(data);return;
	opts.url = Config.global_url + Config.submit_toread_action;
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
			alert(data.result.message);
			docStatus="0";
			$("#subToreadBtn").hide();
			hideAll();
			if('1'==fromlist){
				window.history.go(-1);
			}else{
				WeixinJSBridge.call('closeWindow');
			}
		}else{
			alert(data.result.messge);
		}
	};
	
	$.jsonPost(opts);
};

function showErrMsg(){
	$("#formPanel").hide();
	$("#msgPanel").show();
}

$(function(){	
	moduleid = getURLParam('moduleid');
	doctype = getURLParam('doctype');
	nodeid = getURLParam('nodeid');
	docid = getURLParam('docid');
	appid = getURLParam('appid');
	doctype = getURLParam('doctype');
	fromlist= getURLParam('fromlist');
	
	userid = ssHelper.getValue('userid');
	username = ssHelper.getValue('username');
	cnname = ssHelper.getValue('cnname');
	isLeader = ssHelper.getValue('isLeader');
	
	$("#detailBtn").on('click', function(){
		inactiveAll();
		$("#detailBtn").addClass('active');
		hideAll();
		if('1'==docStatus){
			$("#toSubBtn").show();
		}
		
		$("#subBtn").hide();
		$("#detailPanel").show();
		if('todone'==doctype){
			$("#toSubBtn").hide();
			$("#subBtn").hide();
		}else if('toread'==doctype){//待阅
    		$("#toSubBtn").html('转传阅');
    		$("#toSubBtn").show();
    		if('1'==docStatus){
    			$("#subToreadBtn").show();
    		}
    	}
	});
	
	$("#traceBtn").on('click', function(){
		inactiveAll();
		$("#traceBtn").addClass('active');
		hideAll();
		if('1'==docStatus){
			$("#toSubBtn").show();
		}
		
		$("#subBtn").hide();
		$("#tracePanel").show();
		if('todone'==doctype){
			$("#toSubBtn").hide();
			$("#subBtn").hide();
		}else if('toread'==doctype){//待阅
    		$("#toSubBtn").html('转传阅');
    		$("#toSubBtn").show();
    		if('1'==docStatus){
    			$("#subToreadBtn").show();
    		}
    	}
	});
	
	$("#toSubBtn").on('click', function(){
		inactiveAll();
		$("#toSubBtn").hide();
		$("#subBtn").show();
		hideAll();
		$("#routePanel").show();
		if(typeof(routeparam)!='string'||(doctype&&'todo'==doctype)){
			fetchRoute();
		}else if('toread'==doctype){//待阅
//			$("#opinionPanel").hide();
			$("#toreadPanel").show();
    	}
		
	});
	
	$("#subBtn").on('click', function(){
		if(typeof(routeparam)!='string'||(doctype&&'todo'==doctype)){
			submitTodo();
			
		}else{
			//submitToread();
			doToread(toreadUsers, function(){
				if('0'==docStatus){
					alert("传阅成功");
					if('1'==fromlist){
						window.history.go(-1);
					}else{
						WeixinJSBridge.call('closeWindow');
					}
				}else{
					$("#confirmMsgDiv").html("传阅成功,是否转为已阅");
					$("#confirmModal").modal('show');
				}
				
			});
		}
		
	});
	
	$("#subToreadBtn").on('click', function(){
		submitToread();
		
	});
	
	$("#toreadBtn").on('click', function(){
		selectToreadUser();
	});
	
	$("#confirmY").on('click', function(){
		submitToread();
	});
	
	$("#confirmN").on('click', function(){
		if('1'==fromlist){
			window.history.go(-1);
		}else{
			WeixinJSBridge.call('closeWindow');
		}
	});
	
	if('todone'==doctype){
		$("#toSubBtn").hide();
		$("#subBtn").hide();
	}
	
	//alert(document.body.clientHeight);
	$(".cdc-scroll-panel-body").height($(window).height()-110);
	
	if(userid && null!=userid && ''!=userid){
		if('1'==isLeader||'todone'==doctype){
			getDocDetail();
		}else{
			$("#maskDiv").hide();
			showErrMsg();
		}
		
	}else{
		getUsername(function(){
			doLogin(function(userid){
				if('1'==isLeader){
					getDocDetail();
				}else{
					$("#maskDiv").hide();
					showErrMsg();
				}
				
			});
		});
		
	}
	
//	alert(navigator.appVersion);
	
	
});