var username, userid,cnname, moduleid, noticeid;
var ssHelper = new SStorageHelper(); //sessionStorage

var detailHtmlStr = '<tr>'
    				+'<td style="word-break:break-all" class="detail-table-label">{label}</td>'
    				+'<td style="word-break:break-all">{value}</td>'
    			  +'</tr>';


var attachHtmlStr = '<tr class="attach-row" url="{url}" filename="{filename}">'
				         +'<td class="detail-table-label" style="width:20px;min-width:30"><span class="glyphicon glyphicon-paperclip"></span></td>'
				         +'<td>{name}</td>'
				      +'</tr>';

function getDocDetail(){
	var opts = {};
	
	opts.data = {};
	opts.data.username = username;
	opts.data.userid = userid;
	opts.data.moduleid = moduleid;
	
	opts.data.noticeid = noticeid;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + Config.noticedetail_action;
	opts.success = function(response,status, jqXHR){
		if("1"==response.header.code){
			var detailDom = $("#detailDom");
			var traceDom = $("#tracePanel");
			var attachDom = $("#attachDom");
			
        	var detail = response.result.detail;
        	var formData = [];
        	var attachList = [];
        	var traceList = [];
        	
        	$.each(detail.item, function(idx, field){
        		switch(field.formtype){
        			case '1':
        				if(field.text){
        					field.text = field.text.replace(new RegExp('<','gm'),'&lt;').replace(new RegExp('>','gm'),'&gt;');
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
        			default: Ext.Msg.alert("提示","未处理表单数据类型");
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
        		readFile($(this).attr('url'), $(this).attr('filename'));
        	});
        	
        }
		showBg(cnname);
	};
	
	$.jsonPost(opts);
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
            selfGroupId= user['groupid'];
            cnname = user['cnname'];
            saveUser();
            callback&&callback(userid);
		}
	};
	
	$.jsonPost(opts);
};

function saveUser(){
	ssHelper.save('userid', userid);
    ssHelper.save('username', username);
    ssHelper.save('cnname', cnname);
};

function showBg(_name){
	var bgs = $("span[role=bg]");
//	console.log(bgs);
	$.each(bgs,function(idx, item){
		$(item).html(_name);
	});
};

$(function(){	
	moduleid = getURLParam('moduleid');
	noticeid = getURLParam('noticeid')?getURLParam('noticeid'):getURLParam('appid');

	$(".cdc-scroll-panel-body").height($(window).height()-90);
	
	userid = ssHelper.getValue('userid');
	username = ssHelper.getValue('username');
	cnname = ssHelper.getValue('cnname');
	
	$("#detailBtn").on('click', function(){
		$("#detailBtn").addClass('active');
		$("#traceBtn").removeClass('active');
		$("#tracePanel").hide();
		$("#detailPanel").show();
	});
	
	
	if(userid && null!=userid && ''!=userid){
		getDocDetail();
	}else{
		getUsername(function(){
			doLogin(function(userid){
				getDocDetail();
				
			});
		});
		
	}
	
//	alert(navigator.appVersion);
	
});