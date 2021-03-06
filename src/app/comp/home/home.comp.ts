/**
 * Created by wxh on 2016/10/20.
 */
import {Component ,Output ,EventEmitter} from '@angular/core';
import {Request} from "../../../core/comp/service/request";
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
import {Router , ActivatedRoute} from '@angular/router';
import {Config} from "../../../core/comp/service/config";
import {CommonService} from "../../../core/comp/service/common";
import {isObject} from "rxjs/util/isObject";
import {isArray} from "rxjs/util/isArray";
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
import {DropdownModule} from "ng2-bootstrap/components/dropdown";

@Component({
    templateUrl : './home.comp.html',
    styleUrls : ['./home.comp.less'],
})
export class HomeComponent {
    public username :string ;
    public todonum : number = 0;
    public toreadnum : number = 0;
    public toreadlist : any;
    public todolist: any;
    public userinfo : any={} ;
    private moduleid : string = 'ElectronNotice';
    public notice : any;
    private userlist : any;

    public doclist : any; //首页待办列表获取
    constructor(private request : Request,
                private global : GlobalEventManager,
                private localstorage : LocalStorageService,
                private route :ActivatedRoute ,
                private router : Router,
                private common : CommonService

    ) {
        this.username = this.route.snapshot.queryParams['username'];
    }
    //初始化页面之后调用
    ngOnInit() {
        let _me = this;
        this.getUserName(function(){
            _me.common.islogin(_me.username,function(userinfo , userlist){
                _me.userinfo = userinfo;
                _me.userlist = userlist;
                _me.gotTodoCount();
                _me.gotToreadCount();
                _me.gotdoclist();
                _me.noticesearch();
            });
        });
    }
    //切换用户身份
    changeuser(user) {
        this.router.navigateByUrl('/?username='+user);
        window.location.reload();
    }
    noticesearch() {
        let action = 'noticelist';
        let params = {
            userid : this.userinfo.userid,
            ptype : 1,
            moduleid : this.moduleid,
            pageindex : 1,
            pagesize :1
        };
        let _me = this;
        this.request.getJsonp(params, action, function (data) {
            _me.notice = null;
            if(isObject(data.noticelist)) {
                _me.notice = _me.common.OneToJson(data.noticelist[0]);
            }
        });
    }
    gotdoclist () {
        let action = 'doclist';
        let params = {
            username :  this.userinfo.username,
            userid :this.userinfo.userid ,
            doctype : 'todo',
            moduleid : '',
            pageindex : 1,
            pagesize :Config.pagesize
        };
        let _me = this;
        this.request.getJsonp(params, action, function (data) {
            _me.doclist = null;
            if(isObject(data.doclist)) {
                _me.doclist = _me.common.DocToJson(data.doclist);
            }else{
                _me.global.showtoptip.emit('暂无数据');
            }
        });
    }
    //
    openpage(doctype){
        //let params = (doctype == 'todo') ? this.todolist : this.toreadlist;
        this.router.navigate(['/modulelist/'+doctype]);
    }

    //判断登录函数

    //获取用户信息
    getUserName(callback){
        if(Config.author_check) {
            let params = {};
            let action = '';
            this.request.getJsonp(params , action  , function(data){
                //处理数据
                this.username = data.body;
                callback && callback();
            });
        }else{
            //通过链接的参数获取用户信息
            if(!this.username) {
                let userinfo : any;
                userinfo = this.localstorage.get('userinfo');
                if(userinfo && userinfo.username) {
                    this.username = userinfo.username;
                }else{
                    this.global.showtoptip.emit('您还没登录，无对应用户信息');
                    return;
                }
            }
            callback && callback();
        }
    }


    /**
     * 获取待阅数量
     */
    gotToreadCount() {
        var _me = this;
        _me.common.gotCount('toread',function(count,modulelist){
            _me.toreadnum = count ;
            _me.toreadlist = modulelist;
        },this.userinfo);
    }

    /**
     * 获取待办数量
     */
    gotTodoCount() {
        var _me = this;
        _me.common.gotCount('todo',function(count,modulelist){
            _me.todonum = count ;
            _me.todolist = modulelist;
        },this.userinfo);
    }
}
