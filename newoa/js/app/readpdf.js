var username, userid, oriUrl, oriFileName, filename;
var ssHelper = new SStorageHelper(); //sessionStorage



function getPdfPageCount(callback){
	var opts = {};
	
	opts.data = {};
	opts.data.path = BASE64.encode(oriUrl);
	filename = username+'_'+ (new Date()).valueOf()+'.pdf';
	opts.data.filename = BASE64.encode(filename);

	opts.data.qybm = Config.global_qybm;
	opts.data.xmbm = Config.global_xmbm;
	
	opts.url = Config.global_url + Config.pdfpagecount_action;
	opts.success = function(response,status, jqXHR){
		if("1"==response.header.code){
			callback&&callback(response.result.pageCount);
		}else{
			alert('读取文件失败')
		}
		
	};
	
	$.jsonPost(opts);
};

function showImg(count){
	var bodyDom = $('#bodyDom');
	for(var i=0; i<count; i++){
		var url = Config.global_url + Config.pdfpageimg_action + '?pageindex='+i+'&filename='+UrlUtil.encode(BASE64.encode(filename));
		var tmpHtml = '<img src="'+url+'" style="width:100%; margin-bottom:5px" />';
		bodyDom.append(tmpHtml);
	}
}

$(function(){	
	
	
	userid = ssHelper.getValue('userid');
	username = ssHelper.getValue('username');
	
	oriUrl = UrlUtil.decode(getURLParam('url'));
	oriFileName = UrlUtil.decode(getURLParam('filename'));
	
	if(userid && null!=userid && ''!=userid){
		getPdfPageCount(function(count){
			showImg(count);
		});
	}else{
		alert('您尚未登录或登录信息已过期！');
	}
	
	
});