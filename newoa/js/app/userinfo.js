var cnname, groupname, officephone, mobile,email;

$(function(){	
	
	cnname = UrlUtil.decode(getURLParam('cnname'));
	groupname = UrlUtil.decode(getURLParam('groupname'));
	officephone = UrlUtil.decode(getURLParam('officephone'));
	mobile = UrlUtil.decode(getURLParam('mobile'));
	email = UrlUtil.decode(getURLParam('email'));
	setUserInfo();
});


function setUserInfo(){
	$("#cnname").html(cnname);
	$("#groupname").html(groupname);
	
	if(officephone && ''!=officephone){
		$("#officephone").html(officephone + '&nbsp;&nbsp;<a href="tel:'+officephone+'" style="font-size:18px">'
										          + '<span class="glyphicon glyphicon-phone"></span>'
										   + '</a>');
	}else{
		$("#officephone").html('');
	}
	
	if(mobile && ''!=mobile){
		$("#mobile").html(mobile + '&nbsp;&nbsp;<a href="tel:'+mobile+'" style="font-size:18px">'
								          + '<span class="glyphicon glyphicon-phone"></span>'
								        + '</a>'
							         	+ '&nbsp;&nbsp;&nbsp;&nbsp;<a href="sms:'+mobile+'" style="font-size:18px">'
								          + '<span class="glyphicon glyphicon-envelope"></span>'
								        + '</a>');
	}else{
		$("#mobile").html('');
	}
	
	if(email && ''!=email){
		$("#email").html(email);
	}else{
		$("#email").html('');
	}
};