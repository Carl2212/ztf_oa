/**
 * Created by Administrator on 2016/10/27.
 * 选择 用户 组件
 */
import {Component ,Input, Output, EventEmitter} from '@angular/core';
import {CommonService} from "../../../core/comp/service/common";

@Component({
    selector : 'selectbox',
    templateUrl : './selectbox.html',
    styleUrls : ['./selectbox.less'],
})
export class SelectBoxComponent {
    private addressType:string = '0';//'0' or 'C'
    public nextselect:any =[];
    private selectradio : string;
    public nextcheckbox :any=[];//组 是否被选择

    @Input() selectitems : any;
    @Input() selectusers : any;
    @Input() multiuser : any;
    @Input() departmentparam : any;
    @Output() onselect = new EventEmitter<any>();
    constructor(private commonfn : CommonService) {

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
        //this.cdr.detectChanges();
        //aa 是对象 并且有子项childlist 说明有子目录 进入子目录选项
        if(aa instanceof Object) {
            if(aa.childlist != undefined) {
                this.selectitems = aa.childlist;
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
            type = 4;
            parent = this.departmentparam;
        }else{
            type = 2;
            parent = aa;
        }
        var _me = this;
        this.commonfn.getGroupOrUserList(type, parent, this.addressType, function (tmpdata) {
            //if (_me.nextselect == undefined) {
            //    var tmp = {};
            //    tmp[aa] = tmpdata;
            //    _me.nextselect = tmp;
            //} else if (!_me.nextselect[aa]) {
            //    _me.nextselect[aa] = tmpdata;
            //}

            if(istoggle) {
                _me.nextselect[aa]['isopen'] = !_me.nextselect[aa]['isopen'];
            }else{
                _me.nextselect[aa]['isopen'] =  true;
            }
            callback && callback();
        });
    }
    /*********************************************
     * 确定按钮【控制选项框与内容框的切换】
     * input : none
     *********************************************/
    sureselectfn() {
        if(this.selectradio) {
            this.selectusers = [];
            this.selectusers[this.selectradio] = true;
        }
        this.onselect.emit(this.selectusers);
    }

    /*********************************************
     * 二级父checkbox选择框
     * input : aa userid e  boolean 选择项的值
     *********************************************/
    selectall(aa : string,e : any) {
        var _me = this;
        this.nextselectfn(aa,false,function() {
            _me.ChooseallOrnot(e,_me.nextselect[aa]);
        });
    }
    /*********************************************
     * 全选以及全不选
     * input :  e  boolean 选择项的值 tmpdata 子部门数据
     *********************************************/
    ChooseallOrnot(e,tmpdata) {
        if(e) {
            //全选
            for(let t of tmpdata) {
                this.selectusers[t.userid+'@'+t.username] = true;
            }
        }else{
            //全不选
            for(let t of tmpdata) {
                this.selectusers[t.userid + '@' + t.username] = false;
            }
        }
        //this.selusers();
    }
}