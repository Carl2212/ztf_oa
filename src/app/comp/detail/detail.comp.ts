/**
 * Created by Administrator on 2016/10/21.
 */
import {Component} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
import {Request} from "../../../core/comp/service/request";
@Component({
    templateUrl : './detail.comp.html',
    styleUrls : ['./detail.comp.less']
})
export class DetailComponent {
    private userinfo  : any;
    private doctype : string;
    moduleid : string;
    nodeid : string;
    docid : string;
    appid : string;

    pageinfo:any;//页面参数数据
    detail : string;
    process : string;
    tabname : string = 'detail';
    constructor(private localstorage : LocalStorageService , private request : Request , private route:ActivatedRoute) {
        let _me = this;
        let pagearray = {
            todo: {pagename: '待办' },
            toread: {pagename: '待阅'  },
            notice: {pagename: '通知公告' }
        };
        this.route.params.forEach(param=>{
            _me.doctype = param['pagename'];
            _me.moduleid = param['moduleid'];
            _me.nodeid = param['nodeid'];
            _me.docid = param['docid'];
            _me.appid = param['appid'];
            _me.pageinfo = pagearray[this.doctype];
        });
    }
    ngOnInit() {
        this.getDocDetail();
    }
    getNoticeDetail() {
        //获取存储的个人信息数据
        var _me = this;
        this.userinfo = this.localstorage.get('userinfo');
        let params = {
            userid : this.userinfo.userid,
            moduleid:this.moduleid,
            noticeid:this.docid,
        };
        let action = 'noticedetail';
        //请求
        _me.request.getJsonp(params,action,function(data){
            _me.detail = data.detail.item;
            _me.process = data.detail.tracelist;
            console.log(_me.detail,_me.process);
        });
    }
    //请求doc详情
    getDocDetail(){
        if(this.doctype == 'notice') {
            this.getNoticeDetail();
            return;
        }
        //获取存储的个人信息数据
        var _me = this;
        this.userinfo = this.localstorage.get('userinfo');
        let params = {
            username : this.userinfo.username,
            userid : this.userinfo.userid,
            doctype :this.doctype,
            moduleid:this.moduleid,
            nodeid:this.nodeid,
            docid :this.docid,
            appid :this.appid
        };
        let action = 'docdetail';
        //请求
        _me.request.getJsonp(params,action,function(data){
            _me.detail = data.detail.item;
            _me.process = data.detail.tracelist;
            console.log(_me.detail,_me.process);
        });
    }
    /*********************************************
     * 已阅
     * ajax
     *********************************************/
    submittoread() {
        let _me = this;
        let params = {
            userid  : this.userinfo.userid,
            appid : this.appid,
            docid : this.docid,
            opinion : '已阅',
            submittype: '2',//?????????????????
        };
        let action = 'submittoread';
        _me.request.getJsonp(params, action, function (data) {
            if (data.header.code == 1 && data.result.success == 1) {
                //弹出提示并且跳转回list页面

            } else {
                //弹出错误
            }
        });
    }
}

