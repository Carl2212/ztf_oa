var username, userid,cnname, moduleid='leave_apply', doctype='todo', nodeid, docid, appid, routeparam, doctype, isLeader,groupid,groupname;
var ssHelper = new SStorageHelper(); //sessionStorage

var annuals = {};
var cities=['广州','深圳','珠海','佛山','东莞','中山','惠州','汕头','江门','茂名','肇庆','湛江','梅州','汕尾','河源','清远','韶关','揭阳','潮州','阳江','云浮']; 
var province=['北京','天津','上海','重庆','浙江','安徽','福建','江西','湖南','山东','河南','内蒙古','湖北','宁夏','新疆','广东','西藏','海南','广西','四川','河北','贵州','山西','云南','辽宁','陕西','吉林','甘肃','黑龙江','青海','江苏','台湾','香港','澳门' ];
var formData='';
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

/*var detailHtmlStr = '<tr>'
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
				      +'</tr>';*/

var routeHtmlStr = '<div class="panel panel-default">'
						+'<div role="route" nodeid="{nodeid}" class="panel-heading">'
						+'<span>{nodename}</span>'
						+'<img role="select" class="pull-right ico_radio_check" alt="" src="{pic}">'
						+'</div>'
						+'<div role="selectUser" class="panel-body">'
						+'{users}'
						+'</div>'
				  +'</div>';


/**
 * 获取流程信息,判断用户是否有新建权限
 */
function checkAuthor(){
	var opts = {};
	
	opts.data = {};
	opts.data.userid = userid;
	opts.data.moduleid = moduleid;
	
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + Config.processinfo_action;
	opts.success = function(response,status, jqXHR){
		
		if("1"==response.header.code){
			var process = {};
			var processlist = response.result.processlist;
			if(processlist&&processlist.length>0){
				var tmp = processlist[0];
				
				$.each(tmp,function(idx,item){
					process[item.name]=item.text;
				});
				nodeid=process.nodeid;
				docid=process.processid
			}
//			console.log(process);
        	fetchAnnualNum();
        	
        }
		showBg(cnname);
	};
	
	$.jsonPost(opts);
};

/**
 * 获取剩余年假天数
 */
function fetchAnnualNum(){
	var opts = {};
	
	opts.data = {};
	opts.data.userid = userid;
	
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + Config.annualnum_action;
	opts.completeFun = function(){
		$("#maskDiv").hide();
	};
	opts.success = function(response,status, jqXHR){
//		console.log(response);
		if("1"==response.header.code){
			
			var annualslist = response.result.annuals;
			console.log(annualslist);
			if(annualslist&&annualslist instanceof Array&&annualslist.length>0){
				$.each(annualslist,function(i,tmp){
					var annual={};
					$.each(tmp,function(idx,item){
						annual[item.name]=item.text;
					});
					annuals[annual.year]=annual.annualNum;
					$("#remainYear").append('<option value="'+annual.year+'">'+annual.year+'</option>');
					if(0==i){
						detailForm.remainNum.value=annual.annualNum;
					}
				});
				
				
				
			}else{
				$("#remainYear").append('<option value="0">请选择</option>');
			}
			
        	
        }else{
			$("#remainYear").append('<option value="0">请选择</option>');
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
//		console.log(data);
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
//                	console.log(user);
            	}
            	
            });
            userid = user['userid'];
            cnname = user['cnname'];
            groupname = user['groupname'];
            groupid = user['groupid'];
            isLeader = data.result.isLeader;
            selfGroupId= user['groupid'];
            saveUser();
            callback&&callback(userid);
		}else{
			$("#maskDiv").hide();
			alert("登录oa失败:"+data.result.message);
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
	$("#detailPanel").hide();
	$("#routePanel").hide();
	
};

