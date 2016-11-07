/**
 * Created by Administrator on 2016/10/27.
 * 选择 用户 组件
 */
import {Component ,Input, Output, EventEmitter} from '@angular/core';
import {CommonService} from "../../../core/comp/service/common";
import {Config} from "../../../core/comp/service/config";

@Component({
    selector : 'selectbox',
    templateUrl : './selectbox.html',
    styleUrls : ['./selectbox.less'],
})
export class SelectBoxComponent {
    public nextselect:any =[];
    private selectradio : string;
    public nextcheckbox :any=[];//组 是否被选择

    @Input() selectitems : any;
    @Input() historyusers : any;//已经选择的数据（父组件传下来）
    @Input() multiuser : any;
    @Input() departmentparam : any;

    @Output() onselect = new EventEmitter<any>();
    constructor(private commonfn : CommonService) {

    }
    /*********************************************
     * 确定按钮【控制选项框与内容框的切换】
     * input : none
     *********************************************/
    sureselectfn(data) {
        this.onselect.emit(data);

    }


}