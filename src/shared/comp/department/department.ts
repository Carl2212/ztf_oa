/**
 * Created by Administrator on 2016/10/27.
 * 意见框 组件
 */
import {Component ,Input Output ,EventEmitter} from '@angular/core';
import {CommonService} from "../../../core/comp/service/common";
import {isArray} from "util";

@Component({
    selector : 'department',
    templateUrl : './department.html',
    styleUrls : ['./department.less'],
})
export class DepartmentComponent {
    @Input() items : any;
    @Output() outdata = new EventEmitter<any>();
    groups : any;
    useritems : any;
    selectedItem : any;
    constructor(private commonfn : CommonService) {
    }
    ngOnChanges() {
        this.groups =[{parentid : 0 ,groupname : '通讯录',groupid : this.items.groupid , items : this.items.item}];
    }
    itemTapped(item) {
        var _me = this;
        this.commonfn.getGroupOrUserList(1,item.groupid,function(data) {
            if(isArray(data)) {
                _me.items.item = data;
            }else{
                _me.items.item = false;
            }
            _me.commonfn.getGroupOrUserList(2,item.groupid,function(data) {
                _me.groups.push({parentid : item.parentid , groupname : item.groupname,groupid : item.groupid , items :  _me.items.item , useritems : data});
                _me.useritems =data;
                _me.selectedItem = true;
            });
        })
    }
    onback(item) {
        for(var key in this.groups ) {
            if(this.groups[key] && this.groups[key].parentid == item.parentid ) {
                this.groups = this.groups.splice(0,parseInt(key)+1);
            }
        }
        if(isArray(item.items))  {
            this.useritems = item.useritems;
            this.selectedItem = this.useritems ? true : false ;
            this.items.item = item.items;
        }
    }
}
