/**
 * Created by Administrator on 2016/10/21.
 */
import {Component} from '@angular/core';
import {Request} from "../../../core/comp/service/request";
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
import {Config} from "../../../core/comp/service/config";
import {isObject} from "rxjs/util/isObject";
import {CommonService} from "../../../core/comp/service/common";
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
import {isArray} from "rxjs/util/isArray";
@Component({
    templateUrl : './search.comp.html',
    styleUrls : ['./search.comp.less']
})
export class SearchComponent {
    searchvalue : string;
    userinfo : any;
    todonelist : any = false;
    readdonelist : any = false;
    history : any;
    constructor(private request : Request , private localstorage : LocalStorageService ,private commonfn : CommonService ,private global : GlobalEventManager) {}
    ngOnInit() {
        //获取存储的个人信息数据
        var _me = this;
        this.userinfo = this.localstorage.get('userinfo');
        this.history = this.localstorage.get('search');
    }
    search(value) {
        //搜索存入缓存
        if(!value) {
            this.global.showtoptip.emit('请输入搜索标题~');
            return;
        }
        if(!this.history || !isArray(this.history)) this.history = [];
        if(this.history.indexOf(value) < 0) {
            this.history.push(value);
            this.history.slice(-10,-1);
            this.localstorage.add('search' , this.history);
        }
        this.gotdoclist(value);
    }
    delhistory() {
        this.history = null;
    }
    gotdoclist (value) {
        let action = 'doclist';
        let params = {
            username : this.userinfo.username,
            userid : this.userinfo.userid,
            title : value,
            pageindex : 1,
            pagesize :Config.pagesize,
            doctype : 'todone',
            moduleid : ''
        };
        let _me = this;
        //调用2次接口查询已阅已办公文
        this.request.getJsonp(params, action, function (data) {
            if(isObject(data.doclist)) {
                _me.todonelist = _me.commonfn.DocToJson(data.doclist);
            }else{
                _me.todonelist = false;
            }
            params.doctype = 'readdone';
            _me.request.getJsonp(params, action, function (data) {
                if(isObject(data.doclist)) {
                    _me.readdonelist = _me.commonfn.DocToJson(data.doclist);
                }else{
                    _me.readdonelist = false;
                }
            });
        });
    }
    inputcontent(h) {
        this.searchvalue = h;
        this.gotdoclist (h);
    }
}