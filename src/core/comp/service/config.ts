/**
 * Created by Administrator on 2016/10/25.
 */

export const Config : any = {
    pagesize : 10,
    addressType : 'O',
    alsouser : 'Y',
    author_check : false,
    global_qybm: 'GJGS',
    global_xmbm: 'GJGSOA',
    global_url: 'http://oa.chinaccsi.com:8001/ms',//'http://192.168.200.67:61002/ms',//
    //current_user_action: '/wx/user',
    wx_login: '/wap/execute?cmd=login_user&command=login_user',
    login: '/wap/execute?cmd=login&command=login',

    //通讯录组别-用户查询
    grouplist_action:'/wap/execute?cmd=grouplist&command=grouplist',
    userlist_action:'/wap/execute?cmd=userlist&command=userlist',
    searchuser:'/wap/execute?cmd=searchuser&command=searchuser',

    //传阅提交
    submittoread:'/wap/execute?cmd=submittoread&command=submittoread',
    //待办提交
    submittodo:'/wap/execute?cmd=submit&command=submit',


    //待办待阅列表页获取，详情获取
    doclist: '/wap/execute?cmd=doclist&command=doclist',
    docdetail: '/wap/execute?cmd=docdetail&command=docdetail',

    //流程项 包括常用意见
    nextroute: '/wap/execute?cmd=nextroute&command=nextroute',
    nextroute_group_action:'/wap/execute?cmd=nextroute_group&command=nextroute_group',
    nextroute_user_action: '/wap/execute?cmd=nextroute_user&command=nextroute_user',

    //待办待阅已阅数量
    modulelist: '/wap/execute?cmd=modulelist&command=modulelist',

    //待阅
    toread :'/wap/execute?cmd=toread&command=toread',

    //通知-列表数据以及详情数据
    noticelist:'/wap/execute?cmd=noticelist&command=noticelist',
    noticedetail:'/wap/execute?cmd=noticedetail&command=noticedetail',

    pdfpagecount_action:'/wap/readonline/pdfpagecount',
    pdfpageimg_action:'/wap/readonline/pdfpageimg',
}