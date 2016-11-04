/**
 * Created by Administrator on 2016/10/27.
 * 路由组件
 */
import {Component ,Input, Output, EventEmitter} from '@angular/core';
import {CommonService} from "../../../core/comp/service/common";
import {Config} from "../../../core/comp/service/config";
import {isEmpty} from "rxjs/operator/isEmpty";

@Component({
    selector : 'router-box',
    templateUrl : './routerbox.html',
    styleUrls : ['../../shared.less','./routerbox.less'],
})
export class RouterBoxComponent {
    public selectitems:any;
    public selectusers: any = [];//最终的选择数据 承上启下的作用子组件---》此组件---》父组件
    public isnull : boolean = true;
    private toreadcheckbox : boolean = false;
    private openitems:any = false;//是否展开显示selectbox
    private nextcheckbox : any = [];

    @Input() node : any;

    @Input() multiroute : string;//单选路由还是多选路由
    @Input() nodelist : any;
    @Input() ischeck : boolean;

    @Input() routertype : string ;//路由类型 ====》决定接口传输数据转化形式
    @Output() onrouter = new EventEmitter<any>();
    constructor(private commonfn : CommonService) {}
    ngOnInit() {
        if(this.routertype == 'todo') {
            if(this.node.isdefaultroute && (this.node.isdefaultroute = 'Y')) {//默认路由
                this.ischeck = true;
                if(this.node.defaultuser) {
                    this.pushdetaultusers(this.node.defaultuser);
                    console.log(this.selectusers);
                }
            }
        }
    }
    ngOnChanges() {
        if(this.ischeck == false) {
            this.selectusers = [];
        }
    }
    pushdetaultusers(users) {
        if(users && users.length > 0) {
            this.selectusers= [{userselect : []}];
            for(let user of users) {
                this.selectusers[0]['userselect'].push(user);
            }
        }else if(users.userid && users.username){
            this.selectusers= [{userselect : [{userid : users.id , username : users.username}]}];
        }

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
            temp.push({group : group.group , userselect : tmp});
        }
        this.selectusers =temp;
        this.openitems = false;
    }
    //弹出数据 到父组件
    outputdata() {
        console.log(this.selectusers);
        return {selectusers:this.selectusers ,type : this.routertype ,node : this.node.item };
    }


    /*********************************************
     * 展开部门通讯录(包括路由选择和路由显示)
     * input : none
     *********************************************/
    selectitemsfn() {
        var _me = this;
        if(_me.routertype == 'toread') {//假设是取全公司组织架构，连着请求2次跳过一级公司展示，直接展示部门
            this.commonfn.getGroupOrUserList(1, 0, function (data) {
                _me.commonfn.getGroupOrUserList(1, data[0].groupid, function (data) {
                    _me.selectitems = data;
                    _me.openitems = true;
                });
            });
            return;
        }else if(_me.node.defaultuser) {//取路由并且有默认用户
            this.cancelroute();
            this.pushdetaultusers(_me.node.defaultuser);
            return;
        }else if(_me.node.item && _me.node.item.ispointtoend == 'Y'|| _me.node.item.ispointtoend == 'S') {//取路由而不取用户
            this.cancelroute();
            return;
        }else{
            this.commonfn.getGroupOrUserList(3, _me.node.departmentparam, function (data) {//取路由而并且接口取用户
                _me.selectitems = data;
                _me.openitems = true;
            });
            this.cancelroute();
        }
    }

    //单选路由，互斥路由
    cancelroute() {
        if(this.multiroute == '0') {
            console.log('单选路由');
            this.unSelectExclude();
        }else if(this.node.item.exclude && ''!=this.node.item.exclude.replace(/\s/g,"")){//互斥路由
            console.log('互斥路由');
            this.unSelectExclude(this.node.item.exclude);
        }
    }
    //弹出数据到父组件取消路由选择
    unSelectExclude(exclude?) {
        this.onrouter.emit({exclude : exclude , nodeid : this.node.item.nodeid});
    }

    delall() {
        this.selectusers =[];
    }


    /*********************************************
     * 删除最终选择项selectusers
     * input : key
     *********************************************/
    del(group , user) {
        for (let g in this.selectusers) {
            if(this.selectusers[g] == group) {
                for(let u in this.selectusers[g].userselect) {
                    if(this.selectusers[g].userselect[u] == user) {
                        this.selectusers[g].userselect.splice(u,1);
                    }
                }
                if(this.commonfn.isEmptyObject(this.selectusers[g].userselect)) {
                    this.selectusers.splice(g,1);
                }
            }
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
    ischeckornot(event) {
        console.log(event);
        if(event == true) {
            this.selectitemsfn();
        }else{
            this.selectusers = [];
        }
    }
}
