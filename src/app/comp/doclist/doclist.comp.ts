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
    templateUrl : './doclist.comp.html',
    styleUrls : ['./doclist.comp.less']
})
export class DocListComponent {
    private moduleid : string;
    private doclist : any =[];//二级文件列表数据
    private doctype :string;
    private userinfo : any;
    pageinfo:any;//页面参数数据

    loadmoreactive : boolean = false;
    isshowloadmore : boolean = false;
    pageindex : number = 1;

    constructor(private route:ActivatedRoute, private global:GlobalEventManager, private request:Request ,private localstorage : LocalStorageService , private commonfn :CommonService) {
        //获取链接携带的参数
        this.moduleid = this.route.snapshot.params['moduleid'];
        this.doctype = this.route.snapshot.params['pagename'];
        let pagearray = {
            todo: {pagename: '待办' },
            toread: {pagename: '待阅' }
        };
        this.pageinfo = pagearray[this.doctype];
    }

    ngOnInit() {
        //读取存储数据
        this.userinfo= this.localstorage.get('userinfo');
        //post参数
        if(this.userinfo) {
            this.gotdoclist();
        }else{
            //弹出提示信息并且显示no-content页面
        }
    }

    /**
     * 获取列表
     * @param callback
     */
    gotdoclist (needloadingmodule=true,callback?) {
        let action = 'doclist';
        let params = {
            username : this.userinfo.username,
            userid : this.userinfo.userid,
            doctype : this.doctype,
            moduleid : this.moduleid,
            pageindex : this.pageindex,
            pagesize :Config.pagesize
        };
        let _me = this;
        this.request.getJsonp(params, action, function (data) {
            if(isObject(data.doclist)) {
                if(data.doclist.length >= Config.pagesize) {
                    _me.isshowloadmore = true;
                }
                _me.doclist = _me.commonfn.concatarray( _me.doclist ,_me.ParamsToJson(data.doclist));
                _me.pageindex += 1;
            }else{
                _me.global.showtoptip.emit('暂无数据');
            }
            callback && callback();
        },true,needloadingmodule);
    }
    loadmore(event) {
        if(event) {
            let _me = this;
            this.loadmoreactive = true;
            this.gotdoclist(false,function(){
                _me.loadmoreactive = false;
            });
        }
    }

    ParamsToJson(params) {
        if (!params || (isArray(params) && params.length <= 0)) return params;
        let jdata = [];
        for (var param of params) {
            var view = {};
            for (var it of param.view) {
                view[it.name] = it.text;
            }
            var detailparam = {};
            for (var it of param.detailparam) {
                detailparam[it.name] = it.text;
            }
            jdata.push({view: view, detailparam: detailparam});
        }
        return jdata;
    }
}
