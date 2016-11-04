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
        console.log(this.groups);
    }
    itemTapped(item) {
        var _me = this;
        this.commonfn.getGroupOrUserList(1,item.groupid,function(data) {
            _me.groups.push({parentid : item.parentid , groupname : item.groupname,groupid : item.groupid , items : data});
            if(isArray(data)) {
                _me.items.item = data;
            }else{
                _me.commonfn.getGroupOrUserList(2,item.groupid,function(data) {
                    _me.useritems =data;
                    _me.selectedItem = true;
                    console.log(_me.useritems);
                });
            }
        })
    }
    onback(parentid , items) {
        for(var key in this.groups ) {
            if(this.groups[key] && this.groups[key].parentid == parentid ) {
                console.log(this.groups);
                this.groups = this.groups.splice(0,parseInt(key)+1);
                console.log(this.groups);
            }
        }
        if(isArray(items))  {
            this.useritems = [];
            this.selectedItem = false;
            this.items.item = items;
        }
    }
}
