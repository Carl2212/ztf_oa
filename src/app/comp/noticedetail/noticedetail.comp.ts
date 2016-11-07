/**
 * Created by Administrator on 2016/10/21.
 */
import {Component} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
import {Request} from "../../../core/comp/service/request";
@Component({
    templateUrl : './noticedetail.comp.html',
    styleUrls : ['./noticedetail.comp.less']
})
export class NoticeDetailComponent {
    private userinfo  : any;
    noticeid : string;

    detail : string;
    process : string;
    constructor(private localstorage : LocalStorageService , private request : Request , private route:ActivatedRoute) {
        let _me = this;
        this.route.params.forEach(param=>{
            _me.noticeid= param['noticeid'];
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
            userid : this.userinfo.userid,
            noticeid:this.noticeid,
        };
        let action = 'noticedetail';
        //请求
        _me.request.getJsonp(params,action,function(data){
            _me.detail = data.detail.item;
            _me.process = data.detail.tracelist;
        });
    }
}

