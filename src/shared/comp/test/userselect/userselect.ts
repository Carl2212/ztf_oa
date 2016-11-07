/**
 * Created by Administrator on 2016/10/27.
 * 选择 用户 组件
 */
import {Component ,Input, Output, EventEmitter} from '@angular/core';
import {CommonService} from "../../../core/comp/service/common";
import {Config} from "../../../core/comp/service/config";

@Component({
    selector : 'userselect',
    templateUrl : './userselect.html',
    styleUrls : ['./userselect.less'],
})
export class UserselectComponent {
    @Input() userlist : any;
    @Input() group : string;
    @Input() multiuser : boolean;
    selectusers : any =[];

    @Output() outusers = new EventEmitter<any>();
    constructor(private commonfn : CommonService) {

    }
    outputdata() {
        return {selectusers:this.selectusers , group : this.group};
    }

    /*********************************************
     * 二级父checkbox选择框
     * input : aa userid e  boolean 选择项的值
     *********************************************/
    selectall(aa : string,e : any) {
        //var _me = this;
        //this.nextselectfn(aa,false,function() {
        //    _me.ChooseallOrnot(e,_me.nextselect[aa]);
        //});
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