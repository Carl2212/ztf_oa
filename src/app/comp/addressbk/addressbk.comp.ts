/**
 * Created by Administrator on 2016/10/21.
 * 通讯录功能
 */
import {Component} from '@angular/core';
import {Request} from "../../../core/comp/service/request";
import {CommonService} from "../../../core/comp/service/common";
import {DepartmentComponent} from "../../../shared/comp/department/department";
@Component({
    templateUrl : './addressbk.comp.html',
    styleUrls : ['./addressbk.comp.less'],
})
export class AddressbkComponent {
    selectedItem: any;
    selecteduser : any;
    icons: string[];
    items: any = {};
    useritems :any =[];
    private username ;

    constructor(private request : Request , private commonfn : CommonService) {
    }
    ngOnInit() {
        var _me = this;
        this.commonfn.getGroupOrUserList(1,0,function(data) {
            _me.commonfn.getGroupOrUserList(1, data[0].groupid, function (data) {
                let item = data;
                let groupid =  data[0].groupid;
                _me.items = {item : item , groupid : groupid};
                console.log(_me.items);
            });
        });
    }
}
