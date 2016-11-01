/**
 * Created by wxh on 2016/7/15.
 * 内容包括 1）验证是否登录 2）判断每个项的数量
 */

//全局变量

var username, userid, password, cnname, isLeader;


//初始化内容存储类
var sshhelp = new SStorageHelper();

//页面加载初始化
$(function(){
    getUsername(function(){
        doLogin(function(){
            //获取各列表项的值
            gotTodoCount();
            gotToreadCount();
        });
    });
});


//获取用户信息
function getUsername(callback){
    var opt = {};
    opt.data = {}
    opt.url = Config.global_url + Config.current_user_action;
    opt.success = function(data,status,jqXHR){
        if(data.header.code == 1) {
            //请求数据成功
            username = data.body;
            callback && callback();
        }else{
            alert(Config.nouserinfotip);
        }
    };
    if(Config.author_check) {
        $.jsonPost(opt);
    }else{
        //通过链接的参数获取用户信息
        username = getURLParam('username');
        console.log(username);
        if(!username) alert(Config.nouserinfotip);
        callback && callback();
    }
}

//判断登录函数

function doLogin(callback) {
    //参数
    var opt = {};
    opt.data = {};
    opt.data.username = username;
    opt.data.qybm = Config.global_qybm;
    opt.data.xmbm = Config.global_xmbm;
    opt.url = Config.global_url + Config.login_action;
    opt.success = function(data,status,jqXHR){
        if(data.header.code == 1) {
            var userlist = data.result.userlist[0];
            var user = {};
            if(userlist) {
                $.each(userlist,function(xid,items){
                    user[items.name] = items.text;
                });
            }
            isLeader = data.result.isLeader;
            cnname = user['cnname'];
            userid = user['userid'];
            console.log(user);
            saveUser();
            callback && callback();
        }
    };
    $.jsonPost(opt);
}
function saveUser() {
    sshhelp.save('username',username);
    sshhelp.save('cnname',cnname);
    sshhelp.save('userid',userid);
    sshhelp.save('isLeader',isLeader);
    sshhelp.save('password',password);
}
//获取待办列表数量



//获取待阅列表数量
function gotTodoCount() {
    gotCount('todo',function(count){
        if(count > 0) {
            $("#item_todo .menu-txt").append('<strong class="tip-add-parenthesis">' + count + '项</strong>');
        }
    });
}
//获取待阅列表数量
function gotToreadCount() {
    gotCount('toread',function(count){
        if(count > 0) {
            $("#menu_toread").append('<span class="tip-circle badge">'+count +'</span>');
        }
    });

}

//关于列项数量的获取
function gotCount(doctype,callback) {
    if(!doctype) return false;
    var opt = {};
    opt.data = {};
    opt.data.username = username;
    opt.data.userid= userid;
    opt.data.qybm = Config.global_qybm;
    opt.data.xmbm = Config.global_xmbm;
    opt.data.doctype = doctype;
    opt.url = Config.global_url + Config.modulelist_action;
    opt.success = function(data,x,jqXHR) {
        if(data.header.code == 1) {
            var modulelist = data.result.modulelist;
            if(!modulelist) callback(0);
            var total_count = 0;
            $.each(modulelist , function (xid,items){
                total_count += parseInt(items.count);
                console.log(total_count);
            });
            callback(total_count);
        }
    }
    $.jsonPost(opt);
}




