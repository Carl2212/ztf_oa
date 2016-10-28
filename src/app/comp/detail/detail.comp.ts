/**
 * Created by Administrator on 2016/10/21.
 */
import {Component} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
import {Request} from "../../../core/comp/service/request";
@Component({
    templateUrl : './detail.comp.html'
})
export class DetailComponent {
    private userinfo  : any;
    private doctype : string;
    private moduleid : string;
    private nodeid : string;
    private docid : string;
    private appid : string;
    private detail : string;
    private process : string;
    constructor(private localstorage : LocalStorageService , private request : Request , private route:ActivatedRoute) {
        let _me = this;
        this.route.params.forEach(param=>{
            _me.doctype = param['pagename'];
            _me.moduleid = param['moduleid'];
            _me.nodeid = param['nodeid'];
            _me.docid = param['docid'];
            _me.appid = param['appid'];
        });
    }
    ngOnInit() {
        this.getDocDetail();
    }

    //请求doc详情
    getDocDetail(){
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
        });
    }
    ////传阅（进入dotosubmit）
    //sendread() {
    //    this.navcontrol.push(DoToSubmitPage,{nextparam : this.nextparam[0],detailinfo : this.detailinfo});
    //}
    //
    ////审批（进入dotosubmit）
    //approval () {
    //    this.navcontrol.push(DoToSubmitPage,{nextparam : this.nextparam[1],detailinfo : this.detailinfo});
    //}
    //提交已阅(只是单纯接口先不做)
    readed() {

    }

    //取待办下一个节点
    nextroute() {

    }
    //提交待办
    submitTodo(){

    }
}

