/**
 * Created by Administrator on 2016/10/21.
 * 通讯录功能
 */
import {Component} from '@angular/core';
import {Request} from "../../../core/comp/service/request";
import {CommonService} from "../../../core/comp/service/common";
@Component({
    templateUrl : './addressbk.comp.html',
    styleUrls : ['./addressbk.comp.less']
})
export class AddressbkComponent {
    selectedItem: any;
    selecteduser : any;
    icons: string[];
    items: any = [];
    useritems :any =[];
    private username ;

    constructor(private request : Request , private commonfn : CommonService) {
    }
    ngOnInit() {
        var _me = this;
        this.commonfn.getGroupOrUserList(1,0,function(data) {
            _me.commonfn.getGroupOrUserList(1, data[0].groupid, function (data) {
                _me.items = data;
            });
        });
    }
    //请求通讯录组


    itemTapped(event, item) {
        this.selectedItem = item;
        var _me = this;
        this.commonfn.getGroupOrUserList(2,item.groupid,function(data) {
            _me.useritems =data;
        });
    }
    updo() {
        this.selectedItem = false;
        this.selecteduser = false;
    }
    userinfo(event, user) {
        this.selecteduser = user;
    }
    closecard() {
        this.selecteduser = false;
    }
    closeusercard() {
        this.selectedItem = false;
    }
}
