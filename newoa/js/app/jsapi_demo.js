var wxConfigReady=false, localId=null;


function doWxConfig(){
	var opts = {};
	
	opts.data = {};
	opts.data.url=window.location.href;//当前页面的url, 以便对当前页面授权
	//opts.url = Config.global_url + Config.get_wx_js_signature;
	
	opts.url = "http://owenli123.imwork.net/ms" + Config.get_wx_js_signature;//测试暂时使用此url, 以后需改为Config.global_url
	
	
	opts.success = function(data,status, jqXHR){
		console.log(data);
		if(data.code==1){
			var config = data.config;
			config.debug=true;//debug模式, 以便调试
			config.jsApiList=["chooseImage","previewImage","uploadImage"];//需要使用的JS接口列表
			
			//通过config接口注入权限验证配置
			wx.config(config);
		}
	};
	
	//从服务端获取用于jsapi授权的签名
	$.jsonPost(opts);
}

function doChooseImage(){
	wx.chooseImage({
	    count: 1, // 默认9
	    sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
	    sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
	    success: function (res) {
	        localId = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
	        $("#img").attr("src", localId); //localIds是数组, 只取第一个
	    }
	});
}

$(function(){	
	$("#addPicBtn").click(function(){
		if(wxConfigReady){
			doChooseImage();
		}else{
			//通过config接口注入权限验证配置
			doWxConfig();
			
			//wx config信息验证后会执行ready方法, 所有调用微信js的方法,都要在ready后执行
			wx.ready(function(){
				wxConfigReady=true;
				doChooseImage();
			});
		}
	});
	
	$("#uploadPicBtn").click(function(){
		if(localId!=null){
			wx.uploadImage({
			    localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
			    isShowProgressTips: 1,// 默认为1，显示进度提示
			    success: function (res) {
			        var serverId = res.serverId; // 返回图片的服务器端ID
			        $("#serverId").html("微信serverId:"+serverId);
			        //window.location.href= Config.global_url + Config.wx_media_down+"?mediaid="+serverId;
			    	
			        //下载图片的url,图片在微信临时保存3天,  在创建留言或投票时, 需将图片url传给oa, 然后oa从此url下载图片保存在oa服务器
			        window.location.href= "http://owenli123.imwork.net/ms" + Config.wx_media_down+"?mediaid="+serverId;
			    }
			});
		}
	});
	
	
});