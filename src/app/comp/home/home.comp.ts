/**
 * Created by wxh on 2016/10/20.
 */
import {Component ,Output ,EventEmitter} from '@angular/core';
import {Request} from "../../../core/comp/service/request";
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
import { LocalStorageService } from 'angular-2-local-storage';
import {Router , ActivatedRoute} from '@angular/router';
import {Config} from "../../../core/comp/service/config";
import {CommonService} from "../../../core/comp/service/common";

@Component({
    templateUrl : './home.comp.html',
    styleUrls : ['./home.comp.less'],
})
export class HomeComponent {
    private username :string ;
    public todonum : number = 0;
    public toreadnum : number = 0;
    public toreadlist : any;
    public todolist: any;
    private userinfo : any={} ;
    constructor(private request : Request,
                private global : GlobalEventManager,
                private localstorage : LocalStorageService ,
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
            _me.islogin(function(){
                _me.gotTodoCount();
                _me.gotToreadCount();
            });
        });
    }

    //
    openpage(doctype){
        let params = (doctype == 'todo') ? this.todolist : this.toreadlist;
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
            if(!this.username) this.global.showtoptip.emit('您还没登录，无对应用户信息');
            callback && callback();
        }
    }
    /**
     * 判断登录
     * @param callback
     */
    islogin(callback) {
        let _me = this;
        let params = {username : this.username};
        let action = 'wx_login';
        this.request.getJsonp(params , action  , function(data){
            //处理数据
            if(data.userinfo) {
                for(var items of data.userinfo) {
                    _me.userinfo[items.name] = items.text;
                }
            }
            _me.localstorage.add('userinfo',_me.userinfo);
            callback && callback();
        });
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
