/**
 * Edited by wxh on 2016/7/15.
 *
 */

var username, userid,cnname, moduleid, doctype, pageindex=1, pagesize=8;
var ssHelper = new SStorageHelper(); //sessionStorage

var listHtmlStr = '<a href="{href}" class="list-group-item">'
                     +'<h4 class="list-group-item-heading">{topic}</h4>'
                     +'<p class="list-group-item-text">{module}   {dt}</p>'
                 +'</a>';

$(function(){
    moduleid = getURLParam('moduleid');
    doctype = getURLParam('doctype');
    getcount = getURLParam('getcount');
    $(".cdc-scroll-panel-body").height($(window).height()-90);

    userid = ssHelper.getValue('userid');
    username = ssHelper.getValue('username');
    cnname = ssHelper.getValue('cnname');
    if(!username) {
        alert(Config.nouserinfotip);
    }
    showBg(cnname);
    getNoticeList();
    $("#loadmoreBtn").on('click', function(){
        $("#loadmoreBtn").hide();
        getNoticeList();
    });
});



function getNoticeList(){
	var opts = {};
	
	opts.data = {};
	opts.data.username = username;
	opts.data.userid = userid;
//	opts.data.doctype = doctype;
	opts.data.moduleid = 'PublishInfo';
	opts.data.pageindex = pageindex++;
	opts.data.pagesize = (getcount&&''!=getcount&&null!=getcount)?getcount:pagesize;
	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	opts.url = Config.global_url + Config.noticelist_action;
	opts.success = function(data,status, jqXHR){
		if("1"==data.header.code){
			var listDom = $("#list");
			var href = "";
			var _count=0;
			$.each(data.result.noticelist, function(idx, doc){
				var hasData = false;
				var docItem = {};
				$.each(doc, function(idx1, viewItem){
					hasData = true;
					docItem[viewItem.name] = viewItem.text==null?'': viewItem.text.replace(new RegExp('<','gm'),'&lt;').replace(new RegExp('>','gm'),'&gt;');
				});
				
				if(hasData){
					href = 'noticedetail.html?moduleid='+docItem['moduleid'] + '&noticeid='+docItem['noticeid'];
					var tmp = listHtmlStr.replace("{topic}", docItem['title']).replace("{module}", docItem['pTypeName']).replace("{dt}", docItem['pubtime']).replace("{href}", href);
					listDom.append(tmp);
					_count++;
				}
				
			});
			if(_count<pagesize||(getcount&&''!=getcount&&null!=getcount)){
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
