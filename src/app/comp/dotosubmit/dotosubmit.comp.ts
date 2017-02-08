/**
 * Created by Administrator on 2016/10/21.
 */
import {Component, AfterViewInit, ViewChildren ,QueryList } from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
import {Config} from "../../../core/comp/service/config";
import {Request} from "../../../core/comp/service/request";
import {isArray} from "rxjs/util/isArray";
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
import {isObject} from "rxjs/util/isObject";
import {CommonService} from "../../../core/comp/service/common";
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
    options : string = '';//待办意见、
    private isNeedRount :string;

    //子组件数据
    selectusers : any;
    issbread : boolean;
    pageinfo:any;//页面参数数据
    nodelist : any;
    umopinion : any;
    router : any = [];
    multiroute : string;
    submitloading : boolean = false;//ladda状态 提交按钮状态
    //弹框
    alertparams : any;

    constructor(private route:ActivatedRoute, private rootrouter : Router, private global:GlobalEventManager, private request:Request ,private localstorage : LocalStorageService , private commonfn :CommonService) {
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
                _me.isNeedRount = data.isNeedRount;//提交是否一定需要路由
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
                        _me.nodelist[temp]['defaultuser'] = _me.commonfn.ParamsToJson(_me.nodelist[temp]['defaultuser']);
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
            for(let nodeid of exclude) {
                this.router[nodeid] = false;
            }
            this.router[r.nodeid] = true;
        }else if(!r.exclude) {//r.exclude 不存在说明是单选路由
            for(let n of this.nodelist) {
                this.router[n.item.nodeid] = false;
            }
            this.router[r.nodeid] = true;
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
                if(data.selectusers && data.selectusers.length > 0) {
                    let temp =[];
                    for(let group of data.selectusers) {
                        for(let users of group.userselect) {
                            temp.push({tagname : 'user',userid : users.userid , values :users.username });
                        }
                    }
                    this.node.values.push({tagname : 'node',values : temp , nodeid : data.node.nodeid , nodename : data.node.nodename});
                }
            }else if(data.type == 'toread') {
                let tmp ='';
                for(let group of data.selectusers) {
                    for(let users of group.userselect) {
                        if(users.userid) {
                            tmp += users.userid + ',';
                        }
                    }
                }
                this.selecttouserid = tmp.substring(0,tmp.length-1);
                console.log(this.selecttouserid);

            }
        });
    }
    /*********************************************
     * 提交待办数据格式转化
     * ajax
     *********************************************/
    nodetostring(node) {
        let str = encodeURIComponent('#!#'+JSON.stringify(node));
        return str;
    }
    /*********************************************
     * 提交
     * ajax
     *********************************************/
    dotosubmit() {
        this.submitloading = true;
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
        if(!this.options) {
            this.global.showtoptip.emit('请输入审批意见~');
            this.submitloading =false;//提交按钮动态效果消失
            return;
        }
        //执行向下（子组件）取数据操作(路由)
        this.onrouternode();

        if(isArray(this.node.values) && this.node.values.length <= 0 && this.isNeedRount =='true') {//不存在已取节点 并且接口提交要求需要路由
            this.global.showtoptip.emit('该操作需要选择操作项');
            this.submitloading =false;//提交按钮动态效果消失
            return;
        }
        let _me = this;
        let nd = this.nodetostring(this.node);
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
            _me.submitloading =false;//提交按钮动态效果消失
            if(!_me.selecttouserid) {//没有待阅弹出提示并且跳转回list页面
                _me.global.showtoptip.emit('提交成功');
                if(data.success == '1') {
                    _me.rootrouter.navigate(['/doclist/'+_me.doctype+'/'+_me.moduleid]);
                }else{
                    _me.global.showtoptip.emit('！提交失败，请重试~');
                }
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
        if(!this.options) {
            this.global.showtoptip.emit('请输入审批意见~');
            this.submitloading =false;//提交按钮动态效果消失
            return;
        }
        //执行向下（子组件）取数据操作(路由)
        if(isonrouternode !== false) {
            this.onrouternode();
        }
        if(!this.selecttouserid) {
            this.global.showtoptip.emit('请选择传阅人~');
            this.submitloading =false;//提交按钮动态效果消失
            return;
        }
        let _me = this;
        let action ='toread';
        let params = {
            userid  : this.userinfo.userid,
            moduleid : this.moduleid,
            appid : this.appid,
            touserid : this.selecttouserid,
            toreadmsg : this.options,
        };
        _me.request.getJsonp(params, action, function (data) {
            _me.submitloading =false;//提交按钮动态效果消失
            if(data.success == '1') {
                _me.alertparams = {
                    isshow : true,
                    content : '传阅成功，确定转成已阅？',
                    okbutton :true,
                    cancelbutton : true,
                };
            }else{
                _me.global.showtoptip.emit('！提交失败，请重试~');
            }
        });
    }
    /*********************************************
     * 已阅
     * ajax
     *********************************************/
    submittoread(event) {
        if(event) {
            let _me = this;
            let params = {
                userid  : this.userinfo.userid,
                appid : this.appid,
                docid : this.docid,
                opinion : '已阅',
                submittype: '2',
            };
            let action = 'submittoread';
            _me.request.getJsonp(params, action, function (data) {
                //弹出提示并且跳转回list页面
                _me.global.showtoptip.emit('内容已转成已阅~');
                _me.rootrouter.navigate(['/doclist/'+_me.doctype+'/'+_me.moduleid]);
            });
        }
    }
}