function inactiveAll(){
	$("#detailBtn").removeClass('active');
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
	
	
//	opts.data.pageindex = pageindex++;
//	opts.data.pagesize = pagesize;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	
	/*$.each(routeparam,function(idx,item){
		opts.data[item.name]=item.text;
	});*/
	
//	console.log(opts);
	
	opts.url = Config.global_url + Config.nextroute_action;
	opts.completeFun = function(){
		$("#maskDiv").hide();
	};
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
	/*$.each(allNodes,function(idx, node){
		node.selectedUsers=undefined;
		node.isSelected = false;
	});*/
	
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

function submitTodo(){
	$("#maskDiv").show();
	var data = {};
	
	data.opinion = $('#opinion').val().replace(new RegExp('<','gm'),'&lt;').replace(new RegExp('>','gm'),'&gt;');
	if(null == data.opinion || '' == data.opinion.trim()){
		$("#maskDiv").hide();
		alert("请输入签批意见");
		return false;
	};
	
	selectedRoutes=[];
	for(idx in allNodes){
		if(allNodes[idx].isSelected){
			selectedRoutes[idx]=allNodes[idx];
		}
	}
	var keys = Object.keys(selectedRoutes);
	
	if(needRoute){
		if(0 == keys.length){
			alert("请选择路由及处理人");
			$("#maskDiv").hide();
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
				alert("路由:" + node.nodename + ",未选择操作人");
				$("#maskDiv").hide();
				return;
			} ;
			
			users&&users.length>0&&$.each(users, function(j, _user){
				var user = {};
				user.tagname = "user";
				user.userid = _user.userid;
				user.values = _user.username;
				node.values.push(user);
			});
			
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
			alert("请选择路由及处理人");
			$("#maskDiv").hide();
			return false;
		};
		
//			console.log(JSON.stringify(nodes));
		data.nodes = "#!#" + JSON.stringify(nodes); // #!# 作为标记，用于转为特定的xml
//		console.log(data.nodes);
	}
	
	var form={};
	form.tagname="form";
	form.values=[];
	
	for(var key in formData){
		var field = {};
		field.tagname = "parameter";
		field.name = key;
		field.values = formData[key];
		form.values.push(field);
	}
	data.form="#!#" + JSON.stringify(form);
	
	data.userid = userid;
	data.username = username;
//	data.logonid = Sme.app.tempCache.loginUser.logonid;
//		data.appType = this.appType;
	data.moduleid = moduleid;
	data.processid = docid;
//		console.log(JSON.stringify(data));
//		var url = global_url + "/wap.do?cmd=submit";
	
	var opts = {};
	
	opts.data = data;
	
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	
	opts.url = Config.global_url + Config.newprocess_action;
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
			alert(data.result.message);
			window.location.reload();
		}else{
			alert(data.result.messge);
		}
	};
	opts.completeFun = function(){
		$("#maskDiv").hide();
	}
	
	$.jsonPost(opts);
};

function showAdd(isCity){
	var datas=null;
	var filedName=null;
	if(isCity){
		datas=cities;
	}else{
		datas=province;
	}
	
	$("#addDiv").html("");
	$.each(datas, function(idx, item){
		if(0==idx){
			$("#addDiv").append('<label class="checkbox-inline" style="margin-left: 10px;"><input name="outAddress1" type="checkbox" value="'+item+'"> '+item+'</label>');
		}else{
			$("#addDiv").append('<label class="checkbox-inline"><input name="outAddress1" type="checkbox" value="'+item+'"> '+item+'</label>');
		}
		
	})
	
	$("input[name=outAddress1]").change(function(){
		var value="";
		$.each(detailForm.outAddress1,function(idx,item){
			if(item.checked){
				value+=","+item.value;
			}
		});
		detailForm.outAddress.value=value.substr(1);
	});
};

function setLeaveDays(dom){
	console.log(dom);
	var startDate = detailForm.startDate.value;
	var endDate = detailForm.endDate.value;
	var startTime = detailForm.startTime.value;
	var endTime = detailForm.endTime.value;
	
	detailForm.remainYear.value=startDate.substr(0,4);
	detailForm.remainNum.value=annuals[startDate.substr(0,4)]?annuals[startDate.substr(0,4)]:0;
	if(startDate!=''&&endDate!=''&&detailForm.leaveType.value==1){
		if(startDate.substr(0,4)!=endDate.substr(0,4)){
			dom.currentTarget.value='';
			alert("开始时间和结束必须在同一年");
			return;
		}
	}
	
	if(startDate!=''&&endDate!=''&&startTime!=''&&endTime!=''){
		var startDT=new Date(Date.parse((startDate+" "+startTime).replace(/-/g, "/")));
		var endDT=new Date(Date.parse((endDate+" "+endTime).replace(/-/g, "/")));
		if(startDT>=endDT){
			dom.currentTarget.value='';
			alert("休假开始时间必须结束早于结束时间");
			return;
		}
		calculateLeaveDays(startDT, endDT, dom);
	}
};

function calculateLeaveDays(startDT, endDT, dom){
	var leave=(endDT.getTime()-startDT.getTime())/(24*60*60*1000);
	var len=leave-Math.floor(leave);
	var leaveType=detailForm.leaveType.value;
	//非产假和婚假
 	if(leaveType!='4' && leaveType!='5'){
 		var opts = {};
 		
 		opts.data = {};
 		opts.data.userid = userid;
 		opts.data.startDate = startDT.getFullYear()+"-"+(startDT.getMonth()+1)+"-"+startDT.getDate();
 		opts.data.endDate = endDT.getFullYear()+"-"+(endDT.getMonth()+1)+"-"+endDT.getDate();
 		
 		opts.data.qybm = Config.global_qybm;
 		opts.data.xmbm = Config.global_xmbm;
 		opts.url = Config.global_url + Config.leavenum_action;
 		opts.success = function(response,status, jqXHR){
// 			console.log(response);
 			if("1"==response.header.code){
 				
 				var leaveday=response.result.count;
 				if(len==0){
					detailForm.leaveNum.value=leave-leaveday;
				}else if(len>(4/24)){
					detailForm.leaveNum.value=Math.ceil(leave)-leaveday;
				}else{
					detailForm.leaveNum.value=Math.floor(leave)+0.5-leaveday;
				}
 				
				//console.log(detailForm.leaveNum.value);
				//console.log(annuals[detailForm.startDate.value.substr(0,4)]);
				
				
				
				if('1'==leaveType&&(!annuals[detailForm.startDate.value.substr(0,4)]||parseFloat(detailForm.leaveNum.value)>parseFloat(annuals[detailForm.startDate.value.substr(0,4)]))){
		 			detailForm.leaveNum.value="";
		 			dom.currentTarget.value='';
					alert(detailForm.startDate.value.substr(0,4)+"年剩余年假不足");
		 		}
 	        }
 		};
 		
 		$.jsonPost(opts);
 		
 	}else{
 		if(len==0){
			detailForm.leaveNum.value=leave;
		}else if(len>(4/24)){
			detailForm.leaveNum.value=Math.ceil(leave);
		}else{
			detailForm.leaveNum.value=Math.floor(leave)+0.5;
		}
 		if('4'==leaveType&&detailForm.leaveNum.value>13){
 			detailForm.leaveNum.value="";
 			dom.currentTarget.value='';
			alert("婚假不可多于13天");
 		}
	}
}

