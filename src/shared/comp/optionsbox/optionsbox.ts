/**
 * Created by Administrator on 2016/10/27.
 * 意见框 组件
 */
import {Component ,Input, Output, EventEmitter , ViewChild} from '@angular/core';

@Component({
    selector : 'my-options',
    templateUrl : './optionsbox.html',
    styleUrls : ['../../shared.less'],
})
export class OptionsBoxComponent {
    myoptions : string = '';
    @Input() umoption : any;
    //@Input() presentAlert : any;
    @Output() onoptions = new EventEmitter<any>();
    constructor() {

    }
    outdata(event){
        console.log(event);
        this.onoptions.emit(event);
    }
    openumopinion() {
        console.log(this.myoptions);
        console.log('ok. it open an umoption box');
    }

}
