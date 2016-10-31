/**
 * Created by Administrator on 2016/10/21.
 */
import {Component} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
import {Config} from "../../../core/comp/service/config";
import {Request} from "../../../core/comp/service/request";
import {isArray} from "util";
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
import {isObject} from "rxjs/util/isObject";
import {CommonService} from "../../../core/comp/service/common";
@Component({
    templateUrl : './dotosubmit.comp.html',
    styleUrls : ['./dotosubmit.comp.less']
})
export class DotosubmitComponent {
    //传入参数 基本参数
    private doctype :string;
    private moduleid : string;
    private nodeid : string;
    private docid : string;
    private appid :string;
    private userinfo : any;

    //子组件数据
    options : string = '请输入意见~';
    selectusers : any;
    issbread : boolean;
    pageinfo:any;//页面参数数据
    nodelist : any;
    umopinion : any;
    multiroute : string;

    constructor(private route:ActivatedRoute, private global:GlobalEventManager, private request:Request ,private localstorage : LocalStorageService , private commonfn :CommonService) {
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
            if(this.doctype == 'toread' || this.moduleid == 'accept_doc_manager') {
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
                _me.nodelist = data.nodelist;
                _me.umopinion = data.nodelist.umopinion;
                _me.multiroute = data.multiroute;
                //_me.cdr.detectChanges();
                if(!isArray(_me.nodelist)) _me.nodelist = [_me.nodelist];
                for(var temp in _me.nodelist) {
                    if(_me.nodelist[temp]['defaultuser']) {
                        _me.nodelist[temp]['defaultuser'] = _me.commonfn.ParamsToJson(_me.nodelist[temp]['defaultuser']);
                    }
                    if(_me.nodelist[temp]['departmentparam']) {
                        _me.nodelist[temp]['departmentparam'] = _me.commonfn.OneToJson(_me.nodelist[temp]['departmentparam']);
                    }
                    if(_me.nodelist[temp]['item']) {
                        _me.nodelist[temp]['item'] = _me.commonfn.OneToJson(_me.nodelist[temp]['item']);
                    }
                }

            }
        });
    }
    /*********************************************
     * 接收子组件的数据方法
     * ajax
     *********************************************/
    onoptions(options) {
        this.options = options;
    }
    onrouter(sb) {
        this.selectusers = sb;
    }
    /*********************************************
     * 提交传阅信息
     * ajax
     *********************************************/
    Submitfn() {
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
        let action ='';
        let params = {
            userid  : this.userinfo.userid,
            moduleid : this.moduleid,
            appid : this.appid,
            touserid : touserid,
            toreadmsg : this.options,
        };
        _me.request.getJsonp(params, action, function (data) {
            if (data.header.code == 1 && data.result.success == 1) {
                //弹出提示并且跳转回list页面

            } else {
                //弹出错误
            }
        });
    }


}
