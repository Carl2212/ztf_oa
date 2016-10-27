/**
 * Created by Administrator on 2016/10/27.
 * 路由组件
 */
import {Component ,Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector : 'router-box',
    templateUrl : './routerbox.html',
    styleUrls : ['../../shared.less'],
})
export class RouterBoxComponent {
    openitem : boolean = true;
    @Input() defaultuser : any;
    @Input() departmentparam : any;
    @Input() item : any;
    @Output() onrouter = new EventEmitter<any>();
    constructor() {

    }
    outdata(event){
    }

}
