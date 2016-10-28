/**
 * Created by Administrator on 2016/10/21.
 */
import {Component} from '@angular/core';
import {Router , ActivatedRoute} from '@angular/router';
import {GlobalEventManager} from "../../../core/comp/service/globaleventmanager";
import { LocalStorageService } from 'angular-2-local-storage';
import {Config} from "../../../core/comp/service/config";
import {isArray} from "util";
import {CommonService} from "../../../core/comp/service/common";
@Component({
    templateUrl : './modulelist.comp.html'
})
export class ModuleListComponent {
    private pageinfo:any;//页面参数数据
    private modulelist:any;//列表数据
    private doctype : string;

    constructor(private route:ActivatedRoute, private global:GlobalEventManager, private common : CommonService) {
        //获取当天链接携带的参数
        let pagearray = {
            todo: {pagename: '待办'  },
            toread: {pagename: '待阅' }
        };
        this.doctype = this.route.snapshot.params['pagename'];
        this.pageinfo = pagearray[this.doctype];
        if(!this.modulelist) {
            let _me = this;
            this.common.gotCount(this.doctype,function(count,modulelist){
                _me.modulelist = modulelist;
            });
        }

    }

    ngOnInit() {
    }
}
