/**
 * Created by Administrator on 2016/10/27.
 * 路由组件
 */
import {Component ,Input, Output, EventEmitter} from '@angular/core';
import {CommonService} from "../../../core/comp/service/common";

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
    private addressType:string = '0';//'0' or 'C'
    private nextcheckbox : any = [];

    @Input() defaultuser : any;
    @Input() departmentparam : any;
    @Input() item : any;
    @Input() multiroute : string;//单选框还是复选框
    @Input() nodelist : any;
    @Output() onrouter = new EventEmitter<any>();
    constructor(private commonfn : CommonService) {

    }
    ngOnInit() {
        console.log(this.selectitems,this.departmentparam,this.selectusers,this.item,this.multiroute ,this.nodelist);
    }
    onselect(event) {
        //接收selectbox子组件返回的数据
        this.selectusers =event;
        if(!this.selectusers || this.commonfn.isEmptyObject(this.selectusers)) {
            this.isnull = true;
        }
        this.openitems = false;
        this.selusers();
        this.cancelroute();//取消其他路由的选择
        this.onrouter.emit(event);
    }
    /*********************************************
     * 展开部门通讯录
     * input : none
     *********************************************/
    selectitemsfn() {
        console.log('selectitemsfn');
        if(this.item && (this.item.ispointtoend == 'S' || this.item.ispointtoend == 'Y' )) {
            //取消其他路由的选择
            this.cancelroute();
            return ;
        }else if(this.defaultuser) {
            var tmp = {};
            for(var duser of this.defaultuser) {
                tmp[duser.userid+'@'+ duser.username]= true;
            }
            this.selectusers = tmp;
            this.isnull = false;
            this.cancelroute();//取消其他路由的选择
            //this.cdr.detectChanges();
            return ;
        }
        var _me = this;
        var type : number;
        var parent : any;
        console.log('_me.item',_me.item);
        if(!_me.item) {
            type = 1;
            parent = 0;
        }else if(_me.item.isdefaultroute){
            type = 3;
            parent = _me.departmentparam;
        }
        console.log('type,parent',type,parent);
        this.commonfn.getGroupOrUserList(type, parent, this.addressType, function (data) {
            _me.selectitems = data;
            _me.openitems = true;
            console.log(_me.selectitems, _me.openitems);
        });
        if(this.item && this.item.multiuser != 0 && !this.toreadcheckbox) {
            this.nextcheckbox = [];
            this.selectusers = {};
            this.isnull = true;
        }
    }


    cancelroute() {
        if(this.item.multiroute == 0) {

        }else {//再判断是否有互斥路由

        }
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
                    //this.cdr.detectChanges();
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
