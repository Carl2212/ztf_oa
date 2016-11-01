/**
 * 用户信息脚本 guojing
 */
var common;
if (!common)
	common = {};

common.user = {};

common.user = {
	info : {
		userName : "",
		userId : ""
	},
	id : "",
	name : "",
	// 获取用户名,如果需要重新读取当前用户isUseCache参数设置为true,默认使用缓存
	getUserName : function(callback, nocache) {
		// alert("测试成功!~"+nocache);
		if (nocache) {
			var opts = {};
			opts.data = {};
			opts.url = Config.global_url + Config.current_user_action;// 获取当前用户
			opts.success = function(data, status, jqXHR) {
				// alert()
				if ("1" == data.header.code) {
					common.user.name = data.body;
					callback && callback(common.user.name);
				} else {
					alert('您尚未登录或登录信息已过期！');
				}
			};

			if (Config.author_check) {
				$.jsonPost(opts);
			} else {
				common.user.name = getURLParam('username');
				callback && callback(common.user.name);
			}
		} else {
			// 使用缓存,如果name存在
			if (common.user.name) {
				callback && callback(common.user.name);
			} else {
				// console.log("读取用户name->"+common.user.name);
				common.user.getUserName(callback, true);
			}
		}

	},
	getUserId : function(username, callback) {
		// var formData = $('#loginForm').serializeObject();
		// console.log(formData);
		var opts = {};
		opts.data = {};
		opts.data.username = username;
		// opts.data.password = password;
		opts.data.qybm = Config.global_qybm;
		opts.data.xmbm = Config.global_xmbm;
		opts.url = Config.global_url + Config.login_action;
		opts.success = function(data, status, jqXHR) {
			// console.log("获取到的用户ID"+data.header.code);
			if ("1" == data.header.code) {
				var userList = data.result.userlist;
				var user = {};
				$.each(userList, function(idx, item) {
					if (idx == 0) {
						$.each(item, function(_idx, userinfo) {
							user[userinfo.name] = userinfo.text;

						});
					}
				});
				userid = user['userid'];
				cnname = user['cnname'];
				common.user.id = userid;
				// console.log("获取到的用户ID"+userid);
				callback && callback(userid);
			}
		};

		$.jsonPost(opts);
	},
	getUserInfo : function(callback) {
		common.user.getUserName(function(username) {
			if (username) {
				common.user.getUserId(username,function(userid) {
					var opt={
							userName:common.user.name,
							userId:common.user.id
					};
					callback && callback(opt);
				})
			}else{
				alert("未找到当前用户[username]");
			}
		});
	}
}