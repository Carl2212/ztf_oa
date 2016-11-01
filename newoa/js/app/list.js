var username, userid, moduleid, doctype, pageindex=1, pagesize=8;
var ssHelper = new SStorageHelper(); //sessionStorage

var listHtmlStr = '<a href="{href}" class="list-group-item">'
                     +'<h4 class="list-group-item-heading">{topic}</h4>'
                     +'<p class="list-group-item-text">{module}   {dt}</p>'
                 +'</a>';

function getDocList(){
	var opts = {};
	
	opts.data = {};
	opts.data.username = username;
	opts.data.userid = userid;
	opts.data.doctype = doctype;
	opts.data.moduleid = moduleid;
	opts.data.pageindex = pageindex++;
	opts.data.pagesize = pagesize;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + Config.doclist_action;
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
			var listDom = $("#list");
			var href = "";
			if(typeof(data.result.doclist)=='string'){
				if('1'==pageindex){
					alert('暂无数据');
				}else{
					alert('无更多数据');
				}
				
				//window.history.go(-1);
			}
			$.each(data.result.doclist, function(idx, doc){
				var hasData = false;
				var docItem = {};
				$.each(doc.view, function(idx1, viewItem){
					hasData = true;
					if("topic" == viewItem.name && viewItem.text && ''!=viewItem.text){
						docItem[viewItem.name] = BASE64.decode(viewItem.text).replace(new RegExp('<','gm'),'&lt;').replace(new RegExp('>','gm'),'&gt;');
					}else{
						docItem[viewItem.name] = viewItem.text.replace(new RegExp('<','gm'),'&lt;').replace(new RegExp('>','gm'),'&gt;');
					}
				});
				
				$.each(doc.detailparam, function(idx2, detailItem){
					docItem[detailItem.name] = detailItem.text;
				});
				if(hasData){
					href = 'detail.html?fromlist=1&r='+Math.random()+'&moduleid='+docItem['moduleid'] + '&nodeid='+docItem['nodeid'] +'&docid='+docItem['docid'] +'&appid='+docItem['appid'] +'&doctype='+doctype;
					tmp = listHtmlStr.replace("{topic}", docItem['topic']).replace("{module}", docItem['modulename']).replace("{dt}", docItem['datetime']).replace("{href}", href);
					listDom.append(tmp);
				}
				
			});
			
			if(data.result.count<pagesize){
				$("#loadmoreBtn").hide();
			}else{
				$("#loadmoreBtn").show();
			}
		}
		
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

$(function(){	
	moduleid = getURLParam('moduleid');
	doctype = getURLParam('doctype');
	
	userid = ssHelper.getValue('userid');
	username = ssHelper.getValue('username');
	showBg(ssHelper.getValue('cnname'));
	
	$(".cdc-scroll-panel-body").height($(window).height()-90);
	
	$("#loadmoreBtn").on('click', function(){
		$("#loadmoreBtn").hide();
		getDocList();
	});
	
	if(userid && null!=userid && ''!=userid){
		getDocList();
		
	}else{
		getUsername(function(){
			doLogin(function(userid){
				getDocList();
				
			});
		});
		
	}
	
	
	
});