/**
 * Created by Administrator on 2016/10/27.
 * 选择 用户 组件
 */
import {Component ,Input, Output, EventEmitter} from '@angular/core';
import { AfterViewInit, ViewChildren } from '@angular/core';
import {CommonService} from "../../../core/comp/service/common";
import {Config} from "../../../core/comp/service/config";
import {UserselectComponent} from "../userselect/userselect";
import {isArray} from "util";

@Component({
    selector : 'grouplist',
    templateUrl : './grouplist.html',
    styleUrls : ['./grouplist.less'],
    providers : [UserselectComponent]
})
export class GrouplistComponent {
    @ViewChildren(UserselectComponent) useritems : QueryList<UserselectComponent>;
    @ViewChildren(GrouplistComponent) grouplist : QueryList<GrouplistComponent>;
    @Input() selectitems : Array<any>;
    @Input() departmentparam :any;
    @Input() isopen : boolean = false;
    @Input() multiuser :boolean;
    @Input() historyusers : any;

    nextgroup : any = false;
    nextselect : any;//子组件的数据
    status : any =[] ;//每个group全选框的状态
    constructor(private commonfn : CommonService ) {

    }
    /*********************************************
     * 下一个选择框
     * input : aa object || string
     *         istoggle 是否切换
     *         callback 回调
     *********************************************/
    nextselectfn(aa:any,istoggle? : boolean,callback? : any) {
        //aa 可能是选择的父选项对象 也可能只是选择的父选项对象的groupid
        let selectitem = aa;
        //aa 是对象 并且有子项childlist 说明有子目录 进入子目录选项
        if(aa instanceof Object) {
            if(aa.childlist != undefined) {
                this.selectitems[aa.groupid].isgroup = true;
                return;
            }
            //兼容最初版本aa 只是groupid
            aa = aa.groupid;
        }
        if(!callback && istoggle) {
            callback = istoggle;
            istoggle = undefined;
        }
        if(istoggle == undefined) {
            istoggle = true;
        }
        var type : number ;
        var parent : any;

        if(this.departmentparam && this.commonfn.isEmptyObject(selectitem.parentid)) {
            this.departmentparam.groupid = selectitem.groupid;
            type = 4;
            parent = this.departmentparam;
            var _me = this;
            this.commonfn.getGroupOrUserList(type, parent, function (tmpdata) {
                if (_me.nextselect == undefined) {
                    var tmp = {};
                    tmp[aa] = tmpdata;
                    _me.nextselect = tmp;
                } else if (!_me.nextselect[aa]) {
                    _me.nextselect[aa] = tmpdata;
                }
                if(istoggle) {
                    _me.nextselect[aa]['isopen'] = !_me.nextselect[aa]['isopen'];
                }else{
                    _me.nextselect[aa]['isopen'] =  true;
                }
                callback && callback();
            });
        }else{
            var _me = this;
            this.commonfn.getGroupOrUserList(1, aa, function (tmpdata) {
                if(isArray(tmpdata)) {
                    if(!isArray(_me.nextgroup)) _me.nextgroup = {};
                    _me.nextgroup[aa] = tmpdata;
                }
                _me.commonfn.getGroupOrUserList(2, aa, function (tmpdata) {
                    if (_me.nextselect == undefined) {
                        var tmp = {};
                        tmp[aa] = tmpdata;
                        _me.nextselect = tmp;
                    } else if (!_me.nextselect[aa]) {
                        _me.nextselect[aa] = tmpdata;
                    }
                    if(istoggle) {
                        _me.nextselect[aa]['isopen'] = !_me.nextselect[aa]['isopen'];
                    }else{
                        _me.nextselect[aa]['isopen'] =  true;
                    }
                    callback && callback();
                });

            });
        }

    }


    /**
     * userselects 弹出的数据
     * @param selectuser
     * @param groupid
     */
    outusers() {
        let _me = this;
        let temp = [];
        this.useritems.toArray().forEach((child)=>{
            var data = child.outputdata();
            temp.push(data);
        });
        return temp;
    }

    /*********************************************
     * 二级父checkbox选择框
     * input : aa userid e  boolean 选择项的值
     *********************************************/
    selectall(items) {
        var _me = this;
        this.nextselectfn(items,false);
    }

}