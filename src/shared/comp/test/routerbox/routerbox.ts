/**
 * Created by Administrator on 2016/10/27.
 * 路由组件
 */
import {Component ,Input, Output, EventEmitter} from '@angular/core';
import {CommonService} from "../../../core/comp/service/common";
import {Config} from "../../../core/comp/service/config";

@Component({
    selector : 'router-box',
    templateUrl : './routerbox.html',
    styleUrls : ['../../shared.less'],
})
export class RouterBoxComponent {
    public selectitems:any;
    public selectusers: any = {};//最终的选择数据 承上启下的作用子组件---》此组件---》父组件
    public isnull : boolean = true;
    private toreadcheckbox : boolean = false;
    private openitems:any = false;//是否展开显示selectbox
    private nextcheckbox : any = [];

    @Input() defaultuser : any;
    @Input() departmentparam : any;
    @Input() item : any;
    @Input() multiroute : string;//单选框还是复选框
    @Input() nodelist : any;
    @Input() ischeck : boolean;
    @Input() isdefaultroute :any;
    @Output() onrouter = new EventEmitter<any>();
    constructor(private commonfn : CommonService) {

    }

    onselect(event) {
        //接收selectbox子组件返回的数据
        let temp =[] ;
        for(let group of event) {
            var tempusers = group.selectusers;
            var tmp = [];
            for(let k in tempusers) {
                if(tempusers[k]) {
                    var user = k.split('@');
                    tmp.push({userid : user[0] , username : user[1]});
                }
            }
            temp.push({groupname : group.group.groupname , userselect : tmp});
        }
        this.selectusers =temp;
        //if(!this.selectusers || this.commonfn.isEmptyObject(this.selectusers)) {
        //    this.isnull = true;
        //}
        this.openitems = false;
        //this.selusers();
        this.cancelroute();//取消其他路由的选择
    }
    //弹出数据 到父组件
    outputdata() {
        let type = this.departmentparam ? 'todo' : 'toread';//'todo'数据作为节点数据形式转化,'toread',转成touserid字符串形式
        return {selectusers:this.selectusers ,type : type ,node : this.item };
    }


    /*********************************************
     * 展开部门通讯录(包括路由选择和路由显示)
     * input : none
     *********************************************/
    selectitemsfn() {
        var _me = this;
        var type : number;
        var parent : any;
        if(_me.item && _me.item.ispointtoend == 'Y'|| _me.item.ispointtoend == 'S') {
            this.cancelroute();
            return;
        }else if(!_me.item) {//假设是取全公司组织架构，连着请求2次跳过一级公司展示，直接展示部门
            this.commonfn.getGroupOrUserList(1, 0, function (data) {
                _me.commonfn.getGroupOrUserList(1, data[0].groupid, function (data) {
                    _me.selectitems = data;
                    _me.openitems = true;
                });
            });
            this.cancelroute();
            return;
        }else{
            this.commonfn.getGroupOrUserList(3, _me.departmentparam, function (data) {
                _me.selectitems = data;
                _me.openitems = true;
            });
            this.cancelroute();
        }
    }

    //单选路由，互斥路由
    cancelroute() {
        if(this.item.multiroute == 0) {
            this.unSelectExclude();
        }else if(this.item.exclude&&''!=this.item.exclude.replace(/\s/g,"")){//互斥路由
            this.unSelectExclude(this.item.exclude);
        }
        if(this.isdefaultroute == 1) {
            if(this.defaultuser) {
                this.selectusers = [{userselect : this.defaultuser}];
            }
        }
    }
    //弹出数据到父组件取消路由选择
    unSelectExclude(exclude?) {
        this.onrouter.emit({exclude : exclude , nodeid : this.item.nodeid});
    }


    delall() {

    }


    /*********************************************
     * 删除最终选择项
     * input : key
     *********************************************/
    del(key:string) {
        this.selectusers[key] = false;
        var close = true;
        for(var i in this.selectusers) {
            if(this.selectusers[i]) close = false;
        }
        if(close) {
            this.nextcheckbox = [];
            this.selectusers = {};
            this.isnull = true;
            this.toreadcheckbox = false;
            //this.cdr.detectChanges();
        }
    }
    /*********************************************
     * 监控变量selectusers改变时，判断selectusers是否为空是否都为false
     * input : none
     *********************************************/
    selusers() {
        if(!this.selectusers || this.isEmptyObject(this.selectusers)) {
            this.isnull = true;
            this.toreadcheckbox = false;
        }else{
            for(var i in this.selectusers) {
                if(this.selectusers[i]) {
                    this.isnull = false;
                    return;
                }
            }
            this.isnull = true;
            this.toreadcheckbox = false;
        }
    }
    /*********************************************
     * 判断对象是否为空
     * input : obj 对象
     *********************************************/
    isEmptyObject(obj) {
        for(var i in obj) {
            return false;
        }
        return true;
    }
}
