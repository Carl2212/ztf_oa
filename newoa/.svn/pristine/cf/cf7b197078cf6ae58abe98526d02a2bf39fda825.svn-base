/**
 * 组织架构选择插件 郭靖
 */
var common;
if (!common)
	common = {};
common.selected = {};
common.selected.group = {
	open : function(doc,userid,url) {
		if (doc) {
			sessionStorage.common_selected_group_currentPageData =  JSON.stringify(doc);
		}
		if(url){
			sessionStorage.common_submit_page_url=url;
		}else{
			alert("[程序错误]未指定提交页面");
			return;
		}
		// 打开组织架构选择页面
		window.location.href = "common/plug/com_selected_group.html?userid="
				+ userid;
	},
	init : function(parent_id,parent_name) {
		var userid = getURLParam("userid");
		if(!parent_id){
			 parent_id = 0;
		}
		if(parent_id && parent_id!=0){
			var html='';
			html+='<button type="button" role="nav" class="btn btn-primary" tree_groupid="'+parent_id+'"><span tree_groupid_name="'+parent_id+'"  onclick="common.selected.group.init(&#039'+parent_id+'&#039,&#039'+parent_name+'&#039)">'+parent_name+'</span>&gt;&gt</button>';
			$("#com_selected_group_table_tree_id").html(html);
		}
	
			
		var opts = {};
		var doc = {
			userid : userid,
			parentid : 0,
			type : "O",
			alsouser : "Y"
		};
		if (parent_id) {
			doc.parentid = parent_id;
		}
		doc.qybm = Config.global_qybm;
		doc.xmbm = Config.global_xmbm;
		opts.data = doc;
		opts.url = Config.global_url + Config.grouplist_action;
		opts.success = function(response, status, jqXHR) {
			var doc = response;
			var heard = doc.header;
			var result = doc.result;
			var code = heard.code;
			var message = result.message;

			if (status && status == "success") {
				if (code != 1) {
					alert(message);
					return;
				} else {
					var grouplist = result.grouplist;
					if((!grouplist && grouplist.length<0) || typeof(grouplist)=="string"){
						return;
					}
					var tdHtml='';
					for ( var i = 0; i < grouplist.length; i++) {
						var group = grouplist[i];
						var parentid = group.parentid;
						var layer = group.layer;
						var groupid = group.groupid;
						var groupname = group.groupname;
						var hashchild = group.hashchild;
						tdHtml += '<tr class="active" name="vote_list_tr">';
						tdHtml += '<td><input type="checkbox" id="'+ groupid+ '"name="com_selected_group_checkbox_name"></td>';
						if (hashchild != 0) {
							tdHtml += '<td><a herf="javascript:void(0)" groupid="'
									+ groupid
									+ '" groupname='+groupname+' onclick="common.selected.group.init(&#039'+groupid+'&#039,&#039'+groupname+'&#039)">'
									+ groupname + '</a></td>';
						} else {
							if(layer=="YG"){
								tdHtml += '<td><a herf="javascript:void(0)" groupid="'
								+ groupid
								+ '" groupname='+groupname+' >'
								+ groupname + '</a></td>';
							}else{
								tdHtml += '<td><a herf="javascript:void(0)" groupid="'
								+ groupid
								+ '" groupname='+groupname+' onclick="common.selected.group.init(&#039'+groupid+'&#039,&#039'+groupname+'&#039)">'
								+ groupname + '</a></td>';
							}
							
						}
						tdHtml += '</tr>';
					}
						$("#com_selected_group_table_id").html(tdHtml);
				}
			} else {
				alert("请求响应失败");
			}

		};
		$.jsonPost(opts);

	},
	submit : function() {
	var docArray=[];
		$("input[name='com_selected_group_checkbox_name']").each(function(i,y){
			if($(y).prop("checked")){
				var doc=new Object();
				var name="";
				var id="";
				id=$(y).parent().parent().find("a").attr("groupid");
				name=$(y).parent().parent().find("a").attr("groupname");
				if(id){
					doc.id=id;
					doc.name=name;
				}
				docArray.push(doc);
			}
			
		})
		var data={
		          data:docArray
		}
		sessionStorage.setItem("common_selected_group_list",JSON.stringify(data));

		var href=location.href;
		var baseUrl=href.split("web")[0];
		if(baseUrl){
			baseUrl+="web/";
		}
		var url=baseUrl+sessionStorage.common_submit_page_url+"&group_back=Y";
		  window.location.href =url;
	},
	getCurrentPageBackfillData : function() {
		// 获取页面回填数据
		var data = {};
		if (sessionStorage.common_selected_group_currentPageData) {
			data = sessionStorage.common_selected_group_currentPageData;
			data=JSON.parse(data);
			sessionStorage.common_selected_group_currentPageData = {};
		}
	
		return data;
	},
	getCurrentSelectedGroup : function() {
		// 获取当前选中组织
		var groupList = sessionStorage.common_selected_group_list;
		var aa = JSON.parse(groupList).data;
		sessionStorage.common_selected_group_list={};
		return aa;
	},
	initData : function() {
		// 清除缓存数据
		sessionStorage.common_selected_group_currentPageData = {};
		sessionStorage.common_selected_group_list = [];// 已选的组织数据列表
		sessionStorage.common_submit_page_url = "";//数据提交的页面
	},
	allSelected : function(dom) {
		if ($(dom).prop("checked")) {
			 $(dom).prop("checked",true)
		} else {
			$(dom).prop("checked",false)
		}
		$("input[name='com_selected_group_checkbox_name']").each(function(i,y){
			if($(y).prop("checked")){
				$(y).prop("checked",false);
			}else{
				$(y).prop("checked",true);
			}
			
		})
	}

};
