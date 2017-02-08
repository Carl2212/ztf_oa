/**
 * Created by Administrator on 2016/10/21.
 */
import {Component} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
//import { LocalStorageService } from 'angular-2-local-storage';
import {Config} from "../../../core/comp/service/config";
import {isArray} from "rxjs/util/isArray";
import {CommonService} from "../../../core/comp/service/common";
import {Request} from "../../../core/comp/service/request";
import {LocalStorageService} from "angular-2-local-storage/dist/angular-2-local-storage";
@Component({
    templateUrl : './modulelist.comp.html',
    styleUrls : ['./modulelist.comp.less']
})
export class ModuleListComponent {
    pageinfo:any;//页面参数数据
    modulelist:any = false;//列表数据
    doctype : string;
    userinfo : any;
    username : string ;

    constructor(private route:ActivatedRoute,  private common : CommonService ,private localstorage : LocalStorageService) {
        //获取当天链接携带的参数
        let pagearray = {
            todo: {pagename: '待办'  },
            toread: {pagename: '待阅' }
        };
        this.doctype = this.route.snapshot.params['pagename'];
        this.pageinfo = pagearray[this.doctype];
        //update by 2016.11.17
        this.username = this.route.snapshot.queryParams['username'];
    }
    ngOnInit() {
        //update by 2016.11.17
        if(this.username) {
            let _me = this;
            this.common.islogin(this.username,function(userinfo,userlist){
                _me.userinfo = userinfo;
                _me.getmodulelist();
            });
        }else{
            this.getmodulelist();
        }
    }
    getmodulelist() {
        let _me = this;
        this.common.gotCount(this.doctype,function(count,modulelist){
            if(!modulelist || !isArray(modulelist)) {
                _me.modulelist = false;
            }else{
                _me.modulelist = modulelist;
            }
        },this.userinfo);
    }
}
