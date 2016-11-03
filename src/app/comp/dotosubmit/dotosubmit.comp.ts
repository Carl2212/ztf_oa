/**
 * Created by Administrator on 2016/10/21.
 */
import {Component, AfterViewInit, ViewChildren } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
import {Config} from "../../../core/comp/service/config";
import {Request} from "../../../core/comp/service/request";
import {isArray} from "util";
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
import {isObject} from "rxjs/util/isObject";
import {CommonService} from "../../../core/comp/service/common";
import {UrlUtilService} from "../../../core/comp/service/urlutil";
import {RouterBoxComponent} from "../../../shared/comp/routerbox/routerbox";
@Component({
    templateUrl : './dotosubmit.comp.html',
    styleUrls : ['./dotosubmit.comp.less']
})
export class DotosubmitComponent {
    @ViewChildren(RouterBoxComponent) routerbox : QueryList<RouterBoxComponent>;
    //传入参数 基本参数
    private doctype :string;
    private moduleid : string;
    private nodeid : string;
    private docid : string;
    private appid :string;
    private userinfo : any;

    //接口要求的参数
    private selecttouserid : string;//传阅人员userid集合
    private node : any = {tagname : 'nodes' , values:[]} ; //node 待办路由节点信息
    options : string = '请输入意见~';//待办意见、


    //子组件数据
    selectusers : any;
    issbread : boolean;
    pageinfo:any;//页面参数数据
    nodelist : any;
    umopinion : any;
    router : any;
    multiroute : string;

    constructor(private route:ActivatedRoute, private rootrouter : Router, private global:GlobalEventManager, private request:Request ,private localstorage : LocalStorageService , private commonfn :CommonService , private urlutil : UrlUtilService) {
        //获取链接携带的参数
        let _me = this;
        let pagearray = {
            todo: {pagename: '待办' },
            toread: {pagename: '待阅' }
        };
        this.route.params.forEach(param=>{
            _me.doctype = param['pagename'];
            _me.moduleid = param['moduleid'];
            _me.nodeid = param['nodeid'];
            _me.docid = param['docid'];
            _me.appid = param['appid'];
            _me.pageinfo = pagearray[_me.doctype];
        });
    }

    ngOnInit() {
        //读取存储数据
        this.userinfo= this.localstorage.get('userinfo');
        //post参数
        if(this.userinfo) {
            //请求接口获取当前模块操作项
            if(this.doctype == 'todo') {
                this.nextroute();
            }
            if(this.doctype == 'toread') {
                this.issbread = true;
            }
        }else{
            //弹出提示信息并且显示no-content页面
        }
    }

    /**
     * 取路由模块
     */
    nextroute() {
        var _me = this;
        let action = 'nextroute';
        let params = {
            userid : this.userinfo.userid,
            doctype : this.doctype,
            moduleid : this.moduleid,
            nodeid: this.nodeid,
            docid: this.docid,
            appid : this.appid
        };
        //请求
        this.request.getJsonp(params,action,function(data){
            if(data.success ==1 && data.nodelist) {
                //不需要路由
                if(data.isNeedRount == 'false') {
                    return;
                }
                //nodelist 数据整合
                _me.nodelist = data.nodelist.node;
                if(!_me.nodelist && data.nodelist.length > 0){
                    _me.nodelist = data.nodelist;
                }
                if(!_me.nodelist.length && (_me.nodelist || data.nodelist)){
                    let tmp = _me.nodelist || data.nodelist;
                    _me.nodelist = [tmp];
                }
                _me.umopinion = data.nodelist.umopinion;
                _me.multiroute = data.multiroute;
                //数据整理
                for(var temp in _me.nodelist) {
                    if(_me.nodelist[temp]['defaultuser']) {//两层数据转化
                        console.log('defaultuser..........................',_me.nodelist[temp]['defaultuser']);
                        _me.nodelist[temp]['defaultuser'] = _me.commonfn.ParamsToJson(_me.nodelist[temp]['defaultuser']);
                        console.log('defaultuser..........................',_me.nodelist[temp]['defaultuser']);
                    }
                    if(_me.nodelist[temp]['departmentparam']) {//一层数据转化
                        _me.nodelist[temp]['departmentparam'] = _me.commonfn.OneToJson(_me.nodelist[temp]['departmentparam']);
                    }
                    if(_me.nodelist[temp]['item']) {//一层数据转化
                        _me.nodelist[temp]['item'] = _me.commonfn.OneToJson(_me.nodelist[temp]['item']);
                    }
                }

            }
        });
    }

