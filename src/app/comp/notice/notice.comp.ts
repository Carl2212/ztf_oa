/**
 * Created by Administrator on 2016/10/21.
 */
import {Component} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
import {Config} from "../../../core/comp/service/config";
import {Request} from "../../../core/comp/service/request";
import {isArray} from "rxjs/util/isArray";
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
import {isObject} from "rxjs/util/isObject";
import {CommonService} from "../../../core/comp/service/common";
@Component({
    templateUrl : './notice.comp.html',
    styleUrls : ['./notice.comp.less']
})
export class NoticeComponent {
    private moduleid : string = 'ElectronNotice';
    private doclist : any =[];//文件列表数据
    private userinfo : any;

    loadmoreactive : boolean = false;
    isshowloadmore : boolean = false;
    pageindex : number = 1;

    constructor(private route:ActivatedRoute, private global:GlobalEventManager, private request:Request ,private localstorage : LocalStorageService , private commonfn : CommonService) {
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
     * 获取公告列表
     * @param callback
     */
    gotdoclist (callback?) {
        let action = 'noticelist';
        let params = {
            userid : this.userinfo.userid,
            ptype : 1,
            moduleid : this.moduleid,
            pageindex : this.pageindex,
            pagesize :Config.pagesize
        };
        let _me = this;
        this.request.getJsonp(params, action, function (data) {
            if(isObject(data.noticelist)) {
                if(data.noticelist.length >= Config.pagesize) {
                    _me.isshowloadmore = true;
                }
                _me.doclist = _me.commonfn.ParamsToJson(data.noticelist);
                _me.pageindex += 1;
            }else{
                _me.global.showtoptip.emit('暂无数据');
            }
            callback && callback();
        });
    }
    concatarray(a,b) {
        for(let tmp of b) {
            a.push(tmp);
        }
        return a;
    }
    loadmore(event) {
        if(event) {
            let _me = this;
            this.loadmoreactive = true;
            this.gotdoclist(function(){
                _me.loadmoreactive = false;
            });
        }
    }
}
