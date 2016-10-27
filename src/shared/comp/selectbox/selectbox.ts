/**
 * Created by Administrator on 2016/10/27.
 * 选择 用户 组件
 */
import {Component ,Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector : 'selectbox',
    templateUrl : './selectbox.html',
    styleUrls : ['./selectbox.less'],
})
export class SelectBoxComponent {
    public ywyf : boolean =false;
    @Input() selectitems : any;
    @Input() selectusers : any;
    @Input() multiuser : any;
    @Input() departmentparam : any;
    @Output() onselect = new EventEmitter<any>();
    constructor() {

    }
    outdata(event){
    }

}