    isrouter(nodeid) {
        var isboolean = (this.router && (this.router[nodeid] == true)) ? true :false;
        return isboolean
    }
    /*********************************************
     * 接收子组件的数据方法
     * ajax
     *********************************************/
    unSelectExclude(r) {//互斥路由控制
        if(r.exclude && ''!=r.exclude.replace(/\s/g,"")) {
            let exclude = r.exclude.split(',');
            this.router[r.nodeid] = true;
            for(let nodeid of exclude) {
                this.router[nodeid] = false;
            }
        }
    }
    onoptions(options) {
        this.options = options;
    }
    onrouternode() {
        var tag = {};
        this.routerbox.toArray().forEach((child)=>{
            var data = child.outputdata();
            if(data.type == 'todo') {
                if(data.selectusers.length > -1) {
                    var temp =[];
                    for(let group of data.selectusers) {
                        for(let users of group.userselect) {
                            temp.push({tagname : 'user',userid : users.userid , values :users.username });
                        }
                    }
                    this.node.values.push({tagname : 'node',values : temp , nodeid : data.node.nodeid , nodename : data.node.nodename});
                }
            }else if(data.type == 'toread') {
                var temp ='';
                for(let group of data.selectusers) {
                    for(let users of group.userselect) {
                        if(users.userid) {
                            temp += users.userid + ',';
                        }
                    }
                }
                this.selecttouserid = temp.substring(0,temp.length-1);
            }
        });
    }
    /*********************************************
     * 提交待办数据格式转化
     * ajax
     *********************************************/
    nodetostring(node) {
        let str = this.urlutil.encode('#!#'+JSON.stringify(node));
        return str;
    }
    /*********************************************
     * 提交
     * ajax
     *********************************************/
    dotosubmit() {
        if(this.doctype == 'toread') {
            this.toreadfn();
        }else if(this.doctype == 'todo') {
            this.Submittodo();
        }
    }


    /*********************************************
     * 提交待办
     * ajax
     *********************************************/
    Submittodo() {
        //执行向下（子组件）取数据操作(路由)
        this.onrouternode();
        let _me = this;
        let touserid = [];
        let nd = this.nodetostring(this.node);
        console.log('nd',nd);
        if (_me.selectusers) {
            for (var user in _me.selectusers) {
                if(_me.selectusers[user]) {
                    var items = user.split("@");
                    touserid.push(items[0]);
                }
            }
        }
        let action ='submittodo';
        let params = {
            userid  : this.userinfo.userid,
            moduleid : this.moduleid,
            docid : this.docid,
            nodes : nd,
            opinion : this.options,
            username : this.userinfo.username
        };
        _me.request.getJsonp(params, action, function (data) {
            if(!_me.selecttouserid) {//没有待阅弹出提示并且跳转回list页面
                _me.global.showtoptip.emit('提交成功');
                _me.rootrouter.navigate(['/doclist/'+_me.doctype+'/'+_me.moduleid]);
            }else{
                this.toreadfn(false);
            }
        });
    }
    /*********************************************
     * 提交传阅信息
     * ajax
     *********************************************/
    toreadfn(isonrouternode?) {
        //执行向下（子组件）取数据操作(路由)
        if(isonrouternode !== false) {
            this.onrouternode();
        }
        let _me = this;
        let touserid = [];
        if (_me.selectusers) {
            for (var user in _me.selectusers) {
                if(_me.selectusers[user]) {
                    var items = user.split("@");
                    touserid.push(items[0]);
                }
            }
        }
        let action ='toread';
        let params = {
            userid  : this.userinfo.userid,
            moduleid : this.moduleid,
            appid : this.appid,
            touserid : this.selecttouserid,
            toreadmsg : this.options,
        };
        _me.request.getJsonp(params, action, function (data) {
            //弹出提示并且跳转回list页面
            _me.global.showtoptip.emit('提交成功');
            _me.rootrouter.navigate(['/doclist/'+_me.doctype+'/'+_me.moduleid]);
        });
    }
}
