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
@Component({
    templateUrl : './doclist.comp.html'
})
export class DocListComponent {
    private moduleid : string;
    private doclist : any;//二级文件列表数据
    private doctype :string;
    private userinfo : any;

    constructor(private route:ActivatedRoute, private global:GlobalEventManager, private request:Request ,private localstorage : LocalStorageService) {
        //获取链接携带的参数
        this.moduleid = this.route.snapshot.params['moduleid'];
        this.doctype = this.route.snapshot.params['pagename'];
    }

    ngOnInit() {
        //读取存储数据
        this.userinfo= this.localstorage.get('userinfo');
        //post参数
        this.gotdoclist(1);
    }
    gotdoclist (pageindex) {
        let action = 'doclist';
        if(!pageindex) pageindex = 1;
        let params = {
            username : this.userinfo.username,
            userid : this.userinfo.userid,
            doctype : this.doctype,
            moduleid : this.moduleid,
            pageindex : pageindex,
            pagesize :Config.pagesize
        };
        let _me = this;
        this.request.getJsonp(params, action, function (data) {
            _me.doclist = _me.ParamsToJson(data.doclist);
            console.log(_me.doclist);
        });
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
