var Config = {
	global_qybm:'AYY',
	global_xmbm:'AYYOA',
	author_check:false,
    global_url:'http://14.146.228.41:61002/ms',
  //  global_url:'http://oa.imuapp.cn:61001/ms',
	//登录
    current_user_action:'/wx/user',

	login_action:'/wap/execute?cmd=wxlogin&command=wxlogin',
	modulelist_action:'/wap/execute?cmd=modulelist&command=modulelist',
	doclist_action:'/wap/execute?cmd=doclist&command=doclist',
	docdetail_action:'/wap/execute?cmd=docdetail&command=docdetail',
	nextroute_action:'/wap/execute?cmd=nextroute&command=nextroute',
	nextroute_group_action:'/wap/execute?cmd=nextroute_group&command=nextroute_group',
	nextroute_user_action:'/wap/execute?cmd=nextroute_user&command=nextroute_user',
	submit_action:'/wap/execute?cmd=submit&command=submit',
	submit_toread_action:'/wap/execute?cmd=submittoread&command=submittoread',
	
	grouplist_action:'/wap/execute?cmd=grouplist&command=grouplist',
	userlist_action:'/wap/execute?cmd=userlist&command=userlist',
	noticelist_action:'/wap/execute?cmd=noticelist&command=noticelist',
	noticedetail_action:'/wap/execute?cmd=noticedetail&command=noticedetail',
	
	leavenum_action:'/wap/execute?cmd=leavenum&command=leavenum',
	processinfo_action:'/wap/execute?cmd=processinfo&command=processinfo',
	newprocess_action:'/wap/execute?cmd=newprocess&command=newprocess',
	annualnum_action:'/wap/execute?cmd=annualnum&command=annualnum',
	/**
	 * 留言板
	 * **/
	leavenum_message_action : '/wap/execute?cmd=messagelist&command=messagelist',
	leavenum_save_action : '/wap/execute?cmd=messagesave&command=messagesave',
	leavenum_messagegoodbad_action : '/wap/execute?cmd=messagegoodbad&command=messagegoodbad',
	 /**
	  * 投票
	  * **/
	vote_add_action : '/wap/execute?cmd=votepublish&command=votepublish',
	vote_list_action : '/wap/execute?cmd=votelist&command=votelist',
	vote_detail_action : '/wap/execute?cmd=votedetail&command=votedetail',
	vote_delete_action : '/wap/execute?cmd=votedelete&command=votedelete',
	vote_vote_action : '/wap/execute?cmd=vote&command=vote',
		
	  
	pdfpagecount_action:'/wap/readonline/pdfpagecount',
	pdfpageimg_action:'/wap/readonline/pdfpageimg',
	
	get_wx_js_signature:'/wx/wxsignature',
	wx_media_down:'/wx/mediaget',
	toread_action:'/wap/execute?cmd=toread&command=toread',
	wx_getapi_proxy:'/wx/wxapiget',
	wx_postapi_proxy:'/wx/wxapipost',


    //公共提示信息
    nouserinfotip :'您尚未登录或者登录信息已失效，请重新登录'
};