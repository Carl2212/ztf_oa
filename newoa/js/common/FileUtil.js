var iosFileTypeSupport={
	'.doc':true,
	'.xls':true,
	//'.ppt':true,
	'.docx':true,
	'.xlsx':true,
	//'.pptx':true,
	'.pdf':true,
	'.txt':true,
	'.jpeg':true,
	'.ico':true,
	'.jpg':true,
	'.gif':true,
	'.jpe':true,
	'.bmp':true,
	'.png':true
}

function readFile(p_url, p_filename){
	var versionStr = navigator.appVersion.toLowerCase();
	iosReadFile(p_url, p_filename);
	if(versionStr.indexOf('iphone')>-1||versionStr.indexOf('ipad')>-1){
		iosReadFile(p_url, p_filename);
	}else{
		var suffix=/\.[^\.]+$/.exec(p_filename)[0].toLowerCase();
		if('.pdf'==suffix){
			readPdf(p_url, p_filename);
			return;
		}
		readFileOnline(p_url, p_filename);
	}
	
};

function readFileOnline(p_url, p_filename){
	
	
	p_url=p_url.replace(/[+]/g, '%2B').replace(/[ ]/g, '%20');

	var url = BASE64.encode(p_url);
	var fileName = BASE64.encode(p_filename);
	url = (Config.global_url + '/wap/readonline/openhtml?path=' + url +'&filename=' + fileName).replace(/[+]/g, '%2B').replace(/[ ]/g, '%20');
	
	window.location.href = url;

};

function iosReadFile(p_url, p_filename){
	p_url=p_url.replace(/[+]/g, '%2B').replace(/[ ]/g, '%20');
	var suffix=/\.[^\.]+$/.exec(p_filename)[0].toLowerCase();	
	if(iosFileTypeSupport[suffix]){
		var sourceUrl = (Config.global_url + '/fileupdown/down?path=' + BASE64.encode(p_url) +'&filename=' + BASE64.encode('file'+suffix)).replace(/[+]/g, '%2B').replace(/[ ]/g, '%20');
		window.location.href=sourceUrl;
	}else{
		alert('暂不支持此文件类型！');
	}

}

function readPdf(p_url, p_filename){
	window.location.href='readpdf.html?url='+UrlUtil.encode(p_url)+'&filename='+UrlUtil.encode(p_filename);
}