function checkFormData(){
	formData = $('#detailForm').serializeObject();
	
	if(formData.phoneNumber.replace(" ","")==""){
		alert("休假期间联系方式不能为空");
		return false;
	}
	if(!/^1[0,3-9]\d{9}$/.test(formData.phoneNumber)){
		alert("休假期间联系方式不是正确的手机号码");
		return false;
	}
	
	if(formData.startDate.replace(" ","")==""){
		alert("休假开始日期不能为空");
		return false;
	}
	if(formData.startTime.replace(" ","")==""){
		alert("休假开始时间不能为空");
		return false;
	}
	if(formData.endDate.replace(" ","")==""){
		alert("休假结束日期不能为空");
		return false;
	}
	if(formData.endTime.replace(" ","")==""){
		alert("休假结束时间不能为空");
		return false;
	}
	if(formData.outAddress.replace(" ","")==""){
		alert("去向地点不能为空");
		return false;
	}
	if(formData.leaveReason.replace(" ","")==""){
		alert("休假事由不能为空");
		return false;
	}
	
	formData.outAddress1="";
	console.log(formData);
	
	return true;
}

/*function showErrMsg(){
	$("#formPanel").hide();
	$("#msgPanel").show();
}*/

$(function(){	
	//moduleid = getURLParam('moduleid');
	//doctype = getURLParam('doctype');
	//nodeid = getURLParam('nodeid');
	//docid = getURLParam('docid');
	//appid = getURLParam('appid');
	//doctype = getURLParam('doctype');
	
	//userid = ssHelper.getValue('userid');
	//username = ssHelper.getValue('username');
	//cnname = ssHelper.getValue('cnname');
	//isLeader = ssHelper.getValue('isLeader');
	
	$("#detailBtn").on('click', function(){
		inactiveAll();
		$("#detailBtn").addClass('active');
		hideAll();
		$("#toSubBtn").show();
		$("#subBtn").hide();
		$("#detailPanel").show();
	});
	
		
	$("#toSubBtn").on('click', function(){
		
		if(checkFormData()){
			inactiveAll();
			$("#toSubBtn").hide();
			$("#subBtn").show();
			hideAll();
			$("#routePanel").show();
			fetchRoute();
			
		}
		
	});
	
	$("#leaveType").change(function(){
		if('1'==$(this).val()){
			$("#remainTr").show();
		}else{
			$("#remainTr").hide();
		}
		detailForm.startDate.value="";
		detailForm.endDate.value="";
		detailForm.startTime.value="";
		detailForm.endTime.value="";
		detailForm.leaveNum.value="";
	});
	
	$("#remainYear").change(function(){
		detailForm.remainNum.value=annuals[$(this).val()]?annuals[$(this).val()]:0;
	});
	
	$("#startDate").change(setLeaveDays);
	$("#endDate").change(setLeaveDays);
	$("#startTime").change(setLeaveDays);
	$("#endTime").change(setLeaveDays);
	$("#outSelection").change(function(){
		
		if(detailForm.outSelection.value=="省内"){
			$("#addTr2").hide();
			$("#addTr1").show();
			detailForm.outAddress.value="";
			showAdd(true);
		}else if(detailForm.outSelection.value=="省外"){
			$("#addTr2").hide();
			$("#addTr1").show();
			detailForm.outAddress.value="";
			showAdd(false);
		}else{
			detailForm.outAddress.value="";
			$("#addTr1").hide();
			$("#addTr2").show();
		}
		return true;
	});
	
	$("#subBtn").on('click', function(){
		submitTodo();
		
	});
	
	$(".cdc-scroll-panel-body").height($(window).height()-110);
	showAdd(true);
	
	if(userid && null!=userid && ''!=userid){
		checkAuthor();
		
	}else{
		getUsername(function(){
			doLogin(function(userid){
				checkAuthor();
				detailForm.applyer.value=cnname;
				detailForm.applyOrgName.value=groupname;
				detailForm.applyId.value=userid;
				detailForm.applyOrgId.value=groupid;
			});
		});
		
	}
	
//	alert(navigator.appVersion);
	
